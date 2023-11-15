<template>
 <div v-loading="loading" class="loading__div" v-if="loading"></div> 
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading">   
        <form  @submit.prevent="updateData">    
            <div class="row">
                <div class="col-md-12">
                            <ProjectName :oldProjectId="oldProjectId" @projectData="getProjectName($event)"  />
                            <div class="form-group mb-3">
                                <label for="visa_name">
                                    <span class="text-danger">*</span> <small><b>{{ $t('visa_name') }}</b></small>
                                </label>
                                <el-input type="text" id="visa_name"  :placeholder="$t('please_enter')" class="" v-model="FormData.visa_name" clearable/>
                            </div>

                            <div class="form-group mb-3">
                                <label for="visa_date"> <span class="text-danger">*</span> <small><b>{{ $t('visa_date') }}</b></small> </label>
                                <el-date-picker :placeholder="$t('pick_a_day')" type="date" class="" id="visa_date" 
                                    style="width: 100%;" format="YYYY-MM-DD" value-format="YYYY-MM-DD" 
                                     v-model="FormData.visa_date" clearable/>
                            </div>
                            <SpendingContract :projectId="oldProjectId" :oldSpendingId="oldSpendingId" @spendingData="getSpendingName($event)" />                            

                            <div class="form-group mb-3">
                                <label for="amount_including_tax">
                                    <span class="text-danger">*</span> <small><b>{{ $t('amount_including_tax') }}</b></small> 
                                </label>
                                <el-input type="number" id="amount_including_tax" class="" :placeholder="$t('please_enter')" v-model="FormData.amount_with_tax" clearable/>
                            </div>

                            <div class="form-group mb-3">
                                <label for="tax_rate">
                                    <span class="text-danger">*</span> <small><b>{{ $t('tax_rate') }}</b></small>
                                </label>
                                 <el-input type="number"  class="" :placeholder="$t('please_enter')" v-model="FormData.tax_rate" clearable/>
                            </div>

                            <div class="form-group mb-3">
                                <label for="tax">
                                    <small><b>{{ $t('tax') }}</b></small>
                                </label>
                                <el-input type="number" id="tax" class="" v-model="calculateTax" readonly/>
                            </div>

                            <div class="form-group mb-3">
                                <label for="excluding_tax_amount">
                                    <span class="text-danger">*</span> <small><b>{{ $t('excluding_tax_amount') }}</b></small>
                                </label>
                                <el-input type="number" id="excluding_tax_amount" class="" v-model="calculateTaxAmount" readonly/>
                            </div>

                            <div class="form-group mb-3">
                                <label for="visa_content">
                                    <small><b>{{ $t('visa_content') }}</b></small> 
                                </label>
                                <el-input type="textarea" :placeholder="$t('please_enter')" id="visa_content" v-model="FormData.visa_content" maxlength="100" show-word-limit  />
                            </div>

                            <div class="form-group mb-3">
                                <label for="remark">
                                    <small><b>{{ $t('remark') }}</b></small>
                                </label>
                                <el-input type="textarea" :placeholder="$t('please_enter')" id="remark" v-model="FormData.remark" maxlength="100" show-word-limit  />
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
import Picture from '@/components/Share/Picture.vue';
import Document from '@/components/Share/Document.vue';
import Approver from '@/components/Share/ApproverUser.vue';
import Cc from '@/components/Share/CcUser.vue';
export default {
    name: 'SpendingVisaEdit',
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
             oldSpendingId: ""
        }
    },
    components: {
      ProjectName,   
      SpendingContract,   
      Picture,
      Document,
      Approver,
      Cc    
    }, 
    created(){                
        this.getData(); 
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
        getSpendingName(data){
            this.FormData.spending_contract_id= data;             
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
            this.loading = true;                    
            let response = await authApi({
                method: 'POST',
                api: '/contractmanagement/get_spending_contract_visa',
                params: {
                       id: this.$route.params.id,
                       keyword: '',             
                       page: '',
                       limit: ''
                }   
            });
            if(response.status == 200){            
                this.FormData = response.data.data;  
                //console.log('res'+ JSON.stringify(this.FormData))
                this.oldProjectId = this.FormData.project_id;    
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
                this.oldSpendingId= this.FormData.spending_contract_id;  
                   
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
                api: '/contractmanagement/spending_contract_visa',
                data: this.FormData 
            });
            if(response.status == 200){
                const id = this.$route.params.id;
                 let formData = new FormData();
                 formData.append('visa_id',id);
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
                api:  '/contractmanagement/spending_contract_visadatafiles',           
                data: formData
                });
                if(imgResponse.status == 200){                  
                    toast.success("Spending Visa Update successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
                    this.getData();
                    this.submitting = false;
                    this.$router.back();
                }
            }
        },
    }
    
}
</script>
