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
                    <div class="form-group">
                        <label for="repayer">
                            <small class="text-muted"><b>{{ $t('repayer') }} : </b></small> 
                        </label>
                        {{ FormData.repayer }}
                    </div> 
                    <div class="form-group">
                        <label for="repayment_date">
                            <small class="text-muted"><b>{{ $t('repayment_date') }} : </b></small> 
                        </label>
                        {{ FormData.repayment_date }}
                    </div>  
                    <div class="form-group">
                        <label for="total_repayment_amount">
                            <small class="text-muted"><b>{{ $t('total_repayment_amount') }} : </b></small> 
                        </label>
                        {{ FormData.total_payment_amount }}
                    </div>  
                    <div class="form-group">
                        <label for="ordinary_repayment_amount">
                            <small class="text-muted"><b>{{ $t('ordinary_repayment_amount') }} : </b></small> 
                        </label>
                        {{ FormData.ordinary_repayment_amount }}
                    </div> 
                    <div class="form-group">
                        <label for="reimbursement_offset_amt">
                            <small class="text-muted"><b>{{ $t('reimbursement_offset_amt') }} : </b></small> 
                        </label>
                        {{ FormData.reimbursement_offset_amount }}
                    </div>  
                    
                    <div class="row mx-2">
                            <label for="payment_plan_details">
                                <small class="text-muted"><b>{{ $t('offset_details') }}</b></small>
                            </label>     
                            <div class="row mx-2 mb-4">
                                <el-table :data="Detail" border style="width: 100%;">
                                    <el-table-column  fixed type="index" width="55" />
                                    
                                    <el-table-column :label="$t('reimbursement')" width="300px"> 
                                        <template #default="scope">
                                            <el-input type="text" :placeholder="$t('please_choose')"
                                                 v-model="scope.row.reimbursement_id"
                                                 class="" readonly clearable/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('total_reimbursement_amount')" width="300px"> 
                                        <template #default="scope">
                                            <el-input type="text" :placeholder="$t('please_choose')"
                                                v-model="scope.row.reimbursement_amount"
                                                class="" readonly clearable/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('amt_can_offset')" width="300px"> 
                                        <template #default="scope">
                                            <el-input type="text" placeholder="" class="" readonly clearable/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('offset_amt')" width="300px"> 
                                        <template #default="scope">
                                            <el-input type="text" placeholder="" class="" v-model="scope.row.offset_amount" clearable/> 
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('operate')" width="300px">

                                        <template #default="scope">
                                            <!-- <small class="text-danger" @click="deleteMaterial(scope.row.reimbursement_id)"> {{ $t('delete') }} </small> -->
                                            <small class="text-danger" @click="deleteMaterial(scope.row.id)"> {{ $t('delete') }} </small>
                                        </template>
                                        
                                    </el-table-column>
                                </el-table>
                            </div>
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

                <div class="form-group mb-5">
                    <label for="remark">
                        <small class="text-muted"><b>{{ $t('remark') }}</b></small>
                    </label>
                    {{ FormData.remark }}
                </div>
                        
                </div>                       
            </div>
            <div class="row"> 
                <label for="picture">
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
                <label for="appendix">
                        <small class="text-muted ml-2"><b>{{ $t('appendix') }}</b></small>
                </label>                   
                <div class="col-12">
                    <a :href="doc.url" target="_blank" v-for="doc of FormData.appendix.documents">
                        <img class="img__thumbnail" src="../../assets/images/file-icon.jpg" alt="" style="width: 60px;" >
                    </a>
                </div>  
            </div>
           
            <div class="row">   
                <label for="approver">
                        <small class="text-muted ml-2"><b>{{ $t('approver') }}</b></small>
                </label>                   
                <div class="col-12">                 
                    <span v-for="user of FormData.approver">  <font-awesome-icon icon="fa-solid fa-user" class="icon"/> {{ user }}</span>
                </div>  
            </div>
            <div class="row">   
                <label for="cc">
                        <small class="text-muted ml-2"><b>{{ $t('cc') }}</b></small>
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
     name: 'RepaymentNoteShow',
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
                api: '/costmanagement/get_repayment_note',
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
                api: '/costmanagement/offset_detail',
                params: {
                    repayment_note_id: this.$route.params.id,                       
                }   
            });
            if(response.status == 200){ 
               console.log('de'+ JSON.stringify(response.data))
                const list1= response.data;
                this.Detail= list1.map((v,index) => (
                     {...v, id: index,
                        reimbursement_name: "",
                        reimbursement_amount: "",
                       }
                    ));
                this.detailCount = this.Detail.length;
                this.getReimbursement(this.Detail);
               
            }
        },
      
     }
     
 }
 </script>
 <style lang="scss">

</style>
 