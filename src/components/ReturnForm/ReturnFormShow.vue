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
                                    <small class="text-muted"><b>{{ $t('title_bd') }}</b></small> :
                                </label>
                                {{ FormData.title }}
                            </div>                            
                            <div class="col-md-3 m-0 p-0">
                                <div class="form-group mb-3">
                                    <label for="date_of_signing">
                                        <small class="text-muted"><b>{{ $t('date_of_signing') }}</b></small> :
                                    </label>
                                    {{ FormData.application_date }}
                                </div>
                            </div>
       
                            <div class="form-group mb-3">
                                <label for="return_reason">
                                    <small class="text-muted"><b>{{ $t('return_reason') }}</b></small> :
                                </label>
                               {{ FormData.return_reason }}
                            </div>
                            <div class="form-group mb-3">
                                    <label for="remark">
                                        <small class="text-muted"><b>{{ $t('remark') }}</b></small> :
                                    </label>
                                    <p>{{ FormData.remark }}</p>
                            </div>                        
                        </div>                       
                    </div>
                    <div class="row mx-2">
                        <el-table :data="planDetail" border style="width: 100%;">
                                    <el-table-column  fixed type="index" width="55" />                                    
                                    
                                    <el-table-column label="Material" width="350px"> 
                                        <template #default="scope">                                           
                                           <span>{{ scope.row.material_id }}</span>
                                        </template>
                                    </el-table-column> 
                                    <el-table-column :label="$t('num_of_plants')" width="350px"> 
                                        <template #default="scope">
                                            <span>{{ scope.row.quantity }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label="$t('remark')" width="350px"> 
                                        <template #default="scope">
                                            <span>{{ scope.row.remark }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label="$t('other_property')" width="350px"> 
                                        <template #default="scope">
                                          <span>{{ scope.row.otherproperties }}</span>
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
                            <a :href="doc.url" target="_blank" v-for="doc of FormData.appendix.documents" :key="doc">
                                <img class="img__thumbnail" src="../../assets/images/file-icon.jpg" alt="" style="width: 60px;" >
                            </a>
                        </div>  
                    </div>            
                    <div class="row">   
                        <label for="remark">
                                <small class="text-muted ml-2"><b>{{ $t('approver') }}</b></small>
                        </label>                   
                        <div class="col-12">                 
                            <span v-for="user of FormData.approver" class="pr-2" :key="user">  <font-awesome-icon icon="fa-solid fa-user" class="icon"/> {{ user }}</span>
                        </div>  
                    </div>
                    <div class="row">   
                        <label for="remark">
                                    <small class="text-muted ml-2"><b>{{ $t('cc') }}</b></small>
                        </label>                   
                        <div class="col-12">                 
                            <span v-for="user of FormData.cc" class="pr-2" :key="user">  <font-awesome-icon icon="fa-solid fa-user" class="icon"/> {{ user }}</span>
                        </div>  
                    </div>
                </el-card>        
            </div>            
    </div>
  
</template>

<script>
import {authApi} from '@/http/authApi'

export default {
    name: 'ReturnFormEdit',
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
    methods: {       
        async getData(){    
          this.loading = true;
          let response = await authApi({
              method: 'POST',
              api: '/materialmanagement/get_return_order',
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
                this.FormData = response.data.data;   
                this.getPlanDetail();  
          }       
      },   
      async getPlanDetail(){
            let response = await authApi({
                method: 'GET',
                api: '/materialmanagement/return_order_detail',
                params: {
                    return_form_id: this.$route.params.id,    
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
