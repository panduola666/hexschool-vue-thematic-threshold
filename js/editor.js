// const baseUrl = 'http://localhost:3000';
const baseUrl = 'https://hexschool-vue-thematic-threshold.onrender.com';
const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`
  }
};
const editorArticle = document.querySelector('.editorArticle');
axios.get(`${baseUrl}/users/${localStorage.getItem('userId')}`, config)
  .then(res => {
    if (!res.data.isAdmin) {
      location.href = 'https://panduola666.github.io/hexschool-vue-thematic-threshold/index.html';
      return;
    }
    getArticle();
    editorArticle.addEventListener('submit', (e) => {
      e.preventDefault();
      if (editorArticle.標題.value.trim() === '' || editorArticle.景點內容.value.trim() === '' || editorArticle.圖片網址.value.trim() === '') {
        alert('請完善資料');
        return;
      }
      axios.patch(`${baseUrl}/articles/${location.href.split('=')[1]}`, {
        title: editorArticle.標題.value,
        body: editorArticle.景點內容.value,
        pictureUrl: editorArticle.圖片網址.value
      })
        .then(() => {
          location.href = 'https://panduola666.github.io/hexschool-vue-thematic-threshold/admin/desk.html';
        });
    });
  });
async function getArticle () {
  const res = await axios.get(`${baseUrl}/articles/${location.href.split('=')[1]}`);
  editorArticle.標題.value = res.data.title;
  editorArticle.景點內容.value = res.data.body;
  editorArticle.圖片網址.value = res.data.pictureUrl;
};
