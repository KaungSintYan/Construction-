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
                            <el-button v-show="!showAdvanced" @click="searching()"> {{ $t('search') }} </el-button> 
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
 <div class="row mt-3 mb-3" v-show="showAdvanced">
    <div class="col-md-4">
        <ProjectName @projectData="getProjectName($event)"  />    
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
    <div class="col-md-4">
        <div class="row mx-1 pb-2">
            <small><b>{{ $t('date') }}</b></small>
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
    <div class="col-md-4"> 
        <label for="amount">
            <small><b>{{ $t('amount') }}</b></small>
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
    <div class="col-md-4" v-show="!showDebitNote && !showRepaymentNote && !showReimbursement">
        <div class="form-group mb-3">
            <label for="receipt_amount">
                <span class="text-danger">*</span><small><b>{{ $t('type') }}</b></small> 
            </label>                           
            <el-select style="width: 100%;" class="" v-model="type">
                <el-option value="">{{ $t('selected') }}</el-option>
                <el-option v-for="obj of types" :key="obj.key" :value="obj.key"> {{ obj.value}}</el-option>
            </el-select>                              
        </div>
    </div> 
    <div class="col-md-4" v-show="this.showReimbursement">
        <div class="form-group mb-3">
            <label for="receipt_amount">
                <span class="text-danger">*</span><small><b>{{ $t('offset_type') }}</b></small> 
            </label>                           
            <el-select style="width: 100%;" class="" v-model="offset_type">
                <el-option value="">{{ $t('selected') }}</el-option>
                <el-option v-for="obj of borrow_offset_type" :key="obj.key" :value="obj.key"> {{ obj.value}}</el-option>
            </el-select>                              
        </div>
    </div> 
    <!-- <div class="col-md-4">
        <PickerName @pickerData="getPickerName($event)"  />
    </div> -->
    <div class="col-md-4" v-show="showDebitNote || showReimbursement">
        <div class="form-group">
            <label for="type_of_contract">
                <small><b>{{ $t('payment_status') }}</b></small>
            </label>            
            <el-select style="width: 100%;" class="" id="type_of_contract" v-model="payment_status">
                <el-option value="">{{ $t('please_choose') }}</el-option>
                <el-option v-for="obj of payment" :key="obj.key" :value="obj.key">{{ obj.value }}</el-option>         
            </el-select>
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
import PickerName from '@/components/Share/PickerName.vue';
export default {
    name: "Searching",
    props: ['api', 'advanced', 'classApi', 'createBtn', 'routeName',
    'showDebitNote','showRepaymentNote', 'showReimbursement'
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
            types: [
                {key: 'cash_withdrawal', value: 'Cash Withdrawal'},
                {key: 'return_of_reverse_fund', value: 'Return of Reverse Fund'}
            ],
            type: "",
            picker: "", 
            min_amount: "",
            max_amount: "",
            payment: [
                {key: 'paid', value: 'Paid'},
                {key: 'unpaid', value: 'Upaid'},
                {key: 'partially_payment', value: 'Partially Payment'},
            ],
            payment_status: "",
            borrow_offset_type: [
                {key: 'offset_borrowing', value: 'Offset Borrowing'},
                {key: 'offset_reverse', value: 'Offset Reverse'},
            ],  
            offset_type: "",
            ReserveFundFormData: {               
                receipt_amount: {
                    min_amount: "",
                    max_amount: ""
                },
                pick_up_date: {
                    min_date: "",
                    max_date: "",
                },
                type: "",
                approve_status: "",
                project_id: "",
                receipient: "",
            }, 
            DebitNoteFormData: {
                project_id: "",
                borrowing_date: {
                    min_date: "",
                    max_date: ""
                },
                borrower: "",
                payment_status: "",
                approve_status: "",
                total_loan_amount: {
                    min_amount: "",
                    max_amount: ""
                }
            },    
            RepaymentNoteFormData: {
                project_id: "",
                repayment_date: {
                    min_date: "",
                    max_date: ""
                },
                repayer: "",               
                approve_status: "",
                total_payment_amount: {
                    min_amount: "",
                    max_amount: ""
                }
            },
            ReimbursementFormData: {
                project_id: "",
                approve_status: "",
                payment_status: "",
                total_reimbursement_amount: {
                    min_amount: "",
                    max_amount: ""                   
                },
                offset_type: "",
                reimbursement_date: {
                    min_date: "",
                    max_date: ""
                },
                reimburser: ""
            }        

        }
    },
    components: {
      ProjectName, 
      PickerName
    },   

    created(){ 
            

    },
    methods:{   
        reset() {

        },     
        getProjectName(data) {   
         this.project_id = data;                 
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
            if(this.showDebitNote){
                if(this.date != "" && this.date != null){
                    let start_min_date= this.convertDate(this.date[0]);
                    let start_max_date = this.convertDate(this.date[1]);
                    this.DebitNoteFormData.borrowing_date.min_date= start_min_date;
                    this.DebitNoteFormData.borrowing_date.max_date = start_max_date;
                    }
                    else{
                        this.DebitNoteFormData.borrowing_date.min_date= "";
                        this.DebitNoteFormData.borrowing_date.max_date = "";
                    }
                    this.DebitNoteFormData.approve_status= this.approve_status;
                    this.DebitNoteFormData.project_id= this.project_id;                  
                    this.DebitNoteFormData.total_loan_amount.min_amount= this.min_amount;
                    this.DebitNoteFormData.total_loan_amount.max_amount = this.max_amount;
                    this.DebitNoteFormData.borrower= this.picker; 
                    FormData = this.DebitNoteFormData;
            }
            if(this.showRepaymentNote){
                if(this.date != "" && this.date != null){
                    let start_min_date= this.convertDate(this.date[0]);
                    let start_max_date = this.convertDate(this.date[1]);
                    this.RepaymentNoteFormData.repayment_date.min_date= start_min_date;
                    this.RepaymentNoteFormData.repayment_date.max_date = start_max_date;
                    }
                    else{
                        this.RepaymentNoteFormData.repayment_date.min_date= "";
                        this.RepaymentNoteFormData.repayment_date.max_date = "";
                    }
                    this.RepaymentNoteFormData.approve_status= this.approve_status;
                    this.RepaymentNoteFormData.project_id= this.project_id;                  
                    this.RepaymentNoteFormData.total_payment_amount.min_amount= this.min_amount;
                    this.RepaymentNoteFormData.total_payment_amount.max_amount = this.max_amount;
                    this.RepaymentNoteFormData.repayer= this.picker; 
                    FormData = this.RepaymentNoteFormData;
            }
            if(this.showReimbursement){
                if(this.date != "" && this.date != null){
                    let start_min_date= this.convertDate(this.date[0]);
                    let start_max_date = this.convertDate(this.date[1]);
                    this.ReimbursementFormData.reimbursement_date.min_date= start_min_date;
                    this.ReimbursementFormData.reimbursement_date.max_date = start_max_date;
                    }
                    else{
                        this.ReimbursementFormData.reimbursement_date.min_date= "";
                        this.ReimbursementFormData.reimbursement_date.max_date = "";
                    }
                    this.ReimbursementFormData.approve_status= this.approve_status;
                    this.ReimbursementFormData.project_id= this.project_id;                  
                    this.ReimbursementFormData.total_reimbursement_amount.min_amount= this.min_amount;
                    this.ReimbursementFormData.total_reimbursement_amount.max_amount = this.max_amount;
                    this.ReimbursementFormData.reimburser= this.picker; 
                    this.ReimbursementFormData.offset_type= this.offset_type;
                    FormData = this.ReimbursementFormData;
            }
            if(!this.showDebitNote && !this.showRepaymentNote && !this.showReimbursement){
                if(this.date != "" && this.date != null){
                    let start_min_date= this.convertDate(this.date[0]);
                    let start_max_date = this.convertDate(this.date[1]);
                    this.ReserveFundFormData.pick_up_date.min_date= start_min_date;
                    this.ReserveFundFormData.pick_up_date.max_date = start_max_date;
                    }
                    else{
                        this.ReserveFundFormData.pick_up_date.min_date= "";
                        this.ReserveFundFormData.pick_up_date.max_date = "";
                    }
                    this.ReserveFundFormData.approve_status= this.approve_status;
                    this.ReserveFundFormData.project_id= this.project_id;
                    this.ReserveFundFormData.type= this.type;
                    this.ReserveFundFormData.receipt_amount.min_amount= this.min_amount;
                    this.ReserveFundFormData.receipt_amount.max_amount = this.max_amount;
                    this.ReserveFundFormData.receipient= this.picker; 
                    FormData = this.ReserveFundFormData;
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