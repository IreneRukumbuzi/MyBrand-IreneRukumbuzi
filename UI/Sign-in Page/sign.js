document.querySelector('.container').style.display = 'block';
document.querySelector('#admin-div').style.display = 'none';

function login(e) {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  axios.post('https://mybrandirene.herokuapp.com/login', {
    email,
    password,
  })
    .then((res) => {
      document.querySelector('.container').style.display = 'none';
      document.querySelector('#admin-div').style.display = 'block';
      localStorage.setItem('token', res.data.token);
      console.log(localStorage.token);
      console.log(res);
    })
    .catch((err) => console.log(err));
}
const signBtn = document.getElementById('signBtn').addEventListener('click', login);

const logOut = document.getElementById('logOutBtn').addEventListener('click', () => {
  axios.get('https://mybrandirene.herokuapp.com/logout')
    .then((res) => {
      console.log(res);
      document.querySelector('.container').style.display = 'block';
      document.querySelector('#admin-div').style.display = 'none';
      localStorage.setItem('token', null);
    })
    .catch((err) => console.log(err));
});
