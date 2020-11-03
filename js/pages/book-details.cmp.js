'use strict';

import {booksService} from '../services/book-service.js'
import addReview from "../cmp/review-add.cmp.js";
import showReviews from "../cmp/show-reviews.cmp.js";
import { eventBus } from '../services/eventBus-service.js';

export default {
    data(){
        return {
            bookId: '',
            book: null,
            showAddReview: false,
            reviews: []
        }
    },
    computed: {
        currencyIconToShow() {
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
        bookLength(){
            return  (this.book.pageCount > 500)? 'Long reading' :
                    (this.book.pageCount > 200)? 'Decent Reading' :
                    (this.book.pageCount < 100)? 'Light Reading': 'Normal reading';
        },
        bookAge(){
            return  ((new Date().getFullYear() - this.book.publishedDate) > 10)? 'Veteran Book' :
                    ((new Date().getFullYear() - this.book.publishedDate) < 1)? 'New!': null;
        }
    },
    methods:{
        loadBookReviews(){
            booksService.getBookReviews(this.bookId).then(revs => {
                this.reviews = revs
                console.log('reviews',revs);
                console.log('this.reviews',this.reviews);
                
            })
        },
        addReview(reviewToAdd){
            console.log('reviewToAdd', reviewToAdd);
            
            booksService.addReview(this.bookId, reviewToAdd)
            .then(bookReviews => {
                console.log('Add review to book id:',this.bookId)
                this.reviews = bookReviews;
                eventBus.$emit('user-msg',{txt:'Add review', type:'success'})
            })
            .catch(err => {
                console.log('ERR', err);
                eventBus.$emit('user-msg',{txt:'Not saved - system problem', type:'alert'})
                
            })
        },
        deleteReview(reviewIdx){
            booksService.deleteReview(this.bookId, reviewIdx);
            eventBus.$emit('user-msg',{txt:'Delete review', type: 'success'})
        }
    },
    created() {
        console.log('this.$route',this.$route);
        this.bookId = this.$route.params.bookId

        this.loadBookReviews()

        booksService.getById(this.bookId)
            .then(book => {this.book = book; 
                console.log('this.book', this.book)
            })
        
        
    },
    components:{
        addReview,
        showReviews
    },
    template: `
        <section class="book-details" v-if="book">
            <div class="details-container">   

                <div class="details-header">
                    <h2>{{book.title}}</h2>
                    <h3>{{book.subtitle}}</h3>
                    <h2>
                        author: 
                        <span class="in-details-author-list" v-for="author in book.authors" :key="author">{{author}}</span>
                    </h2>
                </div>
                <div>
                    <h3 class="book=age-tag" v-if="bookAge">{{bookAge}}</h3>
                    <h3>published: {{book.publishedDate}}</h3>
                    <h3>length: {{bookLength}}</h3>
                    <h3>language: {{book.language}}</h3>
                </div>
                <p>description: {{book.description}}</p>
            </div>
            <div class="details-column2">
                <button class="btn-close" @click="$router.push('/book')">&times;</button>
                <img :src="book.thumbnail" alt="">
                <div>
                    <h3 class="bookPrice" :class="(book.listPrice.amount > 150)? 'red':(book.listPrice.amount < 20)? 'green': '' "><span class="curr-icon"  >Price: {{currencyIconToShow}}</span>{{book.listPrice.amount}}</h3>
                    <h3 class="sale-tag" v-if="book.listPrice.isOnSale">Sale</h3>
                </div>
                <h3>
                    Categories: 
                </h3>
                    <p class="in-details-tag-list" v-for="tag in book.categories" :key="tag">{{tag}}</p>
                <h6 class="catalog-id">
                    Catalog ID: {{book.id}}
                </h6>
            </div>
            <div class="btn-add-review-container">    
                <button @click="showAddReview = !showAddReview">Add review</button>
            </div>
            <add-review v-if="showAddReview" @addReview="addReview"></add-review>
            <show-reviews v-if="reviews" v-for="(review, idx) in reviews" :review="review" :key="idx" :reviewIdx="idx" @deleteReview="deleteReview"></show-reviews>
        </section>
    `

}