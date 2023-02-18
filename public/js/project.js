
const createCommentButtonHandler = async (event) => {
  event.preventDefault();
  document.location.replace('/comment');
  console.log('Test')
}


const  comment = document.querySelector('.create-comment')
  comment.addEventListener('click', createCommentButtonHandler);

