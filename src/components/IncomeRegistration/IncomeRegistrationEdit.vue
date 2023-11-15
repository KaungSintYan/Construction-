<template>
    <div v-loading="loading" class="loading__div" v-if="loading"></div> 
   <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading">   
       <form  @submit.prevent="updateData"> 
           <div class="row">
               <div class="col-md-12">                            
                          <ProjectName :oldProjectId="oldProjectId" @projectData="getProjectName($event)"  /> 

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
                               <el-input type="text" id="odd_number" :placeholder="$t('please_enter')"
                               v-model="FormData.odd_number" clearable />
                           </div>
                               
                           <div class="col-md-3 m-0 p-0">
                                <div class="form-group mb-3 mt-3">
                                    <label for="creation_date"> 
                                        <span class="text-danger">*</span> <small><b>{{ $t('pick_up_date') }}</b></small>      
                                    </label>
                                    <el-date-picker :placeholder="$t('pick_a_day')" type="date" 
                                    format="YYYY-MM-DD" value-format="YYYY-MM-DD" 
                                    class="" id="creation_date" style="width: 100%;"  v-model="FormData.creation_date" clearable/>
                                </div>
                            </div>

                            <SaleInvoice :projectId="oldProjectId" :oldSaleInvoiceId="oldSaleInvoiceId" @saleInvoiceData="getSaleInvoiceName($event)" />

                            <RevenueContractName :projectId="oldProjectId" :oldRevenueContractId="oldRevenueContractId" @revenueData="getRevenueData($event)" /> 

                            <Client :oldClientId="oldClientId" @clientData="getClientData($event)" />

                            <InvoiceType :oldInvoiceId="oldInvoiceId" @InvoiceData="getInvoiceData($event)" />

                            <div class="form-group mb-3 mt-3">
                               <label for="amount">
                                   <span class="text-danger">*</span> <small><b>{{ $t('amount') }}</b></small>
                               </label>
                               <el-input type="text" id="amount" :placeholder="$t('please_enter')"
                               v-model="FormData.amount" clearable />
                           </div>

                           <div class="form-group mb-3 mt-3">
                               <label for="invoice_amount">
                                   <span class="text-danger">*</span> <small><b>{{ $t('invoice_amount') }}</b></small>
                               </label>
                               <el-input type="text" id="invoice_amount" :placeholder="$t('please_enter')"
                               v-model="FormData.invoice_amount" clearable />
                           </div>

                           <div class="form-group mb-3 mt-3">
                               <label for="bank">
                                   <span class="text-danger">*</span> <small><b>{{ $t('bank') }}</b></small>
                               </label>
                               <el-input type="text" id="bank" :placeholder="$t('please_enter')"
                               v-model="FormData.bank_name" clearable />
                           </div>

                           <div class="form-group mb-3 mt-3">
                               <label for="bank_card_number">
                                   <span class="text-danger">*</span> <small><b>{{ $t('bank_card_number') }}</b></small>
                               </label>
                               <el-input type="text" id="bank_card_number" :placeholder="$t('please_enter')"
                               v-model="FormData.bank_card_number" clearable />
                           </div>

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
import SaleInvoice from '@/components/Share/SaleInvoice.vue'; 
import RevenueContractName from '@/components/Share/RevenueContractName.vue';
import Client from '@/components/Share/Client.vue';
import InvoiceType from '@/components/Share/InvoiceType.vue'; 
import SpendingContract from '@/components/Share/SpendingContract.vue';
import Supplier from '@/components/Share/Supplier.vue';
import PaymentRequest from '@/components/Share/PaymentRequest.vue';
import Picture from '@/components/Share/Picture.vue';
import Document from '@/components/Share/Document.vue';
import Approver from '@/components/Share/ApproverUser.vue';
import Cc from '@/components/Share/CcUser.vue';

export default {
   name: 'IncomeRegistrationEdit',
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
           pictureImages: [],
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
               purchase_order_id: "",
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
     Cc,
     SaleInvoice,
     RevenueContractName,
     Client,
     InvoiceType   
   }, 
   created(){   
       this.getData();    
       this.getPaymentSource();                  
       this.getExpenditureCategory();  
    //    this.getDetail();       
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
       getSaleInvoiceName(data){
        this.FormData.sales_invoice_id = data; 
        this.getSaleInvoiceData(data); 
       },
       getRevenueData(data){
        this.FormData.revenue_contract_id = data; 
       },
       getClientData(data){
        this.FormData.client_id = data; 
       },
       getInvoiceData(data){
        this.FormData.invoice_type = data; 
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
               this.FormData.bank_account=list.acount_name;
               this.FormData.bank_name=list.bank_name;
               this.FormData.bank_card_number=list.bank_card_number;
               this.FormData.tax = list.tax;

               console.log('list'+ JSON.stringify(list))
           }
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
                this.FormData.invoice_amount = list.invoice_amount;
                this.FormData.amount = list.amount;
                // this.FormData.payment.spending_contract_id = list.spending_contract_id;
                this.FormData.payment_status = list.payment_status;
                this.FormData.invoice_type = list.invoice_type; 
                this.FormData.bank_name= list.bank_name;
                this.FormData.bank_card_number = list.bank_card_number;
                this.FormData.client_id=list.client_id;
                this.FormData.revenue_contract_id=list.revenue_contract_id;
                this.FormData.total_tax = list.total_tax;
                this.getDetail();
                //console.log('list'+ JSON.stringify(list))
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
               api: '/financialmanagement/get_income_registration',
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
               this.oldSaleInvoiceId = this.FormData.sales_invoice_id; 
               this.oldRevenueContractId = this.FormData.revenue_contract_id; 
               this.oldClientId = this.FormData.client_id;
               this.oldInvoiceId = this.FormData.invoice_type; 
             
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
    //    async getDetail(){            
    //        let response = await authApi({
    //            method: 'GET',
    //            api: '/financialmanagement/payment_registration_detail',
    //            params: {
    //                payment_registeration_id: this.$route.params.id,  
    //                // purchase_order_id: this.$route.params.id                    
    //            }   
    //        });
    //        if(response.status == 200){
    //            this.Detail = response.data.data;   
    //        }
           
    //    },
       async updateData(e){ 
           this.submitting = true; 
               // this.v$.$validate(); 
               // if (this.v$.$error) {
               //     this.submitting = false;
               //     return;
               // }    
            // this.FormData.approver= []; 
            //   this.showapprover.forEach((value) => {
            //    this.FormData.approver.push(value.userid);                
            //    }); 
            //    this.FormData.cc= [];
            //    this.showcc.forEach((value) => {
            //        this.FormData.cc.push(value.userid); 
            //    }); 
           let response = await authApi({
               method: 'PUT',
               api: '/financialmanagement/income_registration',
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
               formData.append('income_register_id',id);
               
                
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
               api:  '/financialmanagement/income_registration_datafiles',           
               data: formData
               });
               if(imgResponse.status == 200){                    
                     toast.success("Income Registration Insert successfully !", {
                     position: toast.POSITION.TOP_RIGHT,
                     autoClose: 3000,
                     });
                     this.getData();
                     this.submitting= false;
                     this.$router.back();
                 }

            //    if(imgResponse.status == 200){
            //        this.FormDetail.income_registration_id= this.$route.params.id;
            //                this.Detail.forEach((value)=>{
            //                if(value.detail_id == null){
            //                    let newdata={
            //                        amount: value.amount,                                    
            //                        purchase_order_id: value.purchase_order_id,
            //                        remark: value.remark,                                             
            //                        }
            //                      this.FormDetail.add_list.push(newdata);
            //                }
            //                else{
            //                    this.FormDetail.current_list.push(value);
            //                }
            //             }); 
            //                let bankResponse = await authApi({
            //                method: 'POST',
            //                api: '/financialmanagement/payment_registration_detail',
            //                data: this.FormDetail
            //                });
            //                if(bankResponse.status == 200){                           
            //                    toast.success("Income Registration  Update successful !", {
            //                    position: toast.POSITION.TOP_RIGHT,
            //                    autoClose: 3000,
            //                    });
            //                    this.getData();    
            //                    this.getPaymentSource();                  
            //                    this.getExpenditureCategory();  
            //                 //    this.getDetail();       
            //                    this.getPurchase();
            //                    this.submitting = false;
            //                    this.$router.back(); 
            //                }
            //    }
           }
       },
   }
}
</script>
