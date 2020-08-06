const queriesList = document.querySelector('.queriesList');

function addQueries(doc){
    let li = document.createElement('li');
    let UserName = document.createElement('h3');
    let userEmail = document.createElement('a');
    let queryBody = document.createElement('p');

    li.setAttribute('data-id', doc.id);

    UserName.textContent = doc.data().name;
    userEmail.textContent = doc.data().email;
    queryBody.textContent = doc.data().message;
    
    li.appendChild(UserName);
    li.appendChild(userEmail);
    li.appendChild(queryBody);

    queriesList.appendChild(li);
}

db.collection('contactData').get().then((snapshot) => {
    snapshot.docs.forEach(doc =>{
        addQueries(doc);
        console.log('Received');   
    })
})