import Vue from 'vue'
import App from './App'
import router from './router'
let cnode_vue = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App
    }
});

if (window.global == undefined) {
    window.global = {};
}


window.global.$vue = cnode_vue;