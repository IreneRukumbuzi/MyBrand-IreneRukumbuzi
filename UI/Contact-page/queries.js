const queriesList = document.querySelector('.queriesList');

const addQueries = (allQueries) => {
  allQueries.forEach((query) => {
    const li = document.createElement('li');
    const UserName = document.createElement('h3');
    const userEmail = document.createElement('a');
    const queryBody = document.createElement('p');

    li.setAttribute('data-id', query._id);
    UserName.textContent = query.name;
    userEmail.textContent = query.email;
    queryBody.textContent = query.message;

    li.appendChild(UserName);
    li.appendChild(userEmail);
    li.appendChild(queryBody);

    queriesList.appendChild(li);
  });
};

window.addEventListener('load', () => {
  axios.get('https://mybrandirene.herokuapp.com/queries', {
    headers: {
      token: localStorage.getItem('token'),
    },
  })
    .then((res) => {
      console.log(res);
      const allQueries = res.data.data;

      addQueries(allQueries);
    })
    .catch((err) => console.log(err));
});
