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
                        <label for="title">
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
                    <div class="form-group">
                        <label for="receipt_amt">
                            <small class="text-muted"><b>{{ $t('receipt_amount') }} : </b></small> 
                        </label>
                        {{ FormData.receipt_amount }}
                    </div>     
                    <div class="form-group">
                        <label for="refund_amount">
                            <small class="text-muted"><b>{{ $t('refund_amount') }} : </b></small> 
                        </label>
                        {{ FormData.refund_amount }}
                    </div>   
                    <div class="form-group">
                        <label for="type">
                            <small class="text-muted"><b>{{ $t('type') }} : </b></small> 
                        </label>
                        {{ FormData.type }}
                    </div>      
                    <div class="form-group">
                        <label for="recipient">
                            <small class="text-muted"><b>{{ $t('recipient') }} : </b></small> 
                        </label>
                        {{ FormData.recipient }}
                    </div>
                            
                    <!-- <div class="form-group">
                        <label>
                            <small class="text-muted"><b>{{ $t('title_bd') }}</b></small>
                        </label>
                        <el-tag type="success"
                        class="mx-1"
                        effect="dark"
                        round
                        >   
                        {{ FormData.title }}
                        </el-tag>                        
                    </div>  -->
                    
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="pick_up_date">
                                    <font-awesome-icon icon="fa-solid fa-calendar" class="icon"/> <small class="text-muted"><b>{{ $t('pick_up_date') }} : </b></small>  
                                </label>
                                {{ FormData.pick_up_date }}
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="bank">
                            <small class="text-muted"><b>{{ $t('bank') }} : </b></small> 
                        </label>
                        {{ FormData.bank_name }}
                    </div> 

                    <div class="form-group">
                        <label for="account_name">
                            <small class="text-muted"><b>{{ $t('account_name') }} : </b></small> 
                        </label>
                        {{ FormData.acc_name }}
                    </div> 

                    <div class="form-group">
                        <label for="bank_card_number">
                            <small class="text-muted"><b>{{ $t('bank_card_number') }} : </b></small> 
                        </label>
                        {{ FormData.acc_number }}
                    </div> 

                    <div class="form-group">
                        <label for="remark">
                            <small class="text-muted"><b>{{ $t('remark') }} : </b></small> 
                        </label>
                        {{ FormData.remark }}
                    </div> 

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

                    <!-- <div class="form-group">
                        <label for="team_leader">
                            <small class="text-muted"><b>{{ $t('team_leader') }}</b></small> 
                        </label>
                        {{ FormData.username }}
                    </div>  -->
                        
                </div>                       
            </div>
            <div class="row"> 
                <label for="picture">
                        <small class="text-muted ml-2"><b>{{ $t('picture') }} : </b></small>
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
                <label for="appendix">
                        <small class="text-muted ml-2"><b>{{ $t('appendix') }} : </b></small>
                </label>                   
                <div class="col-12">
                    <a :href="doc.url" target="_blank" v-for="doc of FormData.appendix.documents">
                        <img class="img__thumbnail" src="../../assets/images/file-icon.jpg" alt="" style="width: 60px;" >
                    </a>
                </div>  
            </div>
           
            <div class="row">   
                <label for="approver">
                        <small class="text-muted ml-2"><b>{{ $t('approver') }} : </b></small>
                </label>                   
                <div class="col-12">                 
                    <span v-for="user of FormData.approver">  <font-awesome-icon icon="fa-solid fa-user" class="icon"/> {{ user }}</span>
                </div>  
            </div>
            <div class="row">   
                <label for="cc">
                        <small class="text-muted ml-2"><b>{{ $t('cc') }} : </b></small>
                </label>                   
                <div class="col-12">                 
                    <span v-for="user of FormData.cc">  <font-awesome-icon icon="fa-solid fa-user" class="icon"/> {{ user }}</span>
                </div>  
            </div>
        </el-card>        
     </div>  
    </div>
 </template>
 <script>
 import {authApi} from '@/http/authApi'

 export default {
     name: 'ReserveFundShow',
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
                api: '/costmanagement/get_reserve_fund',
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
 