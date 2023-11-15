<template>
    <div v-loading="loading" class="loading__div" v-if="loading"></div> 
    <div class="container-fluid" @click="$store.commit('setActive', false)" v-if="!loading">  

     <div class="row mx-2">
        <el-card class="box-card" style="width: 100%">                     
            <div class="row">
                <div class="col-md-12"> 
                    <div class="form-group">
                        <label for="project_name">
                            <small class="text-muted"><b>{{ $t('project_name') }}</b></small> 
                        </label>
                        {{ FormData.project_name }}
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
                        <label for="budget_details">
                           <small><b>{{ $t('budget_details') }}</b></small>
                         </label>     
                            <el-table :data="budgetDetail" border style="width: 100%;">
                                <el-table-column fixed type="index" width="55" />
                                <el-table-column :label="$t('budget_name')" width="350px">
                                    <template #default="scope">
                                      {{ scope.row.budget_name }}
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('budget_type')" width="350px">
                                    <template #default="scope">
                                        <span>{{ scope.row.budgettype }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('budget_amount')" width="350px">
                                    <template #default="scope">
                                        {{ scope.row.budget_amount }}
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('remark')" width="350px">
                                    <template #default="scope">
                                      {{ scope.row.remark }}
                                    </template>
                                </el-table-column>
                            </el-table>
            </div>  

            <div class="row mt-3"> 
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
           
            <!-- <div class="row">   
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
            </div> -->
        </el-card>        
     </div>  
    </div>
</template>

<script>
import {authApi} from '@/http/authApi'

export default {
    name: 'BudgetEdit',
    data() {
        return {            
            loading: true,             
            FormData: { },           
            budgetDetail: [],
            
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
                api: '/projectmanagement/getprojectbudget',
                params: {
                       id: this.$route.params.id,
                       keyword: '',
                       status: '',                       
                       page: '',
                       limit: ''
                },
                data: {
                    view: false,
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
                api: '/projectmanagement/budgetdetail',
                params: {
                    project_budget_id: this.$route.params.id,      
                    view: 1,            
                },
                data: {
                       
                }
                 
            });
            if(response.status == 200){
               //console.log('bankdd'+ JSON.stringify(response.data.data))               
                this.budgetDetail= response.data.data;
                this.loading= false;
   
            }
        },
          
    } 
}
</script>
