<template>
    <div class="container-fluid"  @click="$store.commit('setActive', false)"> 
        <form  @submit.prevent="createData">    
            <div class="row">
                <div class="col-md-12"> 
                            <ProjectName @projectData="getProjectName($event)"  />
                            <span v-if="v$.FormData.contract_info.project_id.$error" class="text-danger">
                                <span v-if="v$.FormData.contract_info.project_id.$errors[0].$message != ''">
                                    {{ $t('is_required',{'name': $t('project')}) }}
                                </span>
                            </span>
                            
                           <TypeOfSpending @ContractData="getContractData($event)"  />
                           <span v-if="v$.FormData.contract_info.contract_type_id.$error" class="text-danger">
                                <span v-if="v$.FormData.contract_info.contract_type_id.$errors[0].$message != ''">
                                    {{ $t('is_required', {'name': $t('type_of_contract')}) }}
                                </span>
                           </span>

                            <div class="form-group mb-3">
                                <label for="contract_title">
                                    <span class="text-danger">*</span> <small><b>{{ $t('contract_title') }}</b></small> 
                                </label>
                                <el-input type="text" id="contract_title" class="" :placeholder="$t('please_enter')"
                                 v-model="FormData.contract_info.contract_title" clearable/>
                                 <span v-if="v$.FormData.contract_info.contract_title.$error" class="text-danger">
                                    <span v-if="v$.FormData.contract_info.contract_title.$errors[0].$message != ''">
                                        {{ $t('is_required',{'name': $t('contract_title')}) }}
                                    </span>
                                 </span>
                            </div>                          

                            <div class="form-group mb-3">
                                <label for="visa_date"> <span class="text-danger">*</span><small><b> {{ $t('date_of_signing') }} </b></small></label>
                                <el-date-picker :placeholder="$t('pick_a_day')" type="date" 
                                class="" id="visa_date" style="width: 100%;" format="YYYY-MM-DD" value-format="YYYY-MM-DD" 
                                 v-model="FormData.contract_info.date_of_signing" clearable/>
                            </div>

                            <Supplier @supplierData="getSuppliperData($event)" />
                            <span v-if="v$.FormData.contract_info.supplier_id.$error" class="text-danger">
                                <span v-if="v$.FormData.contract_info.supplier_id.$errors[0].$message != ''">
                                    {{ $t('is_required',{'name': $t('contract_party')}) }}
                                </span>
                            </span>

                            <InternalUnit @internalUnitData="getInternalUnitData($event)" />  
                            <span v-if="v$.FormData.contract_info.internal_unit_id.$error" class="text-danger">
                                <span v-if="v$.FormData.contract_info.internal_unit_id.$errors[0].$message != ''">
                                    {{ $t('is_required',{'name': $t('party_b')}) }}
                                </span>
                            </span>

                            <!-- <div class="form-group mb-3">
                                <label for="amount_without_tax">
                                    <span class="text-danger">*</span> <small><b>{{ $t('amount_without_tax') }}</b></small> 
                                </label>
                                <el-input type="number" id="amount_without_tax" class="" :placeholder="$t('please_enter')"
                                v-model="FormData.contract_info.amount_without_tax" clearable/>
                                
                            </div>

                            <div class="form-group mb-3">
                                <label for="tax_rate">
                                    <span class="text-danger">*</span> <small><b>{{ $t('tax_rate') }}</b></small>
                                </label>
                                <el-input type="number"  class="" v-model="FormData.contract_info.tax_rate" clearable/>
                                <span v-if="v$.FormData.contract_info.tax_rate.$error" class="text-danger">
                                    <span v-if="v$.FormData.contract_info.tax_rate.$errors[0].$message != ''">
                                        {{ $t('is_required',{'name': $t('tax_rate')}) }}
                                    </span>
                                </span>
                            </div>

                            <div class="form-group mb-3">
                                <label for="tax">
                                    <small><b>{{ $t('tax') }}</b></small>
                                </label>
                                <el-input type="number" class="" v-model="calculateTax" readonly clearable/>
                            </div>

                            <div class="form-group mb-3">
                                <label for="amount_including_tax">
                                    <span class="text-danger">*</span> <small><b>{{ $t('amount_including_tax') }}</b></small>
                                </label>
                                
                                <el-input type="number" id="amount_with_tax" class="" :placeholder="$t('please_enter')"
                                v-model="FormData.contract_info.amount_with_tax" clearable/>
                                <span v-if="v$.FormData.contract_info.amount_with_tax.$error" class="text-danger">
                                    <span v-if="v$.FormData.contract_info.amount_with_tax.$errors[0].$message != ''">
                                        {{ $t('is_required',{'name': $t('amount_with_tax')}) }}
                                    </span>
                                </span>
                            </div>  -->

<!-- <el-input type="number" id="amount_including_tax" class="" 
                                v-model="calculateTaxAmount" readonly clearable/> -->

                            
                                <div class="form-group mb-3">
                                <label for="amount_without_tax">
                                    <span class="text-danger">*</span> <small><b>{{ $t('amount_without_tax') }}</b></small> 
                                </label>
                                <el-input type="number" id="amount_without_tax" class="" :placeholder="$t('please_enter')"
                                v-model="FormData.contract_info.amount_without_tax" clearable/>
                                <span v-if="v$.FormData.contract_info.amount_without_tax.$error" class="text-danger">
                                    <span v-if="v$.FormData.contract_info.amount_without_tax.$errors[0].$message != ''">
                                        {{ $t('is_required', {'name': $t('amount_without_tax')}) }}
                                    </span>
                                </span>
                            </div>

                            <div class="form-group mb-3">
                                <label for="tax_rate">
                                    <span class="text-danger">*</span> <small><b>{{ $t('tax_rate') }}</b></small>
                                </label>
                                <el-input type="number"  class="" v-model="FormData.contract_info.tax_rate" clearable/>
                                <span v-if="v$.FormData.contract_info.tax_rate.$error" class="text-danger">
                                    <span v-if="v$.FormData.contract_info.tax_rate.$errors[0].$message != ''">
                                        {{ $t('is_required', {'name': $t('tax_rate')}) }}
                                    </span>
                                </span>
                            </div>
       
                            <div class="form-group mb-3">
                                <label for="tax">
                                    <small><b>{{ $t('tax') }}</b></small>
                                </label>
                                <el-input type="number" class="" v-model="calculateTax" disabled />
                            </div>
       
                            <div class="form-group mb-3">
                                <label for="amount_including_tax">
                                    <span class="text-danger">*</span> <small><b>{{ $t('amount_including_tax') }}</b></small>
                                </label>
                                <el-input type="number" id="amount_including_tax" class="" 
                                v-model="calculateTaxAmount" readonly clearable/>
                                
                                <span v-if="v$.FormData.contract_info.amount_with_tax.$error" class="text-danger">
                                    <span v-if="v$.FormData.contract_info.amount_with_tax.$errors[0].$message != ''">
                                        {{ $t('is_required', {'name': $t('amount_including_tax')}) }}
                                    </span>
                                </span>
                            </div>    
                                
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label for="start_date"><small><b> {{ $t('start_date') }} </b></small></label>
                                        <el-date-picker :placeholder="$t('pick_a_day')" type="date" class="" id="start_date" style="width: 100%;"  v-model="FormData.contract_info.start_date" clearable/>
                                    </div>  
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label for="end_date"><small><b> {{ $t('end-date') }} </b></small></label>
                                        <el-date-picker :placeholder="$t('pick_a_day')" type="date" class=""
                                        format="YYYY-MM-DD" value-format="YYYY-MM-DD" 
                                         id="end_date" style="width: 100%;"  v-model="FormData.contract_info.end_date" clearable/>
                                    </div> 
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="">
                                    <small><b>{{ $t('payment_plan_details') }}</b></small> 
                                </label>


                               <div class="row mx-2 mb-4">
                                    <el-table :data="FormData.plan_details" border style="width: 100%;">
                                        <el-table-column  fixed type="index" width="55" />

                                        <el-table-column :label="$t('plan_name')" width="250px"> 
                                            <template #default="scope">
                                                <el-input type="text" :placeholder="$t('please_enter')" class="" v-model="scope.row.plan_name" clearable/> 
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('plan_date')" width="250px"> 
                                            <template #default="scope">
                                                <el-date-picker type="date" class="" format="YYYY-MM-DD" value-format="YYYY-MM-DD" 
                                                style="width: 100%;" :placeholder="$t('pick_a_day')" v-model="scope.row.plan_date" clearable />
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('scheduled_payment_amount')" width="250px"> 
                                            <template #default="scope">
                                                <el-input type="text" :placeholder="$t('please_enter')" class="" v-model="scope.row.payment_amount" clearable/>
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('payment_ratio')" width="250px"> 
                                            <template #default="scope">
                                                <el-input type="text" :placeholder="$t('please_enter')" class="" v-model="scope.row.receipt_ratio" clearable/>
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('payment_terms')" width="200px"> 
                                            <template #default="scope">
                                                <el-input type="textarea" :placeholder="$t('please_enter')" id="remark" v-model="scope.row.payment_terms" maxlength="1024" autosize show-word-limit  /> 
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('remark')" width="200px"> 
                                            <template #default="scope">
                                                <el-input type="textarea" :placeholder="$t('please_enter')" id="remark" v-model="scope.row.remark" maxlength="1024" autosize show-word-limit  /> 
                                            </template>
                                        </el-table-column>

                                        <el-table-column fixed="right"  :label="$t('operate')"  width="100px">
                                            <template #default="scope">
                                                <small class="text-danger" @click="deletePlanDetail(scope.row.id)">{{ $t('delete') }}</small>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>

                               <!-- end  -->

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
                                            <input type="text" class="form-control footer-input" value="1" />
                                            <small class="pt-1 ml-2 mt-1">{{ $t('page') }}</small>
                                        </div>
                                    </div>
                                    <div class="box-footer" @click="addPlanDetail">
                                        <font-awesome-icon icon="fa-solid fa-circle-plus" style="color:cornflowerblue;" /> <span class="text-primary">{{ $t('add_to') }}</span>
                                    </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="payment_terms">
                                    <small><b>{{ $t('payment_terms') }}</b></small> 
                                </label>
                                <el-input type="textarea" :placeholder="$t('please_enter')" id="payment_terms" 
                                v-model="FormData.contract_info.payment_terms" maxlength="3000" show-word-limit  />
                            </div>
                            <div class="form-group mb-3">
                                <label for="remark">
                                    <small><b>{{ $t('remark') }}</b></small>
                                </label>
                                <el-input type="textarea" :placeholder="$t('please_enter')" 
                                 v-model="FormData.contract_info.remark" maxlength="500" show-word-limit  />
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
import Supplier from '@/components/Share/Supplier.vue';
import InternalUnit from '@/components/Share/InternalUnit.vue';
import Picture from '@/components/Share/Picture.vue';
import Document from '@/components/Share/Document.vue';
import Approver from '@/components/Share/ApproverUser.vue';
import Cc from '@/components/Share/CcUser.vue';
import TypeOfSpending from '@/components/Share/TypeOfSpending.vue';
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators';

export default {
    name: 'SpendingCreate',
    data() {
        return {
            v$: useValidate(),
            submitting: false,
            FormData: {
                contract_info:{ 
                        contract_no: "",
                        contract_title: "",
                        date_of_signing: new Date().toISOString().slice(0,10),
                        amount_with_tax: "",
                        tax_rate: "",
                        tax: "",
                        amount_without_tax: "",
                        start_date: new Date().toISOString().slice(0,10),
                        end_date: new Date().toISOString().slice(0,10),                        
                        payment_terms: "",
                        remark: "",                        
                        picture: null,
                        appendix: null,
                        approver:[],
                        cc: [],
                        creation_time: "",
                        project_id: "",
                        contract_type_id: "",
                        supplier_id: "",
                        internal_unit_id: "",
                        created_by_user: ""
                    },
                    plan_details:[
                    {
                        id: 1,
                        revenue_contract_id: "",
                        plan_name: "",
                        plan_date: "",
                        payment_amount: "",
                        receipt_ratio: "",
                        payment_terms: "",
                        remark: ""
                    }
                ]               
            },
           
            detailCount: 1,
            pictureImages: [] ,
            appendixImages: [], 
            showapprover: [],
            showcc: []            
        }
    },
    components: {
      ProjectName,
      Supplier,  
      InternalUnit,
      Picture,
      Document,
      Approver,
      Cc,
      TypeOfSpending    
    }, 

    validations(){
        return {
            FormData: {
                contract_info: {
                    amount_with_tax: {
                        required,
                    },
                    amount_without_tax: {
                        required,
                    },
                    contract_title: {
                        required,
                    },
                    contract_type_id: {
                        required,
                    },
                    internal_unit_id: {
                        required,
                    },
                    project_id: {
                        required,
                    },
                    supplier_id: {
                        required,
                    },
                    tax_rate: {
                        required,
                    },
                }
            }
        }
    },

    created(){                
     
    },
    computed: {
        // calculateTax(){
        //     let tax ="";
        //     tax= (this.FormData.contract_info.amount_with_tax *(this.FormData.contract_info.tax_rate /100));
        //     this.FormData.contract_info.tax= tax;
        //     return tax;
        // },
        // calculateTaxAmount(){
        //     let amount= "";
        //     amount=this.FormData.contract_info.amount_with_tax - this.FormData.contract_info.tax;
        //     this.FormData.contract_info.amount_without_tax= amount;
        //     return amount;
        // }

        calculateTax(){
            let tax ="";
            tax= (this.FormData.contract_info.amount_without_tax * (this.FormData.contract_info.tax_rate /100));
            this.FormData.contract_info.tax= tax;
            return tax;
        },
        calculateTaxAmount(){
            let amount= "";
            amount= parseInt(this.FormData.contract_info.amount_without_tax) + parseInt(this.FormData.contract_info.tax);
            this.FormData.contract_info.amount_with_tax= amount;
            return amount;
        },

    },
    methods: {        
        getProjectName(data) {   
         this.FormData.contract_info.project_id = data;        
        },
        getRevenueData(data) {
          this.FormData.contract_info.revenue_contract_id= data;
        },
        getSuppliperData(data){
          this.FormData.contract_info.supplier_id= data;
        },
        getInternalUnitData(data){
            this.FormData.contract_info.internal_unit_id= data;
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
        getContractData(data){
            this.FormData.contract_info.contract_type_id = data;
        },  
        
       addPlanDetail() {
            this.detailCount = this.detailCount +1;
            let id= this.detailCount;
            let detail= {
                        id: id,
                        revenue_contract_id: "",
                        plan_name: "",
                        plan_date: "",
                        payment_amount: "",
                        receipt_ratio: "",
                        payment_terms: "",
                        remark: ""
                    }
            this.FormData.plan_details.push(detail);
           
        },
       deletePlanDetail(id){
          this.FormData.plan_details =this.FormData.plan_details.filter(x=> x.id != id);
        },
       async createData(){   
            this.submitting= true;
            this.v$.$validate();
            if(this.v$.$error){
                this.submitting = false;
                return;
            }  
            this.showapprover.forEach((value) => {
                this.FormData.contract_info.approver.push(value.userid);                
            }); 
            this.showcc.forEach((value) => {
                this.FormData.contract_info.cc.push(value.userid); 
            }); 
            let response = await authApi({
                method: 'POST',
                api: '/contractmanagement/spending_contract',
                data: this.FormData 
            });
            if(response.status == 201){  
                const id = response.data.spending_contract_id; 
                const imgformData = new FormData();
                imgformData.append('contract_id',id);
                this.pictureImages.forEach((value) => {
                     imgformData.append('picture', value.url);   
                });
                this.appendixImages.forEach((value) => {
                    imgformData.append('appendix', value.url);  
                }); 
                let imgResponse = await authApi({
                method: 'POST',
                api:  '/contractmanagement/spending_contract_datafiles',           
                data: imgformData
                });
                if(imgResponse.status == 200){
                 
                    toast.success("Spending Insert successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
                    this.submitting = false;
                    this.$router.back();
                }
            }
        },
    }
}
</script>
