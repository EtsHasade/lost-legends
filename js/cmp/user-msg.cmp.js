import { eventBus } from '../services/eventBus-service.js'


export default {
    template: `
        <section v-if="msg" class="user-msg" :class="msg.type">
            <p>{{msg.txt}}</p>
            <button @click="msg=null">x</button>
        </section>
    `,
    data() {
        return {
            msg: null
        }
    },
    created() {
        eventBus.$on('user-msg', msg => {
            this.msg = msg;

            setTimeout(()=>{
                this.msg = null;
            }, 2000)
        })
    }
}