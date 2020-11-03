'use strict';

export default {
    props: ['review','reviewIdx'],
    template: `
        <section class="show-reviews">
            <button class="btn-close" @click="$emit('deleteReview',reviewIdx)">&times;</button>
            <div class="section-area user-details-input">
                <label>
                    Reader:
                    <h3>{{review.userName}}</h3>
                </label>
            </div>
                <label>
                    Rate:
                    <h3>{{review.rate}}</h3>
                </label>
                <label>
                    Read at:
                    <h3>{{review.date}}</h3>
                </label>
            <div class="section-area review-input">
                <label>
                    Free text:
                    <pre>{{review.freeTxt}}</pre>
                </label>
            </div>
        </section>
    `,
}