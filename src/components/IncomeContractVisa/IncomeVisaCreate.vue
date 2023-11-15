<template>
    <div class="container-fluid"  @click="$store.commit('setActive', false)"> 
      <form  @submit.prevent="createData">   
      <div class="row">
         <div class="col-md-12">  
           
                    <ProjectName @projectData="getProjectName($event)"  /> 
                    <span v-if="v$.FormData.project_id.$error" class="text-danger">
                        <span v-if="v$.FormData.project_id.$errors[0].$message != ''">
                            {{ $t('is_required', {'name': $t('project')}) }}
                        </span>
                    </span>                    

                     <div class="form-group mb-3">
                         <label for="visa_name">
                             <span class="text-danger">*</span> <small><b>{{ $t('visa_name') }}</b></small>
                         </label>
                         <el-input type="text" id="visa_name" class="" :placeholder="$t('please_enter')" v-model="FormData.visa_name" clearable/>
                         <span v-if="v$.FormData.visa_name.$error" class="text-danger">
                            <span v-if="v$.FormData.visa_name.$errors[0].$message != ''">
                                {{ $t('is_required',{'name': $t('visa_name')}) }}
                            </span>
                         </span>
                     </div>

                     <div class="col-md-3 m-0 p-0">
                        <div class="form-group mb-3">
                            <label for="visa_date"> <span class="text-danger">*</span> <small><b>{{ $t('visa_date') }}</b></small> </label>
                            <el-date-picker type="date" class="" format="YYYY-MM-DD" value-format="YYYY-MM-DD" 
                            id="start_date" style="width: 100%;" :placeholder="$t('pick_a_day')" v-model="FormData.visa_date" />                          
                        </div>
                     </div>
                     
                     <RevenueContractName :projectId="FormData.project_id" @revenueData="getRevenueData($event)" />
                     <span v-if="v$.FormData.revenue_contract_id.$error" class="text-danger">
                        <span v-if="v$.FormData.revenue_contract_id.$errors[0].$message != ''">
                            {{ $t('is_required', {'name': $t('revenue_contract')}) }}
                        </span>
                     </span>                     
                   
                     <div class="form-group mb-3">
                         <label for="amount_including_tax">
                            <span class="text-danger">*</span> <small><b>{{ $t('amount_including_tax') }}</b></small>
                         </label>
                         <el-input type="number" id="amount_including_tax" class="" :placeholder="$t('please_enter')"
                          v-model="FormData.amount_with_tax" clearable/>
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
                        <el-input type="number"  class="" v-model="FormData.tax_rate" clearable/>
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
                            <span class="text-danger">*</span> <small><b>{{ $t('excluding_tax_amount') }}</b></small>
                        </label>
                        <el-input type="number" id="excluding_tax_amount" class="" 
                        v-model="calculateTaxAmount" readonly clearable/>
                    </div>
                     <div class="form-group mb-3">
                         <label for="visa_content">
                            <small><b>{{ $t('visa_content') }}</b></small> 
                         </label>
                        <el-input type="textarea" id="visa_content" :placeholder="$t('please_enter')"
                         v-model="FormData.visa_content" maxlength="1000" show-word-limit />
                     </div>

                     <div class="form-group mb-3">
                         <label for="remark">
                            <small><b>{{ $t('remark') }}</b></small>
                         </label>
                        <el-input type="textarea" id="remark" :placeholder="$t('please_enter')" v-model="FormData.remark" maxlength="500" show-word-limit />
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
import RevenueContractName from '@/components/Share/RevenueContractName.vue';
import Picture from '@/components/Share/Picture.vue';
import Document from '@/components/Share/Document.vue';
import Approver from '@/components/Share/ApproverUser.vue';
import Cc from '@/components/Share/CcUser.vue';
import useValidate from '@vuelidate/core'
import {required} from '@vuelidate/validators'

export function validName(name){
    let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
    if(validNamePattern.test(name)){
        return true;
    }
    return false;
}

export default {
    name: 'IncomeVisaCreate',
    data() {
        return { 
            v$: useValidate(), 
             submitting: false,           
             FormData: {                
                visa_number: "",
                visa_name: "",
                visa_date: new Date().toISOString().slice(0,10),
                amount_with_tax: "",
                tax_rate: "",
                tax: "",
                amount_without_tax: "",
                visa_content: "",
                remark: "",
                picture: null,
                appendix: null,
                approver: [],
                cc: [],
                project_id: "",
                revenue_contract_id: ""
             },
             pictureImages: [] ,
             appendixImages: [], 
             showapprover: [],
             showcc: []    
           
        }
    },
    components: {
      ProjectName,
      RevenueContractName,
      Picture,
      Document,
      Approver,
      Cc,
    }, 
    validations(){
        return {
            FormData: {
                amount_with_tax: {
                    required,
                },
                project_id: {
                    required,
                },
                revenue_contract_id: {
                    required,
                },
                tax_rate: {
                    required,
                },
                visa_name: {
                    required,
                },
            }
        }
    },

    computed: {
        calculateTax(){
            let tax ="";
            tax= (this.FormData.amount_with_tax * (this.FormData.tax_rate /100));
            this.FormData.tax= tax;
            return tax;
        },
        calculateTaxAmount(){
            let amount= "";
            amount=this.FormData.amount_with_tax - this.FormData.tax;
            this.FormData.amount_without_tax= amount;
            return amount;
        },       
    },
    created(){ 
    },
    methods:{ 
        getProjectName(data) {   
         this.FormData.project_id = data;        
        },
        getRevenueData(data) {
          this.FormData.revenue_contract_id= data;
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
        async createData(e){   
            this.submitting = true;
            this.v$.$validate();
            if(this.v$.$error){
                this.submitting = false;
                return;
            }
            this.showapprover.forEach((value) => {
                this.FormData.approver.push(value.userid);                
            }); 
            this.showcc.forEach((value) => {
                this.FormData.cc.push(value.userid); 
            }); 
            let response = await authApi({
                method: 'POST',
                api: '/contractmanagement/revenue_contract_visa',
                data: this.FormData 
            });
            if(response.status == 201){              
             // console.log(response.data.revenue_contract_id);
                const id = response.data.revenue_contract_visa_id; 
                const imgformData = new FormData();
                imgformData.append('visa_id',id);
                this.pictureImages.forEach((value) => {
                     imgformData.append('picture', value.url);   
                });
                this.appendixImages.forEach((value) => {
                    imgformData.append('appendix', value.url);  
                });    
                
                let imgResponse = await authApi({
                method: 'POST',
                api: '/contractmanagement/revenue_contract_visadatafiles',               
                data: imgformData
                });
                if(imgResponse.status == 200){
                   
                    toast.success("Income Visa Insert successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
                    this.$router.back();
                    this.submitting = false;
                }
            }
        },
       
    }
    
}
</script>

