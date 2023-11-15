<template>
    <div class="container-fluid"  @click="$store.commit('setActive', false)">   
         <form  @submit.prevent="createData">
            <div class="row">
                <div class="col-md-12">
                    
                            <ProjectName  @projectData="getProjectName($event)"  />
                            <span v-if="v$.project_id.$error" class="text-danger">
                                    <span v-if="v$.project_id.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('project')}) }} 
                                    </span>                                                                                         
                            </span> 
                            <div class="form-group mb-3 mt-3">
                                <div class="form-group">
                                    <label for="title">
                                        <span class="text-danger">*</span> <small><b>{{ $t('title_bd') }}</b></small>
                                    </label>
                                </div>                               
                                <el-input type="text" id="title" :placeholder="$t('please_enter')" v-model="title" clearable />
                                <!-- <span v-if="v$.title.$error" class="text-danger">
                                    <span v-if="v$.title.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('title_bd')}) }} 
                                    </span>                                                                                         
                                </span>  -->
                            </div>
                            <div class="form-group mb-3">
                                <label for="">
                                    <span class="text-danger">*</span> <small><b>{{ $t('margin_nature') }}</b></small>  
                                </label>
                                <div class="row ml-2 mt-2">
                                    <el-radio-group v-model="margin_nature" class="ml-4">
                                        <el-radio label="1" size="large"> {{ $t('deposit_to_customer') }} </el-radio>
                                        <el-radio label="2" size="large"> {{ $t('collect_deposit_from_suppliers') }} </el-radio>
                                      </el-radio-group>                                    
                                </div>
                            </div>

                            <MarginType  @marginTypeData="getMarginTypeName($event)"  />  
                            <span v-if="v$.margin_type.$error" class="text-danger">
                                    <span v-if="v$.margin_type.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('margin')}) }} 
                                    </span>                                                                                         
                            </span>
                            <RevenueContractName  :projectId="project_id"  @revenueData="getRevenueData($event)"  v-if="margin_nature == '1'"  /> 
                            <span v-if="v$.FormData.revenue_contract_id.$error" class="text-danger">
                                    <span v-if="v$.FormData.revenue_contract_id.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('revenue_contract')}) }} 
                                    </span>                                                                                         
                            </span> 
                            <SpendingContract  :projectId="project_id"  @spendingData="getSpendingName($event)" v-if="margin_nature == '2'"  />   
                            <span v-if="v$.SupplierFormData.spending_contract_id.$error" class="text-danger">
                                    <span v-if="v$.SupplierFormData.spending_contract_id.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('spending_contract')}) }} 
                                    </span>                                                                                         
                            </span>                       
                            <InternalUnit @internalUnitData="getInternalUnitData($event)"  /> 
                            <span v-if="v$.internal_unit.$error" class="text-danger">
                                    <span v-if="v$.internal_unit.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('party_b')}) }} 
                                    </span>                                                                                         
                            </span> 
                            <Client @clientData="getClientData($event)"  v-if="margin_nature == '1'"  />    
                            <span v-if="v$.FormData.client_id.$error" class="text-danger">
                                    <span v-if="v$.FormData.client_id.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('contract_party')}) }} 
                                    </span>                                                                                         
                            </span>                             
                            <Supplier @supplierData="getSuppliperData($event)" v-if="margin_nature == '2'"  />                            
                            <span v-if="v$.SupplierFormData.supplier_id.$error" class="text-danger">
                                    <span v-if="v$.SupplierFormData.supplier_id.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('supplier')}) }} 
                                    </span>                                                                                         
                            </span>    

                            <div class="form-group mb-3 mt-3">
                                <div class="form-group">
                                    <label for="margin_amount">
                                        <span class="text-danger">*</span> <small><b> {{ $t('margin_amt') }} </b></small>
                                    </label>
                                </div>                               
                                <el-input type="number" id="margin_amount" :placeholder="$t('please_enter')" v-model="margin_amount" clearable />
                                <span v-if="v$.margin_amount.$error" class="text-danger">
                                    <span v-if="v$.margin_amount.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('margin_amt')}) }} 
                                    </span>                                                                                         
                                </span>
                            </div>
                            <div class="row">
                               <div class="col-md-6">
                                <div class="form-group mb-3">
                                    <div class="form-group mb-3">
                                        <label for="payment_date"> 
                                            <span class="text-danger">*</span> <small><b> {{ $t('payment_date') }} </b></small>         
                                        </label>
                                    </div>                        
                                    <el-date-picker v-model="payment_date"  id="payment_date" type="date" 
                                    format="YYYY-MM-DD" value-format="YYYY-MM-DD" :placeholder="$t('pick_a_day')" size="default"  style="width: 100%;" editable clearable  />
                                    <span v-if="v$.payment_date.$error" class="text-danger">
                                        <span v-if="v$.payment_date.$errors[0].$message != ''" >
                                            {{ $t('is_required', {'name': $t('payment_date')}) }} 
                                        </span>                                                                                         
                                    </span>
                                </div>
                               </div>
                               <div class="col-md-6">
                                <div class="form-group mb-3">
                                    <div class="form-group mb-3">
                                        <label for="estimated_date_of_return"> 
                                            <span class="text-danger">*</span> <small><b> {{ $t('estimated_date_of_return') }} </b></small>      
                                        </label>
                                    </div>                        
                                    <el-date-picker v-model="estimated_date_of_return"  id="estimated_date_of_return" type="date" 
                                    format="YYYY-MM-DD" value-format="YYYY-MM-DD" :placeholder="$t('pick_a_day')" size="default"  style="width: 100%;" editable clearable  />
                                    <span v-if="v$.estimated_date_of_return.$error" class="text-danger">
                                        <span v-if="v$.estimated_date_of_return.$errors[0].$message != ''" >
                                            {{ $t('is_required', {'name': $t('estimated_date_of_return')}) }} 
                                        </span>                                                                                         
                                    </span>
                                </div>
                               </div>
                            </div> 
                            <div class="form-group mb-3">
                                <label for="remark">
                                    <small><b> {{ $t('remark') }} </b></small>
                                </label>
                                <el-input v-model="remark" maxlength="100" 
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
 import MarginType from '@/components/Share/MarginType.vue'; 
 import Client from '@/components/Share/Client.vue';
 import RevenueContractName from '@/components/Share/RevenueContractName.vue';
 import SpendingContract from '@/components/Share/SpendingContract.vue';
 import Supplier from '@/components/Share/Supplier.vue';
 import InternalUnit from '@/components/Share/InternalUnit.vue';
 import Picture from '@/components/Share/Picture.vue';
 import Document from '@/components/Share/Document.vue';
 import Approver from '@/components/Share/ApproverUser.vue';
 import Cc from '@/components/Share/CcUser.vue';

 import useValidate from '@vuelidate/core'
import { required} from '@vuelidate/validators'

 export default {
     name: 'MarginRegistrationCreate',
     data() {
         return {
            v$: useValidate(),
            submitting: false,
            title: "",
            project_id: "", 
            margin_type: "", 
            payment_date: "", 
            estimated_date_of_return: "", 
            internal_unit: "",   
            margin_amount: "",
            remark: "",  
            FormData: {
                         title: "",
                         odd_number: "",
                         margin_amount: "",
                         payment_date: "", 
                         estimated_date_of_return: "",                                                                   
                         remark: "",        
                         picture: null,
                         appendix: null,
                         approver:[],
                         cc: [],                        
                         creation_time: "", 
                         project_id: "", 
                         margin_type: "",      
                         revenue_contract_id: "",
                         internal_unit: "",  
                         client_id: "",                 
                         created_by_user: ""       
            },  
            SupplierFormData: {
                         title: "",
                         odd_number: "",
                         margin_amount: "",
                         payment_date: "", 
                         estimated_date_of_return: "",                                                                   
                         remark: "",        
                         picture: null,
                         appendix: null,
                         approver:[],
                         cc: [],                        
                         creation_time: "", 
                         project_id: "", 
                         margin_type: "",      
                         spending_contract_id: "",
                         internal_unit: "",  
                         supplier_id: "",                 
                         created_by_user: ""       
            },  
             margin_nature: '1',                     
             pictureImages: [] ,
             appendixImages: [], 
             showapprover: [],
             showcc: []            
         }
     },
     validations() {
        return {               
                                       
                    estimated_date_of_return: {
                        required,
                    },
                    internal_unit:{
                         required,
                    },                   
                    margin_amount: {
                          required,
                    },
                    margin_type:{
                         required,
                    },                   
                    payment_date: {
                          required,
                    },  
                    project_id: {
                         required,
                    }, 
                    // title: {
                    //       required,
                    // },  
                    FormData: {
                        revenue_contract_id: {
                          required,
                        },
                        client_id: {
                            required,  
                        }, 
                    },
                    SupplierFormData: {
                        spending_contract_id: {
                            required,  
                        },                        
                        supplier_id: {
                            required,  
                        } 
                    }                    
                
         
        }
    },
     components: {
       ProjectName,
       Client,
       RevenueContractName,
       MarginType,
       SpendingContract,   
       Supplier,
       InternalUnit,        
       Picture,
       Document,
       Approver,
       Cc    
     }, 
     created(){                
        
     },
     
     methods: {        
         getProjectName(data) {   
          this.project_id = data;        
         }, 
         getMarginTypeName(data){
            this.margin_type = data;        
         },
         getRevenueData(data) {
          this.FormData.revenue_contract_id= data;
        },
        getClientData(data){
          this.FormData.client_id= data;
        }, 
        getSpendingName(data){
            this.SupplierFormData.spending_contract_id= data;             
        },
         getSuppliperData(data){
          this.SupplierFormData.supplier_id= data;
        },
         getInternalUnitData(data){
            this.internal_unit= data;
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
            if(this.margin_nature == '1'){
                this.SupplierFormData.spending_contract_id= 0;
                this.SupplierFormData.supplier_id = 0;
            }
            else{
                this.FormData.revenue_contract_id= 0;
                this.FormData.client_id = 0;
            }
            this.submitting = true; 
                this.v$.$validate(); 
                if (this.v$.$error) {
                    this.submitting = false;
                    return;
                }
            let api=""; 
            let NewFormData= "";
            if(this.margin_nature == '1'){
                api= '/financialmanagement/client_margin_registration';
                this.showapprover.forEach((value) => {
                    this.FormData.approver.push(value.userid);                 
                }); 
                this.showcc.forEach((value) => {
                    this.FormData.cc.push(value.userid); 
                });
                this.FormData.title= this.title;
                this.FormData.margin_amount= this.margin_amount;
                this.FormData.project_id= this.project_id;
                this.FormData.margin_type= this.margin_type;
                this.FormData.payment_date= this.payment_date;
                this.FormData.estimated_date_of_return= this.estimated_date_of_return;
                this.FormData.internal_unit= this.internal_unit; 
                this.FormData.remark= this.remark;
                NewFormData  = this.FormData;
            }
            else{
                api= '/financialmanagement/supplier_margin_registration';
                this.showapprover.forEach((value) => {
                    this.SupplierFormData.approver.push(value.userid);                 
                }); 
                this.showcc.forEach((value) => {
                    this.SupplierFormData.cc.push(value.userid); 
                });                 
                this.SupplierFormData.title= this.title;
                this.SupplierFormData.margin_amount= this.margin_amount;
                this.SupplierFormData.project_id= this.project_id;
                this.SupplierFormData.margin_type= this.margin_type;
                this.SupplierFormData.payment_date= this.payment_date;
                this.SupplierFormData.estimated_date_of_return= this.estimated_date_of_return;
                this.SupplierFormData.internal_unit= this.internal_unit; 
                this.SupplierFormData.remark= this.remark;
                NewFormData = this.SupplierFormData;
            }
             
            //console.log('formData'+ JSON.stringify(this.FormData));
             let response = await authApi({
                 method: 'POST',
                 api: api,
                 data: NewFormData, 
             });
             if(response.status == 201){              
               console.log(response.data.revenue_contract_id);                
                 const id = response.data.margin_registration_id; 
                 let imgformData = new FormData();
                 imgformData.append('margin_registration_id',id);
                 this.pictureImages.forEach((value) => {
                      imgformData.append('picture', value.url);   
                 });
                 this.appendixImages.forEach((value) => {
                     imgformData.append('appendix', value.url);  
                 });    
                 let imgApi="";
                 if(this.margin_nature == '1'){
                    imgApi= '/financialmanagement/client_margin_datafiles';
                 }
                 else{
                    imgApi= '/financialmanagement/supplier_margin_datafiles';
                 }
                 let imgResponse = await authApi({
                 method: 'POST',
                 api:  imgApi,      
                 data: imgformData
                 });
                 if(imgResponse.status == 200){                    
                     toast.success("Margin Registration Insert successful !", {
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
