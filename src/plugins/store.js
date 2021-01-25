import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'


Vue.use(Vuex)

const base_url = "http://127.0.0.1:8000/api/";
// Vue.axios.defaults.baseURL = base_url;
var token = '';
var userInfo = {};
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
                // commit('auth_request')
                console.log("1")
                console.table(user)        
                const {login,password} = user
                const formData = new FormData();
                formData.append('login',login)                        
                formData.append('password',password)
                axios({url:base_url+'login',data: formData,method:'POST'} , optionAxios)                
                .then(resp=>{
                    // console.log("2")
                    token = resp.data.token                                        
                    axios.defaults.headers.common['Authorization'] = 'Bearer '+token                    
                    sessionStorage.setItem('token','Bearer '+token)
                    return axios({url:base_url+'me',method:""})                         
                }).then(resp =>{  
                    // console.log("3") 
                    // userInfo = resp.data.data    
                    // console.log(resp.data.data)    
                    // console.table(userInfo)
                    sessionStorage.setItem('user',resp.data.data.display_name)                                        
                    commit('auth_success','Bearer '+token, userInfo)                                            
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
                sessionStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                resolve()                
            })
        }
    },
    mutations:{
        auth_request(state){
            state.status = 'loading'
        },
        auth_success(state,token){            
            state.status = true
            state.token = token
            state.user = userInfo            
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