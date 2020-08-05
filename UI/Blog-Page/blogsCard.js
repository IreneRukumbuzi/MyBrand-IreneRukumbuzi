const cardsContainer = document.querySelector('.cards_container');

const displayBlogs = (blogs) => {
    blogs.forEach(blog => {
        const blogData = blog.data()
        const blogCard = document.createElement('div')
        blogCard.setAttribute('class', 'card');
        const inBlogHTML =
         `
        <div class="image-div">
                <img src="./Images/2019_11_22_07_41_IMG_1023.JPG" alt="">
            </div>
            <div class="card-body">
                <span>4 Days Ago</span>
                <h3>${blogData.title}</h3>
                <p>${blogData.body.slice(0, 80)} ...</p>
            </div>
            
            <div class="rm-btn">
            <p  class="rm-btns">Read More</p>
            </div>
        </div>
        `
        blogCard.innerHTML = inBlogHTML;
        cardsContainer.appendChild(blogCard)

        const readMore = blogCard.querySelector('.rm-btns')
        readMore.addEventListener('click', (e) => {
            localStorage.setItem('blog-id', blog.id)
            window.location.assign('./blogPage.html')
        })
    })
}

db.collection('blogs').get()
.then((snapshot) => {
    const data = snapshot.docs;
    
    displayBlogs(data)
})