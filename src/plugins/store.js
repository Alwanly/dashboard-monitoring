import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'


Vue.use(Vuex)

const base_url = process.env.VUE_APP_API;
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
        user: sessionStorage.getItem('user') || '',
        refresh: sessionStorage.getItem('refresh') || 180000,
        optionRefresh:[
            {option:1,label:'1 Menit',value:60000},
            {option:2,label:'3 Menit',value:180000},
            {option:3,label:'5 Menit',value:300000},
        ]       
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
                    commit('auth_success',true,sessionStorage.getItem('token'), sessionStorage.getItem('user'))                                            
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
                sessionStorage.removeItem('user')                                
                delete axios.defaults.headers.common['Authorization']                
                resolve()                
            })
        },
        saveRefreshTime({commit},refreshTime){
            return new Promise((resolve)=>{
                console.log(refreshTime);
                commit('saveRefreshTime',refreshTime)                                
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
            state.status = false
        },
        logout(state){
            state.status = false
            state.token = ''
            state.user =''
        },
        saveRefreshTime(state,time){
            sessionStorage.setItem('refresh',time)
            state.refresh = time            
        }
    },
    getters:{
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        auth: state => state.user,
        optionRefresh: state =>state.optionRefresh,
        getRefresh: state => state.refresh
    }
})