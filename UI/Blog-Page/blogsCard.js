const cardsContainer = document.querySelector('.cards_container');

const displayBlogs = (allBlogs) => {
  allBlogs.forEach((blogData) => {
    const blogCard = document.createElement('div');
    blogCard.setAttribute('class', 'card');
    const inBlogHTML = `
        <div class="image-div">
                <img src="${blogData.imageUrl}" alt="">
            </div>
            <div class="card-body">
                <span>${new Date(blogData.date).toDateString()}</span>
                <h3>${blogData.title}</h3>
                <p>${blogData.content.slice(0, 110)} ...</p>
            </div>
            
            <div class="rm-btn">
            <p  class="rm-btns" data-key=${blogData._id}>Read More</p>
            </div>
        </div>
        `;
    blogCard.innerHTML = inBlogHTML;
    cardsContainer.appendChild(blogCard);

    const readMores = blogCard.querySelectorAll('.rm-btns');
    readMores.forEach((readMore) => {
      readMore.addEventListener('click', (e) => {
        const { key } = e.target.dataset;
        localStorage.setItem('blogId', key);
        window.location.assign('./blogPage.html');
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
