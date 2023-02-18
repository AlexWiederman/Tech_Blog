
const createCommentButtonHandler = async (event) => {
  event.preventDefault();
  document.location.replace('/comment');
  console.log('Test')
}


document
  .querySelector('#create-comment')
  .addEventListener('click', createCommentButtonHandler);

