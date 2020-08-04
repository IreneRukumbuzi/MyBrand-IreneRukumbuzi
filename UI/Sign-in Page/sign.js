
 firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
     document.querySelector('.container').style.display ="none";
     document.querySelector('#admin-div').style.display ="block"; 

    } else {
      // No user is signed in.
      document.querySelector('.container').style.display ="block";
      document.querySelector('#admin-div').style.display ="none";
    }
  });

function login(){
 
  var email = document.querySelector('#email').value;
  var password = document.querySelector('#password').value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    
      alert("error: " + errorMessage);
    
  });
}

function logout(){
  firebase.auth().signOut();
}
  


