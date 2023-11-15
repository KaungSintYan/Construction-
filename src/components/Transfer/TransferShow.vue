<template>
    <div v-loading="loading" class="loading__div" v-if="loading"></div> 
    <div class="container-fluid" @click="$store.commit('setActive', false)" v-if="!loading">  

     <div class="row mx-2">
        <el-card class="box-card" style="width: 100%">                     
            <div class="row">
                <div class="col-md-12"> 
                    <div class="form-group">
                        <label for="call_out_project">
                            <small class="text-muted"><b>{{ $t('call_out_project') }} :</b></small> 
                        </label>
                        {{ FormData.project_from_id }}
                    </div>
                    <div class="form-group">
                        <label for="import_project">
                            <small class="text-muted"><b>{{ $t('import_project') }} :</b></small> 
                        </label>
                        {{ FormData.project_to_id }}
                    </div>
                    <div class="form-group">
                        <label for="title_bd">
                            <small class="text-muted"><b>{{ $t('title_bd') }} :</b></small> 
                        </label>
                        {{ FormData.title }}
                    </div>
                    <div class="form-group">
                        <label for="odd_number">
                            <small class="text-muted"><b>{{ $t('odd_number') }} :</b></small> 
                        </label>
                        {{ FormData.odd_number }}
                    </div>
                    <div class="form-group">
                        <label for="applicat_data">
                            <small class="text-muted"><b>{{ $t('applicat_data') }} :</b></small> 
                        </label>
                        {{ FormData.transfer_date }}
                    </div>

                    <!-- start  -->

                    <div class="row mx-2 mb-4">
                        <label for="material_details">
                            <span class="text-danger">*</span> <small><b>{{ $t('material_details') }} : </b></small>  
                        </label>
                        <el-table :data="planDetail" border style="width: 100%;">
                            <el-table-column  fixed type="index" width="55" />
                            
                            <el-table-column :label="$t('material_name')" width="300px"> 
                                        <template #default="scope">
                                           <span>{{scope.row.material_id}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('amount')" width="170px"> 
                                        <template #default="scope">
                                           <span>{{scope.row.amount}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('price_per_unit')" width="300px"> 
                                        <template #default="scope">
                                            <span>{{scope.row.price_per_unit}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('quantity')" width="300px"> 
                                        <template #default="scope">
                                            <span>{{scope.row.transfer_quantity}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('remark')" width="400px"> 
                                        <template #default="scope">
                                          <p>{{scope.row.remark}}</p>
                                        </template>
                                    </el-table-column>
                        </el-table>
                        </div>

                    <!-- end  -->
                    <div class="form-group">
                        <label for="created_by_user">
                            <small class="text-muted"><b>{{ $t('created_by_user') }} :</b></small> 
                        </label>
                        {{ FormData.created_by_user }}
                    </div>
                    <div class="form-group">
                        <label for="creation_time">
                            <small class="text-muted"><b>{{ $t('creation_time') }} :</b></small> 
                        </label>
                        {{ FormData.creation_time }}
                    </div>
                    <div class="form-group mb-5">
                        <label for="remark">
                            <small class="text-muted"><b>{{ $t('remark') }} :</b></small>
                        </label>
                        {{ FormData.remark }}
                    </div>                        
                </div>                       
            </div>
            <!-- <div class="row mx-2">
                        <label for="budget_details">
                           <small><b>{{ $t('budget_details') }}</b></small>
                         </label>     
                            <el-table :data="budgetDetail" border>
                                <el-table-column fixed type="index" width="55" />
                                <el-table-column :label="$t('budget_name')" width="300px">
                                    <template #default="scope">
                                      {{ scope.row.budget_name }}
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('budget_type')" width="300px">
                                    <template #default="scope">
                                        <span>{{ scope.row.budgettype }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('budget_amount')" width="300px">
                                    <template #default="scope">
                                        {{ scope.row.budget_amount }}
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('remark')" width="400px">
                                    <template #default="scope">
                                      {{ scope.row.remark }}
                                    </template>
                                </el-table-column>
                            </el-table>
            </div>            -->
            <div class="row"> 
                <label >
                        <small class="text-muted ml-2"><b>{{ $t('picture') }} :</b></small>
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
                        <small class="text-muted ml-2"><b>{{ $t('appendix') }} :</b></small>
                </label>                   
                <div class="col-12">
                    <a :href="doc.url" target="_blank" v-for="doc of FormData.appendix.documents">
                        <img class="img__thumbnail" src="../../assets/images/file-icon.jpg" alt="" style="width: 60px;" >
                    </a>
                </div>  
            </div>
           
            <div class="row">   
                <label for="approver">
                        <small class="text-muted ml-2"><b>{{ $t('approver') }} :</b></small>
                </label>                   
                <div class="col-12">                 
                    <span v-for="user of FormData.approver" class="pr-2">  <font-awesome-icon icon="fa-solid fa-user" class="icon"/> {{ user }}</span>
                </div>  
            </div>
            <div class="row">   
                <label for="cc">
                            <small class="text-muted ml-2"><b>{{ $t('cc') }} :</b></small>
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
    name: 'TransferShow',
    data() {
        return {            
            loading: true,             
            FormData: { },           
            planDetail: [],
            
        }
    },    
    created(){         
          this.getData();       
    },
    methods:{        
        async getData(){   
            this.loading= true;      
            let response = await authApi({
                method: 'POST',
                api: '/materialmanagement/get_transfer_order',
                params: {
                       id: this.$route.params.id,
                       keyword: '',
                       status: '',                       
                       page: '',
                       limit: ''
                },
                data: {
                    view: true,
                }   
            });
            if(response.message){            
                this.FormData = response.data.data; 
                //console.log('list'+ JSON.stringify(response.data.data));
                this.getBugetDetail();
                      
            }          
        },      
        async getBugetDetail(){
            let response = await authApi({
                method: 'GET',
                api: '/materialmanagement/transfer_order_materialdetail',
                params: {
                    transfer_order_id: this.$route.params.id,      
                       view: 1               
                },
                 
            });
            if(response.status == 200){
               //console.log('bankdd'+ JSON.stringify(response.data.data))               
                this.planDetail= response.data.data;
                this.loading= false;
   
            }
        },
          
    } 
}
</script>
