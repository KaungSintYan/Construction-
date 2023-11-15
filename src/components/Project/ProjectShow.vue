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
                            <small class="text-muted"><b>{{ $t('project_name') }}</b></small> 
                        </label>
                        {{ FormData.project_name }}
                    </div>  
                    <div class="form-group">
                        <label for="project_code">
                            <small class="text-muted"><b>{{ $t('project_code') }}</b></small> 
                        </label>
                        {{ FormData.project_code }}
                    </div>                   
                    <div class="form-group">
                        <label>
                            <small class="text-muted"><b>{{ $t('types_of_section') }}</b></small>
                        </label>
                        <el-tag type="success"
                        class="mx-1"
                        effect="dark"
                        round
                        >   
                        {{ FormData.section_type }}
                        </el-tag>                        
                    </div> 
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="start_date">
                                    <font-awesome-icon icon="fa-solid fa-calendar" class="icon"/> <small class="text-muted"><b>{{ $t('start_date') }}</b></small>  
                                </label>
                                {{ FormData.start_date }}
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="completion_date">
                                    <font-awesome-icon icon="fa-solid fa-calendar" class="icon"/> <small class="text-muted"><b>{{ $t('completion_date') }}</b></small> 
                                </label>
                                {{ FormData.completion_date }}
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="project_status">
                            <small class="text-muted"><b>{{ $t('project_status') }}</b></small> 
                        </label>                    
                        <el-tag type="success"
                        class="mx-1"
                        effect="dark"
                        round
                        >   
                       {{ FormData.project_status }}
                        </el-tag>      
                    </div>
                    <div class="form-group">
                        <label for="participation_status">
                           <small class="text-muted"><b>{{ $t('participation_status') }}</b></small>
                        </label>   
                        <el-tag type="success"
                        class="mx-1"
                        effect="dark"
                        round
                        >   
                       {{ FormData.participation_status }}
                        </el-tag>   
                    </div>

                    <div class="form-group">
                        <label for="fund_beginning_project">
                            <small class="text-muted"><b>{{ $t('fund_beginning_project') }}</b></small>
                        </label>
                        {{ FormData.fund_begining_projects }}
                    </div>
                    <div class="form-group">
                        <label for="fund_of_material">
                            <small class="text-muted"><b>{{ $t('fund_of_material') }}</b></small>
                        </label>
                        {{ FormData.fund_of_material }}
                    </div>

                    <div class="form-group">
                        <label for="construction_unit">
                            <small class="text-muted"><b>{{ $t('construction_unit') }}</b></small>
                        </label>
                        <el-tag type="success"
                        class="mx-1"
                        effect="dark"
                        round
                        >   
                       {{ FormData.construction_unit }}
                        </el-tag> 
                       
                    </div>

                    <div class="form-group">
                        <label for="construction_address">
                            <small class="text-muted"><b>{{ $t('construction_address') }}</b></small>
                        </label>
                    {{ FormData.construction_address }}
                    </div>

                    <div class="form-group">
                        <label for="project_overview">
                            <small class="text-muted"><b>{{ $t('project_overview') }}</b></small> 
                        </label>
                        {{ FormData.project_overview }}
                    </div>

                    <div class="form-group mb-5">
                        <label for="remark">
                            <small class="text-muted"><b>{{ $t('remark') }}</b></small>
                        </label>
                        {{ FormData.remark }}
                    </div>
                        
                </div>                       
            </div>
            <div class="row"> 
                <label for="remark">
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
                        <small class="text-muted ml-2"><b>{{ $t('project_manager') }}</b></small>
                </label>                   
                <div class="col-12">                 
                    <span v-for="user of FormData.project_manager">  <font-awesome-icon icon="fa-solid fa-user" class="icon"/> {{ user }}</span>
                </div>  
            </div>
            <div class="row">   
                <label for="remark">
                        <small class="text-muted ml-2"><b>{{ $t('project_member') }}</b></small>
                </label>                   
                <div class="col-12">                 
                    <span v-for="user of FormData.project_member">  <font-awesome-icon icon="fa-solid fa-user" class="icon"/> {{ user }}</span>
                </div>  
            </div>
        </el-card>        
     </div>  
    </div>
 </template>
 <script>
 import {authApi} from '@/http/authApi'

 export default {
     name: 'ProjectShow',
     data() {
         return {
             loading: false,             
             FormData: { },  
             
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
                api: '/projectmanagement/getproject',
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
                console.log('list'+ JSON.stringify(response));
                this.FormData = response.data.data;                       
                this.loading = false;       
                         
            }          
        },     
      
     }
     
 }
 </script>
 <style lang="scss">

</style>
 