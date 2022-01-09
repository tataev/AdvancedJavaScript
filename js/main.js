let $1 = $(function(){
    $('.banner-section__slider').slick({
        dots:true,
        prevArrow: '<button class="banner-section__slider-btn banner-section__slider-btnprev"><img src="images/arrow-left.svg" alt="arrow-left"></button>',
        nextArrow: '<button class="banner-section__slider-btn banner-section__slider-btnnext"><img src="images/arrow-right.svg" alt="arrow-right"></button>',
    });
    // $('.search__tabs-item').on('click', function (e){
    $('.tab').on('click', function (e){
        //отключает стандартные ссылки
        e.preventDefault();
        // $('.search__tabs-item').removeClass('search__tabs-item--active');
        // search__tabs-item -> tab | remove search__tabs-item--active -> tab--active
        $('.tab').removeClass('tab--active');
        // $('.search__content-item').removeClass('search__content-item--active');
        // search__content-item--active ->tabs__content
        $('.tabs__content').removeClass('tabs__content--active');
        // $(this).addClass('search__content-item');
        // search__content-item -> tab--active
        $(this).addClass('tab--active');
        // search__content-item--active - > tabs__content--active
        $($(this).attr('href')).addClass('tabs__content--active');
// $('#tab-1')
    });
                                                                                                                                                                +
    $('.product-item__favorite').on('click', function(){
       $('.product-item__favorite').toggleClass('product-item__favorite--active');
    });

    $('.product-slider').slick({
        dots:true,
        prevArrow: '<button class="product-slider__item banner-section__slider-btnprev"><img src="images/arrow-left.svg" alt="arrow-left"></button>',
        nextArrow: '<button class="product-slider__item banner-section__slider-btnnext"><img src="images/arrow-right.svg" alt="arrow-right"></button>',
    });
});




/*таблица изменений */
/*search__tabs-item -> tab*/



