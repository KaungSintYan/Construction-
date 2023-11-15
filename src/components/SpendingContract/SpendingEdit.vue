<template>
    <div v-loading="loading" class="loading__div" v-if="loading"></div> 
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading"> 
        <form  @submit.prevent="updateData">    
            <div class="row">
                <div class="col-md-12"> 
                            <ProjectName :oldProjectId="oldProjectId" @projectData="getProjectName($event)"  />
                            <span v-if="v$.FormData.project_id.$error" class="text-danger">
                                <span v-if="v$.FormData.project_id.$errors[0].$message != ''">
                                    {{ $t('is_required',{'name': $t('project')}) }}
                                </span>
                            </span>
                            <TypeOfContract :oldContractId="oldContractId" @ContractData="getContractData($event)"  />
                            <span v-if="v$.FormData.contract_type_id.$error" class="text-danger">
                                <span v-if="v$.FormData.contract_type_id.$errors[0].$message != ''">
                                    {{ $t('is_required', {'name': $t('type_of_contract')}) }}
                                </span>
                           </span>

                            <div class="form-group mb-3">
                                <label for="contract_title">
                                    <span class="text-danger">*</span> <small><b>{{ $t('contract_title') }}</b></small> 
                                </label>
                                <el-input type="text" id="contract_title" class="" :placeholder="$t('please_enter')" v-model="FormData.contract_title" clearable/>
                                <span v-if="v$.FormData.contract_title.$error" class="text-danger">
                                    <span v-if="v$.FormData.contract_title.$errors[0].$message != ''">
                                        {{ $t('is_required',{'name': $t('contract_title')}) }}
                                    </span>
                                 </span>
                            </div>                          
                            <div class="form-group mb-3">
                                <label for="visa_date"> <span class="text-danger">*</span><small><b> {{ $t('date_of_signing') }} </b></small></label>
                                <el-date-picker :placeholder="$t('pick_a_day')" type="date" class="" id="visa_date" style="width: 100%;" 
                                format="YYYY-MM-DD" value-format="YYYY-MM-DD" 
                                 v-model="FormData.date_of_signing" clearable/>
                            </div>

                            <Supplier :oldSupplierId="oldSupplierId" @supplierData="getSuppliperData($event)" />
                            <span v-if="v$.FormData.supplier_id.$error" class="text-danger">
                                <span v-if="v$.FormData.supplier_id.$errors[0].$message != ''">
                                    {{ $t('is_required',{'name': $t('contract_party')}) }}
                                </span>
                            </span>
                            <InternalUnit  :oldInternalUnitId="oldInternalUnitId" @internalUnitData="getInternalUnitData($event)" />
                            <span v-if="v$.FormData.internal_unit_id.$error" class="text-danger">
                                <span v-if="v$.FormData.internal_unit_id.$errors[0].$message != ''">
                                    {{ $t('is_required',{'name': $t('party_b')}) }}
                                </span>
                            </span>  

                            <div class="form-group mb-3">
                                <label for="amount_including_tax">
                                    <span class="text-danger">*</span><small><b>{{ $t('amount_including_tax') }}</b></small>  
                                </label>
                                <el-input type="text" id="amount_including_tax" class="" :placeholder="$t('please_enter')"
                                v-model="FormData.amount_with_tax" clearable/>
                                <span v-if="v$.FormData.amount_with_tax.$error" class="text-danger">
                                    <span v-if="v$.FormData.amount_with_tax.$errors[0].$message != ''">
                                        {{ $t('is_required',{'name': $t('amount_including_tax')}) }}
                                    </span>
                                </span>
                            </div>

                            <div class="form-group mb-3">
                                <label for="tax_rate">
                                    <span class="text-danger">*</span><small><b>{{ $t('tax_rate') }}</b></small> 
                                </label>
                                <el-input type="number"  class="" v-model="FormData.tax_rate" clearable/>
                                <span v-if="v$.FormData.tax_rate.$error" class="text-danger">
                                    <span v-if="v$.FormData.tax_rate.$errors[0].$message != ''">
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
                                <label for="excluding_tax_amount">
                                    <span class="text-danger">*</span><small><b>{{ $t('excluding_tax_amount') }}</b></small> 
                                </label>
                                <el-input type="text" id="excluding_tax_amount" class="" 
                                v-model="calculateTaxAmount" readonly clearable/>
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label for="start_date"><small><b>{{ $t('start_date') }}</b></small></label>
                                        <el-date-picker :placeholder="$t('pick_a_day')" type="date" class="" id="start_date" style="width: 100%;"  v-model="FormData.start_date" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label for="end_date"><small><b> {{ $t('end_date') }} </b></small></label>
                                        <el-date-picker :placeholder="$t('pick_a_day')" type="date" class="" id="end_date" style="width: 100%;"  v-model="FormData.end_date" />
                                    </div>
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="">
                                    <small><b>{{ $t('payment_plan_details') }}</b></small> 
                                </label>

                               <div class="row mx-2 mb-4">
                                    <el-table :data="planDetail" border style="width: 100%;">
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

                                        <el-table-column fixed="right"  :label="$t('operate')" width="100px">
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
                                            <el-input type="text" class=" footer-input" value="1" clearable/>
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
                                v-model="FormData.payment_terms" maxlength="3000" show-word-limit  />
                            </div>

                            <div class="form-group mb-3">
                                <label for="remark">
                                    <small><b>{{ $t('remark') }}</b></small>
                                </label>
                                <el-input type="textarea" :placeholder="$t('please_enter')" id="remark"
                                 v-model="FormData.remark" maxlength="500" show-word-limit  />
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
import Supplier from '@/components/Share/Supplier.vue';
import InternalUnit from '@/components/Share/InternalUnit.vue';
import Picture from '@/components/Share/Picture.vue';
import Document from '@/components/Share/Document.vue';
import Approver from '@/components/Share/ApproverUser.vue';
import Cc from '@/components/Share/CcUser.vue';
import TypeOfContract from '@/components/Share/TypeOfContract.vue';
import useValidate from '@vuelidate/core'   
import { required} from '@vuelidate/validators'

export default {
    name: 'SpendingEdit',
    data() {
        return {
             v$: useValidate(),
             loading: true,
             submitting: false,
             FormData: {},
             
             detailCount: 1,
             oldProjectId: "",
             pictureImages: [] ,
             appendixImages: [], 
             showapprover: [],
             showcc: [],
             oldApprover: [],  
             oldCc: [],
             oldpictureImages: [],
             oldappendixImages: [],
             oldSupplierId: '',  
             oldInternalUnitId: "",
             planDetailCount: 1,
             planDetail: [],             
             FormPlanDetail: {
                contract_id: "",
                plan_list: [],
                addplan_list: []
            },
            oldContractId: ""
        }
    },
    validations(){
        return {
            FormData: {               
                    amount_with_tax: {
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
    },
    components: {
      ProjectName,
      Supplier,  
      InternalUnit,
      Picture,
      Document,
      Approver,
      Cc,
      TypeOfContract    
    }, 
    created(){                    
        this.getData(); 
        this.getPlanDetail();  
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
        }
    },
    methods: {        
        getProjectName(data) {   
         this.FormData.project_id = data;        
        },
        getRevenueData(data) {
          this.FormData.revenue_contract_id= data;
        },
        getSuppliperData(data){
          this.FormData.supplier_id= data;
        },
        getInternalUnitData(data){
            this.FormData.internal_unit_id= data;
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
        
       addPlanDetail() {
            this.detailCount = this.detailCount +1;
            let id= this.detailCount;
            let detail= {
                        id: id,                        
                        payment_plan_detail_id: null,
                        spending_contract_id: this.$route.params.id,
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
        async getData(){         
            let response = await authApi({
                method: 'POST',
                api: '/contractmanagement/get_spending_contract',
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
                this.loading = false;            
                this.oldProjectId = this.FormData.project_id; 
                this.oldContractId = this.FormData.contract_type_id;   
                this.oldApprover = this.FormData.approver;  
                this.oldCc = this.FormData.cc;  
                const list= response.data.data.picture.images;
                this.oldpictureImages = list.map(v => ({...v, isSelected: true}));
                const list1= response.data.data.appendix.documents;
                this.oldappendixImages = list1.map(v => ({...v, isSelected: true}));
                this.oldSupplierId= this.FormData.supplier_id;
                this.oldInternalUnitId= this.FormData.internal_unit_id;
            }          
        },
        async getPlanDetail(){
            let response = await authApi({
                method: 'GET',
                api: '/contractmanagement/spending_paymentplandetail',
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
                this.detailCount = this.planDetail.length;
                this.loading= false;
            }
        },
       async updateData(e){   
                this.submitting= true;  
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
                api: '/contractmanagement/spending_contract',
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
                api:  '/contractmanagement/spending_contract_datafiles',           
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
                                    spending_contract_id: value.spending_contract_id
                                    }
                                  this.FormPlanDetail.addplan_list.push(newdata);
                            }
                            else{
                                this.FormPlanDetail.plan_list.push(value);
                            }
                         }); 
                            let detailResponse = await authApi({
                            method: 'PUT',
                            api: '/contractmanagement/spending_paymentplandetail',               
                            data: this.FormPlanDetail
                            });
                            if(detailResponse.status == 200){                           
                                toast.success("Spending Update successful !", {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 3000,
                                });
                                this.submitting = false;
                                this.getData(); 
                                this.getPlanDetail();  
                             
                            }
                
                }
            }
        },
    }
}
</script>
