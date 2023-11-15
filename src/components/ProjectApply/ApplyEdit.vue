<template>
     <div v-loading="loading" class="loading__div" v-if="loading"></div> 
    <div class="container-fluid" @click="$store.commit('setActive', false)" v-if="!loading">  
    <form @submit.prevent="updateData">
        <div class="row">
            <div class="col-md-12"> 
                        <ProjectName  :oldProjectId="oldProjectId" @projectData="getProjectName($event)"  />    
                        <div class="form-group mb-3">
                            <label for="item_number">
                                <span class="text-danger">*</span> <small><b>{{ $t('span_title') }}</b></small> 
                            </label>
                            <el-input type="text" :placeholder="$t('please_enter')" class="" id="item_number" v-model="FormData.title" clearable/>
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
                        
                        <!-- <PickerName :oldPickerId="oldPickerId" :titleHeader="titleHeader" @pickerData="getPickerName($event)" />     -->
                        <!-- <Department :oldDepartmentId="oldDepartmentId" :titledepartment="titledepartment" @departmentData="getDepartmentName($event)" />  -->
                        <OfficeDepartment :oldDepartmentId="oldDepartmentId" :oldOfficeId="oldOfficeId" :titledepartment="titledepartment" @officeDepData="getDepartmentName($event)" /> 

                        <div class="form-group mb-3">
                            <label for="print_file_name">
                                <small><b>{{ $t ('print_file_name') }}</b></small> 
                            </label>
                            <el-input type="text" id="print_file_name" class="" :placeholder="$t('please_enter')" v-model="FormData.print_file_name" clearable/>
                        </div>

                        <div class="form-group mb-3">
                            <label for="number_of_copies">
                                <span class="text-danger">*</span> <small><b>{{ $t('number_copies') }}</b></small>
                            </label>
                            <el-input type="number" id="number_of_copies" class="" :placeholder="$t('please_enter')" v-model="FormData.number_of_copies" clearable/>
                        </div>

                        <div class="form-group mb-3">
                            <label for="print">
                                <small><b>{{ $t('print') }}</b></small>
                            </label>
                            <el-select class="" style="width: 100%;" id="print" v-model="FormData.printtype">                               
                                <el-option label="Cover Now" value="cover_now">Cover Now</el-option>
                                <el-option label="Take Away" value="take_away">Take Away</el-option>
                            </el-select>
                        </div>

                        <div class="form-group mb-3">
                            <label for="seal_type">
                                <span class="text-danger">*</span> <small><b>{{ $t('seal_type') }}</b></small>
                            </label>                            
                            <el-select class="" style="width: 100%;" id="seal_type" v-model="FormData.seal_type">                              
                                <el-option v-for="obj of sealType" :key="obj.seal_type_id" :label="obj.seal_type_name" :value="obj.seal_type_id">{{ obj.seal_type_name }}</el-option>         
                            </el-select>
                        </div>

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

                        <Picture :oldpictureImages="oldpictureImages" @picture="getPicture($event)" />
                        <Document :oldappendixImages="oldappendixImages" @appendix="getDocument($event)" /> 
                        
                        <el-timeline>
                            <el-timeline-item>
                            <Approver :oldapprover="oldApprover"  @approverUser="getApproverUser($event)" />
                            </el-timeline-item>
                            <el-timeline-item>
                                <Cc  :oldcc="oldCc" @ccUser="getCcUser($event)" />
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
import ProjectName from '@/components/Share/ProjectName.vue';
import PickerName from '@/components/Share/PickerName.vue';
import Department from '@/components/Share/Department.vue';
import OfficeDepartment from '@/components/Share/OfficeDepartment.vue'
import Picture from '@/components/Share/Picture.vue';
import Document from '@/components/Share/Document.vue';
import Approver from '@/components/Share/ApproverUser.vue';
import Cc from '@/components/Share/CcUser.vue';
export default {
     name: 'ApplyEdit',
     data() {
         return {
            loading: false,
            submitting: false,
            FormData: {  
            },                     
            sealType: "", 
            titleHeader: 'applicant',
            titledepartment: 'printing department',
            oldProjectId: "", 
            oldDepartmentId: [],
            oldOfficeId: "",
            // showapprover: [],
            checkedUsers: [],
            // printing_department: [],
            // oldPickerId: "",     
            pictureImages: [] ,
            appendixImages: [], 
            showapprover: [],
            showcc: [],
            oldApprover: [],  
            oldCc: [],
            oldpictureImages: [],
            oldappendixImages: [],
         }
     },
     components: {
      ProjectName, 
      PickerName,
      Department,  
      Picture,
      Document,
      Approver,
      Cc,
      OfficeDepartment 
    }, 
     created(){      
         this.getSealType();
         this.getData();
     },
     methods:{
        getProjectName(data) {   
         this.FormData.project_id = data;        
        },      
        // getPickerName(data){
        //     this.FormData.applicant_id = data;   
        // },  
        // getDepartmentName(data) {
        //     this.FormData.printing_department = [data];
        // },     

        getDepartmentName(data){
            this.getDepartment(data); 
            // this.showapprover = data;           
        },  

        // getDepartmentName(data){
        //     this.showDepartment = data; 
        // },
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

        async getDepartment(data){   
        //    this.FormData.printing_department= data;      
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
            });
            if(response.status == 200){
                console.log('result'+ JSON.stringify(response.data.data))
                this.sealType = response.data.data;
            }
        },
       
        async getData(){  
            this.loading = true;       
            let response = await authApi({
                method: 'POST',
                api: '/projectmanagement/getapplicationforprint',
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
                console.log('list'+ JSON.stringify(response))      
                this.FormData = response.data.data; 
                this.oldProjectId = this.FormData.project_id; 
                // this.oldPickerId = this.FormData.applicant_id; \
                if(response.data.data.printing_department.length != 0){
                    this.oldDepartmentId = this.FormData.printing_department[0].departments;  
                    this.oldOfficeId = this.FormData.printing_department[0].office_id; 
                    
                }   
                this.oldApprover = this.FormData.approver;  
                this.oldCc = this.FormData.cc;   
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
         async updateData(){    
            this.submitting= true;
            // this.FormData.applicant_id = []; 
            // this.FormData.printing_department = []; 
            // this.FormData.printing_department.forEach((value) => {
            //     this.FormData.printing_department.push(value.office_id); 
            // });   
           
                // this.FormData.printing_department = []; 
                // this.showapprover.forEach((value) => {
                //     this.FormData.printing_department.push(value.departmentid)
                // });
            
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
                api: '/projectmanagement/applicationforprint',
                data: this.FormData      
                     
            });
            if(response.status == 200){                  
                const id = this.$route.params.id;
                 let formData = new FormData();
                 formData.append('application_id',id);
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
                api: '/projectmanagement/application_datafiles',               
                data: formData
                });
                if(imgResponse.status == 200){                   
                    toast.success("Apply with seal update successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
                    this.submitting = false;
                    this.getData(); 
                    this.$router.back();     
                }
            }
         }
     }
     
 }
 </script>
 