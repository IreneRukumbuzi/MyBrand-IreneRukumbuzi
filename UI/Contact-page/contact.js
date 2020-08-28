const firebaseConfig = {
  apiKey: 'AIzaSyAlyd3OzqGEYbvGMYiXRFDYdYQOdPO6Q6Q',
  authDomain: 'my-brand-irene-c2a80.firebaseapp.com',
  databaseURL: 'https://my-brand-irene-c2a80.firebaseio.com',
  projectId: 'my-brand-irene-c2a80',
  storageBucket: 'my-brand-irene-c2a80.appspot.com',
  messagingSenderId: '981307922858',
  appId: '1:981307922858:web:c11945d385ba197a3f73d3',
  measurementId: 'G-JPKXJPQ9Q6',
};
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
firebase.analytics();
function getInputVal(id) {
  return document.getElementById(id).value;
}

const db = firestore.collection('contactData');

const form = document.getElementById('myForm').addEventListener('submit', submitForm);
const errorMessage = document.getElementById('errorMessage');
let userPosition;
console.log(userPosition);

const success = (position) => {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  userPosition = { lat, long };
};
navigator.geolocation.getCurrentPosition(success, console.log);

function submitForm(e) {
  e.preventDefault();

  const name = getInputVal('name');
  const email = getInputVal('email');
  const message = getInputVal('message');

  db.doc().set({
    name,
    email,
    message,
    location: userPosition,
  }).then(() => {
    console.log('Data Sent');
    // alert('Data has been successfully sent');
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
  })
    .catch(() => {
      console.log(error);
    });
}
