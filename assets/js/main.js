import { getApi } from "../../utils/method.js";

const url = "../../data/Data.json";

const renderMenu = (data) => {
  const listMenu = data["navPills"];
  const menuTab = document.querySelector("#menu-tab");
  let stringHtml = "";

  listMenu.forEach((menu, index) => {
    stringHtml += `
    <li class="nav-item" role="presentation">
        <button class="nav-link w-100 ${index === 0 ? "active" : ""}" id="nav${
      menu.type
    }" data-toggle="pill" data-target="#tab${
      menu.type
    }" type="button" role="tab" aria-controls="tab${
      menu.type
    }" aria-selected="true">${menu.showName}</button>
    </li>`;
  });

  menuTab.innerHTML = stringHtml;
};

const renderTabMenu = (data) => {
  const listMenuContent = data["tabPanes"];
  const menuTabContent = document.querySelector("#menu-tabContent");
  let stringHtml = "";
  let listType = [];

  listMenuContent.map((menu) => {
    if (!listType[menu.type]) {
      listType[menu.type] = [];
    }
    listType[menu.type].push(menu);
  });

  for (const key in listType) {
    stringHtml += `
    <div
        class="tab-pane fade ${key === "topclothes" ? "show active" : ""}"
        id="tab${key}"
        role="tabpanel"
        aria-labelledby="nav${key}">
        ${rederContentTab(listType[key])}
    </div>
    `;
  }
  menuTabContent.innerHTML = stringHtml;
};

const rederContentTab = (arr) => {
  let stringHtml = "";
  arr.forEach((item) => {
    stringHtml += `
        <div class="card" style="width: calc(100% / 3);">
  <img src="${item.imgSrc_jpg}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${item.name}</h5>
    <button  onclick="itemClick('${item.imgSrc_png}', '${item.type}')" class="btn btn-primary w-100">Thử đồ</button>
  </div>
</div>
    `;
  });

  return `<div class="w-100 d-flex flex-wrap">${stringHtml}</div>`;
};

window.itemClick = (img, type) => {
  switch (type) {
    case "topclothes":
      document.querySelector(".bikinitop").style.cssText = `
        background: url('${img}');
        background-repeat: no-repeat;
        background-size: contain;

      `;
      break;
    case "botclothes":
      document.querySelector(".bikinibottom").style.cssText = `
        background: url('${img}');
        background-repeat: no-repeat;
        background-size: contain;
      `;
      break;
    case "shoes":
      document.querySelector(".feet").style.cssText = `
        background-image: url('${img}');
      `;
      break;
    case "handbags":
      document.querySelector(".handbag").style.cssText = `
        background-image: url('${img}');
      `;
      break;
    case "necklaces":
      document.querySelector(".necklace").style.cssText = `
        background-image: url('${img}');
      `;
      break;
    case "hairstyle":
      document.querySelector(".hairstyle").style.cssText = `
        background-image: url('${img}');
      `;
      break;
    case "background":
      document.querySelector(".background").style.cssText = `
        background-image: url('${img}');
      `;
      break;
    default:
      break;
  }
};

const getData = async (url) => {
  const data = await getApi(url);
  renderMenu(data);
  renderTabMenu(data);
};

getData(url);
