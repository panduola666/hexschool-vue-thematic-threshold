const savedList = document.querySelector('.savedList');
renderSavedList();
savedList.addEventListener('click', (e) => {
  if (e.target.value === '已收藏') {
    axios.delete(`${baseUrl}/saved/${e.target.dataset.id}`)
      .then(() => {
        e.target.parentElement.remove();
        renderSavedList();
      });
  };
});
async function renderSavedList () {
  const res = await axios.get(`${baseUrl}/saved?_expand=article&userId=${localStorage.getItem('userId')}`);
  const text = [];
  res.data.forEach((item) => {
    text.push(`<li class="col-4 py-2 me-2 mb-3 position-relative">
      <input type="button" value="已收藏" class="btn btn-success position-absolute top-0 end-0" data-id="${item.id}">
    <img src="${item.article.pictureUrl}" alt="${item.article.title}">
    <h3 class="h3">${item.article.title}</h3>
    <p>${item.article.body}</p>
    <div class="text-end mt-2"><a href="https://panduola666.github.io/hexschool-vue-thematic-threshold/post.html?article=${item.article.id}">延伸閱讀</a></div>
  </li>`);
  });
  savedList.innerHTML = text.join('');
};
