<template>
     <div v-loading="loading" class="loading__div" v-if="loading"></div> 
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading">   
        <form  @submit.prevent="updateData"> 
            <div class="row">
                <div class="col-md-12">                            
                           <ProjectName :oldProjectId="oldProjectId" @projectData="getProjectName($event)"  /> 
                            <!-- <span v-if="v$.FormData.project_id.$error" class="text-danger">
                                    <span v-if="v$.FormData.project_id.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('project')}) }} 
                                    </span>                                                                                         
                            </span>  -->
                            <div class="form-group mb-3 mt-3">
                                <label for="title">
                                    <span class="text-danger">*</span> <small><b>{{ $t('title_bd') }}</b></small>
                                </label>
                                <el-input type="text" id="title" :placeholder="$t('please_enter')"
                                v-model="FormData.title" clearable />
                            </div>                           
                                <div class="form-group mb-3">
                                  <span class="text-danger">*</span> <small><b>{{ $t('category_of_expenditure') }}</b></small>                               
                                    <el-select v-model="FormData.category_of_expenditure_id" class="" :placeholder="$t('please_choose')"  style="width: 100%">
                                        <el-option
                                        v-for="item in expenditure_category"
                                        :key="item.expenditure_category_id"
                                        :label="item.name"
                                        :value="item.expenditure_category_id"
                                        />  
                                    </el-select> 
                                 <!-- <span v-if="v$.FormData.category_of_expenditure_id.$error" class="text-danger">
                                    <span v-if="v$.FormData.category_of_expenditure_id.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('category_of_expenditure')}) }} 
                                    </span>                                                                                         
                                </span> -->
                            </div> 
                            
                            <PaymentRequest :projectId="oldProjectId" :oldPaymentRequestId="oldPaymentRequestId"  @paymentRequestData="getPaymentRequestName($event)" />
                             <!-- <span v-if="v$.FormData.payment_request_id.$error" class="text-danger">
                                    <span v-if="v$.FormData.payment_request_id.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('payment_request')}) }} 
                                    </span>                                                                                         
                            </span>  -->
                            <!-- <SpendingContract :projectId="oldProjectId" :oldSpendingId="oldSpendingId" @spendingData="getSpendingName($event)" v-if="FormData.category_of_expenditure_id != 2" /> 
                            <Supplier :oldSupplierId="oldSupplierId" @supplierData="getSuppliperData($event)" v-if="FormData.category_of_expenditure_id != 2" /> -->

                            <!-- start  -->
                            <div class="form-group mb-3">
                                <label for="">
                                    <span class="text-danger">*</span> <small><b>{{ $t('payment_type') }}</b></small>  
                                </label>
                               
                                <div class="row ml-2 mt-2">
                                    <el-radio-group v-model="FormData.payment_type" class="ml-4">
                                        <el-radio label="normal" size="large" > {{ $t('normal_payment') }} </el-radio>
                                        <el-radio label="prepayment" size="large"> {{ $t('prepayments') }} </el-radio>
                                    </el-radio-group>                                  
                                </div>
                            </div>
                            <!-- end  -->

                             <div class="form-group">
                                <label for="payment_source"> <small><b> {{ $t('payment_source') }} </b></small></label>                            
                                <el-select v-model="FormData.payment_source" class="" :placeholder="$t('please_choose')"  style="width: 100%">
                                    <el-option
                                      v-for="item in paymentSource"
                                      :key="item.source_id"
                                      :label="item.source_name"
                                      :value="item.source_id"
                                    />  
                                </el-select> 
                                <!-- <span v-if="v$.FormData.payment_source.$error" class="text-danger">
                                    <span v-if="v$.FormData.payment_source.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('payment_source')}) }} 
                                    </span>                                                                                         
                                </span>  -->
                            </div>  

                            <div class="form-group mb-3" v-if="FormData.category_of_expenditure_id != 2">
                                <label for="">
                                    <span class="text-danger">*</span> <small><b>{{ $t('purchase_requisition') }}</b></small>  
                                </label>
                                <div class="row mx-2 mb-4">
                                    <!-- <el-table :data="Detail" border style="width: 100%;">
                                        <el-table-column  fixed type="index" width="55" />
                                        
                                        <el-table-column :label="$t('amount')" width="400px"> 
                                            <template #default="scope">
                                                <el-input type="number" :placeholder="$t('please_enter')"  v-model="scope.row.amount" clearable />
                                            </template>
                                        </el-table-column>
                                        <el-table-column :label="$t('reason_for_borrowing')" width="800px"> 
                                            <template #default="scope">
                                                <el-input v-model="scope.row.remark" type="textarea" autosize :placeholder="$t('please_enter')"  maxlength="100" show-word-limit />
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('operate')" width="220px">

                                            <template #default="scope">
                                                <small class="text-danger" @click="deletePurchase(scope.row.purchase_order_id)">{{ $t('delete') }}</small>
                                            </template>                                            
                                        </el-table-column>
                                        
                                    </el-table> -->

                                <el-table :data="Detail" border style="width: 100%;">
                                    <el-table-column  fixed type="index" width="55" />
                                    
                                    <el-table-column :label="$t('purchase_requisition')" width="370px"> 
                                        <template #default="scope">
                                            <el-input type="text" :placeholder="$t('please_enter')"  v-model="scope.row.purchase_requisition_name" disabled/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('amount')" width="370px"> 
                                        <template #default="scope">
                                            <el-input type="number" :placeholder="$t('please_enter')"  v-model="scope.row.amount" clearable disabled/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('remark')" width="370px"> 
                                        <template #default="scope">
                                            <el-input type="textarea" :placeholder="$t('please_enter')"  v-model="scope.row.remark" autosize maxlength="100" show-word-limit clearable disabled/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column fixed="right" :label="$t('operate')" width="250px">

                                        <template #default="scope">
                                            <small class="text-danger" @click="deletePurchase(scope.row.id)"> {{ $t('delete') }} </small>
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
        
                                    <div class="box-footer"  @click="purchaseOrderDialogVisible = true">
                                        <font-awesome-icon icon="fa-solid fa-circle-plus" style="color:cornflowerblue;" /> <span class="text-primary"> {{ $t('add_to') }} </span>
                                    </div>        
                             </div>

                            <div class="form-group mb-3">
                                <label for="requested_amount">
                                    <span class="text-danger">*</span> <small><b>{{ $t('requested_amount') }}</b></small> 
                                </label>
                                <el-input type="number" :placeholder="$t('please_enter')"
                                v-model="FormData.requested_amount" clearable/>
                              
                            </div>
                            
                            <div class="form-group mb-3">
                                <label for="amount_for_app"><span class="text-danger">*</span> <small><b> {{ $t('amount') }}</b></small></label>
                                <el-input type="number" :placeholder="$t('please_enter')" id="amount_for_app"
                                v-model="FormData.amount" clearable />
                            </div>
                                
                            <div class="form-group">
                                <label for="tax"><span class="text-danger">*</span> <small><b> {{ $t('tax') }}</b></small></label>
                                <el-input type="number" :placeholder="$t('please_enter')" id="tax"
                                v-model="FormData.tax" clearable />                                       
                            </div>                        

                            <div class="form-group mb-3">
                                <label for="bank">
                                    <small><b>{{ $t('bank') }}</b></small> 
                                </label>
                                <el-input type="text" id="bank" :placeholder="$t('please_enter')"
                                v-model="FormData.bank_name" clearable />
                            </div>

                            <div class="form-group mb-3">
                                <label for="acc_name">
                                    <small><b>{{ $t('account_name') }}</b></small>
                                </label>
                                <el-input type="text" id="acc_name" :placeholder="$t('please_enter')"
                                v-model="FormData.acount_name" clearable />
                            </div>

                            <div class="form-group mb-3">
                                <label for="bank_card_number">
                                    <small><b>{{ $t('bank_card_number') }}</b></small> 
                                </label>
                                <el-input type="number" id="bank_card_number"
                                :placeholder="$t('please_enter')" v-model="FormData.bank_card_number" clearable />
                            </div>

                            <!-- <div class="form-group mb-3" v-if="FormData.category_of_expenditure_id != 2">
                                <el-popover
                                :visible="visible" popper-style="width: 89%"
                                placement="bottom">  
                                <div class="container" >
                                    <div class="row" v-for="(info , i) in bankInfo" :key="info.infoid" @click="selectBankAccount(info.infoid)">
                                        <el-divider v-show="i != 0" />
                                        <p>
                                            Account Name : {{ info.accname }} <br>
                                            Bank of account : {{ info.bank }} <br>
                                            Bank card number : {{ info.cardno }}
                                        </p> 
                                    </div>
                                </div> 
                           
                                <template #reference>
                                <el-button style="width: 100%" @click="showSupplierBankInfo()">
                                    <font-awesome-icon icon="fa-solid fa-circle-plus" style="color:cornflowerblue;" /> 
                                    <span class="ml-2 text-primary"> {{ $t('select_receiving_account') }} </span>
                                </el-button>
                                </template>
                            </el-popover>

                            </div> -->

                            <div class="form-group mb-3">
                                <label for="remark">
                                    <small><b>{{ $t('remark') }}</b></small>
                                </label>
                                <el-input v-model="FormData.remark" maxlength="100" 
                                :placeholder="$t('please_enter')"  show-word-limit type="textarea" />  
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
    <el-dialog v-model="purchaseOrderDialogVisible" title="Purchase Order" width="60%" draggable>
        <div class="container-fluid">
            <div class="row mx-2 mb-4">
                <el-table ref="multipleTableRef" :data="purchase" border style="width: 100%;" @selection-change="handleSelectionChange">
                    <el-table-column  fixed type="selection" label="#" width="100" />     
                    <el-table-column prop="title" sortable  :label="$t('material_name')" width="400" />
                    <el-table-column prop="specification" :label="$t('specification')" sortable width="400"/>
                    <el-table-column prop="brand" :label="$t('brand')" width="400" sortable/>                     
                </el-table>
            </div>
            <div class="row">                    
                <div class="col-sm-12 d-flex justify-content-end">
                <el-pagination
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    :page-sizes="[20, 100, 200, 300]"
                    :small="small"
                    :disabled="disabled"
                    :background="background"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    />                    
                </div>
            </div>

        </div>
        <template #footer>
          <span class="dialog-footer">                
            <el-button @click="purchaseOrderDialogVisible = false">{{ $t('cancel') }}</el-button>
            <el-button type="primary" @click="addPurchase" >{{ $t('sure') }}</el-button>           
          </span>
        </template>
    </el-dialog> 
 </template>

<script>    
import {authApi} from '@/http/authApi'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import ProjectName from '@/components/Share/ProjectName.vue';
import SpendingContract from '@/components/Share/SpendingContract.vue';
import Supplier from '@/components/Share/Supplier.vue';
import PaymentRequest from '@/components/Share/PaymentRequest.vue';
import Picture from '@/components/Share/Picture.vue';
import Document from '@/components/Share/Document.vue';
import Approver from '@/components/Share/ApproverUser.vue';
import Cc from '@/components/Share/CcUser.vue';

export default {
    name: 'PaymentRegistrationEdit',
    data() {
        return {
            
            submitting: false,
            loading: false,
            Detail: [],
            data: [],
            FormData: {},
            detailCount: 1,            
            expenditure_category: [],
            visible: false,
            bankInfo: [], 
            purchase: [],
            pictureImages: [] ,
             appendixImages: [], 
             showapprover: [],
             showcc: [],
             oldApprover: [],  
             oldCc: [],
             oldpictureImages: [],
             oldappendixImages: [],
             oldProjectId: "",  
             oldSpendingId: "",
             oldSupplierId: "",
             oldPaymentRequestId: "",
             Detail: [],
             FormDetail: {
                payment_registeration_id: "",
                purchase_requisition_id: "",
                current_list: [],
                add_list: [],
            },
            currency_type: [
                {key: 'mmk',label: 'MMK'},
                {key: 'usd',label: 'USD'},
                {key: 'thb',label: 'THB'},
                {key: 'yuan',label: 'YUAN'}
            ],
             paymentSource: [], 
             //purchaseOreder
            purchaseOrderDialogVisible: false,
            selectedPurchaseOrder: [],
            //pagination
            background: false,
            disabled: false,
            small: false,
            pageSize: 20,   
            currentPage: 1,  
            total: 0,  
        }
    },
    components: {
      ProjectName,
      SpendingContract,
      Supplier, 
      PaymentRequest,       
      Picture,
      Document,
      Approver,
      Cc    
    }, 
    created(){   
        this.getData();    
        this.getPaymentSource();                  
        this.getExpenditureCategory();  
        this.getDetail();       
        this.getPurchase();
    },
    
    methods: {   
        toggleSelection(rows){           
            if (rows) {
                rows.forEach((row) => { 
                    this.$refs.multipleTableRef.elTableColumn
                    console.log('list'+ JSON.stringify(row))
                })
            }
        }, 
        handleSelectionChange(val){               
            this.selectedPurchaseOrder = val;
        },
        handleSizeChange(val){
           this.pageSize = val;
           this.getPurchase();
        },
        handleCurrentChange(val){
           this.currentPage =val;
           this.getPurchase();
        },  
        //end purchase order     
        getProjectName(data) {   
         this.FormData.project_id = data;        
        }, 
        getSpendingName(data){
            this.FormData.spending_contract_id= data;             
        }, 
        getPaymentRequestName(data) {
            this.FormData.payment_request_id = data;   
            this.getPaymentRequetData(data);
        },      
        getSuppliperData(data){
          this.FormData.supplier_id= data;
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
        async getPaymentRequetData(id){
        let response = await authApi({
                method: 'POST',
                api: '/financialmanagement/get_payment_request',
                params: {
                       id: id,
                       keyword: '',             
                       page: '',
                       limit: ''
                },
                data: {
                    view: false,
                }   
            });
            if(response.status == 200){
                const list =response.data.data;
                this.FormData.category_of_expenditure_id = list.category_of_expenditure_id;
                this.FormData.payment_source = list.payment_source;
                this.FormData.supplier_id = list.supplier_id;
                this.FormData.spending_contract_id = list.spending_contract_id;
                this.FormData.currency = list.currency;
                this.FormData.amount= list.amount;
                this.FormData.supplier_bank_acc = list.supplier_bank_acc;
                this.FormData.acount_name=list.acount_name;
                this.FormData.bank_name=list.bank_name;
                this.FormData.bank_card_number=list.bank_card_number;
                this.FormData.tax = list.tax;

                console.log('list'+ JSON.stringify(list))
            }
       },
       async getPaymentSource(){
        let response = await authApi({
                method: 'GET',
                api: '/financialmanagement/payment_source',
                params: {                       
                      name: ""
                }   
        });
        //console.log('payment'+ JSON.stringify(response.data.data));
        this.paymentSource= response.data.data;           
       },
       async getExpenditureCategory(){
            let response = await authApi({
                method: 'GET',
                api: '/costmanagement/expenditure_category',
                params: {
                       name: ""                     
                }  
            });       
            const list= response.data;
            this.expenditure_category= list;
            //console.log('list'+ JSON.stringify(this.expenditure_category));
        },
        async showSupplierBankInfo() {
            if(this.FormData.supplier_id != null && this.FormData.supplier_id != undefined){
                let response = await authApi({
                method: 'GET',
                api: '/supplierbankinfo',
                params: {
                       supplierid: this.FormData.supplier_id,   // supplier_id                   
                }   
                });
                if(response.status == 200){
                    console.log('info'+ JSON.stringify(response.data))
                    this.bankInfo = response.data.data;
                    this.visible =true;
                }
            }          
        },  
        selectBankAccount(id){
        this.FormData.supplier_bank_acc = id;
        this.visible = false;
        },  

        async getPurchase(){ 
            let response = await authApi({
                method: 'POST',
                api: '/materialmanagement/get_purchase_order',
                params: {
                       id: '',
                       keyword: '',             
                       page: '',
                       limit: ''
                }   
            });
            if(response.status == 200){
                this.purchase = response.data.data;
                this.total = response.data.total; 
                
                this.loading = false;    
            }
        },
       
        addPurchase() { 
            this.selectedPurchaseOrder.forEach((val, index)=>{
                        let detail= {     
                            detail_id: null,                 
                            purchase_order_id: val.purchase_order_id,
                            amount: "",
                            remark: "",
                        }   
                        let order = this.Detail.find((x=> x.purchase_order_id == val.purchase_order_id));
                        if(order == undefined){
                            this.Detail.push(detail);  
                        }                     
            });               
            this.purchaseOrderDialogVisible = false;

        },
        deletePurchase(id){
            this.Detail = this.Detail.filter(x=> x.purchase_order_id != id);  
            this.selectedPurchaseOrder.forEach((row) => { 
                if(row.purchase_order_id == id){
                    this.$refs.multipleTableRef.toggleRowSelection(row, undefined);                
                }
            }); 
        },

        async getData(){  
            this.loading = true;                
            let response = await authApi({
                method: 'POST',
                api: '/financialmanagement/get_payment_registration',
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
                this.oldProjectId = this.FormData.project_id;
                this.oldSupplierId= this.FormData.supplier_id;
                this.oldSpendingId= this.FormData.spending_contract_id;
                this.oldPaymentRequestId = this.FormData.payment_request_id;
                // this.oldApprover = this.FormData.approver.approvers;  
                // this.oldCc = this.FormData.cc.cc;  
                if(response.data.data.picture != null){
                const list= response.data.data.picture.images;
                this.oldpictureImages = list.map(v => ({...v, isSelected: true}));
                }
                if(response.data.data.appendix !=null ){
                const list1= response.data.data.appendix.documents;
                this.oldappendixImages = list1.map(v => ({...v, isSelected: true}));
                }                              
               
                //console.log('res'+ JSON.stringify(this.FormData))
                this.loading = false; 
                      
            }
          
        },
        async getDetail(){            
            let response = await authApi({
                method: 'GET',
                api: '/financialmanagement/payment_registration_detail',
                params: {
                    payment_registeration_id: this.$route.params.id,  
                    // purchase_order_id: this.$route.params.id                    
                }   
            });
            if(response.status == 200){
                this.Detail = response.data.data;   
            }
            
        },
        async updateData(e){ 
            this.submitting = true; 
                // this.v$.$validate(); 
                // if (this.v$.$error) {
                //     this.submitting = false;
                //     return;
                // }    
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
                api: '/financialmanagement/payment_registration',
                params: {
                        id: '',
                        keyword: '',                   
                        page: '',
                        limit: ''
                 },
                data: this.FormData 
            });
            if(response.status == 200){              
              //console.log(response.data.revenue_contract_id);
                const id = this.$route.params.id;
                const formData = new FormData();
                formData.append('payment_registeration_id',id);
                
                 
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
                api:  '/financialmanagement/payment_registration_datafiles',           
                data: formData
                });
                if(imgResponse.status == 200){
                    this.FormDetail.payment_registeration_id= this.$route.params.id;
                            this.Detail.forEach((value)=>{
                            if(value.detail_id == null){
                                let newdata={
                                    amount: value.amount,                                    
                                    purchase_order_id: value.purchase_order_id,
                                    remark: value.remark,                                             
                                    }
                                  this.FormDetail.add_list.push(newdata);
                            }
                            else{
                                this.FormDetail.current_list.push(value);
                            }
                         }); 
                            let bankResponse = await authApi({
                            method: 'POST',
                            api: '/financialmanagement/payment_registration_detail',
                            data: this.FormDetail
                            });
                            if(bankResponse.status == 200){                           
                                toast.success("Payment Registration  Update successful !", {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 3000,
                                });
                                this.getData();    
                                this.getPaymentSource();                  
                                this.getExpenditureCategory();  
                                this.getDetail();       
                                this.getPurchase();
                                this.submitting = false;
                                this.$router.back(); 
                            }
                }
            }
        },
    }
}
</script>
