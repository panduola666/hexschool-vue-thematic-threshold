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
      location.href = 'https://panduola666.github.io/hexschool-vue-thematic-threshold/login.html';
    })
    .catch(err => {
      errorMsg.textContent = err.response.data;
    });
});
