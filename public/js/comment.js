const newFormHandler = async (event) => {
  // event.preventDefault();

  const comment = document.querySelector('#comment-desc').value.trim();
  // console.log(JSON.stringify({comment}))
  if (comment) {
    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({ comment, projectID }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // document.location.replace('/profile');
      alert('Created comment');
    } else {
      alert('Failed to create comment');
    }
  }
};

let projectID = document.querySelector('.projectid').id;
console.log(projectID);


document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newFormHandler);

const buttons = document.getElementsByTagName('button');
const buttonPressed = async (event) => {
  const id = event.target.id;
  console.log(id);
  const response = await fetch(`/api/comment/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    alert('Deleted comment');
  } else {
    alert('Failed to delete comment');
  }
};

// const deleteButt = document.getElementById('delete');
// deleteButt.addEventListener('click', buttonPressed);
