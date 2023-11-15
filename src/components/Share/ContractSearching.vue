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
                                    <font-awesome-icon icon="fa-solid fa-search" /></div>
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
 
  <div class="row my-2" v-show="showAdvanced">
    <div class="col-md-4">
        <ProjectName @projectData="getProjectName($event)"  />    
    </div>
    <div class="col-md-4">
        <div class="form-group">
            <label for="state">
                <small><b>{{ $t('approval_status') }}</b></small>
            </label>
            <div class="form-group">
                <el-select class="" style="width: 100%;" v-model="RevenueFormData.approve_status" @click="searching()">
                    <el-option value=""> {{ $t('add') }} </el-option>
                    <el-option v-for="(app, i) in approval" :key="i" :value="app.key"> {{ app.value }}</el-option>                                      
                </el-select>
            </div>
           
        </div>
    </div> 
    <div class="col-md-4" v-show="showIncomeVisa != true && showExecution !=true && showSettlement !=true && showSpending != true && showspendingVisa !=true && showexecutionSpending != true && showexpenditureSettlement != true" >
        <div class="row mx-1 pb-2">
            <small><b>{{ $t('date_of_signing') }}</b></small>
        </div>
        <div class="row mx-1">    
        <el-date-picker
                            v-model="revenue_date"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="Start date"
                            end-placeholder="End date"                          
                            size="large"
                        />
        </div>
    </div>   
   
    <div class="col-md-4"  v-show="showIncomeVisa != true && showExecution !=true && showSettlement !=true && showSpending != true && showspendingVisa !=true && showexecutionSpending != true && showexpenditureSettlement != true"  >
        <div class="form-group">
            <label for="type_of_contract">
                <small><b>{{ $t('type_of_contract') }} </b></small>
            </label>            
            <el-select class="" style="width: 100%;" id="type_of_contract" v-model="RevenueFormData.contract_type_id">
                <el-option value="">{{ $t('please_choose') }}</el-option>
                <el-option v-for="obj of contractType" :key="obj.contract_type_id" :label="obj.contract_type_name" :value="obj.contract_type_id">{{ obj.contract_type_name }}</el-option>         
            </el-select>
        </div>
    </div>
    <div class="col-md-4"  v-show="showIncomeVisa != true && showExecution !=true && showSettlement !=true && showSpending == true && showspendingVisa !=true && showexecutionSpending != true && showexpenditureSettlement != true" >
        <div class="form-group">
            <label for="payment_statuse">
                <small><b>{{ $t('payment_status') }}</b></small>
            </label>            
            <el-select class="" style="width: 100%;" id="payment_statuse" v-model="RevenueFormData.payment_status">
                <el-option value="">{{ $t('please_choose') }}</el-option>
                <el-option v-for="obj of payment_status" :key="obj.key" :value="obj.key">{{ obj.value }}</el-option>         
            </el-select>
        </div>
    </div>
    <div class="col-md-4"  v-show="showIncomeVisa != true && showExecution !=true && showSettlement !=true && showSpending != true && showspendingVisa !=true && showexecutionSpending != true && showexpenditureSettlement != true" >
       <Client  @clientData="getClientName($event)"   />
    </div>

    <div class="col-md-4"> 
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
     
     <div class="col-md-4" v-show="showIncomeVisa || showspendingVisa">
        <div class="row mx-1 pb-2">
            <small><b>{{ $t('visa_date') }}</b></small>
        </div>
        <div class="row mx-1">    
        <el-date-picker
                            v-model="visa_date"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="Start date"
                            end-placeholder="End date"                          
                            size="large"
                        />
        </div>
    </div>
    <div class="col-md-4" v-show="showExecution || showSettlement">
        <RevenueContractName  @revenueData="getRevenueName($event)"   />
     </div>

     <div class="col-md-4" v-show="showExecution || showexecutionSpending">
        <div class="row mx-1 pb-2">
            <small><b>{{ $t('execution_date') }}</b></small>
        </div>
        <div class="row mx-1">    
        <el-date-picker
                            v-model="execution_date"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="Start date"
                            end-placeholder="End date"                          
                            size="large"
                        />
        </div>
    </div>
    <div class="col-md-4" v-show="showSettlement || showexpenditureSettlement">
        <div class="row mx-1 pb-2">
            <small><b>{{ $t('settlement_date') }}</b></small>
        </div>
        <div class="row mx-1">    
        <el-date-picker
                            v-model="settlement_date"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="Start date"
                            end-placeholder="End date"                          
                            size="large"
                        />
        </div>
    </div>
    <div class="col-md-4"  v-show="showSpending"  >
        <div class="form-group">
            <label for="type_of_contract">
                <small><b>{{ $t('type_of_contract') }}</b></small> 
            </label>            
            <el-select class="" style="width: 100%;" id="type_of_contract" v-model="SpendingFormData.contract_type_id">
                <el-option value="">{{ $t('please_choose') }}</el-option>
                <el-option v-for="obj of spendingContractType" :key="obj.contract_type_id" :value="obj.contract_type_id" :label="obj.contract_type_name">{{ obj.contract_type_name }}</el-option>         
            </el-select>
        </div>
    </div>
    <div class="col-md-4"  v-show="showSpending"  >
        <Supplier @supplierData="getSuppliperData($event)" />
      </div>
      <div class="col-md-4"  v-show="showSpending"  >
        <InternalUnit @internalUnitData="getInternalUnitData($event)" />  
      </div> 
      <div class="col-md-4" v-show="showspendingVisa || showexecutionSpending || showexpenditureSettlement">
        <SpendingContract @spendingData="getSpendingName($event)" />  
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
import Client from '@/components/Share/Client.vue';
import RevenueContractName from '@/components/Share/RevenueContractName.vue';
import Supplier from '@/components/Share/Supplier.vue';
import InternalUnit from '@/components/Share/InternalUnit.vue';
import SpendingContract from '@/components/Share/SpendingContract.vue';
export default {
    name: "Searching",
    props: ['api', 'advanced','createBtn', 'routeName', 'budget', 'showApply', 'showIncomeVisa',
    'showExecution', 'showSettlement', 'showSpending', 'showspendingVisa', 'showexecutionSpending',
    'showexpenditureSettlement'
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
            payment_status: [
                {key: 'paid', value: 'Paid'},
                {key: 'unpaid', value: 'Upaid'},
                {key: 'partially_payment', value: 'Partially Payment'},
            ],           
            RevenueFormData: {
                approve_status: "",
                date_of_signing: {
                    min_date: "",
                    max_date: "",
                },
                project_id: "",
                contract_type_id: "",
                payment_status: "",
                client_id: "",
                amount_with_tax: {
                    min_amount: "",
                    max_amount: ""
                }
            },
            revenue_date: "",
            min_amount: "",
            max_amount: "",           
            contractType: "",
            visa_date: "",
            VisaFormData: {
                approve_status: "",
                visa_date: {
                    min_date: "",
                    max_date: "",
                },
                project_id: "",
                revenue_contract_id: "",            
                amount_with_tax: {
                    min_amount: "",
                    max_amount: ""
                }
            },
            execution_date: "",
            ExeFormData: {
                approve_status: "",
                execution_date: {
                    min_date: "",
                    max_date: "",
                },
                project_id: "",
                revenue_contract_id: "",            
                execution_amount: {
                    min_amount: "",
                    max_amount: ""
                }
            },
            settlement_date: "",
            SetFormData: {
                approve_status: "",
                settlement_date: {
                    min_date: "",
                    max_date: "",
                },
                project_id: "",
                revenue_contract_id: "",            
                settlement_amount: {
                    min_amount: "",
                    max_amount: ""
                }
            },
            SpendingFormData: {
                approve_status: "",
                date_of_signing: {
                    min_date: "",
                    max_date: "",
                },
                project_id: "",
                contract_type_id: "",
                payment_status: "",                
                amount_with_tax: {
                    min_amount: "",
                    max_amount: ""
                },
                supplier_id: "",
                internal_unit_id: ""
            },
            spendingContractType: "",
            SpendingVisaFormData: {
                approve_status: "",
                visa_date: {
                    min_date: "",
                    max_date: "",
                },
                project_id: "",
                spending_contract_id: "",               
                amount_with_tax: {
                    min_amount: "",
                    max_amount: ""
                },                
            },
            ExecutionSpendingFormData: {
                approve_status: "",
                execution_date: {
                    min_date: "",
                    max_date: "",
                },
                project_id: "",
                spending_contract_id: "",               
                execution_amount: {
                    min_amount: "",
                    max_amount: ""
                },                
            },
            ExpenditureSettlementFormData: {
                approve_status: "",
                settlement_date: {
                    min_date: "",
                    max_date: "",
                },
                project_id: "",
                spending_contract_id: "",               
                settlement_amount: {
                    min_amount: "",
                    max_amount: ""
                },                
            },            
        }
    },  
    components: {
      ProjectName, 
      Client,
      RevenueContractName,
      Supplier,
      InternalUnit,
      SpendingContract
    },  
    created(){    
        this.getTypeofContract();
        this.getSpendingTypeofContract();
    },
    methods:{ 
        async getSpendingTypeofContract(){
        let response = await authApi({
                method: 'GET',
                api: '/contractmanagement/spending_contract_type',
                params: {                       
                      name: ""
                }   
        });
        this.spendingContractType= response.data;           
       },
        async getTypeofContract(){
        let response = await authApi({
                method: 'GET',
                api: '/contractmanagement/revenue_contract_type',
                params: {                       
                      name: ""
                }   
        });
        this.contractType= response.data;           
       },
        getProjectName(data) {   
         this.RevenueFormData.project_id = data;                 
        }, 
        getClientName(data){
            this.RevenueFormData.client_id= data;
        },
        getRevenueName(data) {
            this.VisaFormData.revenue_contract_id = data;
        },
        getSuppliperData(data){
          this.SpendingFormData.supplier_id= data;
        },
        getInternalUnitData(data){
            this.SpendingFormData.internal_unit_id= data;
        },
        getSpendingName(data){
            this.SpendingVisaFormData.spending_contract_id= data;             
        },
        reset(){
            this.revenue_date="";           
            this.RevenueFormData.amount_with_tax.max_amount= "";
            this.RevenueFormData.amount_with_tax.min_amount= "";    
            this.RevenueFormData.approve_status="";
            this.RevenueFormData.client_id="";
            this.RevenueFormData.contract_type_id="";
            this.RevenueFormData.date_of_signing.max_date="";
            this.RevenueFormData.date_of_signing.min_date="";   
            
            this.min_amount="";
            this.max_amount="";
            this.searching();      
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
                if(this.showIncomeVisa){
                    if(this.visa_date != "" && this.visa_date != null){
                    let start_min_date= this.convertDate(this.visa_date[0]);
                    let start_max_date = this.convertDate(this.visa_date[1]);
                    this.VisaFormData.visa_date.min_date= start_min_date;
                    this.VisaFormData.visa_date.max_date = start_max_date;
                    }
                    else{
                        this.VisaFormData.visa_date.min_date= "";
                        this.VisaFormData.visa_date.max_date = "";
                    }
                    this.VisaFormData.approve_status= this.RevenueFormData.approve_status;
                    this.VisaFormData.project_id= this.RevenueFormData.project_id;
                    this.VisaFormData.amount_with_tax.min_amount= this.min_amount;
                    this.VisaFormData.amount_with_tax.max_amount= this.max_amount;
                    FormData = this.VisaFormData;
                }
                if(this.showExecution){
                    if(this.execution_date != "" && this.execution_date != null){
                    let start_min_date= this.convertDate(this.execution_date[0]);
                    let start_max_date = this.convertDate(this.execution_date[1]);
                    this.ExeFormData.execution_date.min_date= start_min_date;
                    this.ExeFormData.execution_date.max_date = start_max_date;
                    }
                    else{
                        this.ExeFormData.execution_date.min_date= "";
                        this.ExeFormData.execution_date.max_date = "";
                    }
                    this.ExeFormData.approve_status= this.RevenueFormData.approve_status;
                    this.ExeFormData.project_id= this.RevenueFormData.project_id;
                    this.ExeFormData.execution_amount.min_amount= this.min_amount;
                    this.ExeFormData.execution_amount.max_amount= this.max_amount;
                    FormData = this.ExeFormData;
                }
                if(this.showSettlement){
                    if(this.settlement_date != "" && this.settlement_date != null){
                    let start_min_date= this.convertDate(this.settlement_date[0]);
                    let start_max_date = this.convertDate(this.settlement_date[1]);
                    this.SetFormData.settlement_date.min_date= start_min_date;
                    this.SetFormData.settlement_date.max_date = start_max_date;
                    }
                    else{
                        this.SetFormData.settlement_date.min_date= "";
                        this.SetFormData.settlement_date.max_date = "";
                    }
                    this.SetFormData.approve_status= this.RevenueFormData.approve_status;
                    this.SetFormData.project_id= this.RevenueFormData.project_id;
                    this.SetFormData.settlement_amount.min_amount= this.min_amount;
                    this.SetFormData.settlement_amount.max_amount= this.max_amount;
                    FormData = this.SetFormData;
                }
                if(this.showSpending){
                    if(this.revenue_date != "" && this.revenue_date != null){
                    let start_min_date= this.convertDate(this.revenue_date[0]);
                    let start_max_date = this.convertDate(this.revenue_date[1]);
                    this.SpendingFormData.date_of_signing.min_date= start_min_date;
                    this.SpendingFormData.date_of_signing.max_date = start_max_date;
                    }
                    else{
                        this.SpendingFormData.date_of_signing.min_date= "";
                        this.SpendingFormData.date_of_signing.max_date = "";
                    }
                    this.SpendingFormData.approve_status= this.RevenueFormData.approve_status;
                    this.SpendingFormData.project_id= this.RevenueFormData.project_id;
                    this.SpendingFormData.amount_with_tax.min_amount= this.min_amount;
                    this.SpendingFormData.amount_with_tax.max_amount= this.max_amount;
                    FormData = this.SpendingFormData;
                }
                if(this.showspendingVisa){
                    if(this.visa_date != "" && this.visa_date != null){
                    let start_min_date= this.convertDate(this.visa_date[0]);
                    let start_max_date = this.convertDate(this.visa_date[1]);
                    this.SpendingVisaFormData.visa_date.min_date= start_min_date;
                    this.SpendingVisaFormData.visa_date.max_date = start_max_date;
                    }
                    else{
                        this.SpendingVisaFormData.visa_date.min_date= "";
                        this.SpendingVisaFormData.visa_date.max_date = "";
                    }
                    this.SpendingVisaFormData.approve_status= this.RevenueFormData.approve_status;
                    this.SpendingVisaFormData.project_id= this.RevenueFormData.project_id;
                    this.SpendingVisaFormData.amount_with_tax.min_amount= this.min_amount;
                    this.SpendingVisaFormData.amount_with_tax.max_amount= this.max_amount;
                    FormData = this.SpendingVisaFormData;
                }
                if(this.showexecutionSpending){
                    if(this.execution_date != "" && this.execution_date != null){
                    let start_min_date= this.convertDate(this.execution_date[0]);
                    let start_max_date = this.convertDate(this.execution_date[1]);
                    this.ExecutionSpendingFormData.execution_date.min_date= start_min_date;
                    this.ExecutionSpendingFormData.execution_date.max_date = start_max_date;
                    }
                    else{
                        this.ExecutionSpendingFormData.execution_date.min_date= "";
                        this.ExecutionSpendingFormData.execution_date.max_date = "";
                    }
                    this.ExecutionSpendingFormData.approve_status= this.RevenueFormData.approve_status;
                    this.ExecutionSpendingFormData.project_id= this.RevenueFormData.project_id;
                    this.ExecutionSpendingFormData.execution_amount.min_amount= this.min_amount;
                    this.ExecutionSpendingFormData.execution_amount.max_amount= this.max_amount;
                    this.ExecutionSpendingFormData.spending_contract_id=this.SpendingVisaFormData.spending_contract_id;
                    FormData = this.ExecutionSpendingFormData;
                }
                if(this.showexpenditureSettlement){
                    if(this.settlement_date != "" && this.settlement_date != null){
                    let start_min_date= this.convertDate(this.settlement_date[0]);
                    let start_max_date = this.convertDate(this.settlement_date[1]);
                    this.ExpenditureSettlementFormData.settlement_date.min_date= start_min_date;
                    this.ExpenditureSettlementFormData.settlement_date.max_date = start_max_date;
                    }
                    else{
                        this.ExpenditureSettlementFormData.settlement_date.min_date= "";
                        this.ExpenditureSettlementFormData.settlement_date.max_date = "";
                    }
                    this.ExpenditureSettlementFormData.approve_status= this.RevenueFormData.approve_status;
                    this.ExpenditureSettlementFormData.project_id= this.RevenueFormData.project_id;
                    this.ExpenditureSettlementFormData.settlement_amount.min_amount= this.min_amount;
                    this.ExpenditureSettlementFormData.settlement_amount.max_amount= this.max_amount;
                    this.ExpenditureSettlementFormData.spending_contract_id=this.SpendingVisaFormData.spending_contract_id;
                    FormData = this.ExpenditureSettlementFormData;
                }
                if(!this.showIncomeVisa && !this.showExecution && !this.showSettlement && !this.showSpending && !this.showspendingVisa 
                && !this.showexecutionSpending && !this.showexpenditureSettlement ){
                    if(this.revenue_date != "" && this.revenue_date != null){
                    let start_min_date= this.convertDate(this.revenue_date[0]);
                    let start_max_date = this.convertDate(this.revenue_date[1]);
                    this.RevenueFormData.date_of_signing.min_date= start_min_date;
                    this.RevenueFormData.date_of_signing.max_date = start_max_date;
                    }
                    else{
                        this.RevenueFormData.date_of_signing.min_date= "";
                        this.RevenueFormData.date_of_signing.max_date = "";
                    }
                    this.RevenueFormData.amount_with_tax.min_amount= this.min_amount;
                    this.RevenueFormData.amount_with_tax.max_amount= this.max_amount;
                    FormData = this.RevenueFormData;
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