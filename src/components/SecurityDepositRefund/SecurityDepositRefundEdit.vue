<template>
    <div v-loading="loading" class="loading__div" v-if="loading"></div> 
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading">
        <form  @submit.prevent="updateData">
            <div class="row">
                <div class="col-md-12">                    
                 
                           <ProjectName :oldProjectId="oldProjectId" @projectData="getProjectName($event)"  />
       
                           <div class="form-group mb-3 mt-3">
                            <div class="form-group">
                                <label for="title">
                                    <span class="text-danger">*</span> <small><b> {{ $t('title_bd') }} </b></small>
                                </label>
                            </div>                               
                            <el-input type="text" id="title" :placeholder="$t('please_enter')" v-model="FormData.title" clearable />
                           </div>
                            
                           <MarginType :oldMarginTypeId="oldMarginTypeId"  @marginTypeData="getMarginTypeName($event)"  />      
       
                            <div class="form-group mb-3">
                                <label for="margin_amount">
                                    <small><b> {{ $t('refund_amt') }} </b></small>
                                </label>
                                <el-input type="number" id="margin_amount" v-model="FormData.margin_amount"
                                :placeholder="$t('please_enter')" clearable />
                            </div>

                            <div class="col-md-3 m-0 p-0">
                                <div class="form-group mb-3">
                                    <div class="form-group mb-3">
                                        <label for="return_date"> 
                                            <span class="text-danger">*</span> <small><b> {{ $t('return_date') }} </b></small>           
                                        </label>
                                    </div>                        
                                    <el-date-picker v-model="FormData.return_date"  id="return_date" type="date" 
                                    format="YYYY-MM-DD" value-format="YYYY-MM-DD" placeholder="Pick a Date" size="default"  style="width: 100%;" editable clearable  />
                                </div>
                            </div>
                          
                            <div class="form-group mb-3">
                                <label for="remark">
                                    <small><b> {{ $t('remark') }} </b></small>
                                </label>
                                <el-input v-model="FormData.remark" maxlength="100" 
                                :placeholder="$t('please_enter')"  show-word-limit type="textarea" />  
                            </div>
       
                             <Picture :oldpictureImages="oldpictureImages" @picture="getPicture($event)" />
                        <Document :oldappendixImages="oldappendixImages" @appendix="getDocument($event)" /> 

                        <el-timeline>
                            <el-timeline-item>
                            <Approver :oldapprover="oldApprover"  @approverUser="getApproverUser($event)" />
                            </el-timeline-item>
                            <el-timeline-item>
                                <Cc :oldcc="oldCc" @ccUser="getCcUser($event)" />
                            </el-timeline-item>
                        </el-timeline>
                            <div class="form-group mb-5"></div>
        
                </div>
            </div>  
            <div class="footer-main pt-2 pl-3">       
                <button type="submit" class="btn btn-primary btn-footer"> {{ $t('submit') }} </button>
           </div> 
        </form> 
    </div>
 
 </template>

 <script>  
 import {authApi} from '@/http/authApi'
 import { toast } from 'vue3-toastify';
 import 'vue3-toastify/dist/index.css';
 import ProjectName from '@/components/Share/ProjectName.vue';
 import MarginType from '@/components/Share/MarginType.vue'; 
 import Picture from '@/components/Share/Picture.vue';
 import Document from '@/components/Share/Document.vue';
 import Approver from '@/components/Share/ApproverUser.vue';
 import Cc from '@/components/Share/CcUser.vue';
 export default {
     name: 'SecurityDepositRefundEdit',
     data() {
         return {
             loading: true,
             FormData: {
                       
             },                        
             pictureImages: [] ,
             appendixImages: [], 
             showapprover: [],
             showcc: [],
             oldApprover: [],  
             oldCc: [],
             oldpictureImages: [],
             oldappendixImages: [],
             oldProjectId: "", 
             oldMarginTypeId: ""
                   
         }
     },
     components: {
       ProjectName,
       MarginType,        
       Picture,
       Document,
       Approver,
       Cc    
     }, 
     created(){    
        this.getData();            
        
     },
     
     methods: {        
         getProjectName(data) {   
          this.FormData.project_id = data;        
         }, 
         getMarginTypeName(data){
            this.FormData.margin_type = data;        
         },             
         getPicture(data){
          this.pictureImages = data;
         },
         getDocument(data){
             this.appendixImages = data;          
         },
         getApproverUser(data){
           this.showapprover = data;
         },
         getCcUser(data){
           this.showcc = data;
         },
         async getData(){  
            this.data=[];
            this.loading = true;       
            let response = await authApi({
                method: 'POST',
                api: '/financialmanagement/get_security_deposit_refund',
                params: {
                       id: this.$route.params.id,
                       keyword: '',             
                       page: '',
                       limit: ''
                },
                data: {
                    view: false,
                }   
            });
            if(response.message){            
                this.FormData = response.data.data;               
                this.oldProjectId = this.FormData.project_id;
                this.oldMarginTypeId = this.FormData.margin_type;            
                this.oldApprover = this.FormData.approver;  
                this.oldCc = this.FormData.cc;  
                if(response.data.data.picture != null){
                const list= response.data.data.picture.images;
                this.oldpictureImages = list.map(v => ({...v, isSelected: true}));
                }
                if(response.data.data.appendix !=null ){
                const list1= response.data.data.appendix.documents;
                this.oldappendixImages = list1.map(v => ({...v, isSelected: true}));
                }      
                this.loading= false; 
               // console.log('res'+ JSON.stringify(this.FormData))
                      
            }
          
        },
        async updateData(e){   
             this.FormData.approver= []; 
               this.showapprover.forEach((value) => {
                this.FormData.approver.push(value.userid);                
                }); 
                this.FormData.cc= [];
                this.showcc.forEach((value) => {
                    this.FormData.cc.push(value.userid); 
                }); 
             let response = await authApi({
                 method: 'PUT',
                 api: '/financialmanagement/security_deposit_refund',
                 data: this.FormData 
             });
             if(response.status == 200){              
                const id = this.$route.params.id;
                const formData = new FormData();
                formData.append('security_deposit_refund_id',id);
                formData
                 
                this.pictureImages.forEach((value) => {
                    if(value.image_id != null){
                        formData.append('imglist',value.image_id);                        
                    }
                    else{
                        formData.append('addimglist', value.url);  
                    }                   
                });
                this.appendixImages.forEach((value) => {
                    if(value.file_id != null){
                        formData.append('filelist',value.file_id);
                    }
                    else{
                        formData.append('addfilelist', value.url);  
                    }
                    
                }); 
                 let imgResponse = await authApi({
                 method: 'PUT',
                 api:  '/financialmanagement/security_deposit_refund_datafiles',       
                 data: formData
                 });
                 if(imgResponse.status == 200){                   
                     toast.success("Security Deposit Refund Update successful !", {
                     position: toast.POSITION.TOP_RIGHT,
                     autoClose: 3000,
                     });
                     this.getData();
                 }
             }
         },
     }
 }
 </script>
