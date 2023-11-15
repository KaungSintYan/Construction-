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
                            <label for="execution_order_name">
                                <span class="text-danger">*</span><small><b>{{ $t('execution_order_name') }}</b></small>   
                            </label>
                            <el-input type="text" id="execution_order_name" class="" :placeholder="$t('enter_keyword')" v-model="FormData.execution_order_name" clearable/>
                            <span v-if="v$.FormData.execution_order_name.$error" class="text-danger">
                                <span v-if="v$.FormData.execution_order_name.$errors[0].$message != ''">
                                    {{ $t('is_required',{'name': $t('execution_order_name')}) }}
                                </span>
                            </span>
                        </div>

                        <div class="col-md-3 m-0 p-0">
                            <div class="form-group mb-3">
                                <label for="execution_date">
                                    <span class="text-danger">*</span> <small><b>{{ $t('execution_date') }}</b></small> 
                                </label>
                                <el-date-picker :placeholder="$t('pick_a_day')" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                                 id="execution_date" style="width: 100%;"  v-model="FormData.execution_date" clearable/>
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
                            <label for="execution_amount">
                                <span class="text-danger">*</span> <small><b>{{ $t('execution_amount') }}</b></small> 
                            </label>
                            <el-input type="number" id="execution_amount" class="" :placeholder="$t('please_enter')" v-model="FormData.execution_amount" clearable/>
                            <span v-if="v$.FormData.execution_amount.$error" class="text-danger">
                                <span v-if="v$.FormData.execution_amount.$errors[0].$message != ''">
                                    {{ $t('is_required',{'name': $t('execution_amount')}) }}
                                </span>
                            </span>
                        </div>

                        <div class="form-group mb-3">
                            <label for="execution_content">
                                <small><b>{{ $t('execution_content') }} </b></small>
                            </label>
                            <el-input type="textarea" :placeholder="$t('please_enter')" id="execution_content" v-model="FormData.execution_content"
                             maxlength="1024" show-word-limit />
                        </div>

                        <div class="form-group mb-3">
                            <label for="remark">
                                <small><b>{{ $t('remark') }}</b></small>
                            </label>
                            <el-input type="textarea" :placeholder="$t('please_enter')" id="remark" v-model="FormData.remark" maxlength="500" show-word-limit />
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
    name: 'ExecutionSpendingCreate',
    data() {
        return {
            v$: useValidate(),
            submitting: false,
            FormData: {
                        execution_order_name: "",
                        execution_number: "",
                        execution_date: new Date().toISOString().slice(0,10),
                        execution_amount: "",
                        execution_content: "",                       
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
                execution_amount: {
                    required,
                },
                execution_order_name: {
                    required,
                },
                internal_unit_id: {
                    required,
                },
                project_id: {
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
            alert(this.FormData.project_id);
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
                api: '/contractmanagement/spending_contract_execution',
                data: this.FormData 
            });
            if(response.status == 201){
                const id = response.data.spending_contract_execution_id; 
                const imgformData = new FormData();
                imgformData.append('execution_id',id);
                this.pictureImages.forEach((value) => {
                     imgformData.append('picture', value.url);   
                });
                this.appendixImages.forEach((value) => {
                    imgformData.append('appendix', value.url);  
                });    
                
                let imgResponse = await authApi({
                method: 'POST',
                api:  '/contractmanagement/spending_contract_executiondatafiles',           
                data: imgformData
                });
                if(imgResponse.status == 200){
                   
                    toast.success("Execution Spending Insert successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
                    this.submittin = false;
                    this.$router.back();
                }
            }
        },
    }
}
</script>
