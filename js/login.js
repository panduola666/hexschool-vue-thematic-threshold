const form = document.querySelector('form');
const errorMsg = document.querySelector('.errorMsg');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  axios.post(`${baseUrl}/login`, {
    email: form.email.value,
    password: form.password.value
  })
    .then(res => {
      localStorage.setItem('token', res.data.accessToken);
      localStorage.setItem('userId', res.data.user.id);
      location.href = '/index.html';
    })
    .catch(err => {
      console.log(err);
      errorMsg.textContent = err.response.data;
    });
});
