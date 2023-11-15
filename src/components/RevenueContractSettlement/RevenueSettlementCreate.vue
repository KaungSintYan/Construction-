<template>
    <div class="container-fluid"  @click="$store.commit('setActive', false)">   
      <form  @submit.prevent="createData">   
     <div class="row">
         <div class="col-md-12">
                    <ProjectName @projectData="getProjectName($event)"  />  
                    <span v-if="v$.FormData.project_id.$error" class="text-danger">
                        <span v-if="v$.FormData.project_id.$errors[0].$message != ''">
                            {{ $t('is_required',{'name': $t('project')}) }}
                        </span>
                    </span>

                     <div class="form-group mb-3">
                         <label for="execution_order_name">
                             <span class="text-danger">*</span> <small><b> {{ $t('execution_order_name') }} </b></small> 
                         </label>
                         <el-input type="text" id="execution_order_name" class="" :placeholder="$t('please_enter')" v-model="FormData.contract_statement_name" clearable/>
                         <span v-if="v$.FormData.contract_statement_name.$error" class="text-danger">
                            <span v-if="v$.FormData.contract_statement_name.$errors[0].$message != ''">
                                {{ $t('is_required',{'name': $t('execution_order_name')}) }}
                            </span>
                         </span>
                     </div>

                     <!-- <div class="form-group mb-3">
                         <label for="odd_number">
                             <span class="text-danger">*</span> <small><b>{{ $t('odd_number') }}</b></small> 
                         </label>
                         <el-input type="number" id="odd_number" class="" :placeholder="$t('default_serial_number')"
                         v-model="FormData.settlement_number" clearable/>
                     </div> -->

                     <div class="col-md-3 m-0 p-0">
                        <div class="form-group mb-3">
                            <label for="settlement_date">
                                <span class="text-danger">*</span> <small><b> {{ $t('settlement_date') }} </b></small> 
                            </label>
                            <el-date-picker :placeholder="$t('pick_a_day')" type="date" class=""
                             id="settlement_date" format="YYYY-MM-DD" value-format="YYYY-MM-DD" 
                             style="width: 100%;"  v-model="FormData.settlement_date" clearable/>
                        </div>
                    </div>
                    <RevenueContractName :projectId="FormData.project_id" @revenueData="getRevenueData($event)" /> 
                    <span v-if="v$.FormData.revenue_contract_id.$error" class="text-danger">
                        <span v-if="v$.FormData.revenue_contract_id.$errors[0].$message != ''">
                            {{ $t('is_required',{'name': $t('revenue_contract')}) }}
                        </span>
                    </span>

                    <Client @clientData="getClientData($event)" />
                    <span v-if="v$.FormData.client_id.$error" class="text-danger">
                        <span v-if="v$.FormData.client_id.$errors[0].$message != ''">
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
                         <el-input type="number" id="execution_amount" class="" :placeholder="$t('please_enter')"
                         v-model="FormData.settlement_amount" clearable/>
                         <span v-if="v$.FormData.settlement_amount.$error" class="text-danger">
                            <span v-if="v$.FormData.settlement_amount.$errors[0].$message != ''">
                                {{ $t('is_required',{'name': $t('execution_amount')}) }}
                            </span>
                         </span>
                     </div>

                     <div class="form-group mb-3">
                         <label for="execution_content">
                            <small><b>{{ $t('execution_content') }}</b></small> 
                         </label>
                        <el-input type="textarea" :placeholder="$t('please_enter')" id="execution_content" 
                        v-model="FormData.settlement_content" maxlength="1024" show-word-limit  />
                     </div>

                     <div class="form-group mb-3">
                         <label for="remark">
                            <small><b>{{ $t('remark') }}</b></small>
                         </label>
                        <el-input type="textarea" :placeholder="$t('please_enter')" id="remark" 
                        v-model="FormData.remark" maxlength="500" show-word-limit  />
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
import Client from '@/components/Share/Client.vue';
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
    name: 'RevenueSettlementCreate',
    data() {
        return {
            v$: useValidate(),
            submitting: false,
            FormData: {
                contract_statement_name: "",
                settlement_number: "",
                settlement_date: new Date().toISOString().slice(0,10),
                settlement_amount: "",
                settlement_content: "",
                remark: "",
                picture:null,
                appendix: null,
                approver: [],
                cc: [],
                creation_time: "",
                project_id: "",
                revenue_contract_id: "",
                client_id: "",
                internal_unit_id: "",
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
      RevenueContractName,
      Client,  
      InternalUnit,
      Picture,
      Document,
      Approver,
      Cc    
    }, 
    validations(){
        return{
            FormData: {
                client_id: {
                    required,
                },
                contract_statement_name: {
                    required,
                },
                internal_unit_id: {
                    required,
                },
                project_id: {
                    required,
                },
                revenue_contract_id: {
                    required,
                },
                settlement_amount: {
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
        getRevenueData(data) {
          this.FormData.revenue_contract_id= data;
        },
        getClientData(data){
          this.FormData.client_id= data;
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
                api: '/contractmanagement/revenue_contract_settlement',
                data: this.FormData 
            });
            if(response.status == 201){ 
                const id = response.data.revenue_contract_settlement_id; 
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
                api: '/contractmanagement/revenue_contract_settlementdatafiles',               
                data: imgformData
                });
                if(imgResponse.status == 200){
             
                    toast.success("Income Visa Insert successful !", {
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
