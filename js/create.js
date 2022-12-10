// const baseUrl = 'http://localhost:3000';
const baseUrl = 'https://hexschool-vue-thematic-threshold.onrender.com';
const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`
  }
};
const createArticle = document.querySelector('.createArticle');
axios.get(`${baseUrl}/users/${localStorage.getItem('userId')}`, config)
  .then(res => {
    if (!res.data.isAdmin) {
      location.href = '/';
      return;
    }
    createArticle.addEventListener('submit', (e) => {
      e.preventDefault();
      if (createArticle.標題.value.trim() === '' || createArticle.景點內容.value.trim() === '' || createArticle.圖片網址.value.trim() === '') {
        alert('請完善資料');
        return;
      }
      axios.post(`${baseUrl}/articles`, {
        title: createArticle.標題.value,
        body: createArticle.景點內容.value,
        userId: Number(localStorage.getItem('userId')),
        pictureUrl: createArticle.圖片網址.value
      })
        .then(() => {
          location.href = '/admin/desk.html';
        });
    });
  });
