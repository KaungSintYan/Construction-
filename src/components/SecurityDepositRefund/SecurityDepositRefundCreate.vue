<template>
    <div class="container-fluid"  @click="$store.commit('setActive', false)">
        <form  @submit.prevent="createData">
            <div class="row">
                <div class="col-md-12">                    
                 
                           <ProjectName  @projectData="getProjectName($event)"  />
                           <span v-if="v$.FormData.project_id.$error" class="text-danger">
                                <span v-if="v$.FormData.project_id.$errors[0].$message != ''">
                                    {{ $t('is_required', {'name': $t('project')}) }}
                                </span>
                           </span>
                           <div class="form-group mb-3 mt-3">
                            <div class="form-group">
                                <label for="title">
                                    <span class="text-danger">*</span> <small><b> {{ $t('title_bd') }} </b></small>
                                </label>
                            </div>                               
                            <el-input type="text" id="title" :placeholder="$t('please_enter')" v-model="FormData.title" clearable />
                            <!-- <span v-if="v$.FormData.title.$error" class="text-danger">
                                <span v-if="v$.FormData.title.$errors[0].$message != ''">
                                    {{ $t('is_required', {'name': $t('title_bd')}) }}
                                </span>
                            </span> -->
                           </div>
                            
                           <MarginType  @marginTypeData="getMarginTypeName($event)"  />      
                           <span v-if="v$.FormData.margin_type.$error" class="text-danger">
                                <span v-if="v$.FormData.margin_type.$errors[0].$message != ''">
                                    {{ $t('is_required', {'name': $t('margin')}) }}
                                </span>
                            </span>
                            <div class="form-group mb-3">
                                <label for="margin_amount">
                                    <small><b> {{ $t('refund_amt') }} </b></small> 
                                </label>
                                <el-input type="number" id="margin_amount" v-model="FormData.margin_amount"
                                :placeholder="$t('please_enter')" clearable />
                                <span v-if="v$.FormData.margin_amount.$error" class="text-danger">
                                <span v-if="v$.FormData.margin_amount.$errors[0].$message != ''">
                                    {{ $t('is_required', {'name': $t('refund_amt')}) }}
                                </span>
                                </span>
                                
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
                                    <span v-if="v$.FormData.return_date.$error" class="text-danger">
                                        <span v-if="v$.FormData.return_date.$errors[0].$message != ''">
                                            {{ $t('is_required', {'name': $t('return_date')}) }}
                                        </span>
                                    </span>
                                </div>
                            </div>
                          
                            <div class="form-group mb-3">
                                <label for="remark">
                                    <small><b> {{ $t('remark') }} </b></small>
                                </label>
                                <el-input v-model="FormData.remark" maxlength="100" 
                                :placeholder="$t('please_enter')"  show-word-limit type="textarea" />  
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
 import useValidate from '@vuelidate/core'   
 import { required} from '@vuelidate/validators'

 export default {
     name: 'SecurityDepositRefundCreate',
     data() {
         return {
            v$: useValidate(),
             FormData: {
                         title: "",
                         odd_number: "",
                         margin_amount: "",
                         return_date: "",                       
                         remark: "",        
                         picture: null,
                         appendix: null,
                         approver:[],
                         cc: [],                        
                         creation_time: "", 
                         project_id: "", 
                         margin_type: "",                         
                         created_by_user: ""       
             },                        
             pictureImages: [] ,
             appendixImages: [], 
             showapprover: [],
             showcc: []            
         }
     },
     validations() {
        return {
            FormData: {
              
                    margin_type: {
                        required,
                    },
                    margin_amount: {
                        required,
                    },
                    project_id: {
                        required,
                    },
                    return_date: {
                        required,
                    },                    
                    // title: {
                    //     required,
                    // },
                
            }
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
        
        async createData(){             
            this.submitting = true; 
            this.v$.$validate(); 
            if (this.v$.$error) {
                this.submitting = false;
                return;
            }  
             this.showapprover.forEach((value) => {
                this.FormData.approver.push(value.userid);                
             }); 
             this.showcc.forEach((value) => {
                this.FormData.cc.push(value.userid);  
             }); 
             let response = await authApi({
                 method: 'POST',
                 api: '/financialmanagement/security_deposit_refund',
                 data: this.FormData 
             });
             if(response.status == 201){              
                //console.log(response.data.revenue_contract_id);
                 const id = response.data.security_deposit_refund_id; 
                 const imgformData = new FormData();
                 imgformData.append('security_deposit_refund_id',id);
                 this.pictureImages.forEach((value) => {
                      imgformData.append('picture', value.url);   
                 });
                 this.appendixImages.forEach((value) => {
                     imgformData.append('appendix', value.url);  
                 });    
                 
                 let imgResponse = await authApi({
                 method: 'POST',
                 api:  '/financialmanagement/security_deposit_refund_datafiles',       
                 data: imgformData
                 });
                 if(imgResponse.status == 200){
                     
                     toast.success("Security Deposit Refund Insert successful !", {
                     position: toast.POSITION.TOP_RIGHT,
                     autoClose: 3000,
                     });
                     this.$router.back();
                 }
             }
         },
     }
 }
 </script>
