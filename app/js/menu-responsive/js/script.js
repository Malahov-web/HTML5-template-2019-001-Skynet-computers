/*

Алгоритм

    проверяет умещаются ли пункты в контейнере
    проверка при ините и при ресайзе

Проверка
    Получить длинну контейнера
    Получить всех прямых детей children
    Посчитать их длинну


Проверка v2
    Получить длинну контейнера  
    Перебирать элемент списка:
        если общая длинна элементов больше дл контейнера
            Переместить в дропдаун()
            выход;

// TODO  далее
пенерести элемент в createDropdown()
ключ: "js Как перенести элемент DOM"


v3

Поменять логику работы:

Оперируем следующими данными
    элементы в меню
    элементы в дропдауне

При проверке выполнять перенос в ту или другую сторону


*/
class menuResponsive {


    constructor(options) {
        this.elemSelector = options.element;
        this.elem = document.querySelector(this.elemSelector);
        this.elemWidth = this.elem.clientWidth;
        console.log(this.elemWidth);
        this.itemsToMove = [];

        // const
        // let DROPDOWN = 'dropdown';
    }


    initMenu() {

        

    }

    checkWidth(context) {

        this.elemWidth = this.elem.clientWidth;
        // let cont = context
        // console.log(this.elem);
        console.log(this.elemWidth);
        // console.log(context.elemWidth);
        // console.log(context.elem);
        // console.log(context);
        // console.log(this);


        let items = this.elem.children;        // console.log(items);
        let itemsWidth = 0;
        for (let i = 0; i < items.length; i++) {

            // Things[i]
            console.log(items[i]); console.log(items[i].offsetWidth);
            itemsWidth += items[i].offsetWidth;

            if (itemsWidth > this.elemWidth) {
                // moveItemToDropdown
                // this.hideItem(items[i]);
                // this.itemsToMove.push(i);
                this.itemsToMove.push(items[i]);
            }

        }

        if ( this.itemsToMove.length > 0 ) {
            this.moveItemsToDropdown(this.itemsToMove);
        }



    }

    createDropdown(item) {
        console.log(this.elem); 
        console.log(item); 

        if ( !document.body.querySelector('.dropdown') )  { 
            // console.log('dropDown' + ' еще не существует');
            this.dropDown = document.createElement('div');
            this.dropDown.classList.add('dropdown');
            document.body.appendChild(this.dropDown);

            this.dropDownList = document.createElement('ul');
            this.dropDown.appendChild(this.dropDownList);
        } 

        // this.dropDownList.appendChild(item);




    }

    hideItem(item) {

        setTimeout(this.createDropdown, 100, item);
        // this.createDropdown(item);
    }

    moveItemsToDropdown(itemsIndexes) {
        this.createDropdown();

        // move items
        for (let i = 0; i < itemsIndexes.length; i++) {
            
            console.log(itemsIndexes[i]); // RIGHT  -  номера (инжексы пунктов  меню, которые не поместились)
            this.dropDownList.appendChild(itemsIndexes[i]);
            // this.dropDownList.prependChild(itemsIndexes[i]);  // TypeError: this.dropDownList.prependChild is not a function

        }

        // move dropdown
        // this.elem.appendChild(this.dropDown);
        document.querySelector('.header-bottom')
            .appendChild(this.dropDown);
    }

    start() {
        // console.log(this.elem.classList);  //  Работает
        this.elem.classList.add('js-menu-responsive');


        // document.addEventListener('click', this.checkWidth.bind(this));
        // document.body.addEventListener('resize', this.checkWidth.bind(this));
        window.addEventListener('resize', this.checkWidth.bind(this));



/*
        this._render();
        this._element.querySelector('.menu__title')
    .addEventListener('click', this._eventToggle.bind(this));
  */      
    }



}



