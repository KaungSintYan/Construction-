<template>
    <div class="container-fluid"  @click="$store.commit('setActive', false)">   
    <form @submit.prevent="createData"  enctype="multipart/form-data">
        <div class="row">
            <div class="col-md-12"> 
                        <ProjectName @projectData="getProjectName($event)"  />   
                        <span v-if="v$.FormData.project_id.$error" class="text-danger">
                            <span v-if="v$.FormData.project_id.$errors[0].$message != ''">
                                {{ $t('is_required', {'name': $t('project')}) }}
                            </span>
                        </span>
                        
                        <div class="form-group mb-3">
                            <label for="item_number">
                                <span class="text-danger">*</span> <small><b>{{ $t('span_title') }}</b></small> 
                            </label>
                            <el-input type="text" :placeholder="$t('please_enter')" class="" id="item_number" v-model="FormData.title" clearable/>
                            <!-- <span v-if="v$.FormData.title.$error" class="text-danger">
                                <span v-if="v$.FormData.title.$errors[0].$message != ''">
                                    {{ $t('is_required', {'name': $t('span_title')}) }}
                                </span>
                                
                            </span> -->
                        </div>

                        <div class="col-md-3 m-0 p-0">
                            <div class="form-group mb-3">
                                <label for="date_of_app">
                                    <span class="text-danger">*</span> <small><b>{{ $t('date_of_app') }}</b></small>
                                </label>
                                <el-date-picker v-model="FormData.application_date"  id="date_of_app" type="date" 
                                format="YYYY-MM-DD" value-format="YYYY-MM-DD" :placeholder="$t('pick_a_day')" size="default"  style="width: 100%;" editable clearable  />
                            </div>
                        </div>

                        <!-- <PickerName :titleHeader="titleHeader" @pickerData="getPickerName($event)" />  
                        <span v-if="v$.FormData.applicant_id.$error" class="text-danger">
                            <span v-if="v$.FormData.applicant_id.$errors[0].$message != ''">
                                {{ $t('is_required', {'name': $t('titleHeader')}) }}
                            </span>
                        </span> -->
                        
                        <OfficeDepartment :titledepartment="titledepartment" @officeDepData="getDepartmentName($event)" /> 

                        <div class="form-group mb-3">
                            <label for="print_file_name">
                                <small><b>{{ $t ('print_file_name') }}</b></small> 
                            </label>
                            <el-input type="text" id="print_file_name" class="" :placeholder="$t('please_enter')" v-model="FormData.print_file_name" clearable/>
                            <span v-if="v$.FormData.print_file_name.$error" class="text-danger">
                                <span v-if="v$.FormData.print_file_name.$errors[0].$message != ''">
                                    {{ $t('is_required', {'name': $t('print_file_name')}) }}
                                </span>
                                
                            </span>
                        </div>

                        <div class="form-group mb-3">
                            <label for="number_of_copies">
                                <span class="text-danger">*</span> <small><b>{{ $t('number_copies') }}</b></small>
                            </label>
                            <el-input type="number" id="number_of_copies" class="" :placeholder="$t('please_enter')" v-model="FormData.number_of_copies" clearable/>
                            <span v-if="v$.FormData.number_of_copies.$error" class="text-danger">
                                <span v-if="v$.FormData.number_of_copies.$errors[0].$message != ''">
                                    {{ $t('is_required', {'name': $t('number_copies')}) }}
                                </span>
                            </span>
                        </div>

                        <div class="form-group mb-3">
                            <label for="print">
                                <small><b>{{ $t('print') }}</b></small>
                            </label>
                            <el-select class="" style="width: 100%;" id="print" v-model="FormData.printtype">                              
                                <el-option label="Cover Now" value="cover_now">Cover Now</el-option>
                                <el-option label="Take Away" value="take_away">Take Away</el-option>
                            </el-select>
                            <span v-if="v$.FormData.printtype.$error" class="text-danger">
                                <span v-if="v$.FormData.printtype.$errors[0].$message != ''">
                                    {{ $t('is_required', {'name': $t('print')}) }}
                                </span>
                                
                            </span>
                        </div>

                        <!-- <div class="form-group mb-3">
                            <label for="seal_type">
                                <span class="text-danger">*</span> <small><b>{{ $t('seal_type') }}</b></small>
                            </label>
                            
                            <el-select class="" style="width: 100%;" id="seal_type" v-model="FormData.seal_type">                               
                                <el-option v-for="obj of sealType" :key="obj.seal_type_id" :label="obj.seal_type_name" :value="obj.seal_type_id">{{ obj.seal_type_name }}</el-option>         
                            </el-select>

                            <span v-if="v$.FormData.seal_type.$error" class="text-danger">
                                <span v-if="v$.FormData.seal_type.$errors[0].$message != ''">
                                    {{ $t('is_required', {'name': $t('seal_type')}) }}
                                </span>
                            </span>

                        </div> -->

                        <SealType @SealData="getSealData($event)" />

                        <div class="form-group mb-3">
                            <label for="instruction_in_print">
                                <small><b>{{ $t('instruction_print') }}</b></small> 
                            </label>
                            <el-input type="text" id="instruction_in_print" class="" :placeholder="$t('please_enter')" v-model="FormData.instructions_in_print" clearable/>
                        </div>
    
                        <div class="form-group mb-3">
                            <label for="remark">
                                <small><b>{{ $t('remark') }}</b></small>
                            </label>
                         <el-input id="remark" v-model="FormData.remark" :placeholder="$t('please_enter')" maxlength="100" show-word-limit type="textarea"/> 
                        </div>

                        <Picture @picture="getPicture($event)" />
                        <Document @appendix="getDocument($event)" /> 
                        
                        <el-timeline>
                                    <el-timeline-item>
                                        <Approver @approverUser="getApproverUser($event)" />
                                    </el-timeline-item>
                                    <el-timeline-item>
                                        <Cc @ccUser="getCcUser($event)" />
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
import ProjectName from '@/components/Share/ProjectName.vue';
import PickerName from '@/components/Share/PickerName.vue';
import OfficeDepartment from '@/components/Share/OfficeDepartment.vue';
import Picture from '@/components/Share/Picture.vue';
import Document from '@/components/Share/Document.vue';
import Approver from '@/components/Share/ApproverUser.vue';
import Cc from '@/components/Share/CcUser.vue';
import SealType from '@/components/Share/SealType.vue'

export function validName(name){
    let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
    if(validNamePattern.test(name)){
        return true;
    }
    return false;
}

export default {
     name: 'ApplyCreate',
     data() {
         return {
            v$: useValidate(),
            submitting: false,
            data: [],
            FormData: {            
                    title: "",
                    odd_number: "",
                    application_date: "",
                    // application_date: new Date().toISOString().slice(0,10),
                    applicant_id: '',
                    printing_department: [],
                    print_file_name: "",
                    number_of_copies: "",
                    printtype: "",
                    instructions_in_print: "",
                    seal_type: "",
                    remark: "", 
                    picture: null,
                    appendix: null, 
                    approver: [],
                    cc: [],                        
                    creation_time: "",
                    project_id: "", 
                    created_by_user: ""   
                   
            },
            project_name: "",
            pageCount: 1,
            pageCountActive: 1,
            selectedCount: 0,
            formSearching: "",            
            seal_type: [],         
            pictureImages: [] ,
            appendixImages: [], 
            showapprover: [],
            showcc: [],
            titleHeader: 'applicant',
            titledepartment: 'printing department',
         }
     },
     components: {
      ProjectName, 
      PickerName,
      OfficeDepartment,  
      Picture,
      Document,
      Approver,
      Cc,
      SealType 
    }, 
    validations() {
        return {
            FormData: {
                // applicant_id: {
                //     required,
                // },
                number_of_copies: {
                    required,
                },
                print_file_name: {
                    required,
                },
                printtype: {
                    required,
                },
                project_id: {
                    required,
                },

            }
        }
     },
     created(){        
       
         this.getSealType();
     },
     methods:{
        getProjectName(data) {   
         this.FormData.project_id = data;        
        },      
        // getPickerName(data){
        //     this.FormData.applicant_id = data;   
        // },  
        getDepartmentName(data){
            this.getDepartment(data);           
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
          console.log(data); 
        },
        getSealData(data){
            this.FormData.seal_type = data; 
            console.log(data); 
        },
        async getDepartment(data){   
           // this.FormData.printing_department= data;      
            let response = await authApi({
                method: 'GET',
                api: '/departmentsforappcc',
                params: {
                       id: '',                       
                       keyword: '',             
                       page: '',
                       limit: ''
                }   
            });
            if(response.message){            
                const list= response.data.data; 
                let dep = [];
                for(let i=0; i< list.length; i++){ 
                    let off= {
                          office_id: list[i].departments[0].office_id,
                          departments: []  
                    }                   
                    for(let j=0; j< list[i].departments.length; j++){
                        
                        off.departments.push(list[i].departments[j].departmentid);          
                    }
                    dep.push(off);                    
                }
                let new_printing_dep=[];
                for(let k=0; k< dep.length; k++){
                    let off= {
                          office_id: dep[k].office_id,
                          departments: []  
                    }                   
                    for(let j=0; j< dep[k].departments.length; j++){
                        console.log(dep[k].departments[j])    
                        let id= data.find(x=> x.departmentid == dep[k].departments[j]);  
                        if(id){
                            off.departments.push(dep[k].departments[j]);  
                        }    
                    }
                    new_printing_dep.push(off);
                }
                this.FormData.printing_department= new_printing_dep;
                // console.log('dep'+ JSON.stringify(new_printing_dep))          
                // console.log('dep'+ JSON.stringify(data))                                  
 
            }
        }, 

        async getSealType(){
            let response = await authApi({
                method: 'GET',
                api: '/sealtype', 
                params: {
                    name: "",                    
                }                
            });
            if(response.status == 200){
                // console.log('result'+ JSON.stringify(response.data.data))
                this.seal_type = response.data.data;
                // this.loading = false; 
            }
        },
         async createData(){
            // console.log(this.sealType); 
            
            this.v$.$validate(); // check all inputs 
            if (this.v$.$error) {
                this.submitting= true;
                return;
                }
              
            this.showapprover.forEach((value) => {
                this.FormData.approver.push(value.userid);                
            }); 
            this.showcc.forEach((value) => {
                this.FormData.cc.push(value.userid); 
            });   
        //    console.log(this.FormData); 
            let response = await authApi({
                method: 'POST',
                api: '/projectmanagement/applicationforprint',
                data: this.FormData,     
             
            });
            if(response.status == 201){         
                // console.log(this.FormData + "888");        
                const id = response.data.application_id; 
                const imgformData = new FormData();
                imgformData.append('application_id',id);
                this.pictureImages.forEach((value) => {
                     imgformData.append('picture', value.url);   
                }); 
                this.appendixImages.forEach((value) => {
                    imgformData.append('appendix', value.url);  
                });   
                
                let imgResponse = await authApi({
                method: 'POST',
                api: '/projectmanagement/application_datafiles',               
                data: imgformData
                });
                if(imgResponse.status == 200){  
                    this.submitting = false;                  
                    toast.success("Apply with seal insert successful !", {
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
 