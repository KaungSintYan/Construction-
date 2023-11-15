<template>
    <div v-loading="loading" class="loading__div" v-if="loading"></div> 
     <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading">  
        
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
                                 <label for="margin">
                                     <small class="text-muted"><b>{{ $t('margin') }}</b></small> :
                                 </label>
                                {{ FormData.margin_type }}
                             </div>
                         </div>  

                         <div class="col-md-3 m-0 p-0">
                             <div class="form-group mb-3">
                                 <label for="odd_number">
                                     <small class="text-muted"><b>{{ $t('odd_number') }}</b></small> :
                                 </label>
                                {{ FormData.odd_number }}
                             </div>
                         </div>  
                        
                         <div class="col-md-3 m-0 p-0">
                             <div class="form-group mb-3">
                                 <label for="refund_amt">
                                     <small class="text-muted"><b>{{ $t('refund_amt') }}</b></small> :
                                 </label>
                                {{ FormData.margin_amount }}
                             </div>
                         </div> 
 
                         <div class="col-md-3 m-0 p-0">
                             <div class="form-group mb-3">
                                 <label for="return_date">
                                     <small class="text-muted"><b>{{ $t('return_date') }}</b></small> :
                                 </label>
                                {{ FormData.return_date }}
                             </div>
                         </div> 

                         <div class="form-group mb-5">
                             <label for="remark">
                                 <small class="text-muted"><b>{{ $t('remark') }}</b></small> : 
                             </label>
                             {{ FormData.remark }}
                         </div>   
 
                         <!-- start  -->
 
                         <!-- <div class="row mx-2 mb-4">
                                <label for="">
                                    <span class="text-danger">*</span> <small><b> {{ $t('details_of_expenditure') }} </b></small>     
                                </label>
                                    <el-table :data="Detail" border style="width: 100%;">
                                        <el-table-column  fixed type="index" width="55" />
                                        
                                        <el-table-column :label="$t('amount_with_tax')" width="250px"> 
                                            <template #default="scope">
                                                <el-input type="number" :placeholder="$t('please_enter')"  v-model="scope.row.amount_with_tax" clearable />
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('amount_without_tax')" width="250px"> 
                                            <template #default="scope">
                                                <el-input type="number" :placeholder="$t('please_enter')"  v-model="scope.row.amount_without_tax" clearable />
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('tax_rate')" width="250px"> 
                                            <template #default="scope">
                                                <el-input type="number" :placeholder="$t('please_enter')"  v-model="scope.row.tax_rate" clearable />
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('tax')" width="250px"> 
                                            <template #default="scope">
                                                <el-input type="number" :placeholder="$t('please_enter')"  v-model="scope.row.tax" clearable />
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('remark')" width="250px"> 
                                            <template #default="scope">
                                                <el-input v-model="scope.row.remark" type="textarea" autosize :placeholder="$t('please_enter')"  maxlength="100" show-word-limit />
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('operate')" width="250px">

                                            <template #default="scope">
                                                <small class="text-danger" @click="deleteDetail(scope.row.id)"> {{ $t('delete') }} </small>
                                            </template>
                                            
                                        </el-table-column>
                                        
                                    </el-table>
                                </div> -->
 
                         <!-- end -->
                            
                     </div>                       
                 </div>
                 <!-- <div class="row mx-2">
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
 
                                     <el-table-column label="Plan Amount"> 
                                         <template #default="scope">
                                            <span>{{ scope.row.plan_amount }}</span>
                                         </template>
                                     </el-table-column>
 
                                     <el-table-column :label="$t('plan_unit_price')"> 
                                         <template #default="scope">
                                           <span>{{scope.row.price_per_unit}}</span>
                                         </template>
                                     </el-table-column>
 
                                     <el-table-column :label="$t('remark')" width="200px"> 
                                         <template #default="scope">
                                            <p>{{ scope.row.remark }}</p>
                                         </template>
                                     </el-table-column>
                                 </el-table>
                 </div>            -->
                 <div class="row" v-if="FormData.picture != null"> 
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
                 <div class="row" v-if="FormData.appendix != null">   
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
                         <span v-for="user of FormData.approver" class="pr-2">  <font-awesome-icon icon="fa-solid fa-user" class="icon"/> {{ user }}</span>
                     </div>  
                 </div>
                 <div class="row">   
                     <label for="cc">
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
      name: 'SecurityDepositRefundShow',
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
                 api: '/financialmanagement/get_security_deposit_refund',
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
                          
             }          
         },     
       
      }
      
  }
  </script>
 
  
 
 