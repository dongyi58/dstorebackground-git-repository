import Vue from 'vue'
import App from './App.vue' //入口

import VueRouter from 'vue-router' //路由
import Routes from './routes' //引入路由配置文件
import axios from 'axios'
import VueAxios from 'vue-axios'
// import $ from 'jquery' //jquery
import animate from 'animate.css' //动画库
import ElementUI from 'element-ui'; //组件库
import 'element-ui/lib/theme-chalk/index.css';//组件样式
import 'element-ui/lib/theme-chalk/radio.css';//radio组件样式
import 'element-ui/lib/theme-chalk/select.css';//select组件样式
import 'element-ui/lib/theme-chalk/input.css';//input组件样式
Vue.config.productionTip = false

Vue.use(VueAxios,axios);
Vue.use(VueRouter)
Vue.use(animate)
Vue.use(ElementUI)

axios.defaults.baseURL = 'https://www.dongyiself.xyz'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 自定义指令
// Vue.directive('bkg',{
//     bind(el){
//        $(el).click(function(){
//          console.log(111)
//        })
//     }
// })
// 创建路由
const router = new VueRouter({
        routes:Routes
})
new Vue({
  render: h => h(App),
  router,
  
}).$mount('#app')
