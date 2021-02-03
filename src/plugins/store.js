import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'


Vue.use(Vuex)

const base_url = "http://dev.tokohaji.co.id/api/";
var optionAxios = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": 'application/x-www-form-urlencoded',
    }    
}
export default new Vuex.Store({
    state:{
        status:sessionStorage.getItem('status') || false,
        token: sessionStorage.getItem('token') || '',
        user: sessionStorage.getItem('user') || ''
    },
    actions:{
        login({commit}, user){
            return new Promise((resolve, reject)=>{                                
                const {login,password} = user
                const formData = new FormData();
                formData.append('login',login)                        
                formData.append('password',password)
                axios({url:base_url+'login',data: formData,method:'POST'} , optionAxios)                
                .then(resp=>{                    
                    this.state.token = resp.data.token                                        
                    axios.defaults.headers.common['Authorization'] = 'Bearer '+this.state.token                    
                    sessionStorage.setItem('token','Bearer '+this.state.token)
                    return axios({url:base_url+'user/me',method:""})                         
                }).then(resp =>{                                                              
                    sessionStorage.setItem('user',resp.data.data.display_name)                                                            
                    commit('auth_success',true,'Bearer '+ sessionStorage.getItem('token'), sessionStorage.getItem('user'))                                            
                    resolve(resp)           
                }).catch(err=>{
                    console.log("4")
                    reject(err)
                })
            })
        },
        logout({commit}){            
            return new Promise((resolve)=>{
                commit('logout')                                
                sessionStorage.clear()                                
                delete axios.defaults.headers.common['Authorization']                
                resolve()                
            })
        }
    },
    mutations:{
        auth_request(state){
            state.status = 'loading'
        },
        auth_success(state,status,token,userInfo){            
            state.status = status
            state.token = token
            state.user = userInfo  
            sessionStorage.setItem('status',true)                                                  
        },
        auth_error(state){
            state.status = 'error'
        },
        logout(state){
            state.status = ''
            state.token = ''
            state.user =''
        }
    },
    getters:{
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        auth: state => state.user
    }
})