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
                            <small class="text-muted"><b>{{ $t('project') }} : </b></small> 
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
                        <label for="total_reimbursement_amount">
                            <small class="text-muted"><b>{{ $t('total_reimbursement_amount') }} : </b></small> 
                        </label>
                        {{ FormData.total_reimbursement_amount }}
                    </div>     
                    <!-- <div class="form-group">
                        <label for="reimburser">
                            <small class="text-muted"><b>{{ $t('reimburser') }} : </b></small> 
                        </label>
                        {{ FormData.reimburser }}
                    </div>  -->
                    <div class="form-group">
                        <label for="reimbursement_date">
                            <small class="text-muted"><b>{{ $t('reimbursement_date') }} : </b></small> 
                        </label>
                        {{ FormData.reimbursement_date }}
                    </div>   
                    <div class="form-group">
                        <label for="payment_status">
                            <small class="text-muted"><b>{{ $t('payment_status') }} : </b></small> 
                        </label>
                        {{ FormData.payment_status }}
                    </div> 
                    <div class="form-group">
                        <label for="offset_loan_amount">
                            <small class="text-muted"><b>{{ $t('offset_loan_amount') }} : </b></small> 
                        </label>
                        {{ FormData.offset_loan_amount }}
                    </div>
                    <div class="form-group">
                        <label for="amount_of_offset_against_reserve_fund">
                            <small class="text-muted"><b>{{ $t('amount_of_offset_against_reserve_fund') }} : </b></small> 
                        </label>
                        {{ FormData.amt_offset_against_reserve_fund }}
                    </div>
                    <!-- <div class="form-group">
                        <label for="reimbursement_balance">
                            <small class="text-muted"><b>{{ $t('reimbursement_balance') }} : </b></small> 
                        </label>
                        {{ FormData.total_reimbursement_amount }}
                    </div>  -->
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
                        {{ FormData.card_number }}
                    </div>
                    
                    <div class="row mx-2">
                        <label for="reimbursement_details">
                            <span class="text-danger">*</span> <small><b>{{ $t('reimbursement_details') }}</b></small>
                        </label>    
                            <!-- start  -->

                            <div class="row mx-2 mb-4">
                                <el-table :data="Detail" border style="width: 100%;">
                                    <el-table-column  fixed type="index" width="55" />
                                    
                                    <el-table-column :label="$t('reimbursement_amt')" width="300px"> 
                                        <template #default="scope">
                                            <el-input v-model="scope.row.reimbursement_amount" type="number" :placeholder="$t('please_enter')" clearable />
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('category_of_expenditure')" width="300px"> 
                                        <template #default="scope">
                                            <el-select class="" style="width: 100%;" v-model="scope.row.expenditure_category">
                                                <el-option value="">{{ $t('please_choose') }}</el-option>
                                                <el-option v-for="obj of expenditure_category" :key="obj.expenditure_category_id" :value="obj.expenditure_category_id">{{ obj.name }}</el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('fee_description')" width="300px"> 
                                        <template #default="scope">
                                            <el-input v-model="scope.row.fee_description" type="textarea" :placeholder="$t('please_enter')" maxlength="100" autosize show-word-limit />
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('invoice_amt')" width="300px"> 
                                        <template #default="scope">
                                            <el-input v-model="scope.row.invoice_amount" type="number" :placeholder="$t('please_enter')" clearable />
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('operate')" width="300px">

                                        <template #default="scope">
                                            <!-- <a href="#"><small>{{ $t('delete') }}</small> </a> -->
                                            <small class="text-danger"  @click="deleteMaterial(scope.row.id)"> {{ $t('delete') }} </small>
                                        </template>
                                        
                                    </el-table-column>
                                </el-table>
                            </div>

                            <!-- end -->
                    </div> 
                    
                    <div class="form-group">
                        <label for="whether_to_offset">
                            <small class="text-muted"><b>{{ $t('whether_to_offset') }} : </b></small> 
                        </label>
                        {{ FormData.isoffset }}
                    </div>

                    <div class="form-group">
                        <label for="offset_type">
                            <small class="text-muted"><b>{{ $t('offset_type') }} : </b></small> 
                        </label>
                        {{ FormData.offset_type }}
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

                    <div class="form-group">
                        <label for="remark">
                            <small class="text-muted"><b>{{ $t('remark') }} : </b></small> 
                        </label>
                        {{ FormData.remark }}
                    </div> 
                        
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
     name: 'ReimbursementShow',
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
                api: '/costmanagement/get_reimbursement',
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
                api: '/costmanagement/reimbursement_detail',
                params: {
                    reimbursement_id: this.$route.params.id,                       
                }   
            });
            if(response.status == 200){ 
               console.log('de'+ JSON.stringify(response.data))
                const list1= response.data;
                this.Detail= list1.map((v,index) => (
                     {...v, id: index }
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
 