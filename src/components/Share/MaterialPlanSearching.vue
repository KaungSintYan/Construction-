<template>
<div class="container-fluid my-2">
 <div class="row">
            <div class="col-md-8">
            <div class="container">
             <div class="row">
                    <div class="col-md-6">               
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <div class="input-group-text"> 
                                    <font-awesome-icon icon="fa-solid fa-search" />
                                </div>
                            </div>
                            <input type="text" class="form-control" v-model="formSearching" id="inlineFormInputGroup" :placeholder="$t('enter_keyword')"  v-on:keyup.enter="searching()">
                        </div>                 
                    </div>
                    <div class="col-md-6"> 
                        <div style="margin-top: 5px;">                
                            <el-button v-show="!showAdvanced" @click="searching()">{{ $t('search') }}</el-button> 
                            <span class="advanced_btn" @click="showAdvanced= !showAdvanced" v-show="advanced">{{ $t('advanced_search') }}</span>
                        </div>
                    </div> 
                </div>
            </div>                
            </div>
            <div class="col-md-4 mt-2" v-show="createBtn">
                <div class="" style="float: right;">
                    <router-link :to="`${routeName}create`">
                    <button type="button" class="btn btn-sm btn-success">                     
                            <font-awesome-icon icon="fa-solid fa-plus" /> <span class="ml-1">{{ $t('add') }}</span>                                            
                    </button>
                    </router-link>
                </div>                
            </div>
 </div>
 
 <div class="row mt-2" v-show="showAdvanced">
    <div class="col-md-4 ">    
        <ProjectName @projectData="getProjectName($event)"/>
    </div>  
    
    <div class="col-md-4" v-show="showTransfer">
      <ProjectToName  @projectData="getProjectToName($event)"  />    
    </div>    
    <div class="col-md-4">
        <div class="form-group">
            <label for="state">
                <small><b>{{ $t('approval_status') }}</b></small>   
            </label>
            <div class="form-group">
                <el-select class="" style="width: 100%;" v-model="approve_status" @click="searching()">
                    <el-option value=""> {{ $t('all') }} </el-option>
                    <el-option v-for="(app, i) in approval" :key="i" :value="app.key"> {{ app.value }}</el-option>                                      
                </el-select>
            </div>
           
        </div>
    </div>
    <div class="col-md-4 mb-3" v-show="showInboundOrder != true ">
        <div class="row mx-1 pb-2">
            <span v-show="showReturnForm"><small><b>{{ $t('settlement_date') }}</b></small></span>
            <span v-show="showOutboundOrder"><small><b>{{ $t('exit_date') }}</b></small></span>
            <span v-show="showTransfer"><small><b>{{ $t('transfer_date') }}</b></small></span>
            <span v-show="!showReturnForm && !showOutboundOrder && !showTransfer"><small><b>{{ $t('complilation_date') }}</b></small></span>            
        </div>
        <div class="row mx-1">    
        <el-date-picker
                            v-model="date"
                            type="daterange"
                            range-separator="-"
                            :start-placeholder="$t('start_date')"
                            :end-placeholder="$t('end_date')"                        
                            size="large"
                        />
        </div>
    </div>
    <!-- <div class="col-md-4" v-show="showpurchase_requisition">
        <div class="form-group">
            <label for="state">
                <small><b>{{ $t('purchase_status') }}</b></small>
            </label>
            <div class="form-group">
                <el-select class="" style="width: 100%;" v-model="purchase_status" @click="searching()">
                    <el-option value=""> {{ $t('all') }} </el-option>
                    <el-option v-for="(app, i) in purchase" :key="i" :value="app.key"> {{ app.value }}</el-option>                                      
                </el-select>
            </div>
           
        </div>
    </div>   -->
    <div class="col-md-4" v-show="showPurchaseOrder">
        <div class="form-group">
            <label for="type_of_contract">
                <small><b>{{ $t('payment_status') }}</b></small>
            </label>            
            <el-select class="" style="width: 100%;" id="type_of_contract" v-model="payment_status">
                <el-option value="">{{ $t('please_choose') }}</el-option>
                <el-option v-for="obj of payment" :key="obj.key" :value="obj.key">{{ obj.value }}</el-option>         
            </el-select>
        </div>
    </div> 
    
    <div class="col-md-4" v-show="showPurchaseOrder">
        <div class="form-group">
            <label for="state">
                <small><b>{{ $t('storage_status') }}</b></small>
            </label>
            <div class="form-group">
                <el-select class="" style="width: 100%;" v-model="storage_status" @click="searching()">
                    <el-option value=""> {{ $t('all') }} </el-option>
                    <el-option v-for="(app, i) in storage" :key="i" :value="app.key"> {{ app.value }}</el-option>                                      
                </el-select>
            </div>
           
        </div>
    </div>

    <div class="col-md-4 mb-3" v-show="showInboundOrder || showReturnForm  || showOutboundOrder || showTransfer"> 
        <label for="amount_including_tax">
            <small><b>{{ $t('amount_including_tax') }}</b></small> 
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

 </div>
 <div class="row mx-2"  v-show="showAdvanced">
    <button class="btn btn-primary mr-2" @click="searching()">{{ $t('search') }}</button>
    <span class="search_btn" @click="reset()">{{ $t('reset') }}</span> 
  </div>

</div>

 
</template>
<script>
import {authApi} from '@/http/authApi'
import ProjectName from '@/components/Share/ProjectName.vue';
import ProjectToName from '@/components/Share/ProjectToName.vue';
export default {
    name: "Searching",
    props: ['api', 'advanced','createBtn', 'routeName', 
    'showpurchase_requisition','showPurchaseOrder', 'showInboundOrder', 'showReturnForm', 'showOutboundOrder',
    'showTransfer'
    ],
    data() {
        return {
            loading: true,
            formSearching: "",
            showAdvanced: false, 
            approve_status: "",   
            approval: [
                {key: 'approval', value: 'Approval'},
                {key: 'approved', value: 'Approved'},
                {key: 'approval_rejected', value: 'Approval Rejected'},
                {key: 'revoked', value: 'Revoked'},
                {key: 'draft', value: 'Draft'},
            ], 
            purchase: [
                {key: 'purchased',value: 'Purchased'},
                {key: 'not_purchased',value: 'Not Purchased'},
                {key: 'partially_purchase',value: 'Partially Purchase'}
            ], 
            storage: [
                {key: 'stocked', value: 'Stocked'},
                {key: 'not_in_storage', value: 'Not in storage'},
                {key: 'partially_storage', value: 'Partially Storage'}
            ],
            payment: [
                {key: 'paid', value: 'Paid'},
                {key: 'unpaid', value: 'Upaid'},
                {key: 'partially_payment', value: 'Partially Payment'},
            ],
            min_tax: "",
            max_tax: "",  
            payment_status: "",
            storage_status: "",           
            purchase_status: "",           
            date: "", 
            project_id: "",
            MaterialPlanFormData: {
                approve_status: "",
                application_date: {
                    min_date: "",
                    max_date: "",
                },
                project_id: ""
            },
            PurchaseRequisitionFormData: {
                application_date: {
                    min_date: "",
                    max_date: "",
                },
                approve_status: "",
                project_id: "",
                purchase_status: "",
            },
            PurchaseOrderFormData: {
                application_date: {
                    min_date: "",
                    max_date: "",
                },
                approve_status: "",
                project_id: "",
                payment_status: "",
                storage_status: "",
                total_tax: {
                    min_tax: "",
                    max_tax: ""
                }
            },
            InboundOrderFormData: {
                approve_status: "",
                project_id: ""

            },
            ReturnFormData: {
                application_date: {
                    min_date: "",
                    max_date: "",
                },
                approve_status: "",
                project_id: ""
            },
            OutboundFormData: {
                application_date: {
                    min_date: "",
                    max_date: "",
                },
                approve_status: "",
                project_id: ""
            },
             TransferFormData: {
                transfer_date: {
                    min_date: "",
                    max_date: "",
                },
                approve_status: "",
                project_from_id: "",
                project_to_id: "",
                // project_id: ""
            },
            project_to_id: "",

        }
    },
    components: {
        ProjectName,
        ProjectToName
    },
    created(){           

    },
    methods:{           
         getProjectToName(data) {   
        //  this.TransferFormData.project_to_id = data.project_to_id;   
        this.project_to_id = data;      
        },  
        getProjectName(data) {   
         this.project_id = data;    
                     
        },      
        reset(){

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
            if(this.showpurchase_requisition){
                if(this.date != "" && this.date != null){
                    let start_min_date= this.convertDate(this.date[0]);
                    let start_max_date = this.convertDate(this.date[1]);
                    this.PurchaseRequisitionFormData.application_date.min_date= start_min_date;
                    this.PurchaseRequisitionFormData.application_date.max_date = start_max_date;
                    }
                    else{
                        this.PurchaseRequisitionFormData.application_date.min_date= "";
                        this.PurchaseRequisitionFormData.application_date.max_date = "";
                    }
                    this.PurchaseRequisitionFormData.approve_status= this.approve_status;
                    this.PurchaseRequisitionFormData.project_id= this.project_id; 
                    this.PurchaseRequisitionFormData.purchase_status = this.purchase_status;                 
                    FormData = this.PurchaseRequisitionFormData;
            }
            if(this.showPurchaseOrder){
                if(this.date != "" && this.date != null){
                    let start_min_date= this.convertDate(this.date[0]);
                    let start_max_date = this.convertDate(this.date[1]);
                    this.PurchaseOrderFormData.application_date.min_date= start_min_date;
                    this.PurchaseOrderFormData.application_date.max_date = start_max_date;
                    }
                    else{
                        this.PurchaseOrderFormData.application_date.min_date= "";
                        this.PurchaseOrderFormData.application_date.max_date = "";
                    }
                    this.PurchaseOrderFormData.approve_status= this.approve_status;
                    this.PurchaseOrderFormData.project_id= this.project_id; 
                    this.PurchaseOrderFormData.payment_status = this.payment_status;
                    this.PurchaseOrderFormData.storage_status= this.storage_status; 
                    this.PurchaseOrderFormData.total_tax.min_tax= this.min_tax;
                    this.PurchaseOrderFormData.total_tax.max_tax= this.max_tax;              
                    FormData = this.PurchaseOrderFormData;
            }
            if(this.showInboundOrder){
                
                    this.InboundOrderFormData.approve_status = this.approve_status;
                    this.InboundOrderFormData.project_id= this.project_id;
                    FormData = this.InboundOrderFormData;
            }
            if(this.showReturnForm){
                if(this.date != "" && this.date != null){
                    let start_min_date= this.convertDate(this.date[0]);
                    let start_max_date = this.convertDate(this.date[1]);
                    this.ReturnFormData.application_date.min_date= start_min_date;
                    this.ReturnFormData.application_date.max_date = start_max_date;
                    }
                    else{
                        this.ReturnFormData.application_date.min_date= "";
                        this.ReturnFormData.application_date.max_date = "";
                    }
                    this.ReturnFormData.approve_status= this.approve_status;
                    this.ReturnFormData.project_id= this.project_id;                              
                    FormData = this.ReturnFormData;
            }
             if(this.showOutboundOrder){
                if(this.date != "" && this.date != null){
                    let start_min_date= this.convertDate(this.date[0]);
                    let start_max_date = this.convertDate(this.date[1]);
                    this.OutboundFormData.application_date.min_date= start_min_date;
                    this.OutboundFormData.application_date.max_date = start_max_date;
                    }
                    else{
                        this.OutboundFormData.application_date.min_date= "";
                        this.OutboundFormData.application_date.max_date = "";
                    }
                    this.OutboundFormData.approve_status= this.approve_status;
                    this.OutboundFormData.project_id= this.project_id;                              
                    FormData = this.OutboundFormData;
            }
            if(this.showTransfer){
                if(this.date != "" && this.date != null){
                    let start_min_date= this.convertDate(this.date[0]);
                    let start_max_date = this.convertDate(this.date[1]);
                    this.TransferFormData.transfer_date.min_date= start_min_date;
                    this.TransferFormData.transfer_date.max_date = start_max_date;
                    }
                    else{
                        this.TransferFormData.transfer_date.min_date= "";
                        this.TransferFormData.transfer_date.max_date = "";
                    }
                    this.TransferFormData.approve_status= this.approve_status;
                    this.TransferFormData.project_from_id= this.project_id;    
                    this.TransferFormData.project_to_id= this.project_to_id;                          
                    FormData = this.TransferFormData;
            }
            if(!this.showpurchase_requisition && !this.showPurchaseOrder && !this.showInboundOrder && !this.showTransfer){
                if(this.date != "" && this.date != null){
                    let start_min_date= this.convertDate(this.date[0]);
                    let start_max_date = this.convertDate(this.date[1]);
                    this.MaterialPlanFormData.application_date.min_date= start_min_date;
                    this.MaterialPlanFormData.application_date.max_date = start_max_date;
                    }
                    else{
                        this.MaterialPlanFormData.application_date.min_date= "";
                        this.MaterialPlanFormData.application_date.max_date = "";
                    }
                    this.MaterialPlanFormData.approve_status= this.approve_status;
                    this.MaterialPlanFormData.project_id= this.project_id;                  
                    FormData = this.MaterialPlanFormData;
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
}
</style>