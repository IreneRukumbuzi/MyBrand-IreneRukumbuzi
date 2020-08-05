const blogId = localStorage.getItem('blog-id')


db.collection('blogs').doc(blogId).get().then((snapshot)=>{
    let contents = snapshot.data();
    let blogTitle = document.querySelector('.postTitle');
    let blogBody = document.querySelector('.postBody');
    blogTitle.textContent = contents.title;
    blogBody.textContent = contents.body;
 
});

