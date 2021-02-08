import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'


Vue.use(Vuex)

const base_url = process.env.VUE_APP_API;

export default new Vuex.Store({
    state:{
        status: false,
        token: sessionStorage.getItem('token') || '',
        user: sessionStorage.getItem('user')||'',
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
                axios({url:base_url+'login',data: user ,method:'POST'})                
                .then(resp=>{                    
                    this.state.token = resp.data.token                                        
                    axios.defaults.headers.common['Authorization'] = 'Bearer '+this.state.token                   
                    sessionStorage.setItem('token',this.state.token)
                    this.dispatch('me')    
                    resolve(resp)           
                }).catch(err=>{
                    commit('auth_error')
                    commit('logout')                    
                    reject(err)
                })
            })
        },
        me({commit}){
            return new Promise((resolve,reject)=>{
                axios({url:base_url+'user/me',method:""})                
                .then(resp =>{                                                                                 
                    const data ={
                        user : resp.data.data.display_name,
                        token : this.state.token
                    } 
                    sessionStorage.setItem('user',data.user.display_name)
                    commit('auth_success',data)                                            
                    resolve(resp)
                }).catch(err=>{                    
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
        auth_success(state,data){    
            const {user,token} = data                  
            state.status = !state.status
            state.token = token
            state.user = user              
        },
        auth_error(state){
            state.status = false
        },
        logout(state){
            state.status = !state.status
            state.token = ''
            state.user =''
        },
        saveRefreshTime(state,time){
            sessionStorage.setItem('refresh',time)
            state.refresh = time            
        }
    },
    getters:{        
        isLoggedIn: state => state.status,
        auth: state => state.user,
        optionRefresh: state =>state.optionRefresh,
        getRefresh: state => state.refresh
    }
})