const commentForm = document.querySelector('.commentForm');
const blogId = localStorage.getItem('blogId');

window.addEventListener('load', () => {
  axios
    .get(`https://mybrandirene.herokuapp.com/blogs/${blogId}`)
    .then((res) => {
      const contents = res.data.data;
      console.log(res);
      const blogTitle = document.querySelector('.postTitle');
      const imageUrl = document.querySelector('.img-div');
      const blogBody = document.querySelector('.postBody');
      const createdDate = document.querySelector('h4');
      const likes = document.querySelector('#likesCounter');

      blogTitle.textContent = contents.title;
      blogBody.textContent = contents.content;
      likes.innerHTML = contents.likes;
      imageUrl.innerHTML = `<img src="${contents.imageUrl}" alt=""></img>`;
      createdDate.innerHTML = new Date(contents.date).toDateString();
    })
    .catch((err) => console.log(err));
});

const likeBtn = document.getElementById('heart').addEventListener('click', () => {
  let likesCount = document.getElementById('likesCounter').innerHTML;
  likesCount++;
  document.getElementById('likesCounter').innerHTML = likesCount;

  axios.post(`https://mybrandirene.herokuapp.com/blogs/likes/${blogId}`, {
    likes: localStorage.getItem('likes'),
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

const commentBtn = document.querySelector('.commentBtn').addEventListener('click', (e) => {
  e.preventDefault();
  const commentor = document.getElementById('commentor').value;
  const comment = document.getElementById('message').value;

  axios.post(`https://mybrandirene.herokuapp.com/blogs/comments/${blogId}`, {
    name: commentor,
    comment,
  })
    .then((res) => {
      console.log(res);
      document.getElementById('commentor').value = '';
      document.getElementById('message').value = '';
    })
    .catch((err) => console.log(err));
});
