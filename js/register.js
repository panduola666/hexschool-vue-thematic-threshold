const form = document.querySelector('form');
const errorMsg = document.querySelector('.errorMsg');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  axios.post(`${baseUrl}/users`, {
    email: form.email.value,
    password: form.password.value,
    isAdmin: false
  })
    .then(res => {
      location.href = '/login.html';
    })
    .catch(err => {
      errorMsg.textContent = err.response.data;
    });
});
