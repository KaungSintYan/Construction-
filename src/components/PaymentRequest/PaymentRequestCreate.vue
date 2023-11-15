<template>
    <div class="container-fluid"  @click="$store.commit('setActive', false)">   
        <form  @submit.prevent="createData"> 
            <div class="row">
                <div class="col-md-12">                   
                            <ProjectName @projectData="getProjectName($event)"  /> 
                            <span v-if="v$.FormData.payment.project_id.$error" class="text-danger">
                                    <span v-if="v$.FormData.payment.project_id.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('project')}) }} 
                                    </span>                                                                                         
                            </span> 
                            <div class="mb-3 mt-3">
                                <label for="title">
                                    <span class="text-danger">*</span> <small><b> {{ $t('title_bd') }} </b></small> 
                                </label>
                                <el-input type="text" id="title" :placeholder="$t('please_enter')" v-model="FormData.payment.title" clearable />
                            </div>

                            <!-- <div class="form-group mb-3">
                                <div class="form-group">
                                    <span class="text-danger">*</span> <small><b> {{ $t('category_of_expenditure') }} </b></small>
                                </div>                               
                                <el-select v-model="FormData.payment.category_of_expenditure_id" class="" :placeholder="$t('please_choose')"  style="width: 100%">
                                    <el-option
                                      v-for="item in expenditure_category"
                                      :key="item.expenditure_category_id"
                                      :label="item.name"
                                      :value="item.expenditure_category_id"
                                    />  
                                </el-select> 
                                 <span v-if="v$.FormData.payment.category_of_expenditure_id.$error" class="text-danger">
                                    <span v-if="v$.FormData.payment.category_of_expenditure_id.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('category_of_expenditure')}) }} 
                                    </span>                                                                                         
                                </span>
                            </div> -->

                            <CategoryOfExpenditure @CategoryData="getCategoryData($event)" />
                            <span v-if="v$.FormData.payment.category_of_expenditure_id.$error" class="text-danger">
                                            <span v-if="v$.FormData.payment.category_of_expenditure_id.$errors[0].$message != ''" >
                                                {{ $t('is_required', {'name': $t('category_of_expenditure')}) }} 
                                            </span>                                                                                         
                            </span> 
                            <SpendingContract :projectId="FormData.payment.project_id" @spendingData="getSpendingName($event)"  v-if="FormData.payment.category_of_expenditure_id != 2"/> 
                            <Supplier @supplierData="getSuppliperData($event)"  v-if="FormData.payment.category_of_expenditure_id != 2"/>
                            <div class="form-group mb-3">
                                <label for="">
                                    <span class="text-danger">*</span> <small><b>{{ $t('payment_type') }}</b></small>  
                                </label>
                               
                                <div class="row ml-2 mt-2">
                                    <el-radio-group v-model="FormData.payment.payment_type" class="ml-4">
                                        <el-radio label="normal" size="large" > {{ $t('normal_payment') }} </el-radio>
                                        <el-radio label="prepayment" size="large"> {{ $t('prepayments') }} </el-radio>
                                    </el-radio-group>                                  
                                </div>
                            </div>

                            <PaymentSource @SourceData="getSourceData($event)" />
                            <span v-if="v$.FormData.payment.payment_source.$error" class="text-danger">
                                <span v-if="v$.FormData.payment.payment_source.$errors[0].$message != ''" >
                                    {{ $t('is_required', {'name': $t('payment_source')}) }} 
                                </span>                                                                                         
                            </span> 
                            <!-- <div class="form-group">
                                <label for="payment_source"> <small><b> {{ $t('payment_source') }} </b></small></label>                            
                                <el-select v-model="FormData.payment.payment_source" class="" :placeholder="$t('please_choose')"  style="width: 100%">
                                    <el-option
                                      v-for="item in paymentSource"
                                      :key="item.source_id"
                                      :label="item.source_name"
                                      :value="item.source_id"
                                    />  
                                </el-select> 
                                <span v-if="v$.FormData.payment.payment_source.$error" class="text-danger">
                                    <span v-if="v$.FormData.payment.payment_source.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('payment_source')}) }} 
                                    </span>                                                                                         
                                </span> 
                            </div>    -->
                                                         
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-group">
                                        <label for="amount_for_app"><span class="text-danger">*</span> <small><b> {{ $t('amount') }}</b></small></label>
                                        <el-input type="number" :placeholder="$t('please_enter')" id="amount_for_app"
                                        v-model="FormData.payment.amount" clearable />
                                    </div>
                                </div>
                                <!-- <div class="col-6">
                                    <div class="form-group">
                                        <label for="amount_for_app"><span class="text-danger">*</span> <small><b> {{ $t('currency') }}</b></small></label>                         
                                        <el-select v-model="FormData.payment.currency" :placeholder="$t('please_choose')"  style="width: 100%">
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
                            <div class="form-group">
                                        <label for="tax"><span class="text-danger">*</span> <small><b> {{ $t('tax') }}</b></small></label>
                                        <el-input type="number" :placeholder="$t('please_enter')" id="tax"
                                        v-model="FormData.payment.tax" clearable />
                                        
                            </div>
                            <div class="form-group mb-3" v-if="FormData.payment.category_of_expenditure_id != 2">
                                <label for="">
                                    <span class="text-danger">*</span> <small><b> {{ $t('purchase_requisition') }} </b></small> 
                                </label>

                                <div class="row mx-2 mb-4">
                                    <el-table :data="FormData.details" border style="width: 100%;">
                                        <el-table-column  fixed type="index" width="100" label="#" />                                       
                                        <el-table-column :label="$t('purchase_requisition')" width="400px"> 
                                            <template #default="scope">
                                                <el-input type="text" :placeholder="$t('please_enter')" v-model="scope.row.title" disabled/>
                                            </template>
                                        </el-table-column>
                                        <!-- <el-table-column :label="$t('payment_request_name')" width="400px"> 
                                            <template #default="scope">
                                                <el-input type="text" :placeholder="$t('please_enter')" v-model="scope.row.payment_request_name" clearable disabled/>
                                            </template>
                                        </el-table-column> -->
                                        <el-table-column :label="$t('amount')" width="400px"> 
                                            <template #default="scope">
                                                <el-input v-model="scope.row.amount" type="number" :placeholder="$t('please_enter')" clearable />
                                            </template>
                                        </el-table-column>
                                        <el-table-column :label="$t('remark')" width="400px"> 
                                            <template #default="scope">
                                                <el-input v-model="scope.row.remark" type="textarea" autosize :placeholder="$t('please_enter')"  maxlength="100" show-word-limit />
                                            </template>
                                        </el-table-column>
                                        <el-table-column fixed="right" :label="$t('operate')" width="250px">
                                            <template #default="scope">
                                                <small class="text-danger" @click="deletePurchase(scope.row.purchase_requisition_id)">{{ $t('delete') }}</small>
                                            </template>                                            
                                        </el-table-column>                                        
                                    </el-table>
                                </div>

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
        
                                    <div class="box-footer" @click="showPurchaseDialog()">
                                        <font-awesome-icon icon="fa-solid fa-circle-plus" style="color:cornflowerblue;" /> <span class="text-primary"> {{ $t('add_to') }} </span>
                                    </div>        
                            </div>                           
                            <div class="row" v-if="FormData.payment.category_of_expenditure_id == 2">
                                <div class="col-md-6">
                                    <div class="form group mb-3">
                                        <label for="issue_year"> 
                                        <span class="text-danger">*</span> <small><b>{{ $t('issue_year') }}</b></small>  
                                        </label>
                                        <el-date-picker v-model="FormData.payment.issueyear"  id="issue_year" type="year" 
                                        format="YYYY" value-format="YYYY"
                                        :placeholder="$t('pick_a_year')" size="default"  style="width: 100%;" editable clearable />                               
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label for="issue_month"> 
                                        <span class="text-danger">*</span> <small><b>{{ $t('issue_month') }}</b></small>       
                                        </label>
                                        <el-date-picker v-model="FormData.payment.issuemonth"  id="issue_month" type="month" 
                                        format="MMMM" value-format="M"
                                        :placeholder="$t('pick_a_month')" size="default"  style="width: 100%;" editable clearable />   
                                    </div>
                                </div>
                            </div> 
                            <div class="row">
                                <!-- <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <div class="form-group">
                                            <label for="application_date"> 
                                                <span class="text-danger">*</span> <small><b> {{ $t('date_of_app') }} </b></small>     
                                            </label>
                                        </div>                                                              
                                        <el-date-picker v-model="FormData.payment.application_date" type="date"
                                         format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                                         placeholder="Pick a day" size="default"  style="width: 100%;"   />
                                    </div>
                                </div> -->
                                <div class="col-md-12">
                                    <div class="form-group mb-3">
                                        <div class="form-group">
                                            <label for="request_date"> 
                                                <span class="text-danger">*</span> <small><b> {{ $t('requested_payment_date') }} </b></small> 
                                            </label>
                                        </div>                                                              
                                        <el-date-picker v-model="FormData.payment.request_date" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                                        placeholder="Pick a day" size="default" style="width: 100%;" />
                                    </div>
                                </div>
                            </div>                            

                            <div class="form-group">
                                <label for="account_name"> <small><b> {{ $t('account_name') }} </b></small> </label>
                                <el-input type="text"  :placeholder="$t('please_enter')" 
                                id="account_name" v-model="FormData.payment.acount_name" clearable />
                            </div>

                            <div class="form-group">
                                <label for="bank_name"> <small><b> {{ $t('bank') }} </b></small></label>
                                <el-input type="text" :placeholder="$t('please_enter')"  id="bank_name"
                                v-model="FormData.payment.bank_name" clearable />
                                
                            </div>

                            <div class="form-group">
                                <label for="bank_card_number"> <small><b> {{ $t('bank_card_number') }} </b></small></label>
                                <el-input type="number"  :placeholder="$t('please_enter')" id="bank_card_number"
                                v-model="FormData.payment.bank_card_number" clearable />                               
                            </div>

                            
                            <div class="form-group mb-3" v-if="FormData.payment.category_of_expenditure_id != 2">
                                <el-popover
                                :visible="visible" popper-style="width: 89%"
                                placement="bottom">  
                                <div class="container" >
                                    <div class="row" v-for="(info , i) in bankInfo" :key="info.infoid" @click="selectBankAccount(info)" 
                                    >
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
                              
                            </div> 
                            <div class="form-group" >
                                <label for=""> <small><b> {{ $t('supplier_acc_name') }} </b></small> </label>                              
                                <el-input type="text" :placeholder="$t('please_enter')" 
                                id="" :value="supplierAccount.accname" disabled />
                            </div>

                            <div class="form-group" >
                                <label for=""> <small><b> {{ $t('supplier_bank_acc') }} </b></small> </label>                               
                                <el-input type="text" :placeholder="$t('please_enter')" 
                                id="" :value="supplierAccount.bank" disabled />
                            </div>

                            <div class="form-group" >
                                <label for=""> <small><b> {{ $t('supplier_bank_card_number') }} </b></small> </label>                               
                                <el-input type="text" :placeholder="$t('please_enter')" 
                                id="" :value="supplierAccount.cardno" disabled />
                            </div>
                            <div class="form-group mb-3">
                                <label for="remark">
                                    <small><b>{{ $t('remark') }}</b></small>
                                </label>
                                <el-input v-model="FormData.payment.remark" maxlength="100" :placeholder="$t('please_enter')"  show-word-limit type="textarea" />  
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
 
   
    
    <el-dialog v-model="purchaseRequisitonDialogVisible" title="Purchase Requisition" width="60%" draggable>
        <div class="container-fluid">
            <div class="row mx-2 mb-4">
                <el-table ref="multipleTableRef" :data="purchaseRes" border style="width: 100%;" @selection-change="handleSelectionChange">
                    <el-table-column  fixed type="selection" label="#" width="100" />     
                    <el-table-column prop="title" sortable  :label="$t('purchase_requisition')" width="250px" />
                    <el-table-column prop="payment_status" :label="$t('payment_status')" sortable width="250px"/>
                    <el-table-column prop="application_date" :label="$t('app_date')" sortable width="250px"/>
                    <el-table-column prop="total_amount" :label="$t('total_price')" sortable width="250px"/>                    
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
            <el-button @click="purchaseRequisitonDialogVisible = false">{{ $t('cancel') }}</el-button>
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
import Picture from '@/components/Share/Picture.vue';
import Document from '@/components/Share/Document.vue';
import Approver from '@/components/Share/ApproverUser.vue';
import Cc from '@/components/Share/CcUser.vue';

import useValidate from '@vuelidate/core'
import { required} from '@vuelidate/validators'
import CategoryOfExpenditure from '@/components/Share/CategoryOfExpenditure'
import PaymentSource from '@/components/Share/PaymentSource.vue'

export function validName(name) {
  let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
  if (validNamePattern.test(name)){
    return true;
  }
  return false;
}
export default {
    name: 'PaymentRequestCreate',
    data() {
        return {
            v$: useValidate(),
            visible: false,
            submitting: false,
            FormData: {
                payment:{ 
                        name:"",
                        title: "",                      
                        odd_number: "",
                        amount: "",
                        tax: "",
                        currency: "mmk",
                        amount: "",                       
                        request_date: new Date().toISOString().slice(0,10),
                        issueyear: null,
                        issuemonth: null,
                        acount_name: "",
                        bank_name: "",
                        bank_card_number: "",
                        remark: "",                        
                        picture: null,
                        appendix: null,
                        approver:[],
                        cc: [],
                        creation_time: "",
                        project_id: "",
                        supplier_id: null,
                        category_of_expenditure_id: "",
                        spending_contract_id: null,
                        payment_type: "normal",
                        payment_source: "",
                        created_by_user: "",
                        supplier_bank_acc: "",
                        source_name: ""
                    },
                    details: [],   
            },
          
            pictureImages: [] ,
            appendixImages: [], 
            showapprover: [],
            showcc: [],
            purchaseRes: [],
            expenditure_category: [],   
           // paymentMethod: [], 
            paymentSource: [],
            bankInfo: [],
            currency_type: [
                {key: 'mmk',label: 'MMK'},
                {key: 'usd',label: 'USD'},
                {key: 'thb',label: 'THB'},
                {key: 'yuan',label: 'YUAN'}
            ],
            //purchaseOreder
            purchaseRequisitonDialogVisible: false,
            selectedPurchaseRequsition: [],
            //pagination
            background: false,
            disabled: false,
            small: false,
            pageSize: 20,   
            currentPage: 1,  
            total: 0, 
            supplierAccount: {
                accname: "",
                bank: "",
                cardno: ""
            }
          
        }
    },
    validations() {
        return {
            FormData: {
                payment:{ 
                    category_of_expenditure_id: {
                        required,  
                    },                    
                    project_id: {
                        required,
                    },
                    payment_source:{
                         required,
                    },                   
                                     
                }
            }
        }
    },
    components: {
      ProjectName,
      SpendingContract, 
      Supplier,     
      Picture,
      Document,
      Approver,
      Cc,
      CategoryOfExpenditure,
      PaymentSource
    }, 
    created(){ 
        this.getPurchase(); 
       // this.getPaymentMethod();
        this.getPaymentSource();
        this.getExpenditureCategory();       
    },
    computed: {

    },
    methods: { 
        showPurchaseDialog(){
            //alert(this.FormData.order.project_id)
            if(this.FormData.payment.project_id != "") {
                this.getPurchase();
                this.purchaseRequisitonDialogVisible=true;
            }
            else{
                toast.warning("please project name", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000,
                });
            }          
        },
        handleSelectionChange(val){               
            this.selectedPurchaseRequsition = val;
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
       selectBankAccount(data){
            this.FormData.payment.supplier_bank_acc = data.infoid;
            this.supplierAccount.accname=data.accname;
            this.supplierAccount.bank= data.bank;
            this.supplierAccount.cardno= data.cardno;       
            this.visible = false;  
       
       },
       async showSupplierBankInfo() {
            if(this.FormData.payment.supplier_id != null && this.FormData.payment.supplier_id != undefined){
                let response = await authApi({
                method: 'GET',
                api: '/supplierbankinfo',
                params: {
                       supplierid: this.FormData.payment.supplier_id,                      
                }   
                });
                if(response.status == 200){
                    console.log('info'+ JSON.stringify(response.data))
                    this.bankInfo = response.data.data;
                    this.visible =true;
                }
            } 
            else{
                toast.warning("please Supplier name", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000,
                });
            }         
        },    
        getProjectName(data) {   
         this.FormData.payment.project_id = data;        
        },
        getSpendingName(data){
            this.FormData.payment.spending_contract_id= data;             
        },
         getSuppliperData(data){
          this.FormData.payment.supplier_id= data;
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
        getCategoryData(data){           
            this.FormData.payment.category_of_expenditure_id =data;
        },
        getSourceData(data){
            this.FormData.payment.payment_source =data;
        },
        async getPurchase(){ 
            let response = await authApi({
                method: 'POST',
                api: '/materialmanagement/get_purchase_requisition',
                params: {
                       id: "",
                       keyword: '',             
                       page: '',
                       limit: ''
                },
                data: {
                    project_id: this.FormData.payment.project_id,
                    approve_status: "approved",
                    payment_status: "unpaid",
                }   
            });
            if(response.status == 200){
                this.purchaseRes = response.data.data;
                this.total = response.data.total;   
            }
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
       
    //     async getPaymentMethod(){
    //     let response = await authApi({
    //             method: 'GET',
    //             api: '/financialmanagement/payment_method',
    //             params: {                       
    //                   name: ""
    //             }   
    //     });
    //     //console.log('payment'+ JSON.stringify(response.data.data));
    //     this.paymentMethod= response.data.data;           
    //    },

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
            
    
        addPurchase() { 
            this.selectedPurchaseRequsition.forEach((val)=>{
                        let detail= {
                            title: val.title,
                            purchase_requisition_id: val.purchase_requisition_id,
                            amount: val.total_amount,
                            remark: "",
                        }   
                        let order = this.FormData.details.find((x=> x.purchase_requisition_id == val.purchase_requisition_id));                      
                        if(order == undefined){
                            this.FormData.details.push(detail);  
                        } 
                        //console.log(JSON.stringify(this.FormData.details))
                    
            }); 
            this.purchaseRequisitonDialogVisible = false;

        },
        deletePurchase(id){
            this.FormData.details = this.FormData.details.filter(x=> x.purchase_requisition_id != id);  
            this.selectedPurchaseRequsition.forEach((row) => { 
                if(row.purchase_requisition_id == id){
                    this.$refs.multipleTableRef.toggleRowSelection(row, undefined);                
                }
            }); 
        },
       async createData(e){   
                this.submitting = true; 
                this.v$.$validate(); 
                if (this.v$.$error) {
                    this.submitting = false;
                    return;
                }                
            this.showapprover.forEach((value) => {
                this.FormData.payment.approver.push(value.userid);               
            }); 
            this.showcc.forEach((value) => {
                this.FormData.payment.cc.push(value.userid); 
            }); 
           
            let response = await authApi({
                method: 'POST',
                api: '/financialmanagement/payment_request',
                data: this.FormData 
            });
            if(response.status == 201){              
              //console.log(response.data.revenue_contract_id);
                const id = response.data.payment_request_id; 
                const imgformData = new FormData();
                imgformData.append('payment_request_id',id);
                this.pictureImages.forEach((value) => {
                     imgformData.append('picture', value.url);   
                });
                this.appendixImages.forEach((value) => {
                    imgformData.append('appendix', value.url);  
                });    
                
                let imgResponse = await authApi({
                method: 'POST',
                api:  '/financialmanagement/payment_request_datafiles',           
                data: imgformData
                });
                if(imgResponse.status == 200){                   
                    toast.success("Payment Request Insert successful !", {
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
