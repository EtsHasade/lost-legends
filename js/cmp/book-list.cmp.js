'use strict';

import bookPreview from '../cmp/book-preview.cmp.js'
import {eventBus} from '../services/eventBus-service.js';

export default {
    props: ['books'],
    methods:{
        emitSelect(bookId){
            this.$emit('selected',bookId)
            eventBus.$emit('user-msg',{txt:'book selected', type: 'success'})
        }
    },
    components:{
        bookPreview
    },
    template: `
        <section class="book-list-container">
            <book-preview v-for="book in books" v-bind:key="book.id" v-bind:book="book"  v-on:click.native="emitSelect(book.id)" />           
        </section>
    `
}