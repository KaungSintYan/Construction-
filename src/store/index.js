import { createApp } from 'vue'
import { createStore } from 'vuex'
import { authApi } from '@/http/authApi';

export default createStore({
  state () {
    return {
      api: "https://dummyjson.com/",
      active: false,
      userInfo: "",
      userImg: "",
      EditForm: {},
      permissions: [],
      showNavTogshowNavTog: false, 
      old_phone_number: "",
    }
  },
  getters: {
  
  },
  mutations: {
    setActive(state, data){
      state.active = data;
    },
    setNavTog(state, nav){
      state.showNavTog = nav;
    }
  },
  actions: {
    async getUserInformation(){
      let response = await authApi({
          method: 'GET',                    
          api: '/profile',           
      });
      if(response.message){
         //console.log('result'+ JSON.stringify(response.data))
         this.state.userInfo= response.data.data;
         this.state.EditForm= response.data.data;
         this.state.userImg= response.data.data.profile_picture.url;
         this.state.permissions = response.data.data.permissions.app_permissions.permissions;  
         this.state.old_phone_number=   response.data.data.phone_number; 
          
        
        // console.log('profile'+ JSON.stringify(response.data.data.permissions.app_permissions.permissions))
      }
  },  

  },
  modules: {
  }
})
