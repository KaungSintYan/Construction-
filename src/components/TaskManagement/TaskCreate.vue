<template>
    <div class="container-fluid"  @click="$store.commit('setActive', false)">   
        <form  @submit.prevent="createData">  
            <div class="row">
                <div class="col-md-12">             
                    
                            <ProjectName :oldProjectId="oldProjectId"  @projectData="getProjectName($event)" />
                            <span v-if="v$.FormData.project_id.$error" class="text-danger">
                                <span v-if="v$.FormData.project_id.$errors[0].$message != ''">
                                    {{ $t('is_required',{'name': $t('project')}) }}
                                </span>
                            </span>

                            <div class="form-group mb-3 mt-3">
                                <label for="mission_name">
                                    <span class="text-danger">*</span> <small><b> {{ $t('mission_name') }} </b></small>
                                </label>
                                <el-input type="text"  id="mission_name" :placeholder="$t('please_enter')"
                                v-model="FormData.name" clearable />
                            </div>
                            <div class="form-group mb-3">
                                <div class="form-group">
                                    <label for="superior_task"> <small><b> {{ $t('superior_task') }} </b></small> </label>
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
                                                       
                            <Picker :titleName="$t('principal')" @pickerData="getPickerName($event)"  />
                            <span v-if="v$.FormData.principal.$error" class="text-danger">
                                <span v-if="v$.FormData.principal.$errors[0].$message != ''">
                                    {{ $t('is_required',{'name': $t('team_leader')}) }}
                                </span>
                            </span>

                            <!-- <ParticipantUser @participantUser="getParticipantUser($event)" />                              -->
                            <TeamMember :titleName="$t('participant')" @teamMember="getTeamMember($event)" />

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
                            <Picture @picture="getPicture($event)" />
                            <Document @appendix="getDocument($event)" /> 
                            <!-- <el-timeline>
                                <el-timeline-item>
                                <Approver @approverUser="getApproverUser($event)" />
                                </el-timeline-item>
                                <el-timeline-item>
                                    <Cc @ccUser="getCcUser($event)" />
                                </el-timeline-item>
                            </el-timeline>  -->
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
import ParticipantUser from '@/components/Share/ParticipantUser.vue';
import TeamMember from '@/components/Share/TeamMember.vue'
import Cc from '@/components/Share/CcUser.vue';    
import useValidate from '@vuelidate/core';
import {required} from '@vuelidate/validators'

export function validName(name){
    let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
    if(validNamePattern.test(name)){
        return true;
    }
    return false;
}

 export default {
     name: 'TaskCreate',     
     data() {
         return {
            v$: useValidate(),
             submitting: false,
             FormData: {                       
                        name: "",
                        superior_task: "",       
                        start_date: "",
                        end_date: "",                                       
                        // start_date:  new Date().toISOString().slice(0,10),
                        // end_date:  new Date().toISOString().slice(0,10),
                        description: "",                                          
                        remark: "",        
                        picture: null,
                        appendix: null,
                        approver:[],
                        cc: [],                        
                        creation_time: "", 
                        project_id: "",    
                        principal: "",   
                        participant: [],                 
                        created_by_user: ""       
            },                    
            pictureImages: [] ,
            appendixImages: [], 
            showapprover: [],
            showParticipant: [],
            showcc: [], 
            tasks: [],
            oldProjectId: "",                        
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
    validations(){
        return {
            FormData : {
                principal : {
                    required,
                },
                project_id : {
                    required,
                }
            }
        }
    },  
    created(){         
        this.getTask(); 
     },
     methods:{ 
        getTeamMember(data){
            this.showParticipant = data;
        },
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
        // getParticipantUser(data){
        //    this.showParticipant = data;
        // },
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
              });
              if(response.status == 200){ 
                this.tasks = response.data.data;                
              }
            
        },
         
       async createData(e){  
            this.submitting = true;
            this.v$.$validate();
            if(this.v$.$error){
                this.submitting = false;
                return;
            }
            this.showParticipant.forEach((value) => {
                this.FormData.participant.push(value.roster_id);                
            });
            this.showapprover.forEach((value) => {
                this.FormData.approver.push(value.userid);                
            }); 
            this.showcc.forEach((value) => {
                this.FormData.cc.push(value.userid); 
            });  
            let response = await authApi({
                method: 'POST',
                api: '/constructionmanagement/task',
                data: this.FormData 
            });
            if(response.status == 201){              
              //console.log(response.data.revenue_contract_id);
                const id = response.data.task_id; 
                const imgformData = new FormData();
                imgformData.append('task_id',id);
                this.pictureImages.forEach((value) => {
                     imgformData.append('picture', value.url);   
                });
                this.appendixImages.forEach((value) => {
                    imgformData.append('appendix', value.url);  
                });   
            
                let imgResponse = await authApi({
                method: 'POST',
                api: '/constructionmanagement/task_datafiles',    
                data: imgformData
                });
                if(imgResponse.status == 200){                   
                    toast.success("Plan Insert successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
                    this.submitting = false;
                    this.$router.back(); 
                }
            }
        },
     }     
 }
 </script>
