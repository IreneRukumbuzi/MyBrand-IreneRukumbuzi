var firebaseConfig = {
    apiKey: "AIzaSyAlyd3OzqGEYbvGMYiXRFDYdYQOdPO6Q6Q",
    authDomain: "my-brand-irene-c2a80.firebaseapp.com",
    databaseURL: "https://my-brand-irene-c2a80.firebaseio.com",
    projectId: "my-brand-irene-c2a80",
    storageBucket: "my-brand-irene-c2a80.appspot.com",
    messagingSenderId: "981307922858",
    appId: "1:981307922858:web:c11945d385ba197a3f73d3",
    measurementId: "G-JPKXJPQ9Q6"
  };
firebase.initializeApp(firebaseConfig);

var firestore = firebase.firestore();
firebase.analytics();

const db = firestore.collection("contactData");

const form = document.getElementById('myForm').addEventListener('submit', submitForm);
const errorMessage = document.getElementById('errorMessage');


function submitForm(e){
    e.preventDefault();
    
    var name = getInputVal('name');
    var email = getInputVal('email');
    var message = getInputVal('message');
    

    db.doc().set({
        name: name,
        email: email,
        message: message
    }).then(function(){
        console.log('Data Sent');
        document.getElementById('name').value = "";
        document.getElementById('email').value = "";
        document.getElementById('message').value = "";
    })
    .catch(function(){
        console.log(error);
    }); 
    
}

function getInputVal(id){
    return document.getElementById(id).value;
}





