'use strict';

export default {
    data(){
        return {
            byName: '',
            fromPrice:0,
            toTopPrice: null,
        }
        
    },
    computed:{
        toPrice(){
            return  this.toTopPrice || Infinity;
        }
    },
    methods: {
        emitFiltered() {
            this.$emit('filtered',{title: this.byName, fromPrice: this.fromPrice, toPrice: this.toPrice});
        },
    },
    template: `
        <section class="book-filter">
            <h2>filter</h2>
            <label>
                Title:
                <input type="text" v-on:input="emitFiltered" v-model:value="byName" placeholder="Book name">
            </label>
            <label>
                From price:
                <input type="number" v-on:input="emitFiltered" v-model.number:value="fromPrice">
            </label>
            <label>
                To price:
                <input type="number" v-on:input="emitFiltered" v-model.number:value="toTopPrice" placeholder="∞">
            </label>
        </section>
    `
}