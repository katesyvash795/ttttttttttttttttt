const goToCartButton = document.querySelector(".js-go-to-cart");

goToCartButton.addEventListener("click", function () {
  window.location.href = "./index.html";
});
const container=document.querySelector(".js-list");
const PRODUCT_LS_KEY='chekout';
const products = JSON.parse(localStorage.getItem(PRODUCT_LS_KEY))||[];
function createMarkup (arr) {
    return arr.map(({ id, img, name, category, text, author, link }) => `
    <li data-id="${id}" class="js-product shopping-list-item">
        <img src="${img}" alt="${name}" width="116" height="165" class="shop-img"/> 
        <div class="shop-item-div">
            <div class="top-item-div">
                <h2 class="shopping-list-title">${name}</h2>
                <button class="js-remove" data-id="${id}">
                    <svg width="22" height="22" class="shop-icons">
                        <use href="./images/symbol-defs (4).svg#icon-trash"></use>
                    </svg>
                </button>
            </div>
            <p class="shopping-list-category">${category}</p>
            <p class="shopping-list-text">${limitWords(text, 4)}</p>
            <div class="author-icons">
                <p class="shopping-list-author">${author}</p>
                <div class="book-links">
                    ${createBookLinks(link)}
                </div>
            </div>
        </div>
    </li>
`).join("");

    
}
function createBookLinks(links) {
    return links.map(link => `<a href="${link.url}" target="_blank">${link.marketplace}</a>`).join("");
}
if (localStorage.getItem('chekout') === null) {
    // Если данных нет, выводим сообщение "Книг нет"
    const hiddenElement = document.querySelector('.is-hidden');
    hiddenElement.classList.remove('is-hidden');
} 
else {
    // Если данные уже есть в локальном хранилище, используем их
    const markup = createMarkup(products);
    container.insertAdjacentHTML('beforeend',markup);
}

// Отримати список усіх кнопок "прибрати з кошика"
var removeButtons = document.querySelectorAll(".js-remove");

// Функція для видалення об'єкта
function removeProduct(event) {
  var liElement = event.target.closest(".js-product");
  if (liElement) {
    liElement.remove();
    localStorage.removeItem('chekout');
    console.log('Данные удалены из локального хранилища.');
    updateLocalStorage(); // Оновити локальне сховище після видалення
  }
}

// Оновити локальне сховище
function updateLocalStorage() {
  var productIds = [];

  removeButtons.forEach(function (button) {
    var id = button.getAttribute("data-id");
    productIds.push(id);
  });
if (productIds.length === 0) {
    const messageElement = document.querySelector('.message');
    messageElement.classList.remove('is-hidden');
  }
  localStorage.setItem("selectedProducts", JSON.stringify(productIds));
console.log(localStorage);

}

window.addEventListener("beforeunload", function () {
    // localStorage.setItem(PRODUCT_LS_KEY, null);
    localStorage.setItem(PRODUCT_LS_KEY);
}
);




// Додати обробник події для кожної кнопки "прибрати з кошика"
removeButtons.forEach(function (button) {
  button.addEventListener("click", removeProduct);
});
function limitWords(text, limit) {
    const words = text.split(" ");
    if (words.length <= limit) {
        return text;
    } else {
        return words.slice(0, limit).join(" ") + " ...";
    }
}
