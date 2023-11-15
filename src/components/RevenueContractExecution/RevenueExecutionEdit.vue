<template>
    <div v-loading="loading" class="loading__div" v-if="loading"></div>   
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading"> 
        <form  @submit.prevent="updateData">   
            <div class="row">
                <div class="col-md-12">            
                            <ProjectName :oldProjectId="oldProjectId" @projectData="getProjectName($event)"  /> 

                            <div class="form-group mb-3">
                                <label for="execution_order_name">
                                    <span class="text-danger">*</span> <small><b>{{ $t('execution_order_name') }}</b></small>  
                                </label>
                                <el-input type="text" id="execution_order_name" class="" :placeholder="$t('please_enter')" v-model="FormData.execution_order_name" clearable/>
                            </div>

                            <!-- <div class="form-group mb-3">
                                <label for="odd_number">
                                    <span class="text-danger">*</span> <small><b>{{ $t('odd_number') }}</b></small> 
                                </label>
                                <el-input type="number" id="odd_number" class="" :placeholder="$t('default_serial_number')"
                                v-model="FormData.execution_number" clearable/>
                            </div> -->

                            <div class="col-md-3 m-0 p-0">
                                <div class="form-group mb-3">
                                    <label for="execution_date">
                                        <span class="text-danger">*</span> <small><b>{{ $t('execution_date') }}</b></small> 
                                    </label>
                                    <el-date-picker :placeholder="$t('pick_a_day')" type="date" class="" id="execution_date" style="width: 100%;"  v-model="FormData.execution_date" />
                                </div>
                            </div>
                        
                            <RevenueContractName  :projectId="oldProjectId" :oldRevenueContractId="oldRevenueContractId" @revenueData="getRevenueData($event)" />   

                            <Client :oldClientId="oldClientId" @clientData="getClientData($event)" />
                            <InternalUnit :oldInternalUnitId="oldInternalUnitId" @internalUnitData="getInternalUnitData($event)" />    
                            <div class="form-group mb-3">
                                <label for="execution_amount">
                                    <span class="text-danger">*</span> <small><b>{{ $t('execution_amount') }}</b></small> 
                                </label>
                                <el-input type="number" id="execution_amount" class="" :placeholder="$t('please_enter')" v-model="FormData.execution_amount" clearable/>
                            </div>

                            <div class="form-group mb-3">
                                <label for="execution_content">
                                    <small><b>{{ $t('execution_content') }}</b></small> 
                                </label>
                                <el-input type="textarea" :placeholder="$t('please_enter')" id="execution_content" v-model="FormData.execution_content" maxlength="1024" show-word-limit  />
                            </div>

                            <div class="form-group mb-3">
                                <label for="remark">
                                    <small><b>{{ $t('remark') }}</b></small>
                                </label>
                                <el-input type="textarea" :placeholder="$t('please_enter')" id="remark" v-model="FormData.remark" maxlength="500" show-word-limit  />
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
import RevenueContractName from '@/components/Share/RevenueContractName.vue';
import Client from '@/components/Share/Client.vue';
import InternalUnit from '@/components/Share/InternalUnit.vue';
import Picture from '@/components/Share/Picture.vue';
import Document from '@/components/Share/Document.vue';
import Approver from '@/components/Share/ApproverUser.vue';
import Cc from '@/components/Share/CcUser.vue';
export default {
    name: 'BudgetCreate',
    data() {
        return {   
             loading: true,
             submitting: false,        
             FormData: {},    
             pictureImages: [] ,
             appendixImages: [], 
             showapprover: [],
             showcc: [],
             oldApprover: [],  
             oldCc: [],
             oldpictureImages: [],
             oldappendixImages: [],
             oldProjectId: "",
             oldRevenueContractId: "",
             oldClientId: '',  
             oldInternalUnitId: ""    
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
    created(){                
        this.getData(); 
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
        async getData(){  
            this.data= [];
            this.loading = true;       
            let response = await authApi({
                method: 'POST',
                api: '/contractmanagement/get_revenue_contract_execution',
                params: {
                       id: this.$route.params.id,
                       keyword: '',             
                       page: '',
                       limit: ''
                }   
            });
            if(response.message){            
                this.FormData = response.data.data;     
                this.oldApprover = this.FormData.approver;  
                this.oldCc = this.FormData.cc;  
                const list= response.data.data.picture.images;
                this.oldpictureImages = list.map(v => ({...v, isSelected: true}));
                const list1= response.data.data.appendix.documents;
                this.oldappendixImages = list1.map(v => ({...v, isSelected: true}));
                this.oldProjectId = this.FormData.project_id;
                this.oldRevenueContractId = this.FormData.revenue_contract_id;
                this.oldClientId= this.FormData.client_id;
                this.oldInternalUnitId= this.FormData.internal_unit_id;
                // console.log("exection"+ JSON.stringify(this.FormData))
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
               api: '/contractmanagement/revenue_contract_execution',
               data: this.FormData 
           });
           if(response.status == 200){                          
                const id = this.$route.params.id;
                 let formData = new FormData();
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
               api: '/contractmanagement/revenue_contract_executiondatafiles',                   
               data: formData
               });
               if(imgResponse.status == 200){                   
                   toast.success("Revenue Execution Update successful !", {
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
