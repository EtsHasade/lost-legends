'use strict';
import {myRouter} from './routers.js'
import appHeader from "./cmp/app-header.cmp.js";



var app = new Vue({
    el: '#app',
    router: myRouter,
    components:{
        appHeader
    },
    template: `
    <section>
        <app-header></app-header>
        <router-view></router-view>
    </section>
    `
})