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
                            <div class="form-group mb-3 mt-3">
                                <label for="title">
                                    <span class="text-danger">*</span> <small><b>{{ $t('title_bd') }}</b></small> 
                                </label>
                                <el-input type="text" id="title" :placeholder="$t('please_enter')"
                                v-model="FormData.payment.title" clearable />
                            </div>   
                             
                            <PaymentRequest :projectId="FormData.payment.project_id" @paymentRequestData="getPaymentRequestName($event)" />
                             <!-- <span v-if="v$.FormData.payment.payment_request_id.$error" class="text-danger">
                                <span v-if="v$.FormData.payment.payment_request_id.$errors[0].$message != ''" >
                                    {{ $t('is_required', {'name': $t('payment_request')}) }} 
                                </span>                                                                                         
                            </span>  -->

                            <!-- <div class="form-group mb-3">
                                <div class="form-group">
                                    <span class="text-danger">*</span> <small><b>{{ $t('category_of_expenditure') }}</b></small> 
                                </div>  
                                <el-input type="text"  v-model="FormData.payment.category_of_expenditure_id" :placeholder="$t('please_enter')"
                                disabled />  
                            </div> 
                            <div class="form-group">
                                <label for="payment_source"> <small><b> {{ $t('payment_source') }} </b></small></label>                            
                                <el-input type="text"  v-model="FormData.payment.payment_source" :placeholder="$t('please_enter')"
                                disabled />  
                            </div>                           -->
                            
                            <!-- start  -->
                            <div class="form-group mb-3">
                                <span class="text-danger">*</span> <small><b>{{ $t('category_of_expenditure') }}</b></small>                               
                                    <el-select v-model="FormData.payment.category_of_expenditure_id" class="" :placeholder="$t('please_choose')"  style="width: 100%">
                                        <el-option
                                        v-for="item in expenditure_category"
                                        :key="item.expenditure_category_id"
                                        :label="item.name"
                                        :value="item.expenditure_category_id"
                                        />  
                                    </el-select> 
                            </div> 
                            <!-- end  -->

                            <!-- start  -->
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
                            <!-- end  -->

                            <!-- start  -->

                            <div class="form-group">
                                <label for="payment_source"> <small><b> {{ $t('payment_source') }} </b></small></label>                            
                                    <el-select v-model="FormData.payment.payment_source" class="" :placeholder="$t('please_choose')"  style="width: 100%">
                                        <el-option
                                        v-for="item in paymentSource"
                                        :key="item.source_id"
                                        :label="item.source_name"
                                        :value="item.source_id"
                                        />  
                                    </el-select> 
                            </div>  

                            <!-- end  -->

                            <div class="form-group mb-3" v-if="FormData.payment.category_of_expenditure_id != 2">
                                    <label for="">
                                        <span class="text-danger">*</span> <small><b>{{ $t('purchase_requisition') }}</b></small>  
                                    </label>
                                    <div class="row mx-2 mb-4">
                                        <el-table :data="FormData.details" border style="width: 100%;">
                                            <el-table-column label="#" fixed type="index" width="100" />                                            
                                            
                                            <el-table-column :label="$t('purchase_requisition')" width="444px"> 
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
                                     
                            </div>
                            <div class="form-group mb-3">
                                <label for="requested_amount">
                                    <span class="text-danger">*</span> <small><b>{{ $t('requested_amount') }}</b></small> 
                                </label>
                                <el-input type="number" :placeholder="$t('please_enter')"
                                v-model="FormData.payment.requested_amount" clearable/>
                               
                              
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-group">
                                        <label for="amount_for_app"><span class="text-danger">*</span> <small><b> {{ $t('amount') }}</b></small></label>
                                        <el-input type="number" :placeholder="$t('please_enter')" id="amount_for_app"
                                        v-model="FormData.payment.amount" clearable />
                                        <span v-if="v$.FormData.payment.amount.$error" class="text-danger">
                                            <span v-if="v$.FormData.payment.amount.$errors[0].$message != ''" >
                                                {{ $t('is_required', {'name': $t('amount')}) }} 
                                            </span>                                                                                         
                                        </span> 
                                    </div>
                                </div>

                                <!-- <div class="col-6">
                                    <div class="form-group">
                                        <label for="amount_for_app"><span class="text-danger">*</span> <small><b> {{ $t('currency') }}</b></small></label>                         
                                        <el-select v-model="FormData.payment.currency" :placeholder="$t('please_choose')"  style="width: 100%" disabled>
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

                            <div class="form-group mb-3">
                                <label for="bank">
                                    <small><b>{{ $t('bank') }}</b></small> 
                                </label>
                                <el-input type="text" id="bank" :placeholder="$t('please_enter')"
                                v-model="FormData.payment.bank_name" clearable />
                            </div>
                            <div class="form-group mb-3">
                                <label for="acc_name">
                                    <small><b>{{ $t('account_name') }}</b></small>
                                </label>
                                <el-input type="text" id="acc_name" :placeholder="$t('please_enter')"
                                v-model="FormData.payment.acount_name" clearable />
                            </div>

                            <div class="form-group mb-3">
                                <label for="bank_card_number">
                                    <small><b>{{ $t('bank_card_number') }}</b></small> 
                                </label>
                                <el-input type="number" id="bank_card_number"
                                :placeholder="$t('please_enter')" v-model="FormData.payment.bank_card_number" clearable />
                            </div>

                            <!-- <div class="form-group mb-3" v-if="FormData.payment.category_of_expenditure_id != 2">
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
                                <el-input v-model="FormData.payment.remark" maxlength="100" 
                                :placeholder="$t('please_enter')"  show-word-limit type="textarea" />  
                            </div>

                            <Picture @picture="getPicture($event)" />
                            <Document @appendix="getDocument($event)" /> 
                            <!-- <el-timeline>
                                <el-timeline-item>
                                    <Approver @approverUser="getApproverUser($event)" />
                                </el-timeline-item>
                                <el-timeline-item>
                                    <Cc @ccUser="getCcUser($event)" />
                                </el-timeline-item>
                            </el-timeline>   -->
                    
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


export function validName(name) {
  let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
  if (validNamePattern.test(name)){
    return true;
  }
  return false;
}
export default {
    name: 'PaymentRegistrationCreate',
    data() {
        return {
            v$: useValidate(),
            submitting: false,
            FormData: {
                payment:{                        
                        title: "",                       
                        odd_number: "",
                        requested_amount: "",
                        amount: "",
                        tax: "",
                        currency: "mmk",                       
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
                        payment_request_id: "",
                        supplier_id: "",
                        category_of_expenditure_id: "",
                        payment_type: "normal",
                        payment_source: "",
                        spending_contract_id: "",
                        supplier_bank_acc: "",
                        created_by_user: "",                        
                    },
                    details: [],   
            },
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
            currency_type: [
                {key: 'mmk',label: 'MMK'},
                {key: 'usd',label: 'USD'},
                {key: 'thb',label: 'THB'},
                {key: 'yuan',label: 'YUAN'}
            ],
            payment_type: [
                {key: 'normal', label: 'Normal'},
                {key: 'prepayment', label: 'Prepayment'}
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
    validations() {
        return {
            FormData: {
                payment:{                    
                    // category_of_expenditure_id: {
                    //     required,  
                    // },                   
                    // payment_request_id: {
                    //     required, 
                    // },
                    // payment_source: {
                    //     required, 
                    // },
                    project_id: {
                        required,
                    },  
                    // requested_amount: {
                    //     required,
                    // },        
                    amount: {
                        required,
                    }          
                }
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
      
    }, 
    created(){
         this.getPurchase();            
         this.getExpenditureCategory(); 
         this.getPaymentSource();      
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
         this.FormData.payment.project_id = data;        
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
                this.FormData.payment.category_of_expenditure_id = list.category_of_expenditure_id;
                this.FormData.payment.payment_source = list.payment_source;
                this.FormData.payment.supplier_id = list.supplier_id;
                this.FormData.payment.spending_contract_id = list.spending_contract_id;
                this.FormData.payment.currency = list.currency;
                this.FormData.payment.payment_type = list.payment_type; 
                this.FormData.payment.requested_amount= list.amount;
                this.FormData.payment.supplier_bank_acc = list.supplier_bank_acc;
                this.FormData.payment.acount_name=list.acount_name;
                this.FormData.payment.bank_name=list.bank_name;
                this.FormData.payment.bank_card_number=list.bank_card_number;
                this.FormData.payment.tax = list.tax;
                this.getDetail();
                //console.log('list'+ JSON.stringify(list))
            }
       },
       async getDetail(){            
            let response = await authApi({
                method: 'GET',
                api: '/financialmanagement/payment_request_detail',
                params: {
                    payment_request_id: this.FormData.payment.payment_request_id,                      
                }   
            });
            if(response.status == 200){
                let data=response.data.data;
                for(let i=0; i<data.length; i++){
                    let detail= {  
                            name: data[i].purchase_requisition_name,                    
                            purchase_requisition_id: data[i].purchase_requisition_id,
                            amount: data[i].amount,
                            remark: data[i].remark,
                    };
                    this.FormData.details.push(detail);   

                }
               // console.log('detail>>'+ JSON.stringify(this.Detail))
                
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
                            purchase_requisition_id: val.purchase_requisition_id,
                            amount: "",
                            remark: "",
                        }   
                        let order = this.FormData.details.find((x=> x.purchase_requisition_id == val.purchase_requisition_id));
                        if(order == undefined){
                            this.FormData.details.push(detail);  
                        } 
                    
            }); 
            this.purchaseOrderDialogVisible = false;

        },
        deletePurchase(id){
            this.FormData.details = this.FormData.details.filter(x=> x.purchase_requisition_id != id);  
            this.selectedPurchaseOrder.forEach((row) => { 
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
                api: '/financialmanagement/payment_registration',
                data: this.FormData 
            });
            if(response.status == 201){              
              //console.log(response.data.revenue_contract_id);
                const id = response.data.payment_registeration_id; 
                const imgformData = new FormData();
                imgformData.append('payment_registeration_id',id);
                this.pictureImages.forEach((value) => {
                     imgformData.append('picture', value.url);   
                });
                this.appendixImages.forEach((value) => {
                    imgformData.append('appendix', value.url);  
                });    
                
                let imgResponse = await authApi({
                method: 'POST',
                api:  '/financialmanagement/payment_registration_datafiles',           
                data: imgformData
                });
                if(imgResponse.status == 200){                   
                    toast.success("Payment Registration Insert successful !", {
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
