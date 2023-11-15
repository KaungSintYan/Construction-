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
                                <label for="type_of_contract">
                                     <small class="text-muted"><b>{{ $t('type_of_contract') }}</b></small>:   
                                </label>
                                {{ FormData.contract_type_id }}
                            </div>

                            <div class="form-group mb-3">
                                <label for="contract_title">
                                     <small class="text-muted"><b>{{ $t('contract_title') }}</b></small>: 
                                </label>
                               {{ FormData.contract_title }}
                            </div>                          
                            <div class="form-group mb-3">
                                <label for="visa_date"> <small class="text-muted"><b> {{ $t('date_of_signing') }} </b></small>:</label>
                               {{ FormData.date_of_signing }}
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

                            

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label for="start_date"><small class="text-muted"><b>{{ $t('start_date') }}</b></small>:</label>
                                        {{ FormData.start_date }}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label for="end_date"><small class="text-muted"><b> {{ $t('end_date') }} </b></small>:</label>
                                        {{ FormData.end_date }}
                                    </div>
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="payment_terms">
                                    <small class="text-muted"><b>{{ $t('payment_terms') }}</b></small>: 
                                </label>
                                {{ FormData.payment_terms }}
                            </div>      
                           
                            <div class="form-group mb-5">
                                <label for="remark">
                                    <small class="text-muted"><b>{{ $t('remark') }}</b></small>:
                                </label>
                                {{ FormData.remark }}
                            </div>                        
                    </div>                       
                </div>
                <div class="row mx-2">
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
                </div>           
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
    name: 'SpendingShow',
    data() {
        return {
             loading: true,             
             FormData: {},
             planDetail: [],      
        }
    },
   
    created(){                    
        this.getData();
    },
   
    methods: { 
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
                    view: true,
                }   
            });
            if(response.status == 200){            
                this.FormData = response.data.data; 
                this.getPlanDetail(); 
            }          
        },
        async getPlanDetail(){
            let response = await authApi({
                method: 'GET',
                api: '/contractmanagement/spending_paymentplandetail',
                params: {
                    contract_id: this.$route.params.id, 
                    view: 1,                      
                }   
            });
            if(response.status == 200){               
                this.planDetail=  response.data.data;
                this.loading = false;         
            }
        },
      
    }
}
</script>
