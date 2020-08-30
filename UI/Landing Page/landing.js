const togglebtn = document.getElementsByClassName('togglebtn')[0];

const mainNavLinks = document.getElementsByClassName('navLinks')[0];

togglebtn.addEventListener('click', () => {
  mainNavLinks.classList.toggle('active');
});
