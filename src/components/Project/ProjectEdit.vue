<template>
    <div v-loading="loading" class="loading__div" v-if="loading"></div> 
    <div class="container-fluid" @click="$store.commit('setActive', false)" v-if="!loading"> 
     <form @submit.prevent="updateData">
     <div class="row">
         <div class="col-md-12">           
                     <div class="form-group mb-3">
                         <label for="project_name">
                             <span class="text-danger">*</span> <small><b>{{ $t('project_name') }}</b></small> 
                         </label>
                         <el-input type="text" :placeholder="$t('please_enter')" id="project_name" v-model="FormData.project_name" clearable/>
                     </div>

                     <div class="form-group mb-3">
                        <label for="project_code">
                            <span class="text-danger">*</span> <small><b>{{ $t('project_code') }}</b></small>
                        </label>
                        <el-input type="text" :placeholder="$t('please_enter')" id="project_code" v-model="FormData.project_code" clearable/>
                    </div>
                     <!-- <div class="form-group mb-3">
                         <label for="item_number">
                             <small><b>{{ $t('item_number') }}</b></small>
                         </label>
                         <el-input type="text" :placeholder="$t('please_enter')" id="item_number"  v-model="FormData.project_itemid" clearable/>
                     </div> -->
 
                     <!-- <div class="form-group mb-3">
                         <label for="type_of_section">
                             <small><b>{{ $t('types_of_section') }}</b></small>
                         </label>
                         <el-select id="type_of_section" v-model="FormData.section_type" style="width: 100%;">                          
                                 <el-option value="">{{ $t('please_choose') }}</el-option>
                                 <el-option v-for="obj of sectiontype" :key="obj.section_type_id" :value="obj.section_type_id">{{ obj.section_name }}</el-option>                           
                         </el-select>
                     </div> -->
                    
                     <TypeOfSection :oldSectionId="oldSectionId" @SectionData="getSectionData($event)" />
                     <Client :oldClientId="oldClientId" :titleHeader="$t('party_a_unit')" @clientData="getClientData($event)" />
                     
                     <div class="row">
                         <div class="col-md-6">
                             <div class="form-group mb-3">
                                 <label for="start_date">
                                     <span class="text-danger">*</span> <small><b>{{ $t('start_date') }}</b></small>  
                                 </label>
                                 <el-date-picker v-model="FormData.start_date" id="start_date" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                                 :placeholder="$t('pick_a_day')" size="default"  style="width: 100%;"   />
                             </div>
                         </div>
                         <div class="col-md-6">
                             <div class="form-group mb-3">
                                 <label for="completion_date">
                                     <small><b>{{ $t('completion_date') }}</b></small> 
                                 </label>
                                 <el-date-picker v-model="FormData.completion_date" id="completion_date" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                                 :placeholder="$t('pick_a_day')" size="default"  style="width: 100%;"   />
                             </div>
                         </div>
                     </div>
                     
                     <div class="form-group mb-3">
                         <label for="project_status">
                             <span class="text-danger">*</span> <small><b>{{ $t('project_status') }}</b></small> 
                         </label>                    
                         <el-select style="width: 100%;" id="project_status" v-model="FormData.project_status"> 
                            <el-option label="Pending" value="pending">Pending</el-option>
                            <el-option label="On Going" value="on_going">On Going</el-option>
                            <el-option label="Overdue" value="overdue">Overdue</el-option>
                            <el-option label="Completed" value="completed">Completed</el-option>
                         </el-select>
                     </div>
                     <div class="form-group mb-3">
                         <label for="participation_status">
                             <span class="text-danger">*</span> <small><b>{{ $t('participation_status') }}</b></small>
                         </label>                    
                         <el-select style="width: 100%;" id="participation_status" v-model="FormData.participation_status">                          
                            
                                 <el-option  label="Participate" value="participate">Participate</el-option>  
                                 <el-option label="Not Involved" value="not_involved">Not Involved</el-option>                            
                         </el-select>
                     </div>
 
                     <div class="form-group mb-3">
                         <label for="fund_beginning_project">
                             <span class="text-danger">*</span> <small><b>{{ $t('fund_beginning_project') }}</b></small>
                         </label>
                         <el-input id="fund_beginning_project" type="number" :placeholder="$t('please_enter')" v-model="FormData.fund_begining_projects" clearable/>
                     </div>
                     <div class="form-group mb-3">
                         <label for="fund_of_material">
                             <span class="text-danger">*</span> <small><b>{{ $t('fund_of_material') }}</b></small>
                         </label>
                         <el-input id="fund_of_material" type="number" :placeholder="$t('please_enter')" v-model="FormData.fund_of_material" clearable/>
                     </div>
 
                     <div class="form-group mb-3">
                         <label for="construction_unit">
                             <small><b>{{ $t('construction_unit') }}</b></small>
                         </label>
                         <el-select style="width: 100%;" id="construction_unit" v-model="FormData.construction_unit">                          
                                 <el-option value="">{{$t('please_choose')}}</el-option>
                                 <el-option v-for="obj of constructionUnit" :key="obj.unitid" :label="obj.unitname" :value="obj.unitid">{{ obj.unitname }}</el-option>                           
                         </el-select>
                     </div>
 
                     <div class="form-group mb-3">
                         <label for="construction_address">
                             <small><b>{{ $t('construction_address') }}</b></small>
                         </label>
                         <el-input type="text" id="construction_address" :placeholder="$t('please_enter')" v-model="FormData.construction_address" clearable/>
                     </div>
 
                     <div class="form-group mb-3">
                         <label for="project_overview">
                             <small><b>{{ $t('project_overview') }}</b></small> 
                         </label>
                         <el-input id="project_overview" v-model="FormData.project_overview" maxlength="100" :placeholder="$t('please_enter')" show-word-limit type="textarea"/>
                     </div>
 
                     <div class="form-group mb-5">
                         <label for="remark">
                             <small><b>{{ $t('remark') }}</b></small>
                         </label>
                          <el-input id="remark" v-model="FormData.remark" :placeholder="$t('please_enter')" maxlength="100" show-word-limit type="textarea"/> 
                     </div>
                     <Picture :oldpictureImages="oldpictureImages" @picture="getPicture($event)" />
                     <Document :oldappendixImages="oldappendixImages" @appendix="getDocument($event)" /> 
                        <el-timeline>
                            <el-timeline-item>
                            <Approver :titleName="$t('project_manager')" :oldapprover="oldApprover"  @approverUser="getApproverUser($event)" />
                            </el-timeline-item>
                            <el-timeline-item>
                                <Cc :titleName="$t('project_member')" :oldcc="oldCc" @ccUser="getCcUser($event)" />
                            </el-timeline-item>
                        </el-timeline>     
         </div>
     </div>
      <div class="footer-main pt-2 pl-3">
         <el-button type="primary" loading v-if="submitting">Submiting ...</el-button>     
         <button type="submit" class="btn btn-primary btn-footer" v-if="!submitting"> {{ $t('submit') }} </button>
     </div>
     </form>
    </div>
 
 
 </template>
 <script>
 import {authApi} from '@/http/authApi'
 import { toast } from 'vue3-toastify';
 import 'vue3-toastify/dist/index.css';
 import Client from '@/components/Share/Client.vue';
 import Picture from '@/components/Share/Picture.vue';
 import Document from '@/components/Share/Document.vue';
 import Approver from '@/components/Share/ApproverUser.vue';
 import Cc from '@/components/Share/CcUser.vue';
 import TypeOfSection from '@/components/Share/TypeOfSection.vue';
 export default {
     name: 'ProjectCreate',
     data() {
         return {
             loading: false,
             submitting: false,
             data: [],
              FormData: { },   
             sectiontype: '',
             constructionUnit: "", 
 
             pictureImages: [] ,
            appendixImages: [], 
            showapprover: [],
            showcc: [],
            oldApprover: [],  
            oldCc: [],
            oldpictureImages: [],
            oldappendixImages: [],
            oldClientId: "",
            oldSectionId: "",
            titleName: "",
         }
     },
     components: {
         Client,
         Picture,
         Document,
         Approver,
         Cc,
         TypeOfSection   
     },
     created(){        
           this.getSectiontype();       
           this.getProjectstatus();
           this.getConstructionUnit(); 
           this.getData();        
     },
     methods:{ 
         getClientData(data){
             this.FormData.client = data;
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
         getSectionData(data){           
            this.FormData.section_type = data;
        },
         async getConstructionUnit(){
             let response = await authApi({
                 method: 'GET',
                 api: '/internalunit',
                 params: {
                        id: '',
                        keyword: '',
                        status: '',                       
                        page: '',
                        limit: ''
                 }   
             });
             this.constructionUnit = response.data.data;
         },
         async getProjectstatus(){        
         let response = await authApi({
                 method: 'GET',
                 api: '/projectstatus',
                 params: {                       
                       name: "",
                 }   
         });
         this.projectStatus = response.data.data;      
        
        },
         async getSectiontype(){        
         let response = await authApi({
                 method: 'GET',
                 api: '/projectmanagement/sectiontype',
                 params: {                       
                       name: ""
                 }   
         });
         this.sectiontype = response.data.data;             
        },
        
        async getData(){   
            this.loading = true;      
            let response = await authApi({
                method: 'POST',
                api: '/projectmanagement/getproject',
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
                this.oldClientId = this.FormData.client;                             
                this.oldApprover = this.FormData.project_manager;  
                this.oldCc = this.FormData.project_member;  
                this.oldSectionId  = this.FormData.section_type; 
                if(response.data.data.picture != null){
                    const list= response.data.data.picture.images;
                    this.oldpictureImages = list.map(v => ({...v, isSelected: true}));
                }
                if(response.data.data.appendix != null){
                    const list1= response.data.data.appendix.documents;
                    this.oldappendixImages = list1.map(v => ({...v, isSelected: true}));    
                }
                this.loading =false;          
                         
            }          
        },     
        async updateData(e){ 
                this.submitting= true;    
                this.FormData.project_manager= []; 
                this.showapprover.forEach((value) => {
                this.FormData.project_manager.push(value.userid);                
                }); 
                this.FormData.project_member= [];
                this.showcc.forEach((value) => {
                    this.FormData.project_member.push(value.userid); 
                });
             let response = await authApi({
                 method: 'PUT',
                 api: '/projectmanagement/project',
                 params: {
                        id: '',
                        keyword: '',                   
                        page: '',
                        limit: ''
                 },
                 data: this.FormData
             });
             if(response.status == 200){  
                const id = this.$route.params.id;
                 let formData = new FormData();
                 formData.append('project_id',id);
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
                 api: '/projectmanagement/project_datafiles',               
                 data: formData
                 });
                 if(imgResponse.status == 200){                    
                     toast.success("Project insert successful !", {
                     position: toast.POSITION.TOP_RIGHT,
                     autoClose: 3000,
                     });
                     this.getData();
                     this.submitting= false;
                     this.$router.back();
                 }
                 
             }
        }
     }
     
 }
 </script>
 