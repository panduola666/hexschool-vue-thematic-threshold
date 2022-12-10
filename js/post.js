const saveArticle = document.querySelector('.saveArticle');
const articleBody = document.querySelector('.articleBody');
renderArticleBody();
if (localStorage.getItem('userId')) {
  saveArticle.style.display = 'block';
  renderSaved();
  savedChange();
}
async function renderArticleBody () {
  const res = await axios.get(`${baseUrl}/articles/${location.href.split('=')[1]}`);
  articleBody.innerHTML = JSON.stringify(res.data).replace(/,/g, ',<br>');
};
async function renderSaved () {
  const res = await axios.get(`${baseUrl}/users/${localStorage.getItem('userId')}?_embed=saved`);
  res.data.saved.forEach(item => {
    if (item.articleId === Number(location.href.split('=')[1])) {
      saveArticle.children[0].value = '取消收藏';
      saveArticle.children[1].textContent = '已收藏';
    };
  });
};

function savedChange () {
  saveArticle.addEventListener('click', async (e) => {
    if (e.target.nodeName === 'INPUT') {
      if (e.target.value === '加入收藏') {
        console.log('1');
        await axios.post(`${baseUrl}/saved`, {
          userId: Number(localStorage.getItem('userId')),
          articleId: Number(location.href.split('=')[1])
        });
        e.target.nextElementSibling.textContent = '已收藏';
        e.target.value = '取消收藏';
      } else {
        const res = await axios.get(`${baseUrl}/articles/${location.href.split('=')[1]}?_embed=saved`);
        const id = res.data.saved.filter(item => item.userId === Number(localStorage.getItem('userId')))[0].id;
        await axios.delete(`${baseUrl}/saved/${id}`);
        e.target.nextElementSibling.textContent = '未收藏';
        e.target.value = '加入收藏';
      };
    };
  });
};
