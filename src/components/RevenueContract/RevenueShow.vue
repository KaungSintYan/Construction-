<template>
    <div v-loading="loading" class="loading__div" v-if="loading"></div>   
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading">          
            <div class="row mx-2">
            <el-card class="box-card" style="width: 100%">                     
                <div class="row">
                    <div class="col-md-12"> 
                        <div class="form-group">
                            <label for="project_name">
                                <small class="text-muted"><b>{{ $t('project_name') }}</b></small> 
                            </label>
                            {{ FormData.project_id }}
                        </div>
                        <div class="form-group mb-3">
                                <label for="type_of_contract">
                                  <small class="text-muted"><b>{{ $t('type_of_contract') }}</b></small> 
                                </label>
                               {{ FormData.contract_type_id }}
                            </div>   
                            <div class="form-group mb-3">
                                <label for="contract_no">
                                    <small class="text-muted"><b>{{ $t('contract_title') }}</b></small>
                                </label>
                               {{ FormData.contract_title }}
                            </div>

                            <div class="form-group mb-3">
                                <label for="contract_no">
                                    <small class="text-muted"><b>{{ $t('contract_no') }}</b></small> 
                                </label>
                                {{ FormData.contract_no }}
                            </div>
       
                            <div class="col-md-3 m-0 p-0">
                                <div class="form-group mb-3">
                                    <label for="date_of_signing">
                                      <small class="text-muted"><b>{{ $t('date_of_signing') }}</b></small>
                                    </label>
                                    {{ FormData.date_of_signing }}
                                </div>
                            </div>  
                           
                            <div class="form-group mb-3">
                                <label for="amount_including_tax">
                                 <small class="text-muted"><b>{{ $t('amount_including_tax') }}</b></small> 
                                </label>
                                {{ FormData.amount_with_tax }}
                            </div>
       
                            <div class="form-group mb-3">
                               <label for="tax_rate">
                                 <small class="text-muted"><b>{{ $t('tax_rate') }}</b></small>
                               </label>
                              {{ FormData.tax_rate }}
                            </div> 

                            <div class="form-group mb-3">
                                <label for="tax">
                                    <small class="text-muted"><b>{{ $t('tax') }}</b></small>
                                </label>
                                {{ FormData.tax }}
                            </div>
       
                            <div class="form-group mb-3">
                                <label for="excluding_tax_amount">
                                  <small class="text-muted"><b>{{ $t('excluding_tax_amount') }}</b></small>
                                </label>
                                {{ FormData.amount_without_tax }}
                            </div>

                            <div class="row">
                                <div class="col-6">
                                    <div class="form-group mb-3">
                                        <div class="form-group mb-3">
                                            <label for="start_date"> 
                                                <small class="text-muted"><b>{{ $t('reporting_start_date') }}</b></small>                 
                                            </label>
                                        </div>                        
                                       {{ FormData.start_date }}
                                    </div> 
                                </div>

                                <div class="col-6">
                                    <div class="form-group mb-3">
                                        <div class="form-group mb-3">
                                            <label for="end_date"> 
                                            <small class="text-muted"><b>{{ $t('reporting_end_date') }}</b></small>          
                                            </label>
                                        </div>                        
                                        {{ FormData.end_date }}
                                    </div> 
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="total_payment_plan">
                                    <small class="text-muted"><b>{{ $t('total_payment_plan') }}</b></small> 
                                </label>
                                {{ FormData.total_payment_plan }}
                            </div>                        
       
                            <div class="form-group mb-3">
                                <label for="payment_terms">
                                    <small class="text-muted"><b>{{ $t('payment_terms') }}</b></small> 
                                </label>
                               {{ FormData.payment_terms }}
                            </div>      
                           
                            <div class="form-group mb-5">
                                <label for="remark">
                                    <small class="text-muted"><b>{{ $t('remark') }}</b></small>
                                </label>
                                {{ FormData.remark }}
                            </div>                        
                    </div>                       
                </div>

                <div class="row mx-2">
                            <label for="payment_plan_details">
                            <small class="text-muted"><b>{{ $t('payment_plan_details') }}</b></small>
                            </label>     
                            <el-table :data="planDetail" border style="width: 100%;">
                                        <el-table-column fixed type="index" width="55" />

                                        <el-table-column :label="$t('plan_name')">
                                            <template #default="scope">
                                                <span>{{ scope.row.plan_name }}</span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('plan_date')">
                                            <template #default="scope">
                                            <span>{{ scope.row.plan_date }}</span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('planned_payment_amount')" width="200px">
                                            <template #default="scope">
                                                <span>{{ scope.row.payment_amount }}</span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('receipt_ratio')">
                                            <template #default="scope">
                                                <span>{{ scope.row.receipt_ratio }}</span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('payment_terms')" width="200px">
                                            <template #default="scope">
                                                <p>{{ scope.row.payment_terms }}</p>
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('remark')" width="200px">
                                            <template #default="scope">
                                                <p>{{ scope.row.remark }}</p>
                                            </template>
                                        </el-table-column>
                            </el-table>
                </div> 
                          
                <div class="row" v-if="FormData.picture != null"> 
                    <label >
                            <small class="text-muted ml-2"><b>{{ $t('picture') }}</b></small>
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
                <div class="row"  v-if="FormData.appendix != null">   
                    <label for="remark">
                            <small class="text-muted ml-2"><b>{{ $t('appendix') }}</b></small>
                    </label>                   
                    <div class="col-12">
                        <a :href="doc.url" target="_blank" v-for="doc of FormData.appendix.documents">
                            <img class="img__thumbnail" src="../../assets/images/file-icon.jpg" alt="" style="width: 60px;" >
                        </a>
                    </div>  
                </div>            
                <div class="row">   
                    <label for="remark">
                            <small class="text-muted ml-2"><b>{{ $t('approver') }}</b></small>
                    </label>                   
                    <div class="col-12">                 
                        <span v-for="user of FormData.approver" class="pr-2">  <font-awesome-icon icon="fa-solid fa-user" class="icon"/> {{ user }}</span>
                    </div>  
                </div>
                <div class="row">   
                    <label for="remark">
                                <small class="text-muted ml-2"><b>{{ $t('cc') }}</b></small>
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
    name: 'RevenueShow',
    data() {
        return {
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
            }
        }
    },
   
    created(){   
          this.getData();
       
    },
    methods:{        
        async getData(){
                this.loading = true;         
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
                        view: true,
                    }   
                });
                if(response.status == 200){            
                    this.FormData = response.data.data;    
                    //console.log("revenue"+ JSON.stringify(response))
                    this.getPlanDetail();                    
                }            
        },
    
        async getPlanDetail(){
            let response = await authApi({
                method: 'GET',
                api: '/contractmanagement/revenue_paymentplandetail',
                params: {
                       contract_id: this.$route.params.id,    
                       view: 1                   
                }   
            });
            if(response.status == 200){              
                 this.planDetail= response.data.data;
                 this.loading = false;
            }
        },
      
    }
    
}
</script>
<style lang="scss">

</style>