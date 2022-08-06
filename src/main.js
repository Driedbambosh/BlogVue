import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {
  Button, Message, MessageBox, Form, Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Card,
  FormItem, Input, Icon, Pagination, Avatar, Loading, Popover, Tag,
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




Vue.use(Button);
Vue.use(Row);
Vue.use(Card);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Pagination);
Vue.use(Avatar);
Vue.use(Popover);
Vue.use(Tag);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
