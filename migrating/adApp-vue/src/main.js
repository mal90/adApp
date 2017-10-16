import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


import Products from './components/Products.vue'

const routes = [
	//route for the home route of the webpage
  { path: '/', component: Products }
]

const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'history'
})

new Vue({
  //define the selector for the root component
    el: '#app',
    //pass the template to the root component
    template: '<App/>',
    //declare components that the root component can access
    components: { App },
    //pass in the router to the Vue instance
    router
  }).$mount('#app')//mount the router on the app
