'use strict';

export default {
    props:['book'],
    computed:{
        currencyIconToShow(){
            let currencyIcon = '';
            switch (this.book.listPrice.currencyCode) {
                case 'ILS':
                    currencyIcon = '₪'
                    break;
                case 'USD':
                    currencyIcon = '$'
                    break;
                case 'EUR':
                    currencyIcon = '€'
                    break;
            }

            return currencyIcon
        },
        bookAge(){
            return  ((new Date().getFullYear() - this.book.publishedDate) > 10)? 'Veteran Book' :
                    ((new Date().getFullYear() - this.book.publishedDate) < 1)? 'New!': null;
        }
    },
    template:`
        <div class="book-preview">
            <img :src="book.thumbnail" alt="">
            <div class="preview-details">
                <h2>{{book.title}}</h2>
                <h3><span class="curr-icon">{{currencyIconToShow}}</span>{{book.listPrice.amount}}</h3>
                <h3 class="book=age-tag" v-if="bookAge">{{bookAge}}</h3>
            </div>
        </div>
    `

}