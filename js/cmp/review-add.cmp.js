'use strict';
import {booksService} from '../services/book-service.js'

export default {
    props: ['bookId'],
    template: `
        <form class="add-review-form">
            <div class="form-area user-details-input">
                <label>
                    User full name:
                    <input ref="userName" type="text" placeHolder="Book reader" v-model:value="review.userName">
                </label>
                <button @click="saveReview">Add review</button>
            </div>
            <div class="form-area rate-input">
                <label>
                    Rate:
                    <select v-model:value="review.rate">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </label>
                <label>
                    Read at:
                    <input type="date" v-model:value="review.date">
                </label>
            </div>
            <div class="form-area review-input">
                <label>
                    Free text:
                    <textarea class="txt-review-input"  cols="30" rows="10" v-model:value="review.freeTxt"></textarea>
                </label>
            </div>
        </form>
    `,
    data(){
        return{
            review: {
                userName: undefined,
                date : new Date().toISOString().slice(0,10),
                rate: 1,
                freeTxt: ''
            }
            
        }
    },
    methods:{
        saveReview(){
            this.$emit('addReview',JSON.parse(JSON.stringify(this.review)))
        }
    },
    mounted(){
        this.$refs.userName.focus();
    }
}