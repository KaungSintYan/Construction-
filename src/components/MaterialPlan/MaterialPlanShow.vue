<template>
    <div v-loading="loading" class="loading__div" v-if="loading"></div> 
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading">  
       
        <div class="row mx-2">
            <el-card class="box-card" style="width: 100%">                     
                <div class="row">
                    <div class="col-md-12"> 
                        <div class="form-group">
                            <label for="project_name">
                                <small class="text-muted"><b>{{ $t('project_name') }}</b></small> :
                            </label>
                            {{ FormData.project_id }}
                        </div>
                        <div class="form-group mb-2 mt-3">
                            <label for="title">
                                <small class="text-muted"><b>{{ $t('title_bd') }}</b></small>:
                            </label>
                            {{ FormData.title }}
                        </div> 
                        <div class="col-md-3 m-0 p-0">
                            <div class="form-group mb-3">
                                <label for="complilation_date"> 
                                    <small class="text-muted"><b>{{ $t('complilation_date') }}</b></small>     
                                </label>
                               {{ FormData.application_date }}
                            </div>
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
                            <small class="text-muted"><b>{{ $t('plan_details') }}</b></small>
                            </label>     
                            <el-table :data="detail" border style="width: 100%;">
                                    <el-table-column  fixed type="index" width="55" />
                                    <el-table-column :label="$t('material_name')"> 
                                        <template #default="scope">
                                           <span>{{ scope.row.material_id }}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('num_of_plants')"> 
                                        <template #default="scope">
                                           <span>{{ scope.row.quantity }}</span>
                                        </template>
                                    </el-table-column>

                                    <!-- <el-table-column label="Plan Amount"> 
                                        <template #default="scope">
                                           <span>{{ scope.row.plan_amount }}</span>
                                        </template>
                                    </el-table-column> -->

                                    <!-- <el-table-column :label="$t('plan_unit_price')"> 
                                        <template #default="scope">
                                          <span>{{scope.row.price_per_unit}}</span>
                                        </template>
                                    </el-table-column> -->

                                    <el-table-column :label="$t('remark')" width="200px"> 
                                        <template #default="scope">
                                           <p>{{ scope.row.remark }}</p>
                                        </template>
                                    </el-table-column>
                                </el-table>
                </div>           
                <div class="row"> 
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
                <div class="row">   
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
    name: 'MaterialPlanShow',
    data() {
        return {             
             loading: true,
             FormData: {},
             detail: [],
        }
    },
   
    created(){ 
        this.getData();   
        this.getDetail();
    },
    methods: {
      
        async getData(){  
            this.loading = true;       
            let response = await authApi({
                method: 'POST',
                api: '/materialmanagement/get_material_plan',
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
                this.getDetail(); 
            }
          
        },
        async getDetail(){
            let response = await authApi({
                method: 'GET',
                api: '/materialmanagement/material_plandetail',
                params: {
                    material_plan_id: this.$route.params.id, 
                    view: 1,                      
                }   
            });
            if(response.status == 200){                 
               
                this.detail=  response.data.data;
                this.loading = false;
            }
        },

    }
  
}
</script>

<style lang="scss">
.block-title{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: space-between;
    flex-direction: row;
  }
  .block-title strong{
    flex-grow: 1;
  }
</style>
