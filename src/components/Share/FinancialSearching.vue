<template>
<div class="container-fluid my-2">
    <form ref="searchingForm">
    <div class="row">
                <div class="col-8 col-md-6">
                <div class="container-fluid">
                <div class="row">
                        <div class="col-md-12 d-flex">                       
                            <el-input type="text" class="mr-2" v-model="formSearching" 
                                :placeholder="$t('enter_keyword')" id="inlineFormInputGroup"  v-on:keyup.enter="searching()" clearable >
                                <template #prefix>
                                    <el-icon class="el-input__icon"><font-awesome-icon icon="fa-solid fa-search" /></el-icon>
                                </template>
                            </el-input>                         
                            <el-button @click="searching()" v-show="!showAdvanced">{{ $t('search') }}</el-button>     
                            <span class="advanced_btn" @click="showAdvanced= !showAdvanced" v-show="advanced" style="width: 100px;">{{ $t('advanced_search') }}</span>            
                        </div>
                    
                </div>
                </div>                
                </div>
                <div class="col-4 col-md-6 mt-2" v-show="createBtn">
                    <div class="" style="float: right;">
                        <router-link :to="`${routeName}create`">
                        <button type="button" class="btn btn-sm btn-success">                     
                            <font-awesome-icon icon="fa-solid fa-plus" /> <span class="ml-1">{{ $t('add') }}</span>                                            
                        </button>
                        </router-link>
                    </div>                
                </div>
    </div>
    <div class="row mt-3 mb-3" v-show="showAdvanced">
        <div class="col-md-4">
            <div class="form-group">
                <label for="state">
                    <small><b>{{ $t('approval_status') }}</b></small>
                </label>
                <div class="form-group">
                    <el-select class="" style="width: 100%;" v-model="approve_status" :placeholder="$t('please_choose')">                    
                        <el-option v-for="(app, i) in approval" :key="i" :value="app.key"> {{ app.value }}</el-option>                                      
                    </el-select>
                </div>            
            </div>
        </div>  
        <div class="col-md-4">
            <ProjectName @projectData="getProjectName($event)"  />    
        </div>  
        <div class="col-md-4" v-show="(!showPaymentRequest && !showPaymentRegistration && !showIncomeRegistration && !showOtherExpenses && !showInputInvoice && !showMarginRegistration && !showSecurityDeposit) || showBillingApplication || showSaleInvoice">
            <RevenueContractName @revenueData="getRevenueData($event)" /> 
        </div>    
        <div class="col-md-4" v-show="!showMarginRegistration && !showSecurityDeposit"> 
            <label for="amount">
                <small v-show="!showOtherExpenses && !showBillingApplication && !showSaleInvoice && !showInputInvoice"><b>{{ $t('amount') }}</b></small>
                <small v-show="showOtherExpenses"><b>Total spending amount (¥)</b></small>     
                <small v-show="showBillingApplication || showSaleInvoice || showInputInvoice"><b>{{ $t('total_tax') }}</b></small>     
            </label>            
            <div class="row tax__amount" >
                <div class="min_amount">
                    <el-input type="number" :placeholder="$t('please_enter')" id="min_amount" class="" 
                    v-model="min_amount" clearable/>
                </div> 
                <div class="tax__underline">
                <span>~</span>
                </div>          
                <div class="max_amount">
                    <el-input type="number" :placeholder="$t('please_enter')" id="max_amount" class=""
                    v-model="max_amount" clearable/>
                </div>
            </div> 
        </div>    
        <!-- <div class="col-md-4" v-show="!showDebitNote && !showRepaymentNote && !showReimbursement">
            <div class="form-group mb-3">
                <label for="receipt_amount">
                    <span class="text-danger">*</span><small><b>{{ $t('type') }}</b></small> 
                </label>                           
                <el-select style="width: 100%;" class="" v-model="type">
                    <el-option value="">{{ $t('selected') }}</el-option>
                    <el-option v-for="obj of types" :key="obj.key" :value="obj.key"> {{ obj.value}}</el-option>
                </el-select>                              
            </div>
        </div>  -->
        <!-- <div class="col-md-4" v-show="this.showReimbursement">
            <div class="form-group">
                <label for="receipt_amount">
                    <span class="text-danger">*</span><small><b>{{ $t('offset_type') }}</b></small> 
                </label>                           
                <el-select style="width: 100%;" class="" v-model="offset_type">
                    <el-option value="">{{ $t('selected') }}</el-option>
                    <el-option v-for="obj of borrow_offset_type" :key="obj.key" :value="obj.key"> {{ obj.value}}</el-option>
                </el-select>                              
            </div>
        </div>  -->
        <div class="col-md-4"  v-show="showPaymentRequest || showPaymentRegistration || showInputInvoice">
            <SpendingContract @spendingData="getSpendingName($event)" /> 
        </div>        
        <div class="col-md-4" v-show="showPaymentRequest || showOtherExpenses">
            <div class="form-group">
                <label for="type_of_contract">
                    <small><b>{{ $t('payment_status') }}</b></small>
                </label>            
                <el-select style="width: 100%;" class="" id="type_of_contract" v-model="payment_status" :placeholder="$t('please_choose')">                   
                    <el-option v-for="obj of payment" :key="obj.key" :value="obj.key">{{ obj.value }}</el-option>         
                </el-select>
            </div>
        </div> 
        <div class="col-md-4"  v-show="showPaymentRegistration"> 
         <div class="form-group">        
                <label for="payment_type"> <small><b> {{ $t('payment_type') }} </b></small></label>                              
                <el-select v-model="payment_type" class="" :placeholder="$t('please_choose')"  style="width: 100%">
                    <el-option key="normal" :label="$t('normal_payment') " value="normal" />  
                    <el-option key="prepayment" :label="$t('prepayments')" value="prepayment" />  
                </el-select> 
            </div>
        
        </div>
        <div class="col-md-4" v-show="showPaymentRequest || showPaymentRegistration">
            <div class="form-group">
                <label for="payment_source"> <small><b> {{ $t('payment_source') }} </b></small></label>                              
                <el-select v-model="payment_source_input" class="" :placeholder="$t('please_choose')"  style="width: 100%">
                    <el-option
                      v-for="item in paymentSource"
                      :key="item.source_id"
                      :label="item.source_name"
                      :value="item.source_id"
                    />  
                </el-select> 
            </div>
        </div>
        
        <div class="col-md-4">
            <div class="form-group">
                <label for="type_of_contract">
                    <small v-show="!showPaymentRequest && !showOtherExpenses && !showBillingApplication && !showSaleInvoice 
                    && !showInputInvoice && showMarginRegistration && !showSecurityDeposit"><b>Payment date</b></small>
                    <small v-show="showPaymentRequest || showBillingApplication || showIncomeRegistration"><b>Date of Application</b></small>
                    <small v-show="showOtherExpenses"><b>fee date</b></small> 
                    <small v-show="showSaleInvoice || showInputInvoice"><b>billing date</b></small> 
                    <small v-show="showSecurityDeposit"><b>return date</b></small>  
                </label>  
                <el-date-picker style="width: 100%;"
                v-model="date"
                type="daterange"
                range-separator="-"
                :start-placeholder="$t('start_date')"
                :end-placeholder="$t('end_date')"                       
                size="default" />
            </div>
        </div>
        <div class="col-md-4" v-show="showPaymentRequest || showPaymentRegistration || showOtherExpenses || showInputInvoice">
            <Supplier @supplierData="getSuppliperData($event)" />
        </div>
        <!-- <div class="col-md-4" v-show="(!showPaymentRequest && !showPaymentRegistration && !showInputInvoice && !showMarginRegistration && !showSecurityDeposit) || showBillingApplication  || showSaleInvoice">
            <PickerName @pickerData="getPickerName($event)"  />
        </div>  -->
        <div class="col-md-4" v-show="showBillingApplication">
            <div class="form-group mb-3">
                <label for="billing_status">
                    <span class="text-danger">*</span><small><b>{{ $t('billing_status') }}</b></small> 
                </label>                           
                <el-select style="width: 100%;" class="" v-model="billing_status" :placeholder="$t('please_choose')">                   
                    <el-option v-for="obj of billing" :key="obj.key" :value="obj.key"> {{ obj.value}}</el-option>
                </el-select>                              
            </div>
        </div> 
        <div class="col-md-4" v-show="showOtherExpenses">
            <div class="form-group">
                <label for="offset_type"> <small><b> Offset type </b></small></label>    
                <div class="ml-1">
                    <el-switch v-model="offset_type" size="large" active-text="" inactive-text="" />
                </div>  
            </div>
        </div>
        <div class="col-md-4" v-show="showSaleInvoice">
            <div class="form-group mb-3">
                <label for="invoice_type"> <small><b> {{ $t('invoice_type') }} </b></small> </label>
                <el-select  v-model="invoice_type" class="invoice_type" :placeholder="$t('please_choose')"  style="width: 100%">
                    <el-option
                      v-for="type in invoiceType"
                      :key="type.invoice_type_id"
                      :label="type.name"
                      :value="type.invoice_type_id"
                    />
                </el-select>                                 
            </div>
        </div>
        <div class="col-md-4" v-show="showMarginRegistration || showSecurityDeposit">
            <MarginType  @marginTypeData="getMarginTypeName($event)"  />  
        </div>
    </div>
    <div class="row mx-2"  v-show="showAdvanced">
        <el-button type="primary" @click="searching()">
            <el-icon class="el-icon--right mr-1"><font-awesome-icon icon="fa-solid fa-search" /></el-icon>{{ $t('search') }}
        </el-button>   
        <el-button class="px-4" @click="reset">{{ $t('reset') }}</el-button>   
    </div>
</form>
</div>

 
</template>
<script>
import {authApi} from '@/http/authApi'
import ProjectName from '@/components/Share/ProjectName.vue';
import MarginType from '@/components/Share/MarginType.vue'; 
import RevenueContractName from '@/components/Share/RevenueContractName.vue';
import SpendingContract from '@/components/Share/SpendingContract.vue';
import Supplier from '@/components/Share/Supplier.vue';
import PickerName from '@/components/Share/PickerName.vue';
export default {
    name: "Searching",
    props: ['api', 'advanced', 'classApi', 'createBtn', 'routeName',
    'showPaymentRequest', 'showPaymentRegistration', 'showIncomeRegistration', 'showOtherExpenses',
    'showBillingApplication', 'showSaleInvoice', 'showInputInvoice', 'showMarginRegistration',
    'showSecurityDeposit'
],
    data() {
        return {
            loading: true,
            formSearching: "",
            showAdvanced: false, 
            approval: [
                {key: 'approval', value: 'Approval'},
                {key: 'approved', value: 'Approved'},
                {key: 'approval_rejected', value: 'Approval Rejected'},
                {key: 'revoked', value: 'Revoked'},
                {key: 'draft', value: 'Draft'},
            ],
            approve_status: "",
            date: "",
            client_id: "",
            invoice_type: "",
            revenue_contract_id: "",
            spending_contract_id: "",
            supplier_id: "",
            payment_source_input: "",
            payment_type: "",
            paymentSource: [],
            offset_type: false,
            // types: [
            //     {key: 'cash_withdrawal', value: 'Cash Withdrawal'},
            //     {key: 'return_of_reverse_fund', value: 'Return of Reverse Fund'}
            // ],
            // type: "",
            picker: "", 
            min_amount: "",
            max_amount: "",
            payment: [
                {key: 'paid', value: 'Paid'},
                {key: 'unpaid', value: 'Upaid'},
                {key: 'partially_payment', value: 'Partially Payment'},
            ],
            payment_status: "",
            billing: [
                {key: "not_billed", value: "Not billed"},
                {key: "invoiced", value: "Invoiced"},
            ],
            billing_status: "",
            invoiceType: [],
            invoice_type: "",
            margin_type: "",
            // borrow_offset_type: [
            //     {key: 'offset_borrowing', value: 'Offset Borrowing'},
            //     {key: 'offset_reverse', value: 'Offset Reverse'},
            // ],  
            // offset_type: "",
            registrationCollectionData: {               
                amount: { //receipt_amount
                    min_amount: "",
                    max_amount: ""
                },
                date: { // payment_date
                    min_date: "",
                    max_date: "",
                },               
                approve_status: "",
                project_id: "",
                client_id: "",
                revenue_contract_id: "",
            }, 
            paymentRequestFormData: {
                amount: {
                    min_amount: "",
                    max_amount: ""
                },
                date: { // application_date
                    min_date: "",
                    max_date: "",
                },               
                approve_status: "",
                project_id: "",
                payment_status: "",
                payment_source: "",
                spending_contract_id: "",
                supplier_id: "",
            }, 
            paymentRegistrationFormData: {
                amount: { // payment_amount
                    min_amount: "",
                    max_amount: ""
                },
                date: { // payment_date
                    min_date: "",
                    max_date: "",
                },               
                approve_status: "",
                project_id: "",
                payment_type: "",
                payment_source: "",
                spending_contract_id: "",
                supplier_id: "",
            }, 
            otherExpensesFormData: {
                amount: { // total_amount
                    min_amount: "",
                    max_amount: ""
                },
                date: { // fee_date
                    min_date: "",
                    max_date: "",
                },               
                approve_status: "",
                project_id: "",
                payment_type: "",                
                payment_status: "",
                supplier_id: "",
                isoffset: "",
            },
            billingApplicationFormData: {
                total_tax: {
                    min_tax: "",
                    max_tax: ""
                },
                date: { // application_date
                    min_date: "",
                    max_date: "",
                },               
                approve_status: "",
                project_id: "",
                revenue_contract_id: "",                
                receiver: "",               
                billing_status: "",
            },
            incomeRegistrationFormData: {
                amount: { //receipt_amount
                    min_amount: "",
                    max_amount: ""
                },
                date: { // payment_date
                    min_date: "",
                    max_date: "",
                }, 
                approve_status: "",
                project_id: "",
                client_id: "",
                invoice_type: "",
                revenue_contract_id: "",
            },
            saleInvoiceFormData: {
                // total_tax: {
                //     min_tax: "",
                //     max_tax: ""
                // },
                date: { // billing_date
                    min_date: "",
                    max_date: "",
                },               
                approve_status: "",
                project_id: "",
                revenue_contract_id: "",                
                receiver: "",               
                invoice_type: "",
            },
            inputInvoiceFormData: {
                total_tax: {
                    min_tax: "",
                    max_tax: ""
                },
                date: { // billing_date
                    min_date: "",
                    max_date: "",
                },               
                approve_status: "",
                project_id: "",
                spending_contract_id: "",                
                supplier_id: "",              
               
            },
            marginRegistrationFormData: {              
                date: { // payment_date
                    min_date: "",
                    max_date: "",
                },               
                approve_status: "",
                project_id: "",
                margin_type: "", 
            },
            securityDepositeFormData: {              
                date: { // return_date
                    min_date: "",
                    max_date: "",
                },               
                approve_status: "",
                project_id: "",
                margin_type: "", 
            },
        }
    },
    components: {
      ProjectName, 
      MarginType,
      RevenueContractName, 
      SpendingContract,  
      Supplier,  
      PickerName
    },  
    created(){  
        this.getPaymentSource();
        this.getInvoiceType();
    },
    methods:{   
        async getPaymentSource(){
        let response = await authApi({
                method: 'GET',
                api: '/financialmanagement/payment_source',
                params: {                       
                      name: ""
                }   
        });      
        this.paymentSource= response.data.data;           
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
        
         },
        reset() {
            this.margin_type = "";
            this.invoice_type = "";
            this.billing_status = "";
            this.offset_type = false;
            this.payment_type= "";
            this.payment_source_input= "";
            this.payment_status= "";
            this.spending_contract_id="";
            this.supplier_id= "";
            this.client_id = "";
            this.revenue_contract_id = "";
            this.project_id = "";
            this.$refs.searchingForm.reset();        
        },     
        getProjectName(data) {   
         this.project_id = data;                 
        }, 
        getMarginTypeName(data){
            this.margin_type = data;        
         },
        getRevenueData(data) {
          this.revenue_contract_id= data;
        //   project_id = this.FormData.project_id; 
        }, 
        getSpendingName(data){
            this.spending_contract_id= data;             
        }, 
        getSuppliperData(data){
          this.supplier_id= data;
        },      
        getPickerName(data){
            this.picker = data;   
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
            if(this.showPaymentRequest){
                    if(this.date != "" && this.date != null){
                    let start_min_date= this.convertDate(this.date[0]);
                    let start_max_date = this.convertDate(this.date[1]);
                    this.paymentRequestFormData.date.min_date= start_min_date; // application_date
                    this.paymentRequestFormData.date.max_date = start_max_date;
                    }
                    else{
                        this.paymentRequestFormData.date.min_date= "";
                        this.paymentRequestFormData.date.max_date = "";
                    }
                    this.paymentRequestFormData.approve_status= this.approve_status;
                    this.paymentRequestFormData.project_id= this.project_id;                  
                    this.paymentRequestFormData.amount.min_amount= this.min_amount;
                    this.paymentRequestFormData.amount.max_amount = this.max_amount;
                    this.paymentRequestFormData.payment_status = this.payment_status;
                    this.paymentRequestFormData.spending_contract_id = this.spending_contract_id;
                    this.paymentRequestFormData.supplier_id = this.supplier_id;    
                    this.paymentRequestFormData.payment_source= this.payment_source_input;                
                    FormData = this.paymentRequestFormData;
            } 
            if(this.showIncomeRegistration){
                if(this.date != "" && this.date != null){
                    let start_min_date= this.convertDate(this.date[0]);
                    let start_max_date = this.convertDate(this.date[1]);
                    this.incomeRegistrationFormData.date.min_date= start_min_date; // payment_date
                    this.incomeRegistrationFormData.date.max_date = start_max_date;
                }
                else{
                    this.incomeRegistrationFormData.date.min_date= "";
                    this.incomeRegistrationFormData.date.max_date = "";
                }
                    this.incomeRegistrationFormData.project_id= this.project_id;                  
                    this.incomeRegistrationFormData.amount.min_amount= this.min_amount; // receipt_amount
                    this.incomeRegistrationFormData.amount.max_amount = this.max_amount;
                    this.incomeRegistrationFormData.revenue_contract_id = this.revenue_contract_id;
                    this.incomeRegistrationFormData.invoice_type = this.invoice_type;
                    this.incomeRegistrationFormData.client_id = this.client_id;
                    FormData = this.incomeRegistrationFormData; 
            }
            if(this.showPaymentRegistration){
                if(this.date != "" && this.date != null){
                    let start_min_date= this.convertDate(this.date[0]);
                    let start_max_date = this.convertDate(this.date[1]);
                    this.paymentRegistrationFormData.date.min_date= start_min_date; //payment_date
                    this.paymentRegistrationFormData.date.max_date = start_max_date;
                    }
                    else{
                        this.paymentRegistrationFormData.date.min_date= "";
                        this.paymentRegistrationFormData.date.max_date = "";
                    }
                    this.paymentRegistrationFormData.approve_status= this.approve_status;
                    this.paymentRegistrationFormData.project_id= this.project_id;                  
                    this.paymentRegistrationFormData.amount.min_amount= this.min_amount; // payment_amount
                    this.paymentRegistrationFormData.amount.max_amount = this.max_amount;                  
                    this.paymentRegistrationFormData.spending_contract_id = this.spending_contract_id;
                    this.paymentRegistrationFormData.supplier_id = this.supplier_id;    
                    this.paymentRegistrationFormData.payment_source= this.payment_source_input;   
                    this.paymentRegistrationFormData.payment_type= this.payment_type;             
                    FormData = this.paymentRegistrationFormData;
            } 
            if(this.showOtherExpenses){
                if(this.date != "" && this.date != null){
                    let start_min_date= this.convertDate(this.date[0]);
                    let start_max_date = this.convertDate(this.date[1]);
                    this.otherExpensesFormData.date.min_date= start_min_date; //fee_date
                    this.otherExpensesFormData.date.max_date = start_max_date;
                    }
                    else{
                        this.otherExpensesFormData.date.min_date= "";
                        this.otherExpensesFormData.date.max_date = "";
                    }
                    this.otherExpensesFormData.approve_status= this.approve_status;
                    this.otherExpensesFormData.project_id= this.project_id;                  
                    this.otherExpensesFormData.amount.min_amount= this.min_amount; // total_amount
                    this.otherExpensesFormData.amount.max_amount = this.max_amount;
                    this.otherExpensesFormData.supplier_id = this.supplier_id; 
                    this.otherExpensesFormData.isoffset = this.offset_type;
                    this.otherExpensesFormData.payment_type = this.payment_type;     
                    FormData = this.otherExpensesFormData;
            } 
            if(this.showBillingApplication){
                if(this.date != "" && this.date != null){
                    let start_min_date= this.convertDate(this.date[0]);
                    let start_max_date = this.convertDate(this.date[1]);
                    this.billingApplicationFormData.date.min_date= start_min_date; //application_date
                    this.billingApplicationFormData.date.max_date = start_max_date;
                    }
                    else{
                        this.billingApplicationFormData.date.min_date= "";
                        this.billingApplicationFormData.date.max_date = "";
                    }
                    this.billingApplicationFormData.approve_status= this.approve_status;
                    this.billingApplicationFormData.project_id= this.project_id;                  
                    this.billingApplicationFormData.total_tax.min_tax= this.min_amount;
                    this.billingApplicationFormData.total_tax.max_tax = this.max_amount;
                    this.billingApplicationFormData.receiver = this.picker; 
                    this.billingApplicationFormData.revenue_contract_id = this.revenue_contract_id;
                    this.billingApplicationFormData.billing_status = this.billing_status;                   
                    FormData = this.billingApplicationFormData;
            } 
            if(this.showSaleInvoice){
                if(this.date != "" && this.date != null){
                    let start_min_date= this.convertDate(this.date[0]);
                    let start_max_date = this.convertDate(this.date[1]);
                    this.saleInvoiceFormData.date.min_date= start_min_date; //billing_date
                    this.saleInvoiceFormData.date.max_date = start_max_date;
                    }
                    else{
                        this.saleInvoiceFormData.date.min_date= "";
                        this.saleInvoiceFormData.date.max_date = "";
                    }
                    this.saleInvoiceFormData.approve_status= this.approve_status;
                    this.saleInvoiceFormData.project_id= this.project_id;                  
                    // this.saleInvoiceFormData.total_tax.min_tax= this.min_amount;
                    // this.saleInvoiceFormData.total_tax.max_tax = this.max_amount;
                    this.saleInvoiceFormData.receiver = this.picker; 
                    this.saleInvoiceFormData.revenue_contract_id = this.revenue_contract_id;
                    this.saleInvoiceFormData.invoice_type = this.invoice_type;                   
                    FormData = this.saleInvoiceFormData;
            } 
            if(this.showInputInvoice){
                if(this.date != "" && this.date != null){
                    let start_min_date= this.convertDate(this.date[0]);
                    let start_max_date = this.convertDate(this.date[1]);
                    this.inputInvoiceFormData.date.min_date= start_min_date; //billing_date
                    this.inputInvoiceFormData.date.max_date = start_max_date;
                    }
                    else{
                        this.inputInvoiceFormData.date.min_date= "";
                        this.inputInvoiceFormData.date.max_date = "";
                    }
                    this.inputInvoiceFormData.approve_status= this.approve_status;
                    this.inputInvoiceFormData.project_id= this.project_id;                  
                    this.inputInvoiceFormData.total_tax.min_tax= this.min_amount;
                    this.inputInvoiceFormData.total_tax.max_tax = this.max_amount;
                    this.inputInvoiceFormData.supplier_id = this.supplier_id; 
                    this.inputInvoiceFormData.spending_contract_id = this.spending_contract_id;                                   
                    FormData = this.inputInvoiceFormData;
            } 
            if(this.showMarginRegistration){
                if(this.date != "" && this.date != null){
                    let start_min_date= this.convertDate(this.date[0]);
                    let start_max_date = this.convertDate(this.date[1]);
                    this.marginRegistrationFormData.date.min_date = start_min_date; //payment_date
                    this.marginRegistrationFormData.date.max_date = start_max_date;
                    }
                    else{
                        this.marginRegistrationFormData.date.min_date = "";
                        this.marginRegistrationFormData.date.max_date = "";
                    }
                    this.marginRegistrationFormData.approve_status = this.approve_status;
                    this.marginRegistrationFormData.project_id = this.project_id;                  
                    this.marginRegistrationFormData.margin_type = this.margin_type;                                 
                    FormData = this.marginRegistrationFormData;
            } 
            if(this.showSecurityDeposit){
                if(this.date != "" && this.date != null){
                    let start_min_date= this.convertDate(this.date[0]);
                    let start_max_date = this.convertDate(this.date[1]);
                    this.securityDepositeFormData.date.min_date = start_min_date; //return_date
                    this.securityDepositeFormData.date.max_date = start_max_date;
                    }
                    else{
                        this.securityDepositeFormData.date.min_date = "";
                        this.securityDepositeFormData.date.max_date = "";
                    }
                    this.securityDepositeFormData.approve_status = this.approve_status;
                    this.securityDepositeFormData.project_id = this.project_id;                  
                    this.securityDepositeFormData.margin_type = this.margin_type;                                 
                    FormData = this.securityDepositeFormData;
            } 
            if(!this.showPaymentRequest && !this.showPaymentRegistration && !this.showOtherExpenses 
            && !this.showBillingApplication && !this.showSaleInvoice && !this.showInputInvoice && !this.showMarginRegistration && !this.showSecurityDeposit){
                if(this.date != "" && this.date != null){
                    let start_min_date= this.convertDate(this.date[0]);
                    let start_max_date = this.convertDate(this.date[1]);
                    this.registrationCollectionData.date.min_date = start_min_date; // payment_date
                    this.registrationCollectionData.date.max_date = start_max_date;
                    }
                    else{
                        this.registrationCollectionData.date.min_date = "";
                        this.registrationCollectionData.date.max_date = "";
                    }
                    this.registrationCollectionData.approve_status = this.approve_status;
                    this.registrationCollectionData.project_id = this.project_id;                   
                    this.registrationCollectionData.revenue_contract_id = this.revenue_contract_id;             
                    this.registrationCollectionData.amount.min_amount = this.min_amount; // receipt_amount
                    this.registrationCollectionData.amount.max_amount = this.max_amount;
                    this.registrationCollectionData.client_id= this.picker; 
                    FormData = this.registrationCollectionData;
                    //console.log("formData"+ JSON.stringify(FormData));
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
                           // console.log('list'+ JSON.stringify(response))
                            let data= response.data.data;
                            let total = response.data.total;
                            let searching = {data: data, total: total};
                            this.$emit("searchingData", searching);
                        }  
                
        }, 
    },
}
</script>

<style lang="scss">
.tax__amount {
    display: flex;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    margin: 0px 0px;
    .min_amount {
        width: 48%;
        input {
            border: none;
        }
    }
    .max_amount {
        width: 48%;
        input {
            border: none;
        }
    }
    .tax__underline{
        width: 4%;
        span{
            font-size: 20px;
        }
        text-align: center;
    }
}
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
    width: 200px !important;
    padding-top: 5px;
}
</style>