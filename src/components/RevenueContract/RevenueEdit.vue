<template>
    <div v-loading="loading" class="loading__div" v-if="loading"></div>   
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading"> 
           <form  @submit.prevent="updateData"> 
            <div class="row">
                <div class="col-md-12"> 
                            <ProjectName :oldProjectId="oldProjectId"  @projectData="getProjectName($event)"  />
                            <span v-if="v$.FormData.project_id.$error" class="text-danger">
                                <span v-if="v$.FormData.project_id.$errors[0].$message != ''">
                                    {{ $t('is_required', {'name': $t('project')}) }}
                                </span>
                           </span>
                            <TypeOfContract :oldContractId="oldContractId" @ContractData="getContractData($event)"  />
                            <span v-if="v$.FormData.contract_type_id.$error" class="text-danger">
                                <span v-if="v$.FormData.contract_type_id.$errors[0].$message != ''">
                                    {{ $t('is_required', {'name': $t('type_of_contract')}) }}
                                </span>
                           </span>
                            <!-- <div class="form-group mb-3">
                                <label for="type_of_contract">
                                    <span class="text-danger">*</span> <small><b>{{ $t('type_of_contract') }}</b></small> 
                                </label>
                                <el-select id="type_of_contract" style="width: 100%;" class="" v-model="FormData.contract_type_id">
                                   <el-option value="">{{ $t('please_choose') }}</el-option>
                                   <el-option v-for="obj of contractType" :key="obj.contract_type_id" :value="obj.contract_type_id">{{ obj.contract_type_name }}</el-option>                           
                                </el-select>
                            </div>    -->

                            <div class="form-group mb-3">
                                <label for="contract_no">
                                    <small><b>{{ $t('contract_title') }}</b></small>
                                </label>
                                <el-input type="text" id="contract_title" class="" :placeholder="$t('please_enter')" v-model="FormData.contract_title" clearable/>
                                <span v-if="v$.FormData.contract_title.$error" class="text-danger">
                                    <span v-if="v$.FormData.contract_title.$errors[0].$message != ''">
                                        {{ $t('is_required', {'name': $t('contract_title')}) }}
                                    </span>
                                </span>
                            </div>

                            <!-- <div class="form-group mb-3">
                                <label for="contract_no">
                                    <small><b>{{ $t('contract_no') }}</b></small> 
                                </label>
                                <el-input type="text" id="contract_no" class="" :placeholder="$t('please_enter')" v-model="FormData.contract_no" clearable/>
                            </div>
        -->
                            <div class="col-md-3 m-0 p-0">
                                <div class="form-group mb-3">
                                    <label for="date_of_signing">
                                        <span class="text-danger">*</span> <small><b>{{ $t('date_of_signing') }}</b></small>
                                    </label>
                                    <el-date-picker v-model="FormData.date_of_signing"  id="date_of_signing" type="date" 
                                    format="YYYY-MM-DD" value-format="YYYY-MM-DD" placeholder="Pick a Date" size="default"  style="width: 100%;" editable clearable  />
                                    <span v-if="v$.FormData.date_of_signing.$error" class="text-danger">
                                        <span v-if="v$.FormData.date_of_signing.$errors[0].$message != ''">
                                            {{ $t('is_required', {'name': $t('date_of_signing')}) }}
                                        </span>
                                    </span>
                                </div>
                            </div>    
       
                            <Client :oldClientId="oldClientId" @clientData="getClientData($event)" />
                            <span v-if="v$.FormData.client_id.$error" class="text-danger">
                                <span v-if="v$.FormData.client_id.$errors[0].$message != ''">
                                    {{ $t('is_required', {'name': $t('contract_party')}) }}
                                </span>
                            </span>
                            <InternalUnit :oldInternalUnitId="oldInternalUnitId" @internalUnitData="getInternalUnitData($event)" />
                            <span v-if="v$.FormData.internal_unit_id.$error" class="text-danger">
                                <span v-if="v$.FormData.internal_unit_id.$errors[0].$message != ''">
                                    {{ $t('is_required', {'name': $t('party_b')}) }}
                                </span>
                            </span>

                            <div class="form-group mb-3">
                                <label for="amount_including_tax">
                                   <span class="text-danger">*</span> <small><b>{{ $t('amount_including_tax') }}</b></small> 
                                </label>
                                <el-input type="text" :placeholder="$t('please_enter')" id="amount_including_tax" class="" v-model="FormData.amount_with_tax" clearable/>
                                <span v-if="v$.FormData.amount_with_tax.$error" class="text-danger">
                                    <span v-if="v$.FormData.amount_with_tax.$errors[0].$message != ''">
                                        {{ $t('is_required', {'name': $t('amount_including_tax')}) }}
                                    </span>
                                </span>
                            </div>
       
                            <div class="form-group mb-3">
                               <label for="tax_rate">
                                   <span class="text-danger">*</span> <small><b>{{ $t('tax_rate') }}</b></small>
                               </label>
                               <el-input type="number" :placeholder="$t('please_enter')"  class="" name="taxRate" id="tax_rate" v-model="FormData.tax_rate" clearable/>
                               <span v-if="v$.FormData.tax_rate.$error" class="text-danger">
                                    <span v-if="v$.FormData.tax_rate.$errors[0].$message != ''">
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
                                <label for="excluding_tax_amount">
                                    <span class="text-danger">*</span> <small><b>{{ $t('amount_without_tax') }}</b></small>
                                </label>
                                <el-input type="number" id="excluding_tax_amount" class="" 
                                v-model="calculateTaxAmount" readonly clearable/>
                                <span v-if="v$.FormData.amount_without_tax.$error" class="text-danger">
                                    <span v-if="v$.FormDataamount_without_tax.$errors[0].$message != ''">
                                        {{ $t('is_required', {'name': $t('amount_without_tax')}) }}
                                    </span>
                                </span>
                            </div>
                            <div class="form-group mb-3">
                                <label for="excluding_tax_amount">
                                    <span class="text-danger">*</span> <small><b>{{ $t('excluding_tax_amount') }}</b></small>
                                </label>
                                <el-input type="number" id="excluding_tax_amount" class="" 
                                v-model="calculateTaxAmount" readonly clearable/>
                                <span v-if="v$.FormData.amount_without_tax.$error" class="text-danger">
                                    <span v-if="v$.FormData.amount_without_tax.$errors[0].$message != ''">
                                        {{ $t('is_required', {'name': $t('amount_without_tax')}) }}
                                    </span>
                                </span>
                            </div>

                            <div class="row">
                                <div class="col-6">
                                    <div class="form-group mb-3">
                                        <div class="form-group mb-3">
                                            <label for="start_date"> 
                                                <span class="text-danger">*</span> Reporting Start Date                  
                                            </label>
                                        </div>                        
                                        <el-date-picker v-model="FormData.start_date"  id="start_date" type="date" 
                                        format="YYYY-MM-DD" value-format="YYYY-MM-DD" placeholder="Pick a Date" size="default"  style="width: 100%;" editable clearable  />
                                    </div> 
                                </div>
                                <div class="col-6">
                                    <div class="form-group mb-3">
                                        <div class="form-group mb-3">
                                            <label for="end_date"> 
                                                <span class="text-danger">*</span> Reporting End Date          
                                            </label>
                                        </div>                        
                                        <el-date-picker v-model="FormData.end_date"  id="end_date" type="date" 
                                        format="YYYY-MM-DD" value-format="YYYY-MM-DD" placeholder="Pick a Date" size="default"  style="width: 100%;" editable clearable  />
                                    </div> 
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="total_payment_plan">
                                    <small><b>{{ $t('total_payment_plan') }}</b></small> 
                                </label>
                                <el-input type="text" id="total_payment_plan" :placeholder="$t('please_enter')" v-model="calculateTotalPayment" disabled />
                            </div>
                            <div class="form-group mb-3">
                               <label for="">
                                <small><b>{{ $t('payment_plan_details') }}</b></small> 
                               </label>

                            <div class="row mx-2 mb-4">
                                <el-table :data="planDetail" border style="width: 100%;">
                                    <el-table-column fixed type="index" width="55" />

                                    <el-table-column :label="$t('plan_name')">
                                        <template #default="scope">
                                            <el-input type="text" :placeholder="$t('please_enter')" class="" v-model="scope.row.plan_name" clearable/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('plan_date')">
                                        <template #default="scope">
                                            <el-date-picker type="date" class="" format="YYYY-MM-DD" value-format="YYYY-MM-DD" 
                                            style="width: 100%;" :placeholder="$t('pick_a_day')" v-model="scope.row.plan_date" clearable />
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('planned_payment_amount')" width="200px">
                                        <template #default="scope">
                                            <el-input type="number" :placeholder="$t('please_enter')" class="" v-model="scope.row.payment_amount" clearable/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('receipt_ratio')">
                                        <template #default="scope">
                                            <el-input type="number" :placeholder="$t('please_enter')" class="" v-model="scope.row.receipt_ratio" clearable/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('payment_terms')" width="200px">
                                        <template #default="scope">
                                            <el-input type="textarea" :placeholder="$t('please_enter')" id="" v-model="scope.row.payment_terms" maxlength="1024" autosize show-word-limit  />
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('remark')" width="200px">
                                        <template #default="scope">
                                            <el-input type="textarea" :placeholder="$t('please_enter')" id="remark" v-model="scope.row.remark" maxlength="1024" autosize show-word-limit  />
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('operate')">
                                        <template #default="scope">
                                            <small class="text-danger" @click="deletePlanDetail(scope.row.id)">{{ $t('delete') }}</small>
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
                                   <div class="box-footer"  @click="addPlanDetail">
                                       <font-awesome-icon icon="fa-solid fa-circle-plus" style="color:cornflowerblue;" /> <span class="text-primary">{{ $t('add_to') }}</span>
                                   </div>
                            </div>
       
                            <div class="form-group mb-3">
                                <label for="payment_terms">
                                    <small><b>{{ $t('payment_terms') }}</b></small> 
                                </label>
                               <el-input id="payment_terms" maxlength="100" :placeholder="$t('please_enter')" show-word-limit type="textarea" v-model="FormData.payment_terms" />
                            </div>
       
                            <div class="form-group mb-3">
                                <label for="remark">
                                    <small><b>{{ $t('remark') }}</b></small>
                                </label>
                               <el-input id="remark" maxlength="100" :placeholder="$t('please_enter')" show-word-limit type="textarea" v-model="FormData.remark" />
                            </div>

                            <Picture :oldpictureImages="oldpictureImages" @picture="getPicture($event)" />
                            <Document :oldappendixImages="oldappendixImages" @appendix="getDocument($event)" /> 
                            <el-timeline>
                                <el-timeline-item>
                                <Approver :oldapprover="oldApprover"  @approverUser="getApproverUser($event)" />
                                </el-timeline-item>
                                <el-timeline-item>
                                    <Cc :oldcc="oldCc" @ccUser="getCcUser($event)" />
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
import Client from '@/components/Share/Client.vue';
import InternalUnit from '@/components/Share/InternalUnit.vue';
import Picture from '@/components/Share/Picture.vue';
import Document from '@/components/Share/Document.vue';
import Approver from '@/components/Share/ApproverUser.vue';
import Cc from '@/components/Share/CcUser.vue';
import TypeOfContract from '@/components/Share/TypeOfContract.vue';
import useValidate from '@vuelidate/core'   
import { required} from '@vuelidate/validators'

export default {
    name: 'RevenueEdit',
    data() {
        return {
             v$: useValidate(),
             loading: true,
             submitting: false,
             planDetailCount: 1,            
             FormData: {}, 
             contractType: "", 
             oldProjectId: "",
             pictureImages: [] ,
             appendixImages: [], 
             showapprover: [],
             showcc: [],
             oldApprover: [],  
             oldCc: [],
             oldpictureImages: [],
             oldappendixImages: [],
             oldClientId: "",  
             oldInternalUnitId: "",           
             planDetail: [],
             FormPlanDetail: {
                contract_id: "",
                plan_list: [],
                addplan_list: []
            },
            oldContractId: ""
        }
    },
    validations() {
        return {
            FormData: {
               
                    contract_type_id: {
                        required,
                    },
                    project_id: {
                        required,
                    },
                    amount_with_tax: {
                        required,
                    },
                    amount_without_tax: {
                        required,
                    },
                    client_id: {
                        required,
                    },
                    contract_title: {
                        required,
                    },                    
                    date_of_signing: {
                        required,
                    },
                    internal_unit_id: {
                        required,
                    },                    
                    tax: {
                        required,
                    },
                    tax_rate: {
                        required,
                    },
                
            }
        }
    },
    components: {
      ProjectName,
      Client,
      InternalUnit,      
      Picture,
      Document,
      Approver,
      Cc,
      TypeOfContract
    }, 
    computed: {
        calculateTax(){
            let tax ="";
            tax= (this.FormData.amount_with_tax *(this.FormData.tax_rate /100));
            this.FormData.tax= tax;
            return tax;

        },
        calculateTaxAmount(){
            let amount= "";
            amount=this.FormData.amount_with_tax - this.FormData.tax;
            this.FormData.amount_without_tax= amount;
            return amount;
        },
        calculateTotalPayment(){
            let total_amount = 0;
            for(let i=0; i< this.planDetail.length; i++){
                let amount= "";
                amount = this.planDetail[i].payment_amount * this.planDetail[i].receipt_ratio;
                total_amount += amount;
            }
            return total_amount;
        }
    },
    created(){    
          this.getTypeofContract();
          this.getData();
          this.getPlanDetail();
    },
    methods:{ 
        getProjectName(data) {   
         this.FormData.project_id = data;        
        }, 
        getClientData(data){
            this.FormData.client_id = data;
        },   
        getInternalUnitData(data){              
            this.FormData.internal_unit_id = data;
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
            this.FormData.contract_type_id = data;
        },      
        addPlanDetail() {
            this.planDetailCount = this.planDetailCount +1;
            let id= this.planDetailCount;
            let detail= {
                        id: id,
                        payment_plan_detail_id: null,
                        revenue_contract_id: this.$route.params.id,
                        plan_name: "",
                        plan_date: "",
                        payment_amount: "",
                        receipt_ratio: "",
                        payment_terms: "",
                        remark: ""
                    }
                this.planDetail.push(detail);
              
        },
        deletePlanDetail(id){
          this.planDetail =this.planDetail.filter(x=> x.id != id);
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
        async getPlanDetail(){
            let response = await authApi({
                method: 'GET',
                api: '/contractmanagement/revenue_paymentplandetail',
                params: {
                       contract_id: this.$route.params.id,                       
                }   
            });
            if(response.status == 200){ 
               // console.log('de'+ JSON.stringify(response.data.data))
                const list1= response.data.data;
                 this.planDetail= list1.map((v,index) => (
                     {...v, id: index}
                    ));
                this.planDetailCount = this.planDetail.length;
                this.loading= false;
            }
        },
        async getData(){         
                let response = await authApi({
                    method: 'POST',
                    api: '/contractmanagement/get_revenue_contract',
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
                if(response.status == 200){            
                    this.FormData = response.data.data;    
                    console.log("revenue"+ JSON.stringify(response))
                    this.oldProjectId = this.FormData.project_id;    
                    this.oldClientId = this.FormData.client_id;
                    this.oldInternalUnitId= this.FormData.internal_unit_id;   
                    this.oldContractId = this.FormData.contract_type_id;               
                    this.oldApprover = this.FormData.approver;  
                    this.oldCc = this.FormData.cc;  
                    const list= response.data.data.picture.images;
                    this.oldpictureImages = list.map(v => ({...v, isSelected: true}));
                    const list1= response.data.data.appendix.documents;
                    this.oldappendixImages = list1.map(v => ({...v, isSelected: true}));
                    
                }
            
        },
      
       async updateData(){ 
        
                this.submitting = true; 
                    this.v$.$validate(); 
                    if (this.v$.$error) {
                        this.submitting = false;
                        return;
                    }              
                
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
                api: '/contractmanagement/revenue_contract',
                data: this.FormData 
            });
            if(response.status == 200){
                const id = this.$route.params.id;
                 let formData = new FormData();
                 formData.append('contract_id',id);
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
                api: '/contractmanagement/revenue_contract_datafiles',               
                data: formData
                });
                if(imgResponse.status == 200){
                    this.FormPlanDetail.contract_id= this.$route.params.id;
                         this.planDetail.forEach((value)=>{
                            if(value.payment_plan_detail_id == null){
                                let newdata={
                                    plan_name: value.plan_name,
                                    plan_date: value.plan_date,
                                    payment_amount: value.payment_amount,
                                    receipt_ratio: value.receipt_ratio,
                                    payment_terms:value.payment_terms,
                                    remark: value.remark,
                                    revenue_contract_id: value.revenue_contract_id
                                    }
                                  this.FormPlanDetail.addplan_list.push(newdata);
                            }
                            else{
                                this.FormPlanDetail.plan_list.push(value);
                            }
                         }); 
                        let detailResponse = await authApi({
                        method: 'PUT',
                        api: '/contractmanagement/revenue_paymentplandetail',               
                        data: this.FormPlanDetail
                        });
                        if(detailResponse.status == 200){   
                            this.submitting = false;                        
                            toast.success("Revenue Update successful !", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 3000,
                            });
                            this.getTypeofContract();
                            this.getData();
                            this.getPlanDetail();
                        }
                }
            }
        },
    }
    
}
</script>
<style lang="scss">

</style>