<template>
   <div class="container-fluid"  @click="$store.commit('setActive', false)">   
    <form @submit.prevent="createData">
    <div class="row">
        <div class="col-md-12">           
                    <div class="form-group mb-3">
                        <label for="project_name">
                            <span class="text-danger">*</span> <small><b>{{ $t('project_name') }}</b></small> 
                        </label>
                        <el-input type="text" :placeholder="$t('please_enter')" id="project_name" v-model="FormData.project_name" clearable/>
                        <!-- <span v-if="v$.FormData.project_name.$error" class="text-danger">
                            <span v-if="v$.FormData.project_name.$errors[0].$message != ''">
                                {{ $t('is_required',{'name': $t('project_name')}) }}
                            </span>
                        </span> -->
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

                    <TypeOfSection @SectionData="getSectionData($event)" />

                    <Client :titleHeader="$t('party_a_unit')" @clientData="getClientData($event)" />
                    <span v-if="v$.FormData.client.$error" class="text-danger">
                        <span v-if="v$.FormData.client.$errors[0].$message != ''">
                            {{ $t('is_required',{'name': $t('contract_party')}) }}
                        </span>
                    </span>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group mb-3">
                                <label for="start_date">
                                    <span class="text-danger">*</span> <small><b>{{ $t('start_date') }}</b></small>  
                                </label>
                                
                                <el-date-picker v-model="FormData.start_date" id="start_date" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                                :placeholder="$t('pick_a_day')" size="default"  style="width: 100%;" />
                                <span v-if="v$.FormData.start_date.$error" class="text-danger">
                                    <span v-if="v$.FormData.start_date.$errors[0].$message != ''">
                                        {{ $t('is_required',{'name': $t('start_date')}) }}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-3">
                                <label for="completion_date">
                                    <small><b>{{ $t('completion_date') }}</b></small> 
                                </label>
                                <el-date-picker v-model="FormData.completion_date" id="completion_date" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                                :placeholder="$t('pick_a_day')" size="default"  style="width: 100%;"   />
                                <span v-if="v$.FormData.completion_date.$error" class="text-danger">
                                    <span v-if="v$.FormData.completion_date.$errors[0].$message != ''">
                                        {{ $t('is_required',{'name': $t('completion_date')}) }}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group mb-3">
                        <label for="project_status">
                            <span class="text-danger">*</span> <small><b>{{ $t('project_status') }}</b></small> 
                        </label>                    
                        <!-- <el-select style="width: 100%;" id="project_status" v-model="FormData.project_status">                          
                                <el-option value="">{{$t('please_choose')}}</el-option>
                                <el-option v-for="obj of projectStatus" :key="obj.project_status_id" :label="obj.project_status_name" :value="obj.project_status_id">{{ obj.project_status_name }}</el-option>                           
                        </el-select> -->
                        <el-select style="width: 100%" id="project_status" v-model="FormData.project_status">
                            <el-option label="Pending" value="pending">Pending</el-option>
                            <el-option label="On Going" value="on_going">On Going</el-option>
                            <el-option label="Overdue" value="overdue">Overdue</el-option>
                            <el-option label="Completed" value="completed">Completed</el-option>
                        </el-select>
                        <!-- <span v-if="v$.FormData.project_status.$error" class="text-danger">
                            <span v-if="v$.FormData.project_status.$errors[0].$message != ''">
                                {{ $t('is_required',{'name': $t('project_status')}) }}
                            </span>
                            
                        </span> -->
                    </div>

                    <div class="form-group mb-3">
                        <label for="participation_status">
                            <span class="text-danger">*</span> <small><b>{{ $t('participation_status') }}</b></small>
                        </label>                    
                        <el-select style="width: 100%;" id="participation_status" v-model="FormData.participation_status"> 
                                <el-option label="Participate" value="participate">Participate</el-option>  
                                <el-option label="Not Involved" value="not_involved">Not Involved</el-option>                            
                        </el-select>
                        <span v-if="v$.FormData.participation_status.$error" class="text-danger">
                            <span v-if="v$.FormData.participation_status.$errors[0].$message != ''">
                                {{ $t('is_required',{'name': $t('participation_status')}) }}
                            </span>
                            
                        </span> 
                    </div>

                    <div class="form-group mb-3">
                        <label for="fund_beginning_project">
                            <span class="text-danger">*</span> <small><b>{{ $t('fund_beginning_project') }}</b></small>
                        </label>
                        <el-input id="fund_beginning_project" type="number" :placeholder="$t('please_enter')" v-model="FormData.fund_begining_projects" clearable/>
                        <span v-if="v$.FormData.fund_begining_projects.$error" class="text-danger">
                            <span v-if="v$.FormData.fund_begining_projects.$errors[0].$message">
                                {{ $t('is_required',{'name': $t('fund_beginning_project')}) }}
                            </span>
                        </span>
                    </div>
                    <div class="form-group mb-3">
                        <label for="fund_of_material">
                            <span class="text-danger">*</span> <small><b>{{ $t('fund_of_material') }}</b></small>
                        </label>
                        <el-input id="fund_of_material" type="number" :placeholder="$t('please_enter')" v-model="FormData.fund_of_material" clearable/>
                        <span v-if="v$.FormData.fund_of_material.$error" class="text-danger">
                            <span v-if="v$.FormData.fund_of_material.$errors[0].$message != ''">
                                {{ $t('is_required',{'name': $t('fund_of_material')}) }}
                            </span>
                        </span>
                    </div>

                    <div class="form-group mb-3">
                        <label for="construction_unit">
                            <small><b>{{ $t('construction_unit') }}</b></small>
                        </label>
                        <el-select style="width: 100%;" id="construction_unit" v-model="FormData.construction_unit">
                                <el-option v-for="obj of constructionUnit" :key="obj.unitid" :label="obj.unitname" :value="obj.unitid">{{ obj.unitname }}</el-option>                           
                        </el-select>
                        <span v-if="v$.FormData.construction_unit.$error" class="text-danger">
                            <span v-if="v$.FormData.construction_unit.$errors[0].$message != ''">
                                {{ $t('is_required',{'name': $t('construction_unit')}) }}
                            </span>
                        </span>
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
                        <el-input id="project_overview" v-model="FormData.project_overview" maxlength="100" 
                        :placeholder="$t('please_enter')" show-word-limit type="textarea"/>
                        
                    </div>

                    <div class="form-group mb-5">
                        <label for="remark">
                            <small><b>{{ $t('remark') }}</b></small>
                        </label>
                         <el-input id="remark" v-model="FormData.remark" :placeholder="$t('please_enter')" maxlength="100" show-word-limit type="textarea"/> 
                        
                    </div>

                    <Picture @picture="getPicture($event)" />
                    <Document @appendix="getDocument($event)" /> 
                    <el-timeline>
                                <el-timeline-item>
                                <Approver :titleName="$t('project_manager')" @approverUser="getApproverUser($event)" />
                                </el-timeline-item>
                                <el-timeline-item>
                                    <Cc :titleName="$t('project_member')" @ccUser="getCcUser($event)" />
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
import useValidate from '@vuelidate/core'
import {required} from '@vuelidate/validators'
import Client from '@/components/Share/Client.vue';
import Picture from '@/components/Share/Picture.vue';
import Document from '@/components/Share/Document.vue';
import Approver from '@/components/Share/ApproverUser.vue';
import Cc from '@/components/Share/CcUser.vue';
import TypeOfSection from '@/components/Share/TypeOfSection.vue';
export function validName(name){
    let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
    if(validNamePattern.test(name)){
        return true;
    }
    return false;
}
export default {
    name: 'ProjectCreate',
    data() {
        return {
            typeOfSectionDialog: false,
            loading: true,
            v$: useValidate(),
            submitting: false,
            data: [],
           
             FormData: {  
                project_name: "",
                project_code: "",
                project_itemid: "", 
                section_type: "",
                client: "",
                start_date: "",
                completion_date: "",
                project_status: "",
                construction_unit: "",
                construction_address: "",
                project_overview: "",
                remark: "",   
                participation_status: "",
                fund_begining_projects: "" ,
                fund_of_material: "",
                project_manager: [],
                project_member: [],
                picture: null,
                appendix: null
                },   
            sectiontype: '',
            projectStatus: "",
            constructionUnit: "", 

            pictureImages: [] ,
            appendixImages: [], 
            showapprover: [],
            showcc: [],
            titleName: "",
        }
    },
    validations() {
        return {
            FormData: {
                client: {
                    required, 
                    },
                    
                completion_date: {
                    required
                },
                construction_unit: {
                    required,
                },
                fund_begining_projects: {
                    required,
                },
                fund_of_material: {
                    required,
                },
                participation_status: {
                    required,
                },
                // project_name: {
                //     required, name_validation: {
                //         $validator: validName,
                //     },
                // },
                // project_status: {
                //     required,
                // },
                section_type: {
                    required,
                },
                start_date: {
                    required,
                },
            }
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
        
       async createData(e){ 
            this.v$.$validate(); // checks all inputs
            if (this.v$.$error) {
                return;
            }
            this.submitting = true;
            this.showapprover.forEach((value) => {
                this.FormData.project_manager.push(value.userid);                
            }); 
            this.showcc.forEach((value) => {
                this.FormData.project_member.push(value.userid); 
            }); 
            
            let response = await authApi({
                method: 'POST',
                api: '/projectmanagement/project',
                params: {
                       id: '',
                       keyword: '',                   
                       page: '',
                       limit: ''
                },
                data: this.FormData
            });
            if(response.status == 201){  
                const id = response.data.project_id; 
                const imgformData = new FormData();
                imgformData.append('project_id',id);
                this.pictureImages.forEach((value) => {
                     imgformData.append('picture', value.url);   
                });
                this.appendixImages.forEach((value) => {
                    imgformData.append('appendix', value.url);  
                }); 
                let imgResponse = await authApi({
                method: 'POST',
                api: '/projectmanagement/project_datafiles',               
                data: imgformData
                });
                if(imgResponse.status == 200){ 
                    this.submitting = false;
                    e.target.reset();                   
                    toast.success("Project insert successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
                    this.$router.back();
                }
                
            }
       }
    }
    
}
</script>
