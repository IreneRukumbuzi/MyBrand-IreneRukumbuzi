const alertMessage = document.getElementById('errorMessage');

const submitQueries = (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  axios.post('https://mybrandirene.herokuapp.com/queries', {
    name,
    email,
    message,
  })
    .then((res) => {
      console.log(res);
      alertMessage.style.display = 'block';
      alertMessage.innerHTML = 'Message Successfully Sent';
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('message').value = '';
    })
    .catch((err) => {
      console.log(err);
      alertMessage.style.display = 'block';
      alertMessage.style.backgroundColor = '#9e1b1b';
      alertMessage.innerHTML = 'Message not Sent';
    });
};
document.getElementById('submitQuery').addEventListener('click', submitQueries);
