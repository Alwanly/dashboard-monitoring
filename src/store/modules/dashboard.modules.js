import {ApiServices} from '../../services'
const state ={
    new_user_this_month:0,
    total_user:0,
    user_active:0,
    monthly_visit:0,
    monthly_transaction:0,
    data_chart_user_type:null,
    data_chart_mobile_version:null,
    data_chart_mobile_type:null,
    activitas_user:null,
};

const actions = {
    async getTotalUser({commit}){
        try{
            const response = await ApiServices.get('users/total')            
            commit('set_totalUser',response.data.total_user)
            return true                        
        }catch(e){
            console.log(e)
            return false
        }
    },
    async getUserActive({commit}){
        try{
            const response = await ApiServices.get('users/aktif')
            commit('set_userActice',response.data.total_user_aktif)
        }catch(e){
            console.log(e)
            return false
        }
    },
    async getMonthlyVisit({commit}){
        try{
            const response = await ApiServices.get('users/visitor')
            commit('set_monthVisit',response.data.user_visit)
        }catch(e){
            console.log(e)
            return false
        }
    },
    async getMonthlyTransaction({commit}){
        try{
            const response = await ApiServices.get('users/transaction')
            commit('set_monthTransaction',response.data.this_month_total)
        }catch(e){
            console.log(e)
            return false
        }
    },
    async getUsersLocation({commit}){
        try{
            const response = await ApiServices.get('users/location')
            commit('set_usersLocation',response.data.data)
        }catch(e){
            console.log(e)
            return false
        }
    },
    async getMobileAppVersion({commit}){
        try{
            const response = await ApiServices.get('users/mobile/app')
            const data = {
                labels: ['January', 'February','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],
                datasets:response.data.data
            }
            commit('set_MobileAppVersion',data)             
        }catch(e){
            console.log(e)
            return false
        }
    },
    async getActivitasUser({commit}){
        try{
            const response = await ApiServices.get('users/aktivitas')
            commit('set_activitas_user',response.data.data)
            return true
        }catch(e){
            console.log(e)
            return false
        }
    },
    async getUserType({commit}){
        try{
            const response = await ApiServices.get('users/type')                         
            commit('set_newUser',response.data.new_user)
            const data = {
                labels:['New User','Existing User'],
                datasets:[
                  {              
                    data:[response.data.new_user,response.data.exiting_user],
                    backgroundColor: ['rgba(255, 99, 132, 0.5)','rgba(54, 162, 235, 0.2)']
                  }
                ]
              }
            commit('set_dataChartUserType', data)
            return true  
        }catch(e){
            console.log(e)
            return false
        }
    }    
}