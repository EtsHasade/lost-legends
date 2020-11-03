'use strict';

import { booksService } from "../services/book-service.js";
import { eventBus } from "../services/eventBus-service.js";

export default {
    name: 'search-google-books.cmp',
    template:`
        <section class="search-google-book">
            <div>
                <h3>Add from google books:</h3>
                <label>
                    <input type="search" v-model:value="term" placeHolder="search book name or subject">
                    <button v-if="term" @click="btnFunc">{{btnMode}}</button>
                </label>
            </div>
            <div class="select-search-res" v-if="totalItems">
                <ul>
                    <li class="book-to-choose" v-for="book in books" :key="book.id">
                        <h4>{{book.title}}</h4><button @click="removeBookFromList(book.id)">⨂</button>
                    </li>
                </ul>
            </div>
        </section>
        
    `,
    data(){
        return {
            term: null,
            totalItems: null,
            books: []
        }
    },
    computed:{
        btnMode(){
            return (this.totalItems)?  'Add all the books':'Search';
        },
        btnFunc(){
            return (this.totalItems)? this.addToShop : this.searchTerm;
        }
    },
    methods:{
        searchTerm(){
            booksService.searchGoogleBook(this.term)
                .then(res => {
                    this.totalItems = res.totalItems;
                    this.books = res.ourBooks;
                    console.log("searchTerm -> this.books", this.books)
                    
                    
                })
                .catch(err =>{
                    console.log('ERR', err);
                    eventBus.$emit('user-msg',{txt:'google books not respons', type:'alert'})               
                })
        },
        addToShop(){
            booksService.addBooks(this.books)
            console.log('add all the book to my shop', this.books);
            eventBus.$emit('user-msg',{txt:`Added your books:`, type:'success'}) 
            
        },
        removeBookFromList(bookId){
            console.log("removeBookFromList -> bookId", bookId)
            const bookIdx = this.books.findIndex(book => book.id === bookId);
            console.log("removeBookFromList -> bookIdx", bookIdx)
            this.books.splice(bookIdx,1)
        },
    }
}
