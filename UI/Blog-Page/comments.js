const commentsList = document.querySelector('.commentsList');

const displayComments = (allComments) => {
  allComments.forEach((comment, index) => {
    const li = document.createElement('li');
    const commentor = document.createElement('h4');
    const commentContent = document.createElement('h4');

    li.setAttribute('data-id', index);
    commentor.textContent = comment.name;
    commentContent.textContent = comment.comment;

    li.appendChild(commentor);
    li.appendChild(commentContent);

    commentsList.appendChild(li);
  });
};

window.addEventListener('load', () => {
  axios
    .get(`https://mybrandirene.herokuapp.com/blogs/comments/${blogId}`)
    .then((res) => {
      console.log(res);
      const allComments = res.data.data;

      displayComments(allComments);
    })
    .catch((err) => console.log(err));
});
