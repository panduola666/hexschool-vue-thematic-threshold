const viewList = document.querySelector('.viewList');
renderViewList();
async function renderViewList () {
  const res = await axios.get(`${baseUrl}/articles`);
  const text = [];
  res.data.forEach((item) => {
    text.push(`<li class="col-4 py-2 me-2 mb-3" data-id="${item.id}">
    <div  class="text-end">
        <a href="./post.html?article=${item.id}">延伸閱讀</a>
    </div>
    <h3 class="h3">${item.title}</h3>
    <p>${item.body}</p>
    </li>`);
  });
  viewList.innerHTML = text.join('');
}
