// const baseUrl = 'http://localhost:3000';
const baseUrl = 'https://hexschool-vue-thematic-threshold.onrender.com';
const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`
  }
};
const tbody = document.querySelector('.allArticlesBody');
axios.get(`${baseUrl}/users/${localStorage.getItem('userId')}`, config)
  .then(res => {
    if (!res.data.isAdmin) {
      location.href = '/';
      return;
    }
    renderTbody();
    // 刪除
    tbody.addEventListener('click', (e) => {
      if (e.target.value === '刪除') {
        axios.delete(`${baseUrl}/articles/${e.target.dataset.id}`)
          .then(() => {
            renderTbody();
            return axios.get(`${baseUrl}/saved?articleId=${e.target.dataset.id}`);
          })
          .then(res => {
            res.data.forEach(item => {
              axios.delete(`${baseUrl}/saved/${item.id}`);
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  });

async function renderTbody () {
  const articles = await axios.get(`${baseUrl}/articles`);
  const text = [];
  articles.data.forEach(item => {
    text.push(`<tr class="border-bottom">
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td>${item.body}</td>
        <td>
            <input type="button" value="刪除" class="btn btn-outline-danger" data-id="${item.id}">
            <a href="./editor.html?id=${item.id}" class="btn btn-warning">編輯</a>
        </td>
    </tr>`);
  });
  tbody.innerHTML = text.join('');
};
