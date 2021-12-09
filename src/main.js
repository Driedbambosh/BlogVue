import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {
  Button, Message, MessageBox, Form,
  FormItem,Input,Icon,Pagination,Avatar,Loading
} from 'element-ui';
import store from './store'
import './VueQuillEditor.js'
import 'element-ui/lib/theme-chalk/index.css';
import "tailwindcss/tailwind.css"

Vue.use(Loading.directive);
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$loading = Loading.service;

Vue.config.productionTip = false


Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Pagination);
Vue.use(Avatar);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
