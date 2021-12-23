'use strict';


'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const App = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        products: [], //массив товаров из исходника необработанный
        itemsInCart: [],
        imgCatalog: 'https://picsum.photos/200/300?random',
        imgCart: 'https://picsum.photos/100/150?random',
        userSearch: '',
        show: false,
        abc: [],
        productId: "",
        productIdRmv: "",
        productPrice: 0,
        totalPrice: 0,
        totalQuantity: 2,

    },
    methods: {
        getJson(url){                             // 3) запустить getJson и получить url из mounted
            return fetch(url)
                .then(result => result.json())    // 4) получил исходник и перевел в JS, вернул в mounted
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product){
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        this.productId = +product.id_product;
                        let find = this.itemsInCart.find(product => product.id_product === this.productId);
                        if(find){
                            find.quantity++;
                            this.calcTotalPrice();
                        }
                    } else {
                        alert('Error');
                    }
                    // if (this.itemsInCart.length == 0) {
                    //     ?????
                    // }
                })
            console.log(this.totalPrice);
        },

        removeProduct(product) {
            this.productIdRmv = +product.id_product;
            let find = this.itemsInCart.find(product => product.id_product === this.productIdRmv);
            if(find.quantity > 1){
                find.quantity--;
            } else {
                this.itemsInCart.splice(this.itemsInCart.indexOf(find), 1);
            }
            this.calcTotalPrice();
        },

        toggleClass(event) {
            event.target.nextElementSibling.classList.toggle('vsbl');

            this.calcTotalPrice();

        },
        filter() {
            console.dir(this.userSearch);
            document.querySelector(".products").classList.add('invsbl');
            document.querySelector(".searchResult__wrap").classList.remove('invsbl');
            //let nnn = "["+this.userSearch+"]"+"+";

            const REGEXP = new RegExp(this.userSearch, 'i');
            //console.log(REGEXP.test("mmTT"));
            this.abc = this.products.filter(el => REGEXP.test(el.product_name));

            if (this.abc.length === 0) {
                document.querySelector(".searchResult__text").innerHTML ='Поиск не дал результатов';
            } else {
                document.querySelector(".searchResult__text").innerHTML ='Результат поиска';
            }
        },
        calcTotalPrice() {
            this.totalPrice = 0;
            this.totalQuantity = 0;
            for (let elem of this.itemsInCart) {
                this.productPrice = +elem.price;
                console.log(this.productPrice);
                console.log(elem.quantity);
                this.totalPrice = this.totalPrice + this.productPrice*elem.quantity;
                this.totalQuantity = this.totalQuantity + elem.quantity;
            }
        }
    },
    mounted(){                                      // 1) запускается первым
        this.getJson(`${API + this.catalogUrl}`)     // 2) запустить getJson и передать url
            .then(data => {                          // 5) получил исходник в JS
                for(let el of data){                 // 6) для каждого объекта исходника
                    this.products.push(el);          //  - записать каждый в массив products
                }
            }),
            /*this.getJson(`getProducts.json`)
                .then(data => {
                    for(let el of data){
                        this.products.push(el);
                    }
                }),*/

            this.getJson(`${API + this.cartUrl}`)     // 2) запустить getJson и передать url
                .then(data => {                          // 5) получил исходник в JS
                    for(let el of data.contents){        // 6) для каждого объекта исходника
                        this.itemsInCart.push(el);          //  - записать каждый в cart
                    }
                })
    }
})

//

let regEx = /(?<=\W|^)'|'(?!\w)/g;
let str = "'We aren't actually at war.'";
let fixedStr = str.replace(regEx, '"');

console.log('Строка\n' + str);
console.log('Исправленная строка\n' + fixedStr);

send.addEventListener('click', () => {

    let regExpName = /[a-zA-ZА-Яа-яёЁ]+/g;
    let regExpPhone = /\+{1}\d{1}-{1}\d{3}-{1}\d{3}-{1}\d{2}-{1}\d{2}/g;
    let regExpMail = /\w{6}@\w{4}\.\w{2}|\w{2}\.\w{4}@\w{4}\.\w{2}|\w{2}-\w{4}@\w{4}\.\w{2}/g;

    let name = document.querySelector('#name');
    let phone = document.querySelector('#phone');
    let mail = document.querySelector('#email');

    let nameMsg = document.querySelector('#name-message');
    let phoneMsg = document.querySelector('#phone-message');
    let mailMsg = document.querySelector('#email-message');

    name.style.outline = "none";
    phone.style.outline = "none";
    mail.style.outline = "none";

    nameMsg.textContent = "";
    phoneMsg.textContent = "";
    mailMsg.textContent = "";


    let nameText = name.value;
    let phoneText = phone.value;
    let mailText = mail.value;

    if(!regExpName.test(nameText)) {
        name.style.outline = "1px solid red";
        nameMsg.textContent = "Имя должно содержать только буквы";
    }

    if(!regExpPhone.test(phoneText)) {
        phone.style.outline = "1px solid red";
        phoneMsg.textContent = "Телефон должен быть в формате +7-999-999-99-99";
    }

    if(!regExpMail.test(mailText)) {
        mail.style.outline = "1px solid red";
        mailMsg.textContent = "E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru или my-mail@mail.ru.";
    }
});

// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };
//
// class ProductsList {
//     constructor(container = '.products'){
//         this.container = container;
//         this.goods = [];//массив товаров из JSON документа
//         this._getProducts()
//             .then(data => { //data - объект js
//                 this.goods = data;
// //                 console.log(data);
//                 this.render()
//             });
//     }


// _fetchProducts(cb){
//     getRequest(`${API}/catalogData.json`, (data) => {
//         this.goods = JSON.parse(data);
//         console.log(this.goods);
//         cb();
//     })
// }
//
//     _getProducts(){
//
//         return fetch(`${API}/catalogData.json`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             });
//
//     }
//     calcSum(){
//         return this.allProducts.reduce((accum, item) => accum += item.price, 0);
//     }
//     render(){
//         const block = document.querySelector(this.container);
//         for (let product of this.goods){
//             const productObj = new ProductItem(product);
// //            this.allProducts.push(productObj);
//             block.insertAdjacentHTML('beforeend', productObj.render());
//         }
//
//     }
// }
//
// class ProductItem{
//     constructor(product, img='img/no_image.svg'){
//         this.id = product.id;
//         // this.title = product.title;
//         this.title = product.product_name;
//         this.price = product.price;
//         // this.img = img;
//         this.img = product.img;
//
//         // $img = this.img;
//         // // Если картинки нет или её размер подозрительно маленький.
//         // if (!file_exists($img) || filesize($img) < 512) {
//         //     // Перезаписываем переменную, путь картинки — заглушки.
//         //     this.img = img;
//         //     // $img = 'img/no_image.svg';
//         // }
//
//     }
//
//     render(){
//         return `<div class="product-item">
// <!--                        // <img class="item__img" src="${this.img} onError="this.src='img/no_image.svg'"">-->
//                         <img class="item__img" src='img/no_image.svg'>
//                         <h3 class="item__title">${this.title}</h3>
//                            <div class="product__text">
//                                 <p class="product__price">${this.price}</p>
// <!--                                <p class="item__price">${this.price}</p>-->
//                                 <button class="buy-btn">Купить</button>
//                             </div>
//                     <br>
//                 <div>`
//
//     }
// }
//
// let list = new ProductsList();
//
// console.log(list.allProducts);
//
//
// //-----------------------------------//
//
// class backet {
//     constructor(container = '.cart-block') {
//         this.container = container;
//         this.goods = [];
//
//         this._clickBasket();
//         this._getBasketItem();
//             .then(data => {
//                 this.goods = data.contents;
//                 this.render();
//         });
//     }
//
//     _getBasketItem() {
//         return fetch(`$API{}/getBasket.json`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             })
//     }
//
//     render() {
//         const block = document.querySelector((this.container));
//         for (let product of this.goods) {
//             const productObj = new BasketItem();
//
//             block.insertAdjacentElement('beforeend', productObj.render(product));
//         }
//     }
//
//     _clickBasket() {
//         document.querySelector(".btn-cart").addEventListener('click', () => {
//             document.querySelector(this.container).classList.toggle('invisible');
//         });
//     }
// }
//
// class BasketItem {
//
//     render(product, img = 'https://via.placeholder.com/50x50') {
//         return `<div class = "cart-item" data-id="${product.id_product}">
//                 <div class = "product-bio">
//
//                 </div>
//                 </div>
//         `
//     }
//
// }
//
//
//




//-----------------------------------//
// class ProductList{
//     constructor(container='.products'){
//         this.container = container;
//         this.goods = [];
//         this._fetchProducts();
//         this.render();
//         this.sumAllPrices();
//     }
//     _fetchProducts() {
//         this.goods = [
//             { id: 1, title: 'Выразительный JavaScript. Современное веб-программирование', price: 699, img: 'img/shop/JS_3rd_.jpg' },
//             { id: 2, title: 'Javascript и jQuery. Интерактивная веб-разработка', price: 499, img: 'img/shop/JS_JS_jQuery_.jpg' },
//             { id: 3, title: 'Разработка одностраничных веб-приложений', price: 639, img: 'img/shop/JS_Landing.jpg' },
//             { id: 4, title: 'JavaScript. Освой на примерах', price: 135, img: 'img/shop/JS_Viktor-Vahturov.jpg' },
//             { id: 5, title: 'Создаем динамические веб-сайты с помощью PHP, MySQL, JavaScript, CSS и HTML5 ', price: 1190, img: 'img/shop/JS_ORelly_.jpg' },
//             { id: 6, title: 'Карта развития JavaScript разработчика'},];
//     }
//
//     render(){
//         const block = document.querySelector(this.container);
//         for(let product of this.goods){
//             const item = new ProductItem(product);
//             block.insertAdjacentHTML("beforeend",item.render());
//         }
//     }
//
//     sumAllPrices() {
//         let sum = 0;
//         for (let product of this.goods) {
//             sum += product.price;
//         }
//         console.log(`Итого к оплате: ${sum}`);
//     }
// }
//
// class ProductItem{
//     constructor(product, img='img/no_image.svg'){
//         this.id = product.id;
//         this.title = product.title;
//         this.price = product.price;
//         this.img = product.img;
//     }
//
//     render(){
//         return `<div class="product-item">
//                         <img class="item__img" src="${this.img}">
//                         <h3 class="item__title">${this.title}</h3>
//                            <div class="product__text">
// <!--                                <p class="product__price">${this.price}</p>-->
//                                 <p class="item__price">${this.price}</p>
//                                 <button class="buy-btn">Купить</button>
//                             </div>
//                     <br>
//                 <div>
// </div>`
//     }
// }
//
// let list = new ProductList();
//
// class Cart {
//     constructor() {}
//     render() {}
//     addProduct() {}
//     removeProduct() {}
//     cartPrice() {}
// }
// //класс элемента корзины товаров
// class CartItem {
//     constructor() {}
//     render() {}
// }
//
//
// //EX2
// // 1. Добавьте пустые классы для корзины товаров и элемента корзины товаров. Продумайте, какие методы понадобятся для работы с этими сущностями.
// // 2. Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.
// // 3. *Некая сеть фастфуда предлагает несколько видов гамбургеров:
// // ### Маленький (50 рублей, 20 калорий).
// // ### Большой (100 рублей, 40 калорий). ### Гамбургер может быть с одним из нескольких видов начинок (обязательно):
// // ### С сыром (+10 рублей, +20 калорий).
// // ### С салатом (+20 рублей, +5 калорий).
// // ### С картофелем (+15 рублей, +10 калорий).
// // ### Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и полить майонезом (+20 рублей, +5 калорий).
//
//
//
// //
// //
// // //БД
// // const products = [
// //     { id: 1,  price: 'Выразительный JavaScript. Современное веб-программирование', price: 699, image: 'img/shop/JS_3rd_.jpg' },
// //     { id: 2, title: 'Javascript и jQuery. Интерактивная веб-разработка', price: 499, image: 'img/shop/JS_JS_jQuery_.jpg' },
// //     { id: 3, title: 'Разработка одностраничных веб-приложений', price: 639, image: 'img/shop/JS_Landing.jpg' },
// //     { id: 4, title: 'JavaScript. Освой на примерах', price: 135, image: 'img/shop/JS_Viktor-Vahturov.jpg' },
// //     { id: 5, title: 'Создаем динамические веб-сайты с помощью PHP, MySQL, JavaScript, CSS и HTML5 ', price: 1190, image: 'img/shop/JS_ORelly_.jpg' },
// //     { id: 6, title: 'Карта развития JavaScript разработчика'},
// // ];
// //
// // const renderProduct = (object) => {
// //     let product = new Product(object.title, object.price, object.image);
// //     return product.createHTML();
// // };
// //
// // class Product {
// //     constructor(title = 'Product', price = 0, image = 'img/no_image.svg'){
// //         //Название товара
// //         this.title = title;
// //         //Цена товара
// //         this.price = price;
// //         //Ссылка на изображение
// //         this.image = image;
// //     }
// //     createHTML(){
// //        return `<div class="product-item"><img class="item__img" src="${this.image}"><h3 class="item__title">${this.title}</h3><p class="item__price">${this.price}</p><button class="buy-btn">Купить</button></div>`;
// //     }
// // }
// //
// // const renderPage = list => {
// //     const productsList = list.map(item => renderProduct(item)).join('');
// //     console.log(productsList);
// //     document.querySelector('.products').innerHTML = productsList;
// // };
// //
// // //рендер товара
// // renderPage(products);
//
