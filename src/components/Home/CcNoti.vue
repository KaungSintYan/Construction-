<template>
    <div class="container-fluid"  @click="$store.commit('setActive', false)"> 
       
        <el-card shadow="hover" class="mb-2" v-for="(items,i) in ccNoti" :key="items.noti_id"> 
            <div class="row">
                              <div class="col-10 d-flex justify-content-start">
                                  <div class="container">
                                      <div class="row ml-1">
                                        <p><span style="font-size: 18px;">{{ items.title }}</span>: <span class="text-muted">{{ items.remark }}</span></p>                                         
                                      </div>
                                      <div class="row ml-3">                                        
                                          <span class="mr-4 text-muted"> <font-awesome-icon icon="fa-solid fa-bars" class="font-awesome-icon" /> {{ items.app_id }}</span>
                                          <span class="mr-4 text-muted"><font-awesome-icon icon="fa-solid fa-calendar" class="font-awesome-icon" /> {{ items.creation_date }}</span>
                                          <!-- <span class="mr-2 text-muted"><font-awesome-icon icon="fa-solid fa-commenting" class="font-awesome-icon" /> 0</span> -->
                                          <span class="text-muted"><font-awesome-icon icon="fa-solid fa-building-shield" class="font-awesome-icon" /> {{ items.project_id }}</span>
                                      </div>    
                                  </div>                                                             
                              </div>                        
                              <div class="col-2 d-flex justify-content-end"><font-awesome-icon icon="fa-solid fa-star" class="font-awesome-icon" 
                                  style="padding-top: 20px;" /></div>
            </div>                           
             
        </el-card>
    </div>
 </template>

<script>  
import {authApi} from '@/http/authApi'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'; 
   
 export default {
     name: 'Approver',     
     data() {
         return {
            loading: false,
            ccNoti: [],                
         }
     }, 
    
    created(){   
        this.getCcNoti();       
     },
     methods:{
        async getCcNoti(){
          let response = await authApi({
              method: 'GET',
              api: '/cc_notification',
          });

          if(response.message){                
              this.ccNoti = response.data.data; 
              this.cc_total = response.data.total;
              console.log('ccNoti>>'+ JSON.stringify(this.approverNoti));
              this.loading = false;
          }
        }
     }
     
 }
 </script>
