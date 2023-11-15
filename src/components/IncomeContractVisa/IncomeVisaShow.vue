<template>
    <div v-loading="loading" class="loading__div" v-if="loading"></div> 
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading"> 
           
            <div class="row mx-2">
            <el-card class="box-card" style="width: 100%">                     
                <div class="row">
                    <div class="col-md-12"> 
                        <div class="form-group">
                            <label for="project_name">
                                <small class="text-muted"><b>{{ $t('project_name') }}</b></small>: 
                            </label>
                            {{ FormData.project_id }}
                        </div>
                        <div class="form-group mb-3">
                                <label for="visa_name">
                                     <small class="text-muted"><b>{{ $t('visa_name') }}</b></small>:   
                                </label>
                                {{ FormData.visa_name }}
                            </div>

                            <div class="form-group mb-3">
                                <label for="visa_date">
                                     <small class="text-muted"><b>{{ $t('visa_date') }}</b></small>: 
                                </label>
                               {{ FormData.visa_date }}
                            </div>   
                            <div class="form-group mb-3">
                                <label for="revenue_contract">
                                     <small class="text-muted"><b>{{ $t('revenue_contract') }}</b></small>: 
                                </label>
                               {{ FormData.revenue_contract_id }}
                            </div>                       

                            <div class="form-group mb-3">
                                <label for="amount_including_tax">
                                    <small class="text-muted"><b>{{ $t('amount_including_tax') }}</b></small>:  
                                </label>
                               {{ FormData.amount_with_tax }}
                            </div>

                            <div class="form-group mb-3">
                                <label for="tax_rate">
                                    <small class="text-muted"><b>{{ $t('tax_rate') }}</b></small>: 
                                </label>
                               {{ FormData.tax_rate }}
                            </div>

                            <div class="form-group mb-3">
                                <label for="tax">
                                    <small class="text-muted"><b>{{ $t('tax') }}</b></small>: 
                                </label>
                               {{ FormData.tax }}
                            </div>

                            <div class="form-group mb-3">
                                <label for="excluding_tax_amount">
                                    <small class="text-muted"><b>{{ $t('excluding_tax_amount') }}</b></small>:  
                                </label>
                               {{ FormData.amount_without_tax }}
                            </div>

                            <div class="form-group mb-3">
                                <label for="visa_content">
                                    <small class="text-muted"><b>{{ $t('visa_content') }}</b></small>: 
                                </label>
                               {{ FormData.visa_content }}
                            </div>  
                           
                            <div class="form-group mb-5">
                                <label for="remark">
                                    <small class="text-muted"><b>{{ $t('remark') }}</b></small>:
                                </label>
                                {{ FormData.remark }}
                            </div>                        
                    </div>                       
                </div>
                <!-- <div class="row mx-2">
                            <label for="payment_plan_details">
                            <small class="text-muted"><b>{{ $t('payment_plan_details') }}</b></small>:
                            </label>     
                            <el-table :data="planDetail" border style="width: 100%;">
                                        <el-table-column  fixed type="index" width="55" />

                                        <el-table-column :label="$t('plan_name')" width="250px">
                                            <template #default="scope">
                                               <span>{{ scope.row.plan_name }}</span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('plan_date')" width="250px"> 
                                            <template #default="scope">
                                              <span>{{ scope.row.plan_date }}</span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('scheduled_payment_amount')" width="250px"> 
                                            <template #default="scope">
                                               <span>{{ scope.row.payment_amount }}</span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('payment_ratio')" width="250px"> 
                                            <template #default="scope">
                                               <span>{{ scope.row.receipt_ratio }}</span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('payment_terms')" width="200px"> 
                                            <template #default="scope">
                                              <span>{{ scope.row.payment_terms }}</span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('remark')" width="200px"> 
                                            <template #default="scope">
                                                <p>{{ scope.row.remark }}</p>
                                            </template>
                                        </el-table-column>
                            </el-table>
                </div>            -->
                <div class="row"> 
                    <label >
                            <small class="text-muted ml-2"><b>{{ $t('picture') }}</b></small>:
                    </label>                     
                    <div class="col-12">                 
                        <span v-for="(items, i) in FormData.picture.images" :key="i"  class="mx-2">
                        <el-image
                        style="width: 80px; height: 80px; border-radius: 10px;"
                        :src="items.url"
                        :zoom-rate="1.2"
                        :preview-src-list="[items.url]"
                        :initial-index="4"
                        fit="cover"
                        />
                        </span>
                    </div>  
                </div>
                <div class="row">   
                    <label for="remark">
                            <small class="text-muted ml-2"><b>{{ $t('appendix') }}</b></small>:
                    </label>                   
                    <div class="col-12">
                        <a :href="doc.url" target="_blank" v-for="doc of FormData.appendix.documents">
                            <img class="img__thumbnail" src="../../assets/images/file-icon.jpg" alt="" style="width: 60px;" >
                        </a>
                    </div>  
                </div>            
                <div class="row">   
                    <label for="remark">
                            <small class="text-muted ml-2"><b>{{ $t('approver') }}</b></small>:
                    </label>                   
                    <div class="col-12">                 
                        <span v-for="user of FormData.approver" class="pr-2">  <font-awesome-icon icon="fa-solid fa-user" class="icon"/> {{ user }}</span>
                    </div>  
                </div>
                <div class="row">   
                    <label for="remark">
                                <small class="text-muted ml-2"><b>{{ $t('cc') }}</b></small>:
                    </label>                   
                    <div class="col-12">                 
                        <span v-for="user of FormData.cc" class="pr-2">  <font-awesome-icon icon="fa-solid fa-user" class="icon"/> {{ user }}</span>
                    </div>  
                </div>
            </el-card>        
            </div>
    </div>
 </template>

<script>
import {authApi} from '@/http/authApi'

export default {
    name: 'IncomeVisaShow',
    data() {
        return {
             loading: true,             
             FormData: {},   
        }
    },
   
    created(){                    
        this.getData();
    },
   
    methods: { 
        async getData(){  
            this.loading = true;       
            let response = await authApi({
                method: 'POST',
                api: '/contractmanagement/get_revenue_contract_visa',
                params: {
                       id: this.$route.params.id,
                       keyword: '',             
                       page: '',
                       limit: ''
                },
                // data: {
                //     view: true,
                // }   
            });
            if(response.status == 200){            
                this.FormData = response.data.data;     
                this.oldApprover = this.FormData.approver;  
                this.oldCc = this.FormData.cc;  
                const list= response.data.data.picture.images;
                this.oldpictureImages = list.map(v => ({...v, isSelected: true}));
                const list1= response.data.data.appendix.documents;
                this.oldappendixImages = list1.map(v => ({...v, isSelected: true}));
                this.oldProjectId = this.FormData.project_id;
                this.oldRevenueContractId = this.FormData.revenue_contract_id;
                //console.log("income"+ JSON.stringify(this.FormData))       
                this.loading = false; 
            }          
        },

      
    }
}
</script>
