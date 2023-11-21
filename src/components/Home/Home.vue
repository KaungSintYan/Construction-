<template>    
    <div class="container-fluid mt-2"  @click="$store.commit('setActive', false)">
               <div class="row my-3 bg-white shadow-box">
                   <div class="col-8 mt-4">
                       <div class="row">
                           <div class="col-6">
                               <h5>{{ $t('my_approval') }}</h5>
                           </div>
                           <div class="col-6 noti d-flex justify-content-end">
                               <div class="d-flex">
                                   <span class="noti_icon_box">
                                      <font-awesome-icon icon="fa-solid fa-bell" class="noti_icon" style="color: blue;" />   
                                   </span>                                                                    
                                   <span class="noti_count">1</span>
                                   <h5 class="ml-2" style="font-size: 16px;color: blue;">early warning</h5>
                               </div>                           
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-4">
                               <div class="approve-box">
                                   <span class="approve-box-icon">
                                      <font-awesome-icon icon="fa-solid fa-stamp" class="font-awesome-icon" />
                                   </span>
                                   <div class="right-border">
                                       <h4 class="approve-count">{{ approver_total }}</h4>
                                       <p class="approve-text">Waiting for my approval </p>                                 
                                   </div>  
                                                         
                               </div>                                
                           </div>
                           <div class="col-4">
                               <div class="approve-box">
                                   <span class="approve-box-icon">
                                      <font-awesome-icon icon="fa-solid fa-window-restore" class="font-awesome-icon" />
                                   </span>
                                   <div class="right-border">
                                       <h4 class="approve-count">0</h4>
                                       <p class="approve-text">I Initiated_ </p>                                   
                                   </div>                    
                               </div>                                
                           </div>
                           <div class="col-4">
                               <div class="approve-box">
                                   <span class="approve-box-icon">
                                      <font-awesome-icon icon="fa-solid fa-paper-plane" class="font-awesome-icon" />
                                   </span>
                                   <div>
                                       <h4 class="approve-count">{{ cc_total }}</h4>                                    
                                       <p class="approve-text"> CC me </p>
                                   </div>                           
                               </div>                                
                           </div>
                       </div>
                   </div>
                   <div class="col-4 slider">
                       <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" >
                           <ol class="carousel-indicators">
                             <li data-target="#carouselExampleIndicators" :data-slide-to="i" v-for="(obj, i) in data" :key="i" :class="{ active: i==0 }"></li>
                             <!-- <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                             <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>     -->
                           </ol>
                           <div class="carousel-inner">
                             <div class="carousel-item" v-for="(obj, i) in data" :key="i" :class="{ active: i==0 }">
                                  <img class="d-block w-100" :src="obj.url" alt="First slide" style="height: 200px;" >
                             </div>                             
                           </div>
                           <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">                              
                             <span class="sr-only">Previous</span>
                           </a>
                           <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">                              
                             <span class="sr-only">Next</span>
                           </a>
                       </div>                   
                   </div>
               </div>
               <div class="row mt-1 pt-5 bg-white ">
                   <div class="col-12 shadow-box-app mb-2 pb-2">
                       <div class="row">
                           <div class="col-6 d-flex justify-content-start">
                               <h5> {{ $t('common_apps') }} </h5> 
                           </div>
                           <div class="col-6 d-flex justify-content-end">
                               <span>
                                  <font-awesome-icon icon="fa-solid fa-cog" style="color: blue;"/>
                                  <span class="mx-1"> {{ $t('edit') }} </span>
                               </span>
                           </div>
                       </div>
                       <div class="row">
                           <img src="../../assets/images/all.png" alt="" style="margin-left: 10px;"><span> {{ $t('apply_all') }} </span>
                       </div>
                   </div>                                   
                                              
               </div>            
               <div class="row mb-3 pb-5 bg-white">
                   <h5 class="ml-2"> {{ $t('project_statistics') }} </h5>       
                   <div class="col-12">                              
                       <div class="row">
                           <div class="col-3">
                               <div class="approve-box">
                                   <span class="approve-box-icon">
                                      <font-awesome-icon icon="fa-solid fa-store"  class="font-awesome-icon" />
                                   </span>
                                   <div class="right-border">
                                       <h4 class="approve-count">{{ statistics.pending }}</h4>
                                       <p class="approve-text"> Pending </p>                                 
                                   </div>  
                                                         
                               </div>                                
                           </div>
                           <div class="col-3">
                               <div class="approve-box">
                                   <span class="approve-box-icon">
                                      <font-awesome-icon icon="fa-solid fa-store" class="font-awesome-icon" />
                                   </span>
                                   <div class="right-border">
                                       <h4 class="approve-count">{{ statistics.on_going }}</h4>
                                       <p class="approve-text"> On Going </p>                                   
                                   </div>  
                                
                                                        
                               </div>                                
                           </div>
                           <div class="col-3">
                               <div class="approve-box">
                                   <span class="approve-box-icon">
                                      <font-awesome-icon icon="fa-solid fa-store" class="font-awesome-icon" />
                                   </span> 
                                   <div>
                                       <h4 class="approve-count">{{ statistics.overdue }}</h4>                                    
                                       <p class="approve-text"> Overdue </p>
                                   </div>                           
                               </div>                                
                           </div>
                           <div class="col-3">
                               <div class="approve-box">
                                   <span class="approve-box-icon">
                                      <font-awesome-icon icon="fa-solid fa-store" class="font-awesome-icon" />
                                   </span>
                                   <div>
                                       <h4 class="approve-count">{{ statistics.completed }}</h4>                                    
                                       <p class="approve-text"> Completed </p>
                                   </div>                           
                               </div>                                
                           </div>
                       </div>
                   </div>    
               </div>
               <div class="row">
                   <div class="col-8 bg-white">                    
                         <div class="row pt-4">
                           <div class="col-6 d-flex justify-content-start">
                               <h5 class="ml-2"> Approver </h5>                            
                           </div>
                           <div class="col-6 d-flex justify-content-end">   
                            <router-link to="/dashboard/approver_noti">
                                <span>More  <font-awesome-icon icon="fa-solid fa-angle-right" class="font-awesome-icon" /></span>                   
                            </router-link> 
                           </div>
                         </div>   
                         <div class="row mt-3" v-for="(items,i) in approverNoti" :key="items.noti_id"  v-show="i < 2">
                              <div class="col-10 d-flex justify-content-start">
                                  <div class="container">
                                      <div class="row ml-1">
                                        <p><span style="font-size: 18px;">{{ items.title }}</span>: <span class="text-muted">{{ items.remark }}</span></p>                                                            
                                      </div>
                                      <div class="row ml-2">                                        
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
                        </div> 
                             
                   <div class="col-4" >
                       <div class="card">                       
                           <div class="card-body" style="width: 100%;">
                              <div class="row pt-2">
                           <div class="col-6 d-flex justify-content-start">
                               <h5 class="ml-2"> CC </h5>                            
                           </div>
                           <div class="col-6 d-flex justify-content-end">                              
                            <router-link to="/dashboard/cc_noti">
                                <span>More  <font-awesome-icon icon="fa-solid fa-angle-right" class="font-awesome-icon" /></span>                   
                            </router-link>                     
                           </div>
                         </div>
   
                         <div class="row mt-2" v-for="(items, i) in ccNoti" :key="items.noti_id" v-show="i < 2">
                              <div class="col-10 d-flex justify-content-start">
                                  <div class="container">
                                      <div class="row ml-1">
                                        <p><span style="font-size: 18px;">{{ items.title }}</span>: <span class="text-muted">{{ items.remark }}</span></p>                                                   
                                      </div>
                                      <div class="row ml-2">                                        
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
                           </div>
                         </div>
                       
                   </div>
               </div>
    </div>
</template>

<script>
import {authApi} from '@/http/authApi'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


export default {
  name: 'Home',
  data() {
      return {
          data: [],
          loading: false,
          selectedData: [],
          approverNoti: [],
          approver_total: "",
          ccNoti: [],
          cc_total: "",
          statistics: {}
      }
  },
  created(){
      this.getData();
      this.getApproverNoti();
      this.getCcNoti();
      this.getProjectStatistics();
  },  
  methods:{
      getData(data){
          console.log(this.getData);
          this.data = [];
          this.data = data.data;
          this.total = data.total;
      },  

      async getData(){
          let response = await authApi({
              method: 'GET',
              api: '/dash_picture',
          });

          if(response.message){
              
              this.data= response.data.data; 
              console.log('data'+ JSON.stringify(this.data));
              this.loading = false;
          }
      },
      async getApproverNoti(){
          let response = await authApi({
              method: 'GET',
              api: '/approver_notification',
          });

          if(response.message){                
              this.approverNoti = response.data.data; 
              this.approver_total = response.data.total;
              console.log('approverNoti>>'+ JSON.stringify(this.approverNoti));
              this.loading = false;
          }
      },
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
      },
      async getProjectStatistics(){
        let response = await authApi({
              method: 'GET',
              api: '/projectmanagement/project_statistics',
          });

          if(response.message){                
              this.statistics = response.data.data;             
              console.log('statistics>>'+ JSON.stringify(this.statistics));
              this.loading = false;
          }
      }
      


  },  

}



</script>

<style scoped>
@import "../../assets/css/_variable.scss";
.noti_icon {
  font-size: 22px !important;   
}
.noti_icon_box {
  animation: wiggle 2s linear infinite;
}
/* Keyframes */
@keyframes wiggle {
0%, 7% {
  transform: rotateZ(0);
}
15% {
  transform: rotateZ(-15deg);
}
20% {
  transform: rotateZ(10deg);
}
25% {
  transform: rotateZ(-10deg);
}
30% {
  transform: rotateZ(6deg);
}
35% {
  transform: rotateZ(-4deg);
}
40%, 100% {
  transform: rotateZ(0);
}
}
.noti_count {
  position: absolute;
  width: 20px;
  height: 20px;
  background: red;
  border-radius: 10px;
  top: -12px;
  padding: 0px 6px;
  color: #fff;
  font-size: 14px;
  margin-left: 10px;
}
.approve-box {
  display: flex;
  flex-direction: row;
  height: 50px;
  /* width: 200px; */
  font-size: 30px;
}
.right-border::after {
  content: "";
  height: 40px;
  width: 0.5px;
  border-left: 1px solid #e3e3e3;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

.approve-box-icon {
  margin-top: 10px;
  width: 50px;
  height: 50px;
  border-radius: 100px;
  background: blue;
  padding: 0px 10px;
  
}
.approve-box-icon > .font-awesome-icon {
  color: #fff !important;
  font-size: 26px !important;
}
.approve-count {
  text-align: center;
  color: var(--primary2);
}
.approve-text {
  display: block;
  justify-content: center;
  font-size: 16px;
  margin-left: 10px;
}

.shadow-box {
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
}
.shadow-box-app {
  box-shadow: rgba(0, 0, 0, 0.03) 0px 2px 2px 0px;
}
.slider {
  background: #f9f9f9;
  padding-right: 0px !important;    
}
</style>