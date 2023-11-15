<template>
    <div v-loading="loading" class="loading__div" v-if="loading"></div> 
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading">   
        <form  @submit.prevent="createData">  
            <div class="row">
                <div class="col-md-12">                     
                   
                            <ProjectName  @projectData="getProjectName($event)"  />
                            <span v-if="v$.FormData.invoice.project_id.$error" class="text-danger">
                                    <span v-if="v$.FormData.invoice.project_id.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('project')}) }} 
                                    </span>                                                                                         
                            </span> 
                            <div class="form-group mt-3">
                                <label for="title">
                                    <span class="text-danger">*</span> <small><b> {{ $t('title_bd') }} </b></small>
                                </label>
                                <el-input type="text" id="title" :placeholder="$t('please_enter')" v-model="FormData.invoice.title"  clearable />
                                <!-- <span v-if="v$.FormData.invoice.title.$error" class="text-danger">
                                    <span v-if="v$.FormData.invoice.title.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('title_bd')}) }} 
                                    </span>                                                                                         
                                </span>  -->
                            </div>                           
                            <!-- <Picker :titleName="$t('receiver')" @pickerData="getPickerName($event)"  />
                            <span v-if="v$.FormData.invoice.receiver.$error" class="text-danger">
                                    <span v-if="v$.FormData.invoice.receiver.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('team_leader')}) }} 
                                    </span>                                                                                         
                            </span>  -->
                            <div class="col-md-3 m-0 p-0">
                                <div class="form-group">
                                    <label for="billing_date"> 
                                    <span class="text-danger">*</span> <small><b> {{ $t('billing_date') }} </b></small>    
                                    </label>
                                    <el-date-picker v-model="FormData.invoice.billing_date"  id="billing_date" type="date" 
                                    format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                                            placeholder="Pick a Date" size="default"  style="width: 100%;" editable clearable  />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-group">
                                        <label for="amount_for_app"><span class="text-danger">*</span> <small><b> {{ $t('amount') }}</b></small></label>
                                        <el-input type="number" :placeholder="$t('please_enter')" id="amount_for_app"
                                        v-model="FormData.invoice.amount" clearable />
                                    </div>
                                </div>
                                <!-- <div class="col-6">
                                    <div class="form-group">
                                        <label for="amount_for_app"><span class="text-danger">*</span> <small><b> {{ $t('currency') }}</b></small></label>                         
                                        <el-select v-model="FormData.invoice.currency" :placeholder="$t('please_choose')"  style="width: 100%">
                                            <el-option
                                            v-for="item in currency_type"
                                            :key="item.key"
                                            :label="item.label"
                                            :value="item.key"
                                            />  
                                        </el-select> 
                                       
                                    </div>
                                </div> -->
                            </div>
                            <RevenueContractName  :projectId="FormData.invoice.project_id" @revenueData="getRevenueData($event)" />   
                            <span v-if="v$.FormData.invoice.revenue_contract_id.$error" class="text-danger">
                                    <span v-if="v$.FormData.invoice.revenue_contract_id.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('revenue_contract')}) }} 
                                    </span>                                                                                         
                            </span> 
                            <Client @clientData="getClientData($event)" />    
                            <span v-if="v$.FormData.invoice.client_id.$error" class="text-danger">
                                    <span v-if="v$.FormData.invoice.client_id.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('contract_party')}) }} 
                                    </span>                                                                                         
                            </span>   

                            <InvoiceType @InvoiceData="getInvoiceData($event)" />

                            <!-- <div class="form-group">
                                <label for="invoice_type"> <small><b> {{ $t('invoice_type') }} </b></small> </label>
                                <el-select v-model="FormData.invoice.invoice_type" class="invoice_type" :placeholder="$t('please_choose')"  style="width: 100%">
                                    <el-option
                                      v-for="type of invoiceType"
                                      :key="type.invoice_type_id"
                                      :label="type.name"
                                      :value="type.invoice_type_id" />  
                                </el-select>  
                                <span v-if="v$.FormData.invoice.invoice_type.$error" class="text-danger">
                                    <span v-if="v$.FormData.invoice.invoice_type.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('invoice_type')}) }} 
                                    </span>                                                                                         
                                </span>                                
                            </div> -->

                            <div class="form-group">
                                <label for="">
                                    <span class="text-danger">*</span> <small><b> {{ $t('details_of_expenditure') }} </b></small>   
                                </label>
                                <div class="row mx-2 mb-4">
                                    <el-table :data="FormData.details" border style="width: 100%;">
                                        <el-table-column  fixed type="index" width="55" />
                                        
                                        <el-table-column :label="$t('amount')" width="600px"> 
                                            <template #default="scope">
                                                <el-input type="number" :placeholder="$t('please_enter')"  v-model="scope.row.amount" clearable />
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('remark')" width="600px"> 
                                            <template #default="scope">
                                                <el-input v-model="scope.row.remark" type="textarea" autosize :placeholder="$t('please_enter')"  maxlength="100" show-word-limit />
                                            </template>
                                        </el-table-column>

                                        <el-table-column fixed="right" :label="$t('operate')" width="250px">

                                            <template #default="scope">
                                                <small class="text-danger" @click="deleteDetail(scope.row.id)">{{ $t('delete') }}</small>
                                            </template>
                                            
                                        </el-table-column>
                                        
                                    </el-table>
                                </div>

                                <!-- end -->

                                    <div class="row">
                                        <small class="mt-2 ml-3 mr-3">{{ $t('total') }} 0</small>
                                        <nav aria-label="Page navigation example">
                                            <ul class="pagination">
                                                <li class="page-item">
                                                    <a class="page-link" href="#" aria-label="Previous">
                                                        <span aria-hidden="true">&laquo;</span>
                                                        <span class="sr-only">Previous</span>
                                                    </a>
                                                </li>
                                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                                <li class="page-item">
                                                <a class="page-link" href="#" aria-label="Next">
                                                    <span aria-hidden="true">&raquo;</span>
                                                    <span class="sr-only">Next</span>
                                                </a>
                                                </li>
                                            </ul>
                                        </nav>
                                        <div class="mr-3 ml-2 row">
                                            <small class="pt-1 mr-2 mt-1">{{ $t('go_to') }}</small>
                                            <input type="text" class="form-control footer-input" value="1">
                                            <small class="pt-1 ml-2 mt-1">{{ $t('page') }}</small>
                                        </div>
                                    </div>
        
                                    <div class="box-footer"  @click="addDetail()">
                                        <font-awesome-icon icon="fa-solid fa-circle-plus" style="color:cornflowerblue;" /> <span class="text-primary"> {{ $t('add_to') }} </span>
                                    </div>        
                             </div>                            
                            
                            <div class="form-group">
                                <label for="address">
                                    <small><b> {{ $t('address') }} </b></small>
                                </label>
                                <el-input v-model="FormData.invoice.address" maxlength="100" 
                                :placeholder="$t('please_enter')"  show-word-limit type="textarea" /> 
                                <span v-if="v$.FormData.invoice.address.$error" class="text-danger">
                                    <span v-if="v$.FormData.invoice.address.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('address')}) }} 
                                    </span>                                                                                         
                                </span>     
                            </div>
                            <div class="form-group">
                                <label for="phone_number">
                                    <small><b> {{ $t('telephone') }} </b></small>
                                </label>
                                <el-input type="number" id="phone_number" v-model="FormData.invoice.phone_number"
                                 :placeholder="$t('please_enter')" clearable />
                                 <span v-if="v$.FormData.invoice.phone_number.$error" class="text-danger">
                                    <span v-if="v$.FormData.invoice.phone_number.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('telephone')}) }} 
                                    </span>                                                                                         
                                </span>  
                            </div> 
                           
                            <div class="form-group">
                                <label for="bank">
                                    <small><b> {{ $t('bank') }} </b></small>
                                </label>
                                <el-input type="text" id="bank"  :placeholder="$t('please_enter')" v-model="FormData.invoice.bank_name" clearable />
                                <span v-if="v$.FormData.invoice.bank_name.$error" class="text-danger">
                                    <span v-if="v$.FormData.invoice.bank_name.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('bank')}) }} 
                                    </span>                                                                                         
                                </span> 
                            </div>

                            <div class="form-group">
                                <label for="bank_card_number">
                                    <small><b> {{ $t('bank_card_number') }} </b></small>
                                </label>
                                <el-input type="number" id="bank_card_number" v-model="FormData.invoice.bank_card_number"
                                 :placeholder="$t('please_enter')" clearable />
                                 <span v-if="v$.FormData.invoice.bank_card_number.$error" class="text-danger">
                                    <span v-if="v$.FormData.invoice.bank_card_number.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('bank_card_number')}) }} 
                                    </span>                                                                                         
                                </span> 
                            </div>
                            <div class="form-group">
                                <label for="remark">
                                    <small><b> {{ $t('remark') }} </b></small>
                                </label>
                                <el-input v-model="FormData.invoice.remark" maxlength="100" 
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
//  import Picker from '@/components/Share/Picker.vue';
 import RevenueContractName from '@/components/Share/RevenueContractName.vue';
 import Client from '@/components/Share/Client.vue';
 import Picture from '@/components/Share/Picture.vue';
 import Document from '@/components/Share/Document.vue';
 import Approver from '@/components/Share/ApproverUser.vue';
 import Cc from '@/components/Share/CcUser.vue';
 import useValidate from '@vuelidate/core'
 import { required} from '@vuelidate/validators'
 import InvoiceType from '@/components/Share/InvoiceType.vue';

 export default {
     name: 'SalesInvoiceCreate',
     data() {
         return {  
            v$: useValidate(),
             loading: true,        
             FormData: {
                invoice: {
                             title: "",
                             odd_number: "",
                            //  receiver: "",
                             billing_date:  new Date().toISOString().slice(0,10), 
                            //  invoice_amount: 0,
                            //  currency: "mmk",
                             phone_number: "",
                             address: "",
                             bank_name: "",
                             bank_card_number: "",
                             remark: "",        
                             picture: null,
                             appendix: null,
                             approver:[],
                             cc: [],       
                             creation_time: "",
                             project_id: "",  
                             revenue_contract_id: "",
                             client_id: "",
                             invoice_type: "",
                             created_by_user: "",
                            name: "",
                            titleName:"",
                            amount: ""
                 },
                 details: [
                     {
                         id: 1,
                         amount_with_tax: "",
                         amount_without_tax: "",
                         tax_rate: "",
                         tax: "",
                         remark: "",
                         sales_invoice_id: "",
                     }
                 ]
             },
             invoiceType: [],    
             detailCount: 1,
             pictureImages: [] ,
             appendixImages: [], 
             showapprover: [],
             showcc: [], 
             currency_type: [
                {key: 'mmk',label: 'MMK'},
                {key: 'usd',label: 'USD'},
                {key: 'thb',label: 'THB'},
                {key: 'yuan',label: 'YUAN'}
            ],
          
         }
     },   
     validations() {
        return {
            FormData: {
                invoice:{ 
                    address: {
                        required,  
                    },                    
                    bank_card_number: {
                        required,
                    },
                    bank_name:{
                         required,
                    },                   
                    client_id: {
                          required,
                    },
                    invoice_type: {
                          required,
                    },
                    phone_number: {
                          required,
                    },
                    project_id: {
                          required,
                    },
                    // receiver: {
                    //       required,
                    // },
                    revenue_contract_id: {
                          required,
                    },
                    // title: {
                    //       required,
                    // },

                }
            }
        }
    },
     components: {
       ProjectName, 
    //    Picker,
       RevenueContractName,
       Client,
       Picture,
       Document,
       Approver,
       Cc,
       InvoiceType
     }, 
     created(){        
         this.getInvoiceType();
     },
     methods: { 
         getProjectName(data) {   
          this.FormData.invoice.project_id = data;        
         },   
        //  getPickerName(data){          
        //      this.FormData.invoice.receiver = data;   
        //  },         
         getRevenueData(data) {
           this.FormData.invoice.revenue_contract_id= data;
         },  
         getClientData(data){
             this.FormData.invoice.client_id = data;
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
         getInvoiceData(data){
            this.FormData.invoice.invoice_type = data;
         },
        async getInvoiceType(){
             let response = await authApi({
                 method: 'GET',
                 api: '/financialmanagement/invoice_type',
                 params: {
                        name: ""                     
                 }  
             });      
            
             this.invoiceType= response.data.data;
             this.loading = false;
             //console.log('invoice_type'+ JSON.stringify(this.invoiceType));
         },
         addDetail() { 
             this.detailCount = this.detailCount +1;            
                 let detail= {
                         id: this.detailCount,
                         amount_with_tax: "",
                         amount_without_tax: "",
                         tax_rate: "",
                         tax: "",
                         remark: "",
                         sales_invoice_id: "",
                     }               
             this.FormData.details.push(detail);                
         },
         deleteDetail(id){
             this.FormData.details =this.FormData.details.filter(x=> x.id != id);
         },
         async createData(e){   
            this.submitting = true; 
                this.v$.$validate(); 
                if (this.v$.$error) {
                    this.submitting = false;
                    return;
                }
             this.showapprover.forEach((value) => {
                this.FormData.invoice.approver.push(value.userid);                
             }); 
             this.showcc.forEach((value) => {
                this.FormData.invoice.cc.push(value.userid); 
             }); 
            
             let response = await authApi({
                 method: 'POST',
                 api: '/financialmanagement/sales_invoice',
                 data: this.FormData 
             });
             if(response.status == 201){              
               //console.log(response.data.revenue_contract_id);
                 const id = response.data.sales_invoice_id; 
                 const imgformData = new FormData();
                 imgformData.append('sales_invoice_id',id);
                 this.pictureImages.forEach((value) => {
                      imgformData.append('picture', value.url);   
                 });
                 this.appendixImages.forEach((value) => {
                     imgformData.append('appendix', value.url);  
                 });  
                 
                 let imgResponse = await authApi({
                 method: 'POST',
                 api:  '/financialmanagement/sales_invoice_datafiles',           
                 data: imgformData
                 });
                 if(imgResponse.status == 200){   
                    this.submitting = false;
                    e.target.reset();                 
                     toast.success("Sale Invoice Insert successful !", {
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
