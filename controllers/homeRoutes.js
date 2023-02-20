const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');
const Comment = require('../models/Comment')

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      projects, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.username_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/comment/:id', async (req, res) => {
  try {
    // Find the comments assosiated with the get
    const userData = await Comment.findAll({
      where: {
        project_id: req.params.id,
      },
      include: [{ model: Project }],
    
});
    
  if (userData.length == 0 ) {
    res.render('comment')
  }else {
    console.log(userData)

    // const comment = userData
    const comment = userData.get({ plain: true });
    // const comment = [{comment:"hello",project_id:"1"}]
console.log(comment)
    res.render('comment', {
      ...comment,
      logged_in: true
    });
  }
  } catch (err) {
   
    res.status(500).json(err);
  }
});

module.exports = router;
