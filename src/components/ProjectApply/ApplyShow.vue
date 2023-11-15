<template>
     <div v-loading="loading" class="loading__div" v-if="loading"></div> 
    <div class="container-fluid" @click="$store.commit('setActive', false)" v-if="!loading">  
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
                            <label for="item_number">
                                <small class="text-muted"><b>{{ $t('span_title') }}</b></small>: 
                            </label>
                            {{ FormData.title }}
                        </div>

                        <div class="col-md-3 m-0 p-0">
                            <div class="form-group mb-3">
                                <label for="date_of_app">
                                    <small class="text-muted"><b>{{ $t('date_of_app') }}</b></small>:
                                </label>
                               {{ FormData.application_date }}
                            </div>
                        </div>
                       
                        <div class="form-group mb-3">
                            <label for="print_file_name">
                                <small class="text-muted"><b>{{ $t ('print_file_name') }}</b></small>: 
                            </label>
                          {{ FormData.print_file_name }}
                        </div>

                        <div class="form-group mb-3">
                            <label for="number_of_copies">
                                <small class="text-muted"><b>{{ $t('number_copies') }}</b></small>:
                            </label>
                          {{ FormData.number_of_copies }}
                        </div>

                        <div class="form-group mb-3">
                            <label for="print">
                                <small class="text-muted"><b>{{ $t('print') }}</b></small>:
                            </label>
                          {{ FormData.printtype }}
                        </div>

                        <div class="form-group mb-3">
                            <label for="seal_type">
                                <small class="text-muted"><b>{{ $t('seal_type') }}</b></small>:
                            </label>
                            {{ FormData.seal_type }}
                        </div>

                        <div class="form-group mb-3">
                            <label for="instruction_in_print">
                                <small class="text-muted"><b>{{ $t('instruction_print') }}</b></small>: 
                            </label>
                            {{ FormData.instructions_in_print }}
                        </div>

                        <div class="row">
                        <div class="col-md-6">
                            <div class="form-group mb-3">
                                <label for="printing_dep">
                                    <small class="text-muted"><b>{{ $t('printing_dep') }}</b></small> : 
                                </label>
                                {{ FormData.printing_department }}
                            </div>
                        </div>
                        </div>
    
                        <div class="form-group mb-3">
                            <label for="remark">
                                <small class="text-muted"><b>{{ $t('remark') }}</b></small>:
                            </label>
                        {{ FormData.remark }}
                        </div>                      
                </div>                       
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
     name: 'ApplyShow',
     data() {
         return {
            loading: false,            
            FormData: {},                     
            
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
                api: '/projectmanagement/getapplicationforprint',
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
                //console.log('apply'+ JSON.stringify(response))      
                this.FormData = response.data.data;                 
                this.loading =false;       
            }          
        }, 
     }     
 }
 </script>
 