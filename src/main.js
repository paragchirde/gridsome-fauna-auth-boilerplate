import Vue from 'vue'
import Vuex from 'vuex'
import Vuesax from 'vuesax'
import VeeValidate from 'vee-validate'
require('~/main.css')

import 'vuesax/dist/vuesax.css'
Vue.use(Vuesax)
Vue.use(VeeValidate)


export default function(Vue, { router, head, isClient, appOptions }) {
    // Set default layout as a global component
    const authroutes = ['/'];
    router.beforeEach((to, from, next) => {
        if (authroutes.includes(to.path)) {
            var token = process.isClient ? localStorage.getItem("token") : false
            if (token == null || token == false) {
                next({
                    path: '/login',
                })
            } else {
                next()
            }
        } else {
            next()
        }
    })

    //Store
    Vue.use(Vuex)
    appOptions.store = new Vuex.Store({
        state: {
            user: [],
            id: '',
        },
        mutations: {
            setUser(state, data) {
                state.user = data
            },
            setUserId(state, user_id) {
                state.id = user_id
            }
        }
    })

}