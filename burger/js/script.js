"use strict";

class Burger {
    constructor(container = '.container', burgerSize = '.burger__size', burgerFilling = '.burger__filling', burgerAdditional = '.burger__additional') {
        this.container = container;
        this.burgerSize = burgerSize;
        this.burgerFilling = burgerFilling;
        this.burgerAdditional = burgerAdditional;
        this.main();
    }

    main() {
        let checkProduct = new PresenceObjcet();
        let container = document.querySelector(this.container);
        let burgerSize = document.querySelector(this.burgerSize);
        let burgerFilling = document.querySelector(this.burgerFilling);
        let burgerAdditional = document.querySelector(this.burgerAdditional);
        container.addEventListener('click', function (e) {
            let target = e.target;
            if (e.target.classList[0] == 'size__label' && burgerSize.contains(target)) {
                new Frontend(target);
                if (checkProduct.addArr(target.dataset)) {
                    new Calculate(target.dataset, 'add');
                }
            }
            if (e.target.classList[0] == 'filling__label' && burgerFilling.contains(target)) {
                new Frontend(target);
                if (checkProduct.addArr(target.dataset)) {
                    new Calculate(target.dataset, 'add');
                }
            }
            if (e.target.classList[0] == 'additional__label' && burgerAdditional.contains(target)) {
                new AdvancedFronted(target);
                if (checkProduct.addArr(target.dataset)) {
                    new Calculate(target.dataset, 'add');
                }
            }
        })
    }
}
class Calculate {
    constructor(dataParam, scenario, summLink = '.summ__number', caloriesLink = '.calories__number') {
        this.scenario = scenario;
        this.summLink = summLink;
        this.caloriesLink = caloriesLink;
        this.dataParam = dataParam;
        this.object = {};
        this._dataObject();
        this.calc();
    }
    _dataObject() {
        this.object = {
            price: this.dataParam.price,
            calories: this.dataParam.calories,
            type: this.dataParam.type
        };
        return this.object;
    }
    calc() {
        if (this.scenario == 'add') {
            let sumNumber = document.querySelector(this.summLink);
            let caloriesNumber = document.querySelector(this.caloriesLink);

            let sumNum = Number(this._dataObject().price) + Number(sumNumber.innerHTML);
            let caloriesNum = Number(this._dataObject().calories) + Number(caloriesNumber.innerHTML);

            sumNumber.innerHTML = sumNum;
            caloriesNumber.innerHTML = caloriesNum;
        }
        if (this.scenario == 'delete') {
            let sumNumber = document.querySelector(this.summLink);
            let caloriesNumber = document.querySelector(this.caloriesLink);
            sumNumber.innerHTML = Number(sumNumber.innerHTML) - Number(this._dataObject().price);
            caloriesNumber.innerHTML = Number(caloriesNumber.innerHTML) - Number(this._dataObject().calories);
        }
    }
}

class PresenceObjcet {
    constructor() {
        this.arr = [];
    }
    addArr(object) {
        if (!this.arr.includes(object.type)) {
            this.arr.push(object.type);
            return Boolean(true);
        }
        if (this.arr.includes(object.type)) {
            let index = this.arr.indexOf(object.type);
            this.arr.splice(index, 1);
            new Calculate(object, 'delete');
            return Boolean(false);
        }

    }

}

class Frontend {
    constructor(object) {
        this.object = object;
        this.disableBlock();
        this.state = '';
    }

    disableBlock() {
        const parentNode = this.object.parentNode.children;
        this.object.classList.toggle('active');
        for (let i = 0; i < this.object.classList.length; i++) {
            if (this.object.classList[i] == 'active') {
                this.state = 'add';
                console.log(this.state);
            } else {
                this.state = 'delete';
                console.log(this.state);
            }
        }

        if (this.state == 'add') {
            for (let i = 0; i < parentNode.length; i++) {
                console.log(parentNode[i].classList);
                if (parentNode[i] != this.object) {
                    parentNode[i].classList.toggle('block');
                    parentNode[i].setAttribute('disabled', '');
                }
            }
        } else if (this.state == 'delete') {

            for (let i = 0; i < parentNode.length; i++) {
                console.log(parentNode[i].classList);

                if (parentNode[i] != this.object) {
                    parentNode[i].classList.toggle('block');
                    parentNode[i].removeAttribute('disabled');
                }
            }
        }

    }
}

class AdvancedFronted{
    constructor(object) {
        this.object = object;
        this.activeButton();
    }
    activeButton(){
        this.object.classList.toggle('active');
    }
}

new Burger();