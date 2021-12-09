'use strict';
//БД
const products = [
    { id: 1,  price: 'Выразительный JavaScript. Современное веб-программирование', price: 699, image: 'img/shop/JS_3rd_.jpg' },
    { id: 2, title: 'Javascript и jQuery. Интерактивная веб-разработка', price: 499, image: 'img/shop/JS_JS_jQuery_.jpg' },
    { id: 3, title: 'Разработка одностраничных веб-приложений', price: 639, image: 'img/shop/JS_Landing.jpg' },
    { id: 4, title: 'JavaScript. Освой на примерах', price: 135, image: 'img/shop/JS_Viktor-Vahturov.jpg' },
    { id: 5, title: 'Создаем динамические веб-сайты с помощью PHP, MySQL, JavaScript, CSS и HTML5 ', price: 1190, image: 'img/shop/JS_ORelly_.jpg' },
    { id: 6, title: 'Карта развития JavaScript разработчика'},
];

const renderProduct = (object) => {
    let product = new Product(object.title, object.price, object.image);
    return product.createHTML();
};

class Product {
    constructor(title = 'Product', price = 0, image = 'img/no_image.svg'){
        //Название товара
        this.title = title;
        //Цена товара
        this.price = price;
        //Ссылка на изображение
        this.image = image;
    }
    createHTML(){
       return `<div class="product-item"><img class="item__img" src="${this.image}"><h3 class="item__title">${this.title}</h3><p class="item__price">${this.price}</p><button class="buy-btn">Купить</button></div>`;
    }
}

const renderPage = list => {
    const productsList = list.map(item => renderProduct(item)).join('');
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList;
};

//рендер товара
renderPage(products);