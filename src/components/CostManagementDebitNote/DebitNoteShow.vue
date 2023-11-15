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
                        <label for="total_loan_amount">
                            <small class="text-muted"><b>{{ $t('total_loan_amount') }} : </b></small> 
                        </label>
                        {{ FormData.total_loan_amount }}
                    </div>     
                    <!-- <div class="form-group">
                        <label for="borrower">
                            <small class="text-muted"><b>{{ $t('borrower') }} : </b></small> 
                        </label>
                        {{ FormData.borrower }}
                    </div>  -->
                    <div class="form-group">
                        <label for="borrowing_date">
                            <small class="text-muted"><b>{{ $t('borrowing_date') }} : </b></small> 
                        </label>
                        {{ FormData.borrowing_date }}
                    </div>   
                    <div class="form-group">
                        <label for="payment_status">
                            <small class="text-muted"><b>{{ $t('payment_status') }} : </b></small> 
                        </label>
                        {{ FormData.payment_status }}
                    </div> 
                    
                    <div class="row mx-2">
                            <label for="payment_plan_details">
                                <small class="text-muted"><b>{{ $t('payment_plan_details') }}</b></small>
                            </label>     
                            <!-- start  -->

                            <div class="row mx-2 mb-4" style="width: 100%;">
                                <el-table :data="Detail" border style="width: 100%;">
                                    <el-table-column  fixed type="index" width="55" />
                                    
                                    <el-table-column :label="$t('plan_name')" width="500px"> 
                                        <template #default="scope">
                                            <el-input type="name" :placeholder="$t('please_choose')" v-model="scope.row.plan_name" clearable/>
                                            <!-- <span>{{ scope.row.plan_name }}</span> -->
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('plan_date')" width="500px"> 
                                        <template #default="scope">
                                            <el-input type="date" v-model="scope.row.plan_date" :placeholder="$t('please_enter')" maxlength="100" autosize show-word-limit/>
                                            <!-- <span>{{ scope.row.plan_date }}</span> -->
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('operate')" width="500px">

                                        <template #default="scope">
                                            <small class="text-danger" @click="deletePlanDetail(scope.row.id)"> {{ $t('delete') }} </small>
                                        </template>
                                        
                                    </el-table-column>

                                </el-table>
                            </div>

                            <!-- end -->
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

                    <div class="form-group">
                        <label for="remark">
                            <small class="text-muted"><b>{{ $t('remark') }} : </b></small> 
                        </label>
                        {{ FormData.remark }}
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
     name: 'DebitNoteShow',
     data() {
         return {
             loading: false,             
             FormData: { }, 
             Detail: [], 
             
         }
     },
     
     created(){  
           this.getData(); 
           this.getDetail();   
     },
     methods:{          
        async getData(){   
            this.loading = true;      
            let response = await authApi({
                method: 'POST',
                api: '/costmanagement/get_debit_note',
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
        
        async getDetail(){
            let response = await authApi({
                method: 'GET',
                api: '/costmanagement/debit_note_detail',
                params: {
                    debit_note_id: this.$route.params.id,                       
                }   
            });
            if(response.status == 200){ 
                console.log('de'+ JSON.stringify(response))
                const list1= response.data;
                 this.Detail= list1.map((v,index) => (
                     {...v, id: index}
                    ));
                this.detailCount = this.Detail.length;
                this.loading = false;   
            }
        }, 
      
     }
     
 }
 </script>
 <style lang="scss">

</style>
 