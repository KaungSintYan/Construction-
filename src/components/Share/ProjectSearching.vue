<template>
<div class="container-fluid my-2">
 <div class="row">
            <div class="col-md-8">
                <div class="container">
                <div class="row">
                        <div class="col-md-6">               
                            <div class="input-group">
                                <div class="input-group-prepend">
                                <div class="input-group-text"> 
                                    <font-awesome-icon icon="fa-solid fa-search" /></div>
                                </div>
                                <input type="text" class="form-control" v-model="formSearching" id="inlineFormInputGroup" :placeholder="$t('enter_keyword')"  v-on:keyup.enter="searching()">
                            </div>                 
                        </div>
                        <div class="col-md-6"> 
                            <div style="margin-top: 5px;">                
                                <el-button v-show="!showAdvanced" @click="searching()">{{ $t('search') }}</el-button> 
                                <span class="advanced_btn" @click="showAdvanced= !showAdvanced" v-show="advanced">{{ $t('advanced_search') }}</span>
                            </div>
                        </div> 
                </div>
                </div>                
            </div>
            <div class="col-md-4 mt-2" v-show="createBtn && !hideCreateBtn">
                <div class="" style="float: right;">
                    <router-link :to="`${routeName}create`">
                        <button type="button" class="btn btn-sm btn-success">                     
                            <font-awesome-icon icon="fa-solid fa-plus" /> <span class="ml-1">{{ $t('add') }}</span>                                            
                        </button>
                    </router-link>
                </div>                
            </div>
 </div>
  <div class="row my-2" v-show="showAdvanced && budget != true && showApply != true" >
    <!-- <div class="col-md-4">
        <div class="form-group">
            <label for="state">
                <small><b>{{ $t('state') }}</b></small>
            </label>
            <el-select class="" style="width: 100%;" id="state" v-model="FormData.archive_status" @change="searching()">                          
                <el-option value="all">All</el-option>
                <el-option value=False >Unarchived</el-option>            
                <el-option value=True >Archived</el-option>                                            
            </el-select>
        </div>
    </div>  -->
    <div class="col-md-4">
        <div class="row mx-1 pb-2">
            <small><b>{{$t('start_date')}}</b></small>
        </div>
        <div class="row mx-1">    
        <el-date-picker
                            v-model="start_date"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="Start date"
                            end-placeholder="End date"                          
                            size="large" @change="searching()"
                        />
        </div>
    </div>
    <div class="col-md-4">
        <div class="row mx-1 pb-2">
            <small><b>{{ $t('completion_date') }}</b></small>
        </div>
        <div class="row mx-1">    
        <el-date-picker
                            v-model="end_date"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="Start date"
                            end-placeholder="End date"                           
                            size="large" @change="searching()"
                        />
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group mb-3 mt-2">
            <label for="type_of_section">
                <small><b>{{ $t('types_of_section') }}</b></small>
            </label>
            <el-select class="" style="width: 100%;" id="type_of_section" v-model="FormData.section_type">                          
                    <el-option value="">{{ $t('please_choose') }}</el-option>
                    <el-option v-for="obj of sectiontype" :key="obj.section_type_id" :label="obj.section_name" :value="obj.section_type_id">{{ obj.section_name }}</el-option>                           
            </el-select>
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group mb-3 mt-2">
            <label for="project_status">
                <span class="text-danger">*</span> <small><b>{{ $t('project_status') }}</b></small> 
            </label>                    
            <!-- <el-select class="" style="width: 100%;" id="project_status" v-model="FormData.project_status">                          
                    <el-option value="">{{$t('please_choose')}}</el-option>
                    <el-option v-for="obj of projectStatus" :key="obj.project_status_id" :value="obj.project_status_id">{{ obj.project_status_name }}</el-option>                           
            </el-select> -->

            <el-select style="width: 100%" id="project_status" v-model="FormData.project_status">
                <el-option label="Pending" value="pending">Pending</el-option>
                <el-option label="On Going" value="on_going">On Going</el-option>
                <el-option label="Overdue" value="overdue">Overdue</el-option>
                <el-option label="Completed" value="completed">Completed</el-option>
            </el-select>
        </div>
    </div>
  </div>
  <div class="row my-2" v-show="showAdvanced && (budget == true || showApply == true)">
    <div class="col-md-4">
        <ProjectName @projectData="getProjectName($event)"  />    
    </div>
    <!-- <div class="col-md-4">
        <div class="form-group">
            <label for="state">
                <small><b>{{ $t('state') }}</b></small>
            </label>
            <div class="form-group">
                <el-select class="" style="width: 100%;" v-model="BudgetFormData.approval_status" @click="searching()">
                    <el-option value=""> All </el-option>
                    <el-option v-for="(app, i) in approval" :key="i" :value="app.key"> {{ app.value }}</el-option>                                      
                </el-select>
            </div>
           
        </div>
    </div>  -->

    <div class="col-md-4" v-show="budget">
        <div class="row mx-1 pb-2">
            <small><b>{{ $t('creation_date') }}</b></small>
        </div>
        <div class="row mx-1">    
        <el-date-picker
                            v-model="budget_creation_date"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="Start date"
                            end-placeholder="End date"                          
                            size="large" @change="searching()"
                        />
        </div>
    </div>
    
    <div class="col-md-4" v-show="showApply">
        <div class="row mx-1 pb-2">
            <small><b>{{ $t('app_date') }}</b></small>
        </div>
        <div class="row mx-1">    
        <el-date-picker
                            v-model="application_date"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="Start date"
                            end-placeholder="End date"                          
                            size="large" @change="searching()"
                        />
        </div>
    </div>
    <div class="col-md-4" v-show="showApply">        
        <Department @departmentData="getDepartmentName($event)"  />    
    </div>
    <div class="col-md-4" v-show="showApply">
        <div class="form-group">
            <label for="seal_type">
                <small><b>{{ $t('seal_type') }}</b></small>
            </label>            
            <el-select class="" style="width: 100%;" id="seal_type" v-model="ApplyFormData.seal_type">
                <el-option value="">{{ $t('please_choose') }}</el-option>
                <el-option v-for="obj of sealType" :key="obj.seal_type_id" :label="obj.seal_type_name" :value="obj.seal_type_id">{{ obj.seal_type_name }}</el-option>         
            </el-select>
        </div>
    </div>
    
  </div>
  <div class="row mx-2"  v-show="showAdvanced">
    <button class="btn btn-primary mr-2" @click="searching()">{{ $t('search') }}</button>
    <span class="search_btn" @click="reset()">{{ $t('reset') }}</span> 
  </div>
</div>

 
</template>
<script>
import {authApi} from '@/http/authApi'
import ProjectName from '@/components/Share/ProjectName.vue';
import Department from '@/components/Share/Department.vue';

export default {
    name: "Searching",
    props: ['api', 'advanced','createBtn', 'hideCreateBtn', 'routeName', 'budget', 'showApply'],
    data() {
        return {
            loading: true,
            formSearching: "",
            showAdvanced: false,             
            FormData: {
                start_date:{
                    min_date:"",
                    max_date:""
                },
                end_date:{
                    min_date:"",
                    max_date:""
                },
                archive_status: "all",
                section_type: "",
                project_status: "", 
                seal_type: "",       
            },
            start_date: "",
            end_date: "",
            approval: [
                {key: 'approval', value: 'Approval'},
                {key: 'approved', value: 'Approved'},
                {key: 'approval_rejected', value: 'Approval Rejected'},
                {key: 'revoked', value: 'Revoked'},
                {key: 'draft', value: 'Draft'},
            ],
            BudgetFormData: {
                approval_status: "",
                creation_date: {
                    min_date: "",
                    max_date: "",
                },
                project_id: ""
            },
            budget_creation_date: "",  
            ApplyFormData: {
                application_date: {
                    min_date: "",
                    max_date: ""
                },
                approval_status: "",
                printing_department: "",
                seal_type: "",
                project_id: ""
            },
            application_date: "",
            sectiontype: "",
            projectStatus: "",
            sealType: "",
            seal_type_id:""
        }
    },  
    components: {
      ProjectName, 
      Department
    },  
    created(){           
        this.getSectiontype();
        this.getProjectstatus();
        this.getSealType();
    },
    methods:{ 
        async getSealType(){
            let response = await authApi({
                method: 'GET',
                api: '/sealtype',
                params: {                       
                      name: ""
                } 
                // params: {                       
                //       seal_type_id: this.$route.params.id,
                //       view: 1
                // }                
            });
            if(response.status == 200){
                //console.log('result'+ JSON.stringify(response.data.data))
                this.sealType = response.data.data;
            }
        },
        getDepartmentName(data){
            this.ApplyFormData.printing_department = data;
        },
        getProjectName(data) {   
         this.BudgetFormData.project_id = data;  
         this.ApplyFormData.project_id = data;       
        }, 
        reset(){
            this.start_date="";
            this.end_date="";
            this.FormData.start_date.min_date="";
            this.FormData.start_date.max_date="";
            this.FormData.end_date.min_date="";
            this.FormData.end_date.max_date="";
            this.FormData.archive_status="";
            this.FormData.section_type="";
            this.FormData.project_status="";      
            this.searching();      
        },
        async getProjectstatus(){        
        let response = await authApi({
                method: 'GET',
                api: '/projectstatus',
                params: {                       
                      name: ""
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
        convertDate(value){
             const d = new Date(value);
             let date= d.getDate();
             let month = d.getUTCMonth()+1;
             let year = d.getFullYear();
             let format= year+ '-'+ month + '-'+ date;
             return format;             
        },
        async searching(){
           
            let FormData = "";
            if(this.budget){   
                           
                if(this.budget_creation_date != "" && this.budget_creation_date != null){
                    let start_min_date= this.convertDate(this.budget_creation_date[0]);
                    let start_max_date = this.convertDate(this.budget_creation_date[1]);
                    this.BudgetFormData.creation_date.min_date= start_min_date;
                    this.BudgetFormData.creation_date.max_date = start_max_date;
                }
                else{
                    this.BudgetFormData.creation_date.min_date= "";
                    this.BudgetFormData.creation_date.max_date = "";
                }
                FormData = this.BudgetFormData;
              
            }
            if(this.showApply){
                if(this.application_date != "" && this.application_date != null){
                    let start_min_date= this.convertDate(this.application_date[0]);
                    let start_max_date = this.convertDate(this.application_date[1]);
                    this.ApplyFormData.application_date.min_date= start_min_date;
                    this.ApplyFormData.application_date.max_date = start_max_date;
                }
                else{
                    this.ApplyFormData.application_date.min_date= "";
                    this.ApplyFormData.application_date.max_date = "";
                }
                this.ApplyFormData.approval_status= this.BudgetFormData.approval_status;
                FormData = this.ApplyFormData;
              
            }
            if(this.budget != true && this.showApply != true){
                if(this.start_date != ""){
                    let start_min_date= this.convertDate(this.start_date[0]);
                    let start_max_date = this.convertDate(this.start_date[1]);
                    this.FormData.start_date.min_date= start_min_date;
                    this.FormData.start_date.max_date = start_max_date;
                }
                if(this.end_date != ""){
                    let end_min_date= this.convertDate(this.end_date[0]);
                    let end_max_date = this.convertDate(this.end_date[1]);
                    this.FormData.end_date.min_date= end_min_date;
                    this.FormData.end_date.max_date = end_max_date;               
                } 
                FormData =  this.FormData;
              
            }             
             let response = await authApi({
                        method: "POST",
                        api: this.api,
                        params: {
                            id: '',                       
                            keyword: this.formSearching,                                             
                            page: '',
                            limit: ''
                        },
                        data: FormData
                        });
                        if(response.message){
                            let data= response.data.data;
                            let total = response.data.total;
                            let searching = {data: data, total: total};
                            this.$emit("searchingData", searching);
                        }                 
        }, 
    },
}
</script>
<style>
.search_btn {
    padding: 10px 15px;
    font-size: 12px;
    border-radius: 3px;
    border: 1px solid #ddd;
}
.advanced_btn {
    font-size: 12px;
    margin-left: 5px;
    color: blue;
}
</style>