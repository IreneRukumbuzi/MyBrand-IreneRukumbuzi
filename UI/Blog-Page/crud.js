const blogsList = document.querySelector('#blogsList');
const form = document.querySelector('#myForm');
const uptForm = document.querySelector('.modal');
const saveBtn = document.querySelector('#saveBtn');
const cancelBtn = document.querySelector('#cancelBtn');
let blogId;

function addBlogs(doc){
    let li = document.createElement('li');
    let title = document.createElement('h3');
    // let cover = document.createElement('img');
    let blogBody = document.createElement('p');
    let rel_date = document.createElement('h5');
    let dlt = document.createElement('button');
    let upt = document.createElement('button');


    li.setAttribute('data-id', doc.id);
    title.textContent = doc.data().title;
    blogBody.textContent = doc.data().body;
    rel_date.textContent = doc.data().date;
    dlt.className ="btn dltBtn";
    dlt.textContent = "Delete";
    upt.className ="btn";
    upt.textContent ="Update";

    li.appendChild(title);
    li.appendChild(blogBody);
    li.appendChild(rel_date);
    li.appendChild(dlt);
    li.appendChild(upt);
    

    blogsList.appendChild(li);

    //Deleting BlogPosts

    dlt.addEventListener('click', (e) =>{
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('blogs').doc(id).delete();
    })

    // Updating the BlogPosts

    upt.addEventListener('click', (e)=>{
        e.stopPropagation();
        uptForm.className ="modal";
        const uptTitle = document.querySelector('#uptTitle');
        const uptBody = document.querySelector('#uptBlog');

        uptTitle.value = title.textContent;
        uptBody.value = blogBody.textContent;

        blogId = e.target.parentElement.getAttribute('data-id');

        cancelBtn.addEventListener('click', (e)=>{
            e.stopPropagation();
            uptForm.className = "modal hide";
        });

        saveBtn.addEventListener('click', e =>{
            e.stopPropagation();
            console.log(blogId);
            db.collection('blogs').doc(blogId).update({
               title: uptTitle.value,
               body: uptBody.value
            }).then(() =>{
                uptForm.className ="Modal hide";
            })
        })

    })
}

db.collection('blogs').get().then((snapshot) =>{
    snapshot.docs.forEach(doc =>{
        addBlogs(doc);
        console.log('SENT');
    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('blogs').add({
        title: form.title.value,
        body: form.content.value
    })

    form.title.value ="";
    form.content.value ="";
})

// db.collection('blogs').onSnapshot(snapshot =>{
//     let changes = snapshot.docChanges();
//     changes.forEach(change => {
//     if(change.type == "added"){
//         addBlogs(change.doc);
//     } else if (change.type == "removed"){
//         let li = blogsList.querySelector('[data-id=' + change.doc.id + ']');
//         blogsList.removeChild(li);
//     }
//     })
// })

