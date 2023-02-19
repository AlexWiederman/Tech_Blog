const newFormHandler = async (event) => {
    // event.preventDefault();
  

   
    const comment = document.querySelector('#comment-desc').value.trim();
    console.log(JSON.stringify({comment}))
    if (comment) {
      const response = await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({ comment }),
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

  document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newFormHandler);


