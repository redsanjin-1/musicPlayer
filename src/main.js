// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import App from './App'
import axios from 'axios'
import jsonp from 'common/js/jsonp'
import VueLazyload from "vue-lazyload"
import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '2px'
})
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: require("@/assets/11.jpg"),
    loading: require("@/assets/huaji.jpg"),
    attempt: 1
});


Vue.config.productionTip = false

Vue.prototype.$ajax = axios
Vue.prototype.$jsonp = jsonp

new Vue({
    el: '#app',
    router: router,
    template: '<App/>',
    components: {
        App
    }
})
// router.push('/axios')
