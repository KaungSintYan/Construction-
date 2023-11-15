<template>
    <div class="container-fluid"  @click="$store.commit('setActive', false)">   
    <form  @submit.prevent="createData">
        <div class="row">
            <div class="col-md-12">            
                        <ProjectName  @projectData="getProjectName($event)"  /> 
                        <span v-if="v$.FormData.project_id.$error" class="text-danger">
                            <span v-if="v$.FormData.project_id.$errors[0].$message != ''">
                                {{ $t('is_required',{'name': $t('project')}) }}
                            </span>
                        </span>            

                        <div class="form-group mb-3">
                            <label for="contract_settlement_name">
                                <span class="text-danger">*</span><small><b>{{ $t('contract_statement_name') }}</b></small> 
                            </label>
                            <el-input type="text" id="contract_settlement_name" class="" :placeholder="$t('please_enter')" v-model="FormData.contract_statement_name" clearable/>
                            <span v-if="v$.FormData.contract_statement_name.$error" class="text-danger">
                                <span v-if="v$.FormData.contract_statement_name.$errors[0].$message != ''">
                                    {{ $t('is_required',{'name': $t('contract_statement_name')}) }}
                                </span>
                            </span>
                        </div>

                        <div class="col-md-3 m-0 p-0">
                            <div class="form-group mb-3">
                                <label for="settlement_date"> <span class="text-danger">*</span><small><b> {{ $t('settlement_date') }} </b></small></label>
                                <el-date-picker :placeholder="$t('pick_a_day')" type="date" class="" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                                id="settlement_date" style="width: 100%;"  v-model="FormData.settlement_date" clearable/>
                                <span v-if="v$.FormData.settlement_date.$error" class="text-danger">
                                    <span v-if="v$.FormData.settlement_date.$errors[0].$message != ''">
                                        {{ $t('is_required',{'name': $t('settlement_date')}) }}
                                    </span>
                                </span>
                            </div>
                        </div>

                        <SpendingContract :projectId="FormData.project_id" @spendingData="getSpendingName($event)" /> 
                        <span v-if="v$.FormData.spending_contract_id.$error" class="text-danger">
                            <span v-if="v$.FormData.spending_contract_id.$errors[0].$message != ''">
                                {{ $t('is_required',{'name': $t('spending_contract')}) }}
                            </span>
                        </span>

                        <Supplier @supplierData="getSuppliperData($event)" />
                        <span v-if="v$.FormData.supplier_id.$error" class="text-danger">
                            <span v-if="v$.FormData.supplier_id.$errors[0].$message != ''">
                                {{ $t('is_required',{'name': $t('contract_party')}) }}
                            </span>
                        </span>

                        <InternalUnit @internalUnitData="getInternalUnitData($event)" />  
                        <span v-if="v$.FormData.internal_unit_id.$error" class="text-danger">
                            <span v-if="v$.FormData.internal_unit_id.$errors[0].$message != ''">
                                {{ $t('is_required',{'name': $t('party_b')}) }}
                            </span>
                        </span>

                        <div class="form-group mb-3">
                            <label for="settlement_amount">
                                <span class="text-danger">*</span><small><b>{{ $t('settlement_amount') }}</b></small> 
                            </label>
                            <el-input type="number" id="settlement_amount" class="" :placeholder="$t('please_enter')" v-model="FormData.settlement_amount" clearable/>
                            <small class="ml-1"> {{ $t('capital') }}: </small>
                            <span v-if="v$.FormData.settlement_amount.$error" class="text-danger">
                                <span v-if="v$.FormData.settlement_amount.$errors[0].$message != ''">
                                    {{ $t('is_required',{'name': $t('settlement_amount')}) }}
                                </span>
                            </span>
                        </div>

                        <div class="form-group mb-3">
                            <label for="settlement_content">
                                <small><b>{{ $t('settlement_content') }}</b></small> 
                            </label>
                            <el-input type="textarea" :placeholder="$t('please_enter')" id="settlement_content" v-model="FormData.settlement_content" maxlength="100" show-word-limit  />
                        </div>

                        <div class="form-group mb-3">
                            <label for="remark">
                                <small><b>{{ $t('remark') }}</b></small>
                            </label>
                            <el-input type="textarea" :placeholder="$t('please_enter')" id="remark" v-model="FormData.remark" maxlength="100" show-word-limit  />
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
import SpendingContract from '@/components/Share/SpendingContract.vue';
import Supplier from '@/components/Share/Supplier.vue';
import InternalUnit from '@/components/Share/InternalUnit.vue';
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
    name: 'ExpendingSettlementCreate',
    data() {
        return {
            v$: useValidate(),
            submitting: false,
            FormData: {
                        contract_statement_name: "",
                        settlement_number: "",
                        settlement_date: "",
                        settlement_amount: "",
                        settlement_content: "",                       
                        remark: "",                        
                        picture: null,
                        appendix: null,
                        approver:[],
                        cc: [],
                        creation_time: "",
                        project_id: "",
                        spending_contract_id: "",  
                        internal_unit_id: "",
                        supplier_id: "",                      
                        created_by_user: ""           
            },
            pictureImages: [] ,
            appendixImages: [], 
            showapprover: [],
            showcc: []  
        }
    },
    components: {
      ProjectName,   
      SpendingContract,   
      Supplier,
      InternalUnit,
      Picture,
      Document,
      Approver,
      Cc    
    }, 
    validations(){
        return{
            FormData: {
                contract_statement_name: {
                    required,
                },
                internal_unit_id: {
                    required,
                },
                project_id: {
                    required,
                },
                settlement_amount: {
                    required,
                },
                settlement_date: {
                    required,
                },
                spending_contract_id: {
                    required,
                },
                supplier_id: {
                    required,
                },
            }
        }
    },  
    created(){                
        
    },
    methods: {
        getProjectName(data) {   
         this.FormData.project_id = data;        
        },        
        getSpendingName(data){
            this.FormData.spending_contract_id= data;             
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
        
        async createData(e){   
            this.submitting= true;  
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
                api: '/contractmanagement/spending_contract_settlement',
                data: this.FormData 
            });
            if(response.status == 201){
                const id = response.data.spending_contract_settlement_id; 
                const imgformData = new FormData();
                imgformData.append('settlement_id',id);
                this.pictureImages.forEach((value) => {
                     imgformData.append('picture', value.url);   
                });
                this.appendixImages.forEach((value) => {
                    imgformData.append('appendix', value.url);  
                }); 
                let imgResponse = await authApi({
                method: 'POST',
                api:  '/contractmanagement/spending_contract_settlementdatafiles',           
                data: imgformData
                });
                if(imgResponse.status == 200){
                   
                    toast.success("Execution Spending Insert successful !", {
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
