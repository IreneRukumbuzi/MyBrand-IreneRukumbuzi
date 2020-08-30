const blogsList = document.querySelector('#blogsList');
const form = document.querySelector('#myForm');
const uptForm = document.querySelector('.modal');
const saveBtn = document.querySelector('#saveBtn');
const cancelBtn = document.querySelector('#cancelBtn');
const alertMessage = document.getElementById('alertMessage');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  axios.post('https://mybrandirene.herokuapp.com/blogs', {
    title: form.title.value,
    content: form.content.value,
    imageUrl: form.imageUrl.value,
  }, {
    headers: {
      token: localStorage.getItem('token'),
    },
  })
    .then((res) => {
      console.log(res);
      alertMessage.style.visibility = 'visible';

      form.title.value = '';
      form.content.value = '';
      form.imageUrl.value = '';
    })
    .catch((err) => {
      console.log(err);
      alertMessage.style.visibility = 'visible';
      alertMessage.style.backgroundColor = '#a71414';
      alertMessage.innerHTML = 'Not created!, Check inputs';
    });
});

const displayBlogs = (allBlogs) => {
  allBlogs.forEach((blog) => {
    const li = document.createElement('li');
    const title = document.createElement('h3');
    const blogBody = document.createElement('p');
    const dlt = document.createElement('button');
    const upt = document.createElement('button');

    li.setAttribute('data-id', blog._id);
    title.textContent = blog.title;
    blogBody.textContent = blog.content;
    dlt.className = 'btn dltBtn';
    dlt.textContent = 'Delete';
    upt.className = 'btn';
    upt.textContent = 'Update';
    dlt.setAttribute('data-id', blog._id);
    upt.setAttribute('data-id', blog._id);
    console.log(blog._id);

    li.appendChild(title);
    li.appendChild(blogBody);
    li.appendChild(dlt);
    li.appendChild(upt);

    blogsList.appendChild(li);

    dlt.addEventListener('click', (e) => {
      const blogId = e.target.parentElement.getAttribute('data-id');
      axios.delete(`https://mybrandirene.herokuapp.com/blogs/${blogId}`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      }).then((res) => {
        console.log(res);
        alert('Blog Deleted Successfully');
      })
        .catch((err) => console.log(err));
    });

    upt.addEventListener('click', (e) => {
      uptForm.className = 'modal';
      const uptTitle = document.querySelector('#uptTitle');
      const uptBody = document.querySelector('#uptBlog');

      uptTitle.value = title.textContent;
      uptBody.value = blogBody.textContent;

      const blogId = e.target.parentElement.getAttribute('data-id');

      cancelBtn.addEventListener('click', (eve) => {
        eve.stopPropagation();
        uptForm.className = 'modal hide';
      });

      saveBtn.addEventListener('click', (ev) => {
        ev.stopPropagation();

        axios
          .patch(`https://mybrandirene.herokuapp.com/blogs/${blogId}`, {
            title: uptTitle.value,
            content: uptBody.value,
          }, {
            headers: {
              token: localStorage.getItem('token'),
            },
          }).then((res) => {
            console.log(res);
            uptForm.className = 'Modal hide';
            alert('Blog Updated successfully');
          })
          .catch((err) => console.log(err));
      });
    });
  });
};
window.addEventListener('load', () => {
  axios
    .get('https://mybrandirene.herokuapp.com/blogs')
    .then((res) => {
      const allBlogs = res.data.data;
      displayBlogs(allBlogs);
    })
    .catch((err) => console.log(err));
});
