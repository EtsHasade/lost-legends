'use strict';

import { booksService } from "../services/book-service.js";
import { eventBus } from "../services/eventBus-service.js";

export default {
    name: 'search-google-books.cmp',
    template:`
        <section class="search-google-book">
            <h3>Add from google books:</h3>
            <label>
                <input type="search" v-model:value="term" placeHolder="search book name or subject">
                <button v-if="term" @click="searchTerm">add</button>
            </label>
            <div class="select-search-res" v-if="totalItems">
                <ul>
                    <li v-for="book in books" :key="book.id">
                        <h4>{{book.title}}</h4><button>⨂</button>
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
    methods:{
        searchTerm(){
            booksService.searchGoogleBook(this.term)
                .then(res => {
                    this.totalItems = res.totalItems;
                    this.books = res.ourBooks;
                })
                .catch(err =>{
                    console.log('ERR', err);
                    eventBus.$emit('user-msg',{txt:'google books not respons', type:'alert'})               
                })
        },
        removeBookFromList(bookId){

        }
    }
}
