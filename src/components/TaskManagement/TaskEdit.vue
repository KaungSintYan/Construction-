<template>
    <div v-loading="loading" class="loading__div" v-if="loading"></div> 
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading"> 
        <form  @submit.prevent="updateData">  
            <div class="row">
                <div class="col-md-12">             
                   
                            <ProjectName :oldProjectId="oldProjectId"    />
                            <div class="form-group mb-3 mt-3">
                                <label for="mission_name">
                                    <span class="text-danger">*</span> <small><b>{{ $t('mission_name') }}</b></small>
                                </label>
                                <el-input type="text"  id="mission_name" :placeholder="$t('please_enter')"
                                v-model="FormData.name" clearable />
                            </div>
                            <div class="form-group mb-3">
                                <div class="form-group">
                                    <label for="superior_task"> <small><b>{{ $t('superior_task') }} </b></small> </label>
                                </div> 
                                <el-select v-model="FormData.superior_task" id="distribution" class="" :placeholder="$t('please_choose')"  style="width: 100%">
                                    <el-option
                                      v-for="item in tasks"
                                      :key="item.task_id"
                                      :label="item.name"
                                      :value="item.task_id"
                                    />  
                                </el-select>
                            </div>
                            
                            <!-- <div class="form-group mb-3">
                                <label for=""> Whether to create a task </label>
                                <div class="ml-1">
                                    <el-switch v-model="FormData.create_task" size="large" active-text="" inactive-text=""/>
                                </div>
                            </div> -->

                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form group mb-3">
                                        <label for="program_start_date"> 
                                        <span class="text-danger">*</span> <small><b>{{ $t('program_start_date') }}</b></small>  
                                        </label>
                                        <el-date-picker v-model="FormData.start_date"  id="program_start_date" type="date" 
                                        format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                                        :placeholder="$t('please_choose')" size="default"  style="width: 100%;" editable clearable />                               
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form group mb-3">
                                        <label for="complilation_date"> 
                                        <span class="text-danger">*</span> <small><b>{{ $t('program_completion_date') }}</b></small>  
                                        </label>
                                        <el-date-picker v-model="FormData.end_date"  id="complilation_date" type="date" 
                                        format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                                        :placeholder="$t('please_choose')" size="default"  style="width: 100%;" editable clearable />                               
                                    </div>
                                </div>
                            </div>
                                                       
                            <Picker :titleName="$t('principal')" :oldPickerId="oldPickerId" @pickerData="getPickerName($event)"  />
                            <!-- <ParticipantUser  :oldParticipant="oldParticipant" @participantUser="getParticipantUser($event)" /> -->
                            <TeamMember :titleName="$t('participant')"  :oldteamMember="oldParticipant" @teamMember="getParticipantUser($event)" />

                            <div class="form-group mb-3">
                                <label for="description">
                                    <small><b>{{ $t('mission_details') }}</b></small>
                                </label>
                                <el-input type="textarea" :placeholder="$t('please_enter')" id="description"
                                 v-model="FormData.description" maxlength="500" show-word-limit />
                            </div>
                            <div class="form-group mb-3">
                                <label for="remark">
                                    <small><b>{{ $t('remark') }}</b></small>
                                </label>
                                <el-input type="textarea" :placeholder="$t('please_enter')" id="remark" 
                                v-model="FormData.remark" maxlength="500" show-word-limit />
                            </div>

                            <Picture :oldpictureImages="oldpictureImages" @picture="getPicture($event)" />
                            <Document :oldappendixImages="oldappendixImages" @appendix="getDocument($event)" /> 
                            <!-- <el-timeline>
                                <el-timeline-item>
                                <Approver :oldapprover="oldApprover"  @approverUser="getApproverUser($event)" />
                                </el-timeline-item>
                                <el-timeline-item>
                                    <Cc :oldcc="oldCc" @ccUser="getCcUser($event)" />
                                </el-timeline-item>
                            </el-timeline> -->
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
import ProjectName from '@/components/Share/ProjectName.vue';
import Picker from '@/components/Share/Picker.vue';
import Picture from '@/components/Share/Picture.vue';
import Document from '@/components/Share/Document.vue';
import Approver from '@/components/Share/ApproverUser.vue';
import Cc from '@/components/Share/CcUser.vue'; 
import ParticipantUser from '@/components/Share/ParticipantUser.vue';
import TeamMember from '@/components/Share/TeamMember.vue';
 export default {
     name: 'ScheduleManagementCreate',
     data() {
         return {
             loading: false,
             submitting: false,
             tasks: [],
             FormData: {},                 
           
             pictureImages: [] ,
             appendixImages: [], 
             showapprover: [],
             showcc: [],
             oldApprover: [],  
             oldCc: [],
             oldpictureImages: [],
             oldappendixImages: [],
             showparticipant: [],
             oldParticipant: [],
             oldProjectId: "",
             oldPickerId: "",
             projectDisabled: true,                     
         }
     }, 
     components: {
      ProjectName,     
      Picker,
      Picture,
      Document,      
      Approver,
      ParticipantUser,
      Cc,
      TeamMember
    }, 
    created(){      
        this.getTask();       
        this.getData();        
     },
     methods:{
        getProjectName(data) {   
          this.FormData.project_id = data;        
         },           
        getPickerName(data){
            this.FormData.principal = data;   
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
        getParticipantUser(data){
           this.showparticipant = data;
        },
        getCcUser(data){
          this.showcc = data;
        },
        async getTask(){ 
              let response = await authApi({
                  method: 'POST',
                  api: '/constructionmanagement/get_task',
                  params: {
                         id: '',
                         keyword: '',
                  }, 
                  data: {
                    view: false,
                 } 
              });
              if(response.status == 200){ 
                this.tasks = response.data.data;                
              }            
        },       
        async getData(){           
            this.loading = true;  
            let response = await authApi({
                method: 'POST',
                api: '/constructionmanagement/get_task',
                params: {
                       id: this.$route.params.id,
                       keyword: '',                     
                       page: "",
                       limit: "",
                },   
                data: {
                    view: false,
                } 
            });
            if(response.message){            
                this.FormData = response.data.data;     
                this.oldProjectId = this.FormData.project_id;  
                this.oldPickerId = this.FormData.principal;
                this.oldApprover = this.FormData.approver;  
                this.oldCc = this.FormData.cc;     
                this.oldParticipant = this.FormData.participant;     
                if(response.data.data.picture != null){
                const list= response.data.data.picture.images;
                this.oldpictureImages = list.map(v => ({...v, isSelected: true}));
                }
                if(response.data.data.appendix !=null ){
                const list1= response.data.data.appendix.documents;
                this.oldappendixImages = list1.map(v => ({...v, isSelected: true}));
                }   
                //console.log('data>'+ JSON.stringify(this.oldApprover)); 
                this.loading = false;  
            }          
        },   
        async updateData(e){ 
                this.submitting = true;
                this.FormData.participant= []; 
                this.showparticipant.forEach((value) => {
                    this.FormData.participant.push(value.roster_id);                
                });
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
                api: '/constructionmanagement/task',
                data: this.FormData 
            });
            if(response.status == 200){              
                const id = this.$route.params.id;
                const formData = new FormData();
                formData.append('task_id',id);
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
                api: '/constructionmanagement/task_datafiles',    
                data: formData
                });
                if(imgResponse.status == 200){                   
                    toast.success("Task Update successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
                    this.getData();
                    this.submitting = false;
                    this.$router.back();

                }
            }
        },
     }
     
 }
 </script>
