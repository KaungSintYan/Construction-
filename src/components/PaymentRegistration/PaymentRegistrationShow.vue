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
                                 <label for="payment_type">
                                     <small class="text-muted"><b>{{ $t('payment_type') }}</b></small> :
                                 </label>
                                {{ FormData.payment_type }}
                             </div>
                         </div>  
                         
                         <div class="col-md-3 m-0 p-0">
                             <div class="form-group mb-3">
                                 <label for="payment_request">
                                     <small class="text-muted"><b>{{ $t('payment_request') }}</b></small> :
                                 </label>
                                {{ FormData.payment_request_id }}
                             </div>
                         </div> 
 
                         <div class="col-md-3 m-0 p-0">
                             <div class="form-group mb-3">
                                 <label for="spending_contract">
                                     <small class="text-muted"><b>{{ $t('spending_contract') }}</b></small> :
                                 </label>
                                {{ FormData.spending_contract_id }}
                             </div>
                         </div> 
 
                         <div class="col-md-3 m-0 p-0">
                             <div class="form-group mb-3">
                                 <label for="contract_party">
                                     <small class="text-muted"><b>{{ $t('contract_party') }}</b></small> :
                                 </label>
                                {{ FormData.supplier_id }}
                             </div>
                         </div> 

                         <!-- <div class="col-md-3 m-0 p-0">
                             <div class="form-group mb-3">
                                 <label for="payment_method">
                                     <small class="text-muted"><b>{{ $t('payment_method') }}</b></small> :
                                 </label>
                                {{ FormData.payment_method_id }}
                             </div>
                         </div> 

                         <div class="col-md-3 m-0 p-0">
                             <div class="form-group mb-3">
                                 <label for="whether_enable_prepayment_offset">
                                     <small class="text-muted"><b>{{ $t('whether_enable_prepayment_offset') }}</b></small> :
                                 </label>
                                {{ FormData.isprepay_offset }}
                             </div>
                         </div>  -->

                         <div class="col-md-3 m-0 p-0">
                             <div class="form-group mb-3">
                                 <label for="payment_amount">
                                     <small class="text-muted"><b>{{ $t('payment_amount') }}</b></small> :
                                 </label>
                                {{ FormData.amount }}
                             </div>
                         </div> 

                         <div class="col-md-3 m-0 p-0">
                             <div class="form-group mb-3">
                                 <label for="requested_amount">
                                     <small class="text-muted"><b>{{ $t('requested_amount') }}</b></small> :
                                 </label>
                                {{ FormData.requested_amount }}
                             </div>
                         </div>

                         <!-- <div class="col-md-3 m-0 p-0">
                             <div class="form-group mb-3">
                                 <label for="prepayment_offset_amount">
                                     <small class="text-muted"><b>{{ $t('prepayment_offset_amount') }}</b></small> :
                                 </label>
                                {{ FormData.prepayment_amount }}
                             </div>
                         </div> 

                         <div class="col-md-3 m-0 p-0">
                             <div class="form-group mb-3">
                                 <label for="actual_payment_amount">
                                     <small class="text-muted"><b>{{ $t('actual_payment_amount') }}</b></small> :
                                 </label>
                                {{ FormData.actual_amount }}
                             </div>
                         </div>  -->

                         <div class="row mx-2 mb-4">
                            <label for="">
                                <span class="text-danger">*</span> <small><b>{{ $t('purchase_requisition') }}</b></small>  
                            </label>
                            <el-table :data="Detail" border style="width: 100%;">
                                <el-table-column  fixed type="index" width="55" />
                                
                                <el-table-column :label="$t('purchase_requisition')" width="370px"> 
                                    <template #default="scope">
                                        <el-input type="text" :placeholder="$t('please_enter')"  v-model="scope.row.purchase_requisition_name" disabled />
                                    </template>
                                </el-table-column>

                                <el-table-column :label="$t('amount')" width="370px"> 
                                    <template #default="scope">
                                        <el-input type="number" :placeholder="$t('please_enter')"  v-model="scope.row.amount" clearable disabled/>
                                    </template>
                                </el-table-column>

                                <el-table-column :label="$t('remark')" width="370px"> 
                                    <template #default="scope">
                                        <el-input type="textarea" :placeholder="$t('please_enter')"  v-model="scope.row.remark" autosize maxlength="100" show-word-limit clearable disabled/>
                                    </template>
                                </el-table-column>

                                <el-table-column fixed="right" :label="$t('operate')" width="250px">

                                    <template #default="scope">
                                        <small class="text-danger" @click="deletePurchase(scope.row.id)"> {{ $t('delete') }} </small>
                                    </template>
                                    
                                </el-table-column>
                                
                            </el-table>
                        </div>

                        <div class="col-md-3 m-0 p-0">
                             <div class="form-group mb-3">
                                 <label for="payment_date">
                                     <small class="text-muted"><b>{{ $t('payment_date') }}</b></small> :
                                 </label>
                                {{ FormData.creation_date }}
                             </div>
                         </div>

                         <div class="col-md-3 m-0 p-0">
                             <div class="form-group mb-3">
                                 <label for="category_of_expenditure">
                                     <small class="text-muted"><b>{{ $t('category_of_expenditure') }}</b></small> :
                                 </label>
                                {{ FormData.category_of_expenditure_id }}
                             </div>
                         </div>

                         <div class="col-md-3 m-0 p-0">
                             <div class="form-group mb-3">
                                 <label for="bank">
                                     <small class="text-muted"><b>{{ $t('bank') }}</b></small> :
                                 </label>
                                {{ FormData.bank_name }}
                             </div>
                         </div>

                         <!-- <div class="col-md-3 m-0 p-0">
                             <div class="form-group mb-3">
                                 <label for="account_name">
                                     <small class="text-muted"><b>{{ $t('account_name') }}</b></small> :
                                 </label>
                                {{ FormData.bank_account }}
                             </div>
                         </div> -->

                         <div class="col-md-3 m-0 p-0">
                             <div class="form-group mb-3">
                                 <label for="bank_card_number">
                                     <small class="text-muted"><b>{{ $t('bank_card_number') }}</b></small> :
                                 </label>
                                {{ FormData.bank_card_number }}
                             </div>
                         </div>
 
                         <div class="col-md-3 m-0 p-0">
                             <div class="form-group mb-3">
                                 <label for="remark">
                                     <small class="text-muted"><b>{{ $t('remark') }}</b></small> :
                                 </label>
                                {{ FormData.remark }}
                             </div>
                         </div>
                     
                     </div>                       
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
                     <label for="appendix">
                             <small class="text-muted ml-2"><b>{{ $t('appendix') }}</b></small>
                     </label>                   
                     <div class="col-12">
                         <a :href="doc.url" target="_blank" v-for="doc of FormData.appendix.documents">
                             <img class="img__thumbnail" src="../../assets/images/file-icon.jpg" alt="" style="width: 60px;" >
                         </a>
                     </div>  
                 </div>            
                 <!-- <div class="row">   
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
                 </div> -->
             </el-card>        
             </div>   
     </div>
  
  </template>
  <script>
  import {authApi} from '@/http/authApi'
 
  export default {
      name: 'PaymentRegistrationShow',
      data() {
          return {
              loading: false,  
              Detail: [],           
              FormData: { },  
              
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
                 api: '/financialmanagement/get_payment_registration',
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

         async getPurchase(){ 
            let response = await authApi({
                method: 'POST',
                api: '/materialmanagement/get_purchase_order',
                params: {
                       id: '',
                       keyword: '',             
                       page: '',
                       limit: ''
                }   
            });
            if(response.status == 200){
                this.purchase = response.data.data;
                this.total = response.data.total; 
                
                this.loading = false;    
            }
        },
       
        addPurchase() { 
            this.selectedPurchaseOrder.forEach((val, index)=>{
                        let detail= {     
                            detail_id: null,                 
                            purchase_order_id: val.purchase_order_id,
                            amount: "",
                            remark: "",
                        }   
                        let order = this.Detail.find((x=> x.purchase_order_id == val.purchase_order_id));
                        if(order == undefined){
                            this.Detail.push(detail);  
                        }                     
            });               
            this.purchaseOrderDialogVisible = false;

        },
         
         async getDetail(){            
            let response = await authApi({
                method: 'GET',
                api: '/financialmanagement/payment_registration_detail',
                params: {
                    payment_registeration_id: this.$route.params.id,                      
                }   
            });
            if(response.status == 200){
                this.Detail = response.data.data;   
            }
            
        },
       
      }
      
  }
  </script>
  <style lang="scss">
 
 </style>
  
 
 