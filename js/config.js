// const baseUrl = 'http://localhost:3000';
const baseUrl = 'https://hexschool-vue-thematic-threshold.vercel.app';
const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`
  }
};
const logged = document.querySelector('.logged');
if (localStorage.getItem('userId')) {
  logged.style.display = 'flex';
  logged.previousElementSibling.style.display = 'none';
  axios.get(`${baseUrl}/600/users/${localStorage.getItem('userId')}`, config)
    .then(res => {
      if (res.data.isAdmin) logged.children[0].style.display = 'block';
    })
    .catch(() => {
      alert('登入超時');
      localStorage.clear();
    });
};

logged.addEventListener('click', (e) => {
  if (e.target.textContent === '前往後臺') location.href = '/admin/desk.html';
  if (e.target.textContent === '收藏列表') location.href = '/bookmarks.html';
  if (e.target.textContent === '登出') {
    localStorage.clear();
    logged.style.display = 'none';
    logged.previousElementSibling.style.display = 'block';
  };
});
