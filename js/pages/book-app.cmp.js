'use strict';
import {booksService} from '../services/book-service.js';
import bookList from '../cmp/book-list.cmp.js'
import bookFilter from '../cmp/book-filter.cmp.js'
import searchGoogleBook from '../cmp/search-google-books.cmp.js'


export default {
    data() {
        return {
            books: null,
            filterBy: null,
            selectedBook: null

        }
    },
    computed: {
        booksToShow() {
            if(!this.filterBy) return this.books;
            return this.books.filter(book =>{
                return book.title.includes(this.filterBy.title) &&
                        book.listPrice.amount > this.filterBy.fromPrice && 
                        book.listPrice.amount < this.filterBy.toPrice
                 });
        }
    },
    methods: {
        selectBook(bookId) {
            this.$router.push('/book/'+bookId)
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        closeBookDetails() {
            this.selectedBook = null;
        }

    },
    created(){
        booksService.query()
        .then(books => this.books = books)
    },
    components: {
        bookList,
        bookFilter,
        searchGoogleBook
    },
    template:`
        <section class="book-app">
            <search-google-book></search-google-book>
            <book-filter @filtered="setFilter"></book-filter>
            <book-list  :books="booksToShow" @selected="selectBook"></book-list>
        </section>
    `

}