<template>
    <div class="container-fluid"  @click="$store.commit('setActive', false)">   
        <form  @submit.prevent="createData"> 
            <div class="row">
                <div class="col-md-12">                        
                           <ProjectName @projectData="getProjectName($event)"  /> 
                            <span v-if="v$.FormData.project_id.$error" class="text-danger">
                                <span v-if="v$.FormData.project_id.$errors[0].$message != ''" >
                                    {{ $t('is_required', {'name': $t('project')}) }} 
                                </span>                                                                                         
                            </span> 

                            <div class="form-group mb-3 mt-3">
                                <label for="title">
                                    <span class="text-danger">*</span> <small><b>{{ $t('title_bd') }}</b></small> 
                                </label>
                                <el-input type="text" id="title" :placeholder="$t('please_enter')"
                                v-model="FormData.title" clearable />
                            </div>
                            
                            <div class="form-group mb-3 mt-3">
                                <label for="odd_number">
                                    <span class="text-danger">*</span> <small><b>{{ $t('odd_number') }}</b></small> 
                                </label>
                                <el-input type="number" id="odd_number" :placeholder="$t('please_enter')"
                                v-model="FormData.odd_number" clearable />
                            </div>

                            <div class="col-md-3 m-0 p-0">
                                <div class="form-group mb-3">
                                    <label for="creation_date"> 
                                        <span class="text-danger">*</span> <small><b>{{ $t('pick_up_date') }}</b></small>      
                                    </label>
                                    <el-date-picker :placeholder="$t('pick_a_day')" type="date" 
                                    format="YYYY-MM-DD" value-format="YYYY-MM-DD" 
                                    class="" id="creation_date" style="width: 100%;"  v-model="FormData.creation_date" clearable/>
                                </div>
                            </div>

                            <!-- <div class="form-group mb-3 mt-3">
                                <label for="sale_invoice">
                                    <span class="text-danger">*</span> <small><b>{{ $t('sale_invoice') }}</b></small> 
                                </label>
                                <el-input type="text" id="sale_invoice" :placeholder="$t('please_enter')"
                                v-model="FormData.invoice.sales_invoice_id" clearable />
                            </div> -->
                            <SaleInvoice :projectId="FormData.project_id" @saleInvoiceData="getSaleInvoiceName($event)" />
                            <span v-if="v$.FormData.sales_invoice_id.$error" class="text-danger">
                                <span v-if="v$.FormData.sales_invoice_id.$errors[0].$message != ''" >
                                    {{ $t('is_required', {'name': $t('sale_invoice')}) }} 
                                </span>                                                                                         
                            </span>

                            <!-- <div class="form-group mb-3 mt-3">
                                <label for="revenue_contract">
                                    <span class="text-danger">*</span> <small><b>{{ $t('revenue_contract') }}</b></small> 
                                </label>
                                <el-input type="text" id="revenue_contract" :placeholder="$t('please_enter')"
                                v-model="FormData.revenue_contract_id" clearable disabled/>
                            </div> -->

                            <RevenueContractName :projectId="FormData.project_id" :oldRevenueContractId="FormData.revenue_contract_id" @revenueData="getRevenueData($event)" /> 
                            <span v-if="v$.FormData.revenue_contract_id.$error" class="text-danger">
                                <span v-if="v$.FormData.revenue_contract_id.$errors[0].$message != ''" >
                                    {{ $t('is_required', {'name': $t('revenue_contract')}) }} 
                                </span>                                                                                         
                            </span>

                            <Client @clientData="getClientData($event)" :salesId="FormData.sales_invoice_id" :oldClientId="FormData.client_id"/>
                            <!-- <span v-if="v$.FormData.client_id.$error" class="text-danger">
                                <span v-if="v$.FormData.client_id.$errors[0].$message != ''" >
                                    {{ $t('is_required', {'name': $t('client')}) }} 
                                </span>                                                                                         
                            </span> -->

                            <!-- <div class="form-group mb-3 mt-3">
                                <label for="client_id">
                                    <span class="text-danger">*</span> <small><b>{{ $t('client') }}</b></small> 
                                </label>
                                <el-input type="text" id="client_id" :placeholder="$t('please_enter')"
                                v-model="FormData.client_id" clearable disabled/>
                            </div> -->

                            <!-- <div class="form-group mb-3 mt-3">
                                <label for="invoice_type">
                                    <span class="text-danger">*</span> <small><b>{{ $t('invoice_type') }}</b></small> 
                                </label>
                                <el-input type="text" id="invoice_type" :placeholder="$t('please_enter')"
                                v-model="FormData.invoice_type" clearable disabled/>
                            </div> -->

                            <InvoiceType @InvoiceData="getInvoiceData($event)"/>

                            <div class="form-group mb-3 mt-3">
                                <label for="amount">
                                    <span class="text-danger">*</span> <small><b>{{ $t('amount') }}</b></small> 
                                </label>
                                <el-input type="number" id="amount" :placeholder="$t('please_enter')"
                                v-model="FormData.amount" clearable />
                                <span v-if="v$.FormData.amount.$error" class="text-danger">
                                    <span v-if="v$.FormData.amount.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('amount')}) }} 
                                    </span>                                                                                         
                                </span> 
                            </div>

                            <div class="form-group mb-3 mt-3">
                                <label for="invoice_amount">
                                    <span class="text-danger">*</span> <small><b>{{ $t('invoice_amount') }}</b></small> 
                                </label>
                                <el-input type="number" id="invoice_amount" :placeholder="$t('please_enter')"
                                v-model="FormData.invoice_amount" clearable />
                                <span v-if="v$.FormData.invoice_amount.$error" class="text-danger">
                                    <span v-if="v$.FormData.invoice_amount.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('invoice_amount')}) }} 
                                    </span>                                                                                         
                                </span>
                            </div>

                            <div class="form-group mb-3 mt-3">
                                <label for="bank_name">
                                    <span class="text-danger">*</span> <small><b>{{ $t('bank') }}</b></small> 
                                </label>
                                <el-input type="text" id="bank_name" :placeholder="$t('please_enter')"
                                v-model="FormData.bank_name" clearable />
                            </div>

                            <div class="form-group mb-3 mt-3">
                                <label for="bank_card_number">
                                    <span class="text-danger">*</span> <small><b>{{ $t('bank_card_number') }}</b></small> 
                                </label>
                                <el-input type="number" id="bank_card_number" :placeholder="$t('please_enter')"
                                v-model="FormData.bank_card_number" clearable />
                            </div>

                            <!-- <div class="form-group mb-3" v-if="FormData.payment.category_of_expenditure_id != 2">
                                    <label for="">
                                        <span class="text-danger">*</span> <small><b>{{ $t('purchase_order') }}</b></small>  
                                    </label>
                                    <div class="row mx-2 mb-4">
                                        <el-table :data="FormData.details" border style="width: 100%;">
                                            <el-table-column label="#" fixed type="index" width="100" />                                            
                                            
                                            <el-table-column :label="$t('purchase_order_name')" width="444px"> 
                                                <template #default="scope">
                                                    <el-input type="text" :placeholder="$t('please_enter')"  v-model="scope.row.name" disabled />
                                                </template>
                                            </el-table-column>
                                            <el-table-column :label="$t('amount')" width="444px"> 
                                                <template #default="scope">
                                                    <el-input v-model="scope.row.amount" type="number" :placeholder="$t('please_enter')" disabled />
                                                </template>
                                            </el-table-column>
                                            <el-table-column :label="$t('remark')" width="444px"> 
                                                <template #default="scope">
                                                    <el-input v-model="scope.row.remark" type="textarea" autosize :placeholder="$t('please_enter')"  maxlength="100" show-word-limit disabled />
                                                </template>
                                            </el-table-column>                                                                                     
                                        </el-table>
                                    </div>
                                     
                            </div> -->

                            <div class="form-group mb-3">
                                <label for="remark">
                                    <small><b>{{ $t('remark') }}</b></small>
                                </label>
                                <el-input v-model="FormData.remark" maxlength="100" 
                                :placeholder="$t('please_enter')" show-word-limit type="textarea" />  
                            </div>

                            <Picture @picture="getPicture($event)" />
                            <Document @appendix="getDocument($event)" /> 
                    
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
import useValidate from '@vuelidate/core'
import { required} from '@vuelidate/validators'
import InvoiceType from '@/components/Share/InvoiceType.vue';
import RevenueContractName from '@/components/Share/RevenueContractName.vue';
import Client from '@/components/Share/Client.vue';
import SaleInvoice from '@/components/Share/SaleInvoice.vue'

export function validName(name) {
  let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
  if (validNamePattern.test(name)){
    return true;
  }
  return false;
}
export default {
    name: 'IncomeRegistrationCreate',
    data() {
        return {
            v$: useValidate(),
            submitting: false,
            FormData: {
                // payment:{                        
                //         title: "",                       
                //         odd_number: "",
                //         requested_amount: "",
                //         amount: "",
                //         tax: "",
                //         currency: "mmk",                       
                //         issueyear: null,
                //         issuemonth: null,
                //         bank_account: "",
                //         bank_name: "",
                //         bank_card_number: "",
                //         remark: "",                        
                //         picture: null,
                //         appendix: null,
                //         approver:[],
                //         cc: [],
                //         creation_time: "",
                //         project_id: "",
                //         payment_request_id: "",
                //         supplier_id: "",
                //         category_of_expenditure_id: "",
                //         payment_type: "normal",
                //         payment_source: "",
                //         spending_contract_id: "",
                //         supplier_bank_acc: "",
                //         created_by_user: "",                        
                //     },
                // invoice: {
                    title: "",
                    odd_number: "",
                    invoice_amount: "",
                    amount: "",
                    bank_name: "",
                    bank_card_number: "",
                    remark: "",
                    picture: null,
                    appendix: null,
                    creation_date: new Date().toISOString().slice(0,10),
                    creation_time: "",
                    project_id: "",
                    sales_invoice_id: "",
                    revenue_contract_id: "",
                    client_id: "",
                    invoice_type: "",
                    income_register_id: "",
                    created_by_user: ""
                // },

                // details: [],   
            },
            invoiceType: [],
            detailCount: 1,
            pictureImages: [] ,
            appendixImages: [], 
            showapprover: [],
            showcc: [],
            normal_payment: "1",           
            expenditure_category: [],
            visible: false,
            bankInfo: [], 
            purchase: [],
            // currency_type: [
            //     {key: 'mmk',label: 'MMK'},
            //     {key: 'usd',label: 'USD'},
            //     {key: 'thb',label: 'THB'},
            //     {key: 'yuan',label: 'YUAN'}
            // ],
            // payment_type: [
            //     {key: 'normal', label: 'Normal'},
            //     {key: 'prepayment', label: 'Prepayment'}
            // ],
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
    validations() {
        return {
            FormData: {
                // invoice: {
                    project_id: {
                        required,
                    },
                    amount: {
                        required,
                    },
                    invoice_amount: {
                        required,
                    },
                    revenue_contract_id: {
                        required,
                    },
                    // client_id: {
                    //     required, 
                    // },
                    sales_invoice_id:{
                        required, 
                    }
                // }
            }
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
      Cc,
      InvoiceType,
      RevenueContractName,
      Client,
      SaleInvoice
    }, 
    created(){
         this.getPurchase();            
         this.getExpenditureCategory(); 
         this.getPaymentSource();  
         this.getInvoiceType();    
    },    
    methods: {  
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
            this.FormData.payment.spending_contract_id= data;             
        }, 
        getPaymentRequestName(data) {
            this.FormData.payment.payment_request_id = data;    
            this.getPaymentRequetData(data);
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
        getSourceData(data){
            this.FormData.payment.payment_source =data;
        },
        getInvoiceData(data){
            this.FormData.invoice_type = data;
        },
        getRevenueData(data) {
            this.FormData.revenue_contract_id= data;
        },
        getClientData(data){
             this.FormData.client_id = data;
        }, 
        getSaleInvoiceName(data){
            this.FormData.sales_invoice_id = data;
            this.getSaleInvoiceData(data); 
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

        async getSaleInvoiceData(id){
        let response = await authApi({
                method: 'POST',
                api: '/financialmanagement/get_sales_invoice',
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
                this.FormData.sales_invoice_id = list.sales_invoice_id;
                this.FormData.invoice_amount = list.amount;
                // this.FormData.amount = list.amount;
                // this.FormData.payment.spending_contract_id = list.spending_contract_id;
                this.FormData.payment_status = list.payment_status;
                this.FormData.invoice_type = list.invoice_type; 
                this.FormData.bank_name= list.bank_name;
                this.FormData.bank_card_number = list.bank_card_number;
                this.FormData.client_id=list.client_id;
                this.FormData.revenue_contract_id=list.revenue_contract_id;
                this.FormData.total_tax = list.total_tax;
                // this.getDetail();
                //console.log('list'+ JSON.stringify(list))
            }
       },
    //    async getDetail(){            
    //         let response = await authApi({
    //             method: 'GET',
    //             api: '/financialmanagement/sales_invoice_detail',
    //             params: {
    //                 sales_invoice_id: this.FormData.invoice.sales_invoice_id,                      
    //             }   
    //         });
    //         if(response.status == 200){
    //             let data=response.data.data;
    //             for(let i=0; i<data.length; i++){
    //                 let detail= {  
    //                         name: data[i].purchase_order_name,                    
    //                         purchase_order_id: data[i].purchase_order_id,
    //                         amount: data[i].amount,
    //                         remark: data[i].remark,
    //                 };
    //                 this.FormData.details.push(detail);   

    //             }
    //            // console.log('detail>>'+ JSON.stringify(this.Detail))
                
    //         }            
    //     },
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
        },  
        selectBankAccount(id){
        this.FormData.payment.supplier_bank_acc = id;
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
            }
        },
       
        addPurchase() { 
            this.selectedPurchaseOrder.forEach((val, index)=>{
                        let detail= {                      
                            purchase_order_id: val.purchase_order_id,
                            amount: "",
                            remark: "",
                        }   
                        let order = this.FormData.details.find((x=> x.purchase_order_id == val.purchase_order_id));
                        if(order == undefined){
                            this.FormData.details.push(detail);  
                        } 
                    
            }); 
            this.purchaseOrderDialogVisible = false;

        },
        deletePurchase(id){
            this.FormData.details = this.FormData.details.filter(x=> x.purchase_order_id != id);  
            this.selectedPurchaseOrder.forEach((row) => { 
                if(row.purchase_order_id == id){
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
            // this.showapprover.forEach((value) => {
            //     this.FormData.payment.approver.push(value.userid);                
            // }); 
            // this.showcc.forEach((value) => {
            //     this.FormData.payment.cc.push(value.userid); 
            // }); 
           
            let response = await authApi({
                method: 'POST',
                api: '/financialmanagement/income_registration',
                data: this.FormData 
            });
            if(response.status == 201){              
              //console.log(response.data.revenue_contract_id);
                const id = response.data.income_register_id; 
                const imgformData = new FormData();
                imgformData.append('income_register_id',id);
                this.pictureImages.forEach((value) => {
                     imgformData.append('picture', value.url);   
                });
                this.appendixImages.forEach((value) => {
                    imgformData.append('appendix', value.url);  
                });    
                
                let imgResponse = await authApi({
                method: 'POST',
                api:  '/financialmanagement/income_registration_datafiles',           
                data: imgformData
                });
                if(imgResponse.status == 200){                   
                    toast.success("Income Registration Insert successful !", {
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
