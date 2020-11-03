'use strict';

import homePage from './pages/home-page.cmp.js'
import bookApp from './pages/book-app.cmp.js'
import bookDetails from './pages/book-details.cmp.js'
import about from './pages/about-page.cmp.js'


const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
    {
        path: '/about',
        component: about
    },

]



export const myRouter = new VueRouter({routes})