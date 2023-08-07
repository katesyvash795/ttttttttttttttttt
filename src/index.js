const goToCartButton = document.querySelector(".js-go-to-cart");

goToCartButton.addEventListener("click", function () {
  window.location.href = "./chekout.html";
});

const i = [
    {
        id: 1,
        img: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8fDA%3D&w=1000&q=80",
        name: "photo",
        category: "photo",
        text: "  ghjelghjkrelglghlkqhrlqh glqrhgjlrelqghlq eghkjqehjgl.jpggjghsjdskdfjdkfjrlgkw rlhglkejrhgrekjghkgh,r jhgrkjghrkghjrlqghrq lgjhrqlehjqlgreghjre ghjelghjkrelglghlkqhrlqh glqrhgjlrelqghlq eghkjqehjgl.jpg",
        author: "authot",
        link: [
            { url1: "https://example.com/book1", marketplace: "Т" },
            { url2: "https://example.com/book2", marketplace: "Т" },
            { url3: "https://example.com/book3", marketplace: "Т" }
        ]
    },
    {
        id: 2,
        img: "https://34travel.me/media/upload/images/2020/MAY/arch2020/1.jpg",
        name: "photo",
        category: "photo",
        text: " lg jhrql ehjqlg reghjre ghje lghjkrelg lghlkq hrlqh glqrhgjl relqghlq eghkjqe hjgl.jpggjg hsjdskdfj dkfjrlgkw rlhg lkejrhgrek jghkgh,r jhgrk jghrkghjrlqghrq lgjhr qlehjqlgreghjr e ghjelghjkr elglghlkqhrlqh glqrhgjlrel qghlq eghkjqehjgl.jpggj ghsjdskdfjdkfjrlgkw rlhglkejrhgrekjghkgh,r jhgrkjghrkghjrlqghrq lgjhrqlehjqlgreghjre ghjelghjkrelglghlkqhrlqh glqrhgjlrelqghlq eghkjqehjgl.jpg",
        author: "authot",
        link: [
            { url1: "https://example.com/book1", marketplace: "Т" },
            { url2: "https://example.com/book2", marketplace: "Т" },
            { url3: "https://example.com/book3", marketplace: "Т" }
        ]
    },
    {
        id: 3,
        img: "https://img.freepik.com/free-photo/lavender-field-at-sunset-near-valensole_268835-3910.jpg",
        name: "photo",
        category: "photo",
        text: "jhgrkjghrkghjrlqghrq lgjhrqlehjqlgreghjre ghjelghjkrelglghlkqhrlqh glqrhgjlrelqghlq eghkjqehjgl.jpg",
        author: "authot",
        link: [
            { url1: "https://example.com/book1", marketplace: "b" },
            { url2: "https://example.com/book2", marketplace: "Т" },
            { url3: "https://example.com/book3", marketplace: "Т" }
        ]
    },
];
const container =document.querySelector('.js-list');
const PRODUCT_LS_KEY ='chekout';
function createMarkup(arr) {
    return arr.map(({ id, img, name, category, text, author, link }) => `
        <li data-id="${id}" class="js-product">
            <img src="${img}" alt="${name}" width="100"/>
            <h2>${name}</h2>
            <p>${category}</p>
            <p>${text}</p>
            <p>${author}</p>
            <div class="book-links">
                ${createBookLinks(link)}
            </div>
            <button class="js-add" data-id="${id}">Додати до кошика</button>
        </li>
    `).join("");
}

function createBookLinks(links) {
    return links.map(link => `<a href="${link.url}" target="_blank">${link.marketplace}</a>`).join("");
}
const markup = createMarkup(i);
container.insertAdjacentHTML('beforeend',markup);
container.addEventListener('click',handlerAdd);

function handlerAdd(evt){
    if(!evt.target.classList.contains('js-add')){
        return;
    }
    const products=JSON.parse(localStorage.getItem(PRODUCT_LS_KEY))??[];
    
    const product =evt.target.closest('.js-product');
    const productId=Number(product.dataset.id);
    const currentProduct=i.find(({id})=>id===productId);
    // const isInBasket= products.some(({id})=>id===productId);
    console.log(currentProduct);
    products.push(currentProduct);
    localStorage.setItem(PRODUCT_LS_KEY,JSON.stringify(products))
}

