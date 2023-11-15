<template>
    <div v-loading="loading" class="loading__div" v-if="loading"></div> 
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading">   
         <form  @submit.prevent="updateData">
            <div class="row">
                <div class="col-md-12">
                  
                            <ProjectName :oldProjectId="oldProjectId"  @projectData="getProjectName($event)"  />

                            <div class="form-group mb-3 mt-3">
                                <div class="form-group">
                                    <label for="title">
                                        <span class="text-danger">*</span> <small><b> {{ $t('title_bd') }} </b></small>
                                    </label>
                                </div>                               
                                <el-input type="text" id="title" :placeholder="$t('please_enter')" v-model="FormData.title" clearable />
                            </div>
                            
                            <!-- <div class="form-group mb-3">
                                <label for="">
                                    <span class="text-danger">*</span> Margin Nature  
                                </label>
                                <div class="row ml-2 mt-2">
                                    <el-radio-group v-model="margin_nature" class="ml-4">
                                        <el-radio label="1" size="large">deposit to customer</el-radio>
                                        <el-radio label="2" size="large">Collect deposits from suppliers</el-radio>
                                      </el-radio-group>                                    
                                </div>
                            </div> -->

                            <MarginType :oldMarginTypeId="oldMarginTypeId"  @marginTypeData="getMarginTypeName($event)"  />  
                            <RevenueContractName :oldRevenueContractId="oldRevenueContractId" @revenueData="getRevenueData($event)"  v-if="margin_nature == '1'"  />  
                            <SpendingContract :oldSpendingId="oldSpendingId" @spendingData="getSpendingName($event)" v-if="margin_nature == '2'"  />                         
                            <InternalUnit :oldInternalUnitId="oldInternalUnitId" @internalUnitData="getInternalUnitData($event)"  /> 
                            <Client :oldClientId="oldClientId" @clientData="getClientData($event)"  v-if="margin_nature == '1'"  />                                
                            <Supplier :oldSupplierId="oldSupplierId" @supplierData="getSuppliperData($event)" v-if="margin_nature == '2'"  />                            
                            
                            <div class="form-group mb-3 mt-3">
                                <div class="form-group">
                                    <label for="margin_amount">
                                        <span class="text-danger">*</span> <small><b> {{ $t('margin_amt') }} </b></small> 
                                    </label>
                                </div>                               
                                <el-input type="text" id="margin_amount" :placeholder="$t('please_enter')" v-model="FormData.margin_amount" clearable />
                            </div>
                            <div class="row">
                               <div class="col-md-6">
                                <div class="form-group mb-3">
                                    <div class="form-group mb-3">
                                        <label for="payment_date"> 
                                            <span class="text-danger">*</span> <small><b> {{ $t('payment_date') }} </b></small>        
                                        </label>
                                    </div>                        
                                    <el-date-picker v-model="FormData.payment_date"  id="payment_date" type="date" 
                                    format="YYYY-MM-DD" value-format="YYYY-MM-DD" :placeholder="$t('pick_a_day')" size="default"  style="width: 100%;" editable clearable  />
                                
                                </div>
                               </div>
                               <div class="col-md-6">
                                <div class="form-group mb-3">
                                    <div class="form-group mb-3">
                                        <label for="estimated_date_of_return"> 
                                            <span class="text-danger">*</span> <small><b> {{ $t('estimated_date_of_return') }} </b></small>      
                                        </label>
                                    </div>                        
                                    <el-date-picker v-model="FormData.estimated_date_of_return"  id="estimated_date_of_return" type="date" 
                                    format="YYYY-MM-DD" value-format="YYYY-MM-DD" :placeholder="$t('pick_a_day')" size="default"  style="width: 100%;" editable clearable  />
                                
                                </div>
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
 export default {
     name: 'MarginRegistrationEdit',
     data() {
         return {
            submitting: false,
            loading: true,
            FormData: {                             
            },               
             margin_nature: '1',
             showCustomer: "customer", 
             pictureImages: [] ,
             appendixImages: [], 
             showapprover: [],
             showcc: [],
             oldApprover: [],  
             oldCc: [],
             oldpictureImages: [],
             oldappendixImages: [],
             oldProjectId: "", 
             oldMarginTypeId: "",
             oldRevenueContractId: "",
             oldSpendingId: "",
             oldSupplierId: "",
             oldInternalUnitId: "",
             oldClientId: ""

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
        this.showCustomer = this.$route.params.name;
        this.getData(); 
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
         async getData(){  
            let api= "";
            if(this.showCustomer == 'customer'){
                api='/financialmanagement/get_client_margin_registration';
            }
            else{
                api='/financialmanagement/get_supplier_margin_registration';
            }          
                   
            let response = await authApi({
                method: 'POST',
                api: api,
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
                console.log('res'+ JSON.stringify(this.FormData));
                if(this.showCustomer == "customer"){
                    this.margin_nature = '1';
                    this.oldRevenueContractId = this.FormData.revenue_contract_id;
                    this.oldClientId = this.FormData.client_id;
                }
                else{
                    this.margin_nature = '2';
                    this.oldSpendingId= this.FormData.spending_contract_id;
                    this.oldSupplierId= this.FormData.supplier_id;
                }            
                this.oldProjectId = this.FormData.project_id;
                this.oldMarginTypeId = this.FormData.margin_type;   
                this.oldInternalUnitId= this.FormData.internal_unit;         
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
            this.submitting = true; 
            let api="";
            
            if(this.margin_nature == '1'){
                api= '/financialmanagement/client_margin_registration';                
            }
            else{
                api= '/financialmanagement/supplier_margin_registration';                
            }
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
                 api: api,
                 data: this.FormData, 
             });
             if(response.status == 200){              
               
                 let imgApi="";
                 if(this.margin_nature == '1'){
                    imgApi= '/financialmanagement/client_margin_datafiles';
                 }
                 else{
                    imgApi= '/financialmanagement/supplier_margin_datafiles';
                 }

                 const id = this.$route.params.id;
                const formData = new FormData();
                formData.append('margin_registration_id',id);
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
                 api:  imgApi,      
                 data: formData
                 });
                 if(imgResponse.status == 200){    
                    this.submitting = false;                 
                     toast.success("Margin Registration Update successful !", {
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
