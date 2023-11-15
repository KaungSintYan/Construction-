<template>
    <div v-loading="loading" class="loading__div" v-if="loading"></div> 
    <div class="container-fluid" @click="$store.commit('setActive', false)" v-if="!loading">    
     <div class="row mx-2">
        <el-card class="box-card" style="width: 100%">
            <template #header>
            <div class="card-header">
                <span>{{ $t('project_details') }}</span>             
            </div>
            </template>            
            <div class="row">
                <div class="col-md-12"> 
                    <div class="form-group">
                        <label for="project_name">
                            <small class="text-muted"><b>{{ $t('project_name') }} : </b></small> 
                        </label>
                        {{ FormData.project_id }}
                    </div>    
                    <div class="form-group">
                        <label for="title_bd">
                            <small class="text-muted"><b>{{ $t('title_bd') }} : </b></small> 
                        </label>
                        {{ FormData.title }}
                    </div>                  
                    <div class="form-group">
                        <label for="odd_number">
                            <small class="text-muted"><b>{{ $t('odd_number') }} : </b></small> 
                        </label>
                        {{ FormData.odd_number }}
                    </div> 
                    <!-- <div class="form-group">
                        <label for="applicat_data">
                            <small class="text-muted"><b>{{ $t('applicat_data') }} : </b></small> 
                        </label>
                        {{ FormData.application_date }}
                    </div>  -->
                    <!-- <div class="form-group">
                        <label for="picker">
                            <small class="text-muted"><b>{{ $t('picker') }} : </b></small> 
                        </label>
                        {{ FormData.picker }}
                    </div>  -->
                    <div class="form-group">
                        <label for="exit_date">
                            <small class="text-muted"><b>{{ $t('exit_date') }} : </b></small> 
                        </label>
                        {{ FormData.application_date }}
                    </div> 

                    <!-- start  -->

                    <div class="row mx-2">
                    
                        <label for="">
                            <span class="text-danger">*</span><small><b>{{ $t('material_details') }}</b></small>  
                        </label>   
                       
                        <el-table :data="planDetail" border style="width: 100%;">
                            <el-table-column  label="#" fixed type="index" width="55" />
                            
                                    <el-table-column :label="$t('material_name')" width="480px"> 
                                        <template #default="scope">
                                           <span>{{scope.row.material_id}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('num_of_plants')" width="480px"> 
                                        <template #default="scope">
                                           <span>{{scope.row.quantity}}</span>
                                        </template>
                                    </el-table-column>                                    

                                    <el-table-column :label="$t('remark')" width="480px"> 
                                        <template #default="scope">
                                          <p>{{scope.row.remark}}</p>
                                        </template>
                                    </el-table-column>
                        </el-table>
                    </div> 

                    <!-- end  -->
                    
                    <div class="form-group">
                        <label for="created_by_user">
                            <small class="text-muted"><b>{{ $t('created_by_user') }} : </b></small> 
                        </label>
                        {{ FormData.created_by_user }}
                    </div> 
                    <div class="form-group">
                        <label for="creation_time">
                            <small class="text-muted"><b>{{ $t('creation_time') }} : </b></small> 
                        </label>
                        {{ FormData.creation_time }}
                    </div>
                    <div class="form-group">
                        <label for="remark">
                            <small class="text-muted"><b>{{ $t('remark') }} : </b></small> 
                        </label>
                        {{ FormData.remark }}
                    </div>  
                        
                </div>                       
            </div>
            <div class="row"> 
                <label>
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
                    <a :href="doc.url" target="_blank" v-for="doc of FormData.appendix.documents" :key="doc">
                        <img class="img__thumbnail" src="../../assets/images/file-icon.jpg" alt="" style="width: 60px;" >
                    </a>
                </div>  
            </div>
           
            <div class="row">   
                <label for="approver">
                        <small class="text-muted ml-2"><b>{{ $t('approver') }}</b></small>
                </label>                   
                <div class="col-12">                 
                    <span v-for="user of FormData.approver" :key="user">  <font-awesome-icon icon="fa-solid fa-user" class="icon"/> {{ user }}</span>
                </div>  
            </div>
            <div class="row">   
                <label for="cc">
                        <small class="text-muted ml-2"><b>{{ $t('cc') }}</b></small>
                </label>                   
                <div class="col-12">                 
                    <span v-for="user of FormData.cc" :key="user">  <font-awesome-icon icon="fa-solid fa-user" class="icon"/> {{ user }}</span>
                </div>  
            </div>
        </el-card>        
     </div>  
    </div>
 </template>
 <script>
 import {authApi} from '@/http/authApi'

 export default {
     name: 'OutboundOrderShow',
     data() {
         return {
             loading: false,             
             FormData: { }, 
             planDetail: [] 
             
         }
     },
     
     created(){  
           this.getData(); 
           this.getPlanDetail();
     },
     methods:{          
        async getData(){   
            this.loading = true;      
            let response = await authApi({
                method: 'POST',
                api: '/materialmanagement/get_outbound_order',
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
            if(response.message){ 
                // console.log('list'+ JSON.stringify(response));
                this.FormData = response.data.data;                       
                this.loading = false;       
                this.getPlanDetail(); 
            }          
        },   
        async getPlanDetail(){
            let response = await authApi({
                method: 'GET',
                api: '/materialmanagement/outbound_order_materialdetail',
                params: {
                    outbound_order_id: this.$route.params.id, 
                    view: 1,                  
                }    
            });
            if(response.status == 200){ 
              //  console.log('de'+ JSON.stringify(response.data.data))
                const list1= response.data.data;
                 this.planDetail= list1.map((v,index) => (
                     {...v,
                        material_name: "",
                        material_brand: "",
                        material_classification: "",
                        material_specification: "",
                        material_unit: ""}
                    ));
           
            }
        },  
      
     }
     
 }
 </script>
 <style lang="scss">

</style>
 