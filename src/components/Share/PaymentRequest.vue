<template>   
    <div class="form-group mb-3">        
            <label for="payment_request">
                <span class="text-danger">*</span> <small><b> {{ $t('payment_request') }} </b></small> 
            </label>                     
            <el-input type="text" :placeholder="$t('please_enter')"
            v-model="title"  @click="showModel()" clearable />
            <el-alert class="mt-2" title="please choose project" type="warning" v-if="showError" :closable="false" />
    </div> 
               
    <el-dialog v-model="dialogVisible" :title="$t('payment_request')" width="60%" draggable>
        <div class="container-fluid">
            <div class="row mx-2 mb-4">
                <div class="row">
                    <div class="form-group">         
                        <label for="state">
                            <small><b>{{ $t('payment_status') }}</b></small>
                        </label>
                        <div class="form-group">
                            <el-select class="" style="width: 100%;" v-model="payment_status" :placeholder="$t('please_choose')"  v-on:change="getPaymentRequestData()">                    
                                <el-option v-for="(app, i) in payment" :key="i" :value="app.key"> {{ app.value }}</el-option>                                      
                            </el-select>
                        </div>                  
                    </div>
                </div>    
                <el-table :data="paymentRequestData" height="400" border style="width: 100%;"  @row-click="handleSelectionChange">
                    <el-table-column fixed label="" width="60" >
                        <template #default="scope">
                            <el-radio-group v-model="selected_id" class="ml-4">
                                <el-radio :label="scope.row.payment_request_id" size="large">{{ selected_name }}</el-radio>                                  
                              </el-radio-group>                              
                        </template>
                    </el-table-column>
                    <el-table-column prop="approve_status" :label="$t('approval_status')" width="200" />
                    <el-table-column prop="project_id" :label="$t('project')" width="200" sortable />
                    <el-table-column prop="title" :label="$t('title_bd')" width="200" sortable />
                    <el-table-column prop="odd_number" :label="$t('odd_number')" width="200" sortable />
                    <!-- <el-table-column prop="" :label="$t('payment_contract')" width="200" sortable /> -->
                    <el-table-column prop="payment_status" :label="$t('payment_status')" width="200" sortable />
                    <el-table-column prop="amount" :label="$t('application_amount')" width="200" sortable />
                    <!-- <el-table-column prop="amount_for_app" :label="$t('amt_paid_for_this_app')" width="330" sortable /> -->
                    <!-- <el-table-column prop="amount_in_app" :label="$t('amt_in_this_app_payment')" width="300" sortable /> -->
                    <el-table-column prop="payment_source" :label="$t('payment_source')" width="200" sortable /> 
                    <el-table-column prop="request_date" :label="$t('requested_payment_date')" width="300" sortable />         
                    <!-- <el-table-column prop="application_date" :label="$t('date_of_app')" width="200" sortable /> -->
                    <!-- <el-table-column prop="" :label="$t('beneficiary')" width="200" sortable /> -->
                    <!-- <el-table-column prop="payment_method_id" :label="$t('payment_method')" width="200" sortable /> -->
                    <el-table-column prop="category_of_expenditure_id" :label="$t('category_of_expenditure')" width="250" sortable />
                    <el-table-column prop="created_by_user" :label="$t('created_by_user')" width="200" sortable />
                    <el-table-column prop="creation_time" :label="$t('creation_time')" width="200" /> 
                </el-table>
            </div>
            <div class="row"> 
                                   
                <div class="col-sm-12 d-flex justify-content-end">
                <el-pagination
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    :page-sizes="[20, 100, 200, 300]"
                    :small="small"
                    :disabled="disabled"
                    :background="background"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    />                    
                </div>
            </div>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">{{ $t('cancel') }}</el-button>
            <el-button type="primary" @click="selectPaymentRequestName" >{{ $t('sure') }}</el-button>           
          </span>
        </template>
    </el-dialog>     
<!-- project create -->
<!-- <div class="modal fade" id="PaymentRequestModal" tabindex="-1" aria-labelledby="myLargeModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="text-center" v-if="loading">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
        </div>
      <div class="modal-content" style="width: 1050px;"  v-if="!loading">        
        <div class="modal-header" style="height:150px;">
          <div class="column" style="width:100%;">
            <div class="row pl-3 pr-3">
              <h5 class="modal-title" id="exampleModalLongTitle"> <b>{{ $t('project') }}</b> </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="mt-3 row p-2">
              <input type="text" class="form-control model-input" :placeholder="$t('enter_keyword')">
              <button class="btn btn-info ml-2"><small>{{ $t('search') }}</small></button>
              <a href="#" class="ml-2 mt-2"> <small>{{ $t('advanced_search') }}</small>  </a>
          </div>  
          </div>       
          
        </div>
        <div class="modal-body">        
          <table class="table table-hover mt-3 table_main_box" cellspacing="0" cellpadding="0">
              <thead>
                <tr>
                  <th scope="col" rowspan="1" colspan="1" class="table-box">
                    #
                  </th>
                  <th scope="col" rowspan="1" colspan="1" class="table-box">
                      {{ $t('name') }}
                      <span class="caret-wrapper ml-2">
                          <i class="fa-solid fa-sort-up text-secondary fa-sm"></i>
                          <i class="fa-solid fa-sort-down text-secondary fa-sm"></i>
                      </span>  
                  </th>
                  <th scope="col" rowspan="1" colspan="1" class="table-box">
                      {{ $t('state') }}
                      <span class="caret-wrapper ml-2">
                          <i class="fa-solid fa-sort-up text-secondary fa-sm"></i>
                          <i class="fa-solid fa-sort-down text-secondary fa-sm"></i>
                      </span>
                  </th>
                 
                </tr>
              </thead>
              <tbody>
                <tr v-for="project of paymentRequestData" :key="project.payment_request_id">
                  <th scope="row">
                      <input type="radio"  @click="checkOne(project.payment_request_id)">
                  </th>
                  <td class="table-box">
                      <span class="filed_boxepaymentRequestData">
                         {{project.title}}
                      </span>                    
                  </td>
                  <td class="table-box">
                      <span class="filed_box">
                          {{project.archive_status}}
                      </span>
                  </td>               
                </tr>
              </tbody>
            </table>
            <div class="row justify-content-end">
              <p class="mr-3 mt-1">{{ $t('common') }} 3 {{ $t('strip') }}</p>
                  <div class="form-group mr-3">
                    <el-select class="" style="width: 100%;" id="exampleFormControlSelect1">
                        <el-option> 20 items/page</el-option>
                        <el-option> 50 items/page</el-option>
                        <el-option> 100 items/page</el-option>
                        <el-option value=""></el-option>
                    </el-select>          
                  </div>
                  <nav aria-label="Page navigation example">
                          <ul class="pagination">
                              <li class="page-item">
                              <button type="button" class="page-link"  @click="previous()" :disabled="pageCountActive == 1">                         
                                  <span aria-hidden="true">&laquo;</span>
                                  <span class="sr-only">Previous</span>
                              </button>                           
                              </li>
                              <li v-for="(pageCount) of pageCount" :key="pageCount" @click="getWorkType(pageCount)">
                                  <span class="page-link" :class="{ active : pageCountActive == pageCount}"> {{ pageCount }}</span>
                              </li>                            
                              <li class="page-item">
                              <button type="button" class="page-link" @click="next()" :disabled="pageCountActive == pageCount">                           
                                  <span aria-hidden="true">&raquo;</span>
                                  <span class="sr-only">Next</span>
                              </button>  
                              </li>
                          </ul>
                  </nav>
                  <div class="mr-3 ml-2 row">
                      <p class="pt-1 mr-2">{{ $t('go_to') }}</p>
                      <input type="text" class="form-control footer-input" value="1">
                      <p class="pt-1 ml-2">{{ $t('page') }}</p>
                  </div>
            </div>  
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t('cancel') }}</button>
          <button type="button" class="btn btn-primary"  @click="selectPaymentRequestName" >{{ $t('sure') }}</button>
        </div>
      </div>
    </div>
</div> -->
<!-- end -->
</template>
<script>
import {authApi} from '@/http/authApi'
export default {    
      props: ['oldPaymentRequestId', 'projectId'],
      data() {
        return {
             dialogVisible: false,
             loading: true,            
             payment_request_id: "",
             title: "",
             paymentRequestData: [],  
             selected_id: "", 
             selected_name: "",   
             background: false,
             disabled: false,
             small: false,
             pageSize: 20,   
             currentPage: 1,  
             total: 0,  
             showError: false, 
             payment_status: "unpaid",
             payment: [                
                {key: 'unpaid', value: 'Upaid'},
                {key: 'partially_payment', value: 'Partially Payment'},
            ],           
        }
      },
     emits :{
        paymentRequestData: null, 
    },
    created() {
      this.getPaymentRequestData();      
    },     
    methods: {
        showModel(){
            if(this.projectId != null && this.projectId != undefined && this.projectId != ""){
               this.dialogVisible = true; 
               this.getPaymentRequestData();
               this.showError = false;               
            }
            else{
                this.showError = true;
            }            
        },
        async getPaymentRequestData(){                    
            let response = await authApi({
                method: 'POST',
                api: '/financialmanagement/get_payment_request',
                params: {
                       id: '',
                       keyword: '',                                       
                       page: this.currentPage,
                       limit: this.pageSize,
                },
                data: {
                    project_id: this.projectId,
                    approve_status: "approved",
                    payment_status: this.payment_status,
                }   
            });
            if(response.status == 200){      
                this.paymentRequestData = response.data.data;
                this.total = response.data.total; 
                if(this.paymentRequestData != null){
                    this.paymentRequestData.forEach((value)=> {
                        if(value.payment_request_id == this.oldPaymentRequestId){
                            this.title = value.title;
                        }
                    });
                }                    
                this.loading = false;              
            }          
        }, 
         selectPaymentRequestName(){
            if(this.selected_id != null && this.selected_id != undefined && this.selected_id != ""){    
                this.title = this.paymentRequestData.find(x=> x.payment_request_id == this.selected_id).title;         
                this.$emit("paymentRequestData", this.selected_id);
                this.dialogVisible = false;
            }  
            // for(let i=0; i<this.paymentRequestData.length; i++){
            //     if(this.paymentRequestData[i].isSelected){
            //         this.payment_request_id= this.paymentRequestData[i].payment_request_id;
            //         this.title = this.paymentRequestData[i].title;
            //         $('#PaymentRequestModal').modal('hide');
            //         this.$emit("paymentRequestData", this.payment_request_id);
            //     }                
            // }            
        }, 
        handleSelectionChange(val){          
           this.selected_id = val.payment_request_id;
        },
        handleSizeChange(val){
           this.pageSize = val;
           this.getPaymentRequestData();
        },
        handleCurrentChange(val){
           this.currentPage =val;
           this.getPaymentRequestData();
        }   
    }
}
</script>
<style scoped>
table {
    display: inline-table;
}
.model-input{
   width: 50%;

}
 .table_main_box{
       width: 100%;
       border-left: 1px solid gainsboro;
       border-right: 1px solid gainsboro;
       border-bottom: 1px solid gainsboro;
   }
   .footer-input{
       width: 40px;
   }
</style>