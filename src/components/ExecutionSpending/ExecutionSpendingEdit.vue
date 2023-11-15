<template>
    <div v-loading="loading" class="loading__div" v-if="loading"></div> 
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading">   
     <form  @submit.prevent="updateData">
        <div class="row">
            <div class="col-md-12">  
                       <ProjectName :oldProjectId="oldProjectId" @projectData="getProjectName($event)"  />
                        <div class="form-group mb-3">
                            <label for="execution_order_name">
                                <span class="text-danger">*</span><small><b>{{ $t('execution_order_name') }}</b></small>   
                            </label>
                            <el-input type="text" id="execution_order_name" class="" :placeholder="$t('please_enter')" v-model="FormData.execution_order_name" clearable/>
                        </div>
                        <div class="col-md-3 m-0 p-0">
                            <div class="form-group mb-3">
                                <label for="execution_date">
                                    <span class="text-danger">*</span><small><b>{{ $t('execution_date') }}</b></small>  
                                </label>
                                <el-date-picker :placeholder="$t('pick_a_day')" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                                id="execution_date" style="width: 100%;"  v-model="FormData.execution_date" clearable/>
                            </div>
                        </div>
                         <SpendingContract :projectId="oldProjectId" :oldSpendingId="oldSpendingId" @spendingData="getSpendingName($event)" />                               
                         <Supplier :oldSupplierId="oldSupplierId" @supplierData="getSuppliperData($event)" />
                         <InternalUnit  :oldInternalUnitId="oldInternalUnitId" @internalUnitData="getInternalUnitData($event)" />  
                        <div class="form-group mb-3">
                            <label for="execution_amount">
                                <span class="text-danger">*</span><small><b>{{ $t('execution_amount') }}</b></small>  
                            </label>
                            <el-input type="number" id="execution_amount" class="" :placeholder="$t('please_enter')" v-model="FormData.execution_amount" clearable/>
                        </div>

                        <div class="form-group mb-3">
                            <label for="execution_content">
                                <small><b>{{ $t('execution_content') }}</b></small> 
                            </label>
                            <el-input type="textarea" :placeholder="$t('please_enter')" id="execution_content" v-model="FormData.execution_content" maxlength="100" show-word-limit />
                        </div>

                        <div class="form-group mb-3">
                            <label for="remark">
                                <small><b>{{ $t('remark') }}</b></small>
                            </label>
                            <el-input type="textarea" :placeholder="$t('please_enter')" id="remark" v-model="FormData.remark" maxlength="100" show-word-limit />
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
import SpendingContract from '@/components/Share/SpendingContract.vue';
import Supplier from '@/components/Share/Supplier.vue';
import InternalUnit from '@/components/Share/InternalUnit.vue';
import Picture from '@/components/Share/Picture.vue';
import Document from '@/components/Share/Document.vue';
import Approver from '@/components/Share/ApproverUser.vue';
import Cc from '@/components/Share/CcUser.vue';
export default {
    name: 'ExecutionSpendingEdit',
    data() {
        return {
            loading: true,
            submitting: false,
            FormData: {},
             oldProjectId: "",
             pictureImages: [] ,
             appendixImages: [], 
             showapprover: [],
             showcc: [],
             oldApprover: [],  
             oldCc: [],
             oldpictureImages: [],
             oldappendixImages: [],
             oldSpendingId: "",
             oldSupplierId: "",
             oldInternalUnitId: "" 
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
    created(){ 
        this.getData();                  
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

         async getData(){         
            let response = await authApi({
                method: 'POST',
                api: '/contractmanagement/get_spending_contract_execution',
                params: {
                       id: this.$route.params.id,
                       keyword: '',             
                       page: '',
                       limit: ''
                }   
            });
            if(response.status == 200){            
                this.FormData = response.data.data;               
                this.oldProjectId = this.FormData.project_id;    
                this.oldSpendingId= this.FormData.spending_contract_id;   
                this.oldSupplierId= this.FormData.supplier_id;
                this.oldInternalUnitId= this.FormData.internal_unit_id;           
                this.oldApprover = this.FormData.approver;  
                this.oldCc = this.FormData.cc;  
                if(response.data.data.picture != null){
                const list= response.data.data.picture.images;
                this.oldpictureImages = list.map(v => ({...v, isSelected: true}));
                }
                if(response.data.data.appendix !=null ){
                const list1= response.data.data.appendix.documents;
                this.oldappendixImages = list1.map(v => ({...v, isSelected: true}));
                }    
                this.loading = false; 
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
                    api: '/contractmanagement/spending_contract_execution',
                    data: this.FormData 
                });
                if(response.status == 200){
                    const id = this.$route.params.id; 
                    const formData = new FormData();
                    formData.append('execution_id',id);
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
                    api: '/contractmanagement/spending_contract_executiondatafiles',                 
                    data: formData
                    });
                    if(imgResponse.status == 200){                   
                        toast.success("Execution Spending Insert successful !", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                        });
                        this.getData();
                        this.submitting = false;
                    }
                }
        },
    
    }
}
</script>
