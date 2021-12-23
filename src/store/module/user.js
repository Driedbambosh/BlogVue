import storage from 'store'
import { login, logout, getInfo } from "@/api/user";
import { ACCESS_TOKEN, USER_ROLE } from "@/store/mutation-types";

const user = {
    state: {
        name: '',
        roles: [],
        labelData: [],
    },
    mutations: {
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_LABELNAME: (state, data) => {
            state.labelData = data
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
    },
    actions: {
        Login(context, userInfo) {
            return new Promise((resolve, reject) => {
                login(userInfo).then(response => {
                    const data = response
                    //token保存时长7天
                    storage.set(ACCESS_TOKEN, data['token'], 7 * 24 * 60 * 60 * 1000)
                    getInfo().then(res => {
                        context.commit('SET_ROLES', res[0])
                        context.commit('SET_NAME', res[0].userName)
                        storage.set('userInfo', res[0], 7 * 24 * 60 * 60 * 1000)
                    })
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        Logout(context) {
            return new Promise((resolve) => {
                logout().then(() => {
                    resolve()
                }).catch(() => {
                    resolve()
                }).finally(() => {
                    context.commit('SET_ROLES', [])
                    context.commit('SET_NAME', '')
                    storage.remove(ACCESS_TOKEN)
                })
            })
        }
    }
}

export default user
