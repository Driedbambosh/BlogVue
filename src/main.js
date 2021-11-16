import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {
  Button, Message, MessageBox, Form,
  FormItem,Input,
} from 'element-ui';
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')