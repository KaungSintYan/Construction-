<template>
    <div class="container-fluid"  @click="$store.commit('setActive', false)">   
        <form  @submit.prevent="createData">    
            <div class="row">
                <div class="col-md-12">              
                    <div class="block-title mt-2">
                        <strong> {{ $t('basic_info') }} </strong>
                        <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter"> <span><font-awesome-icon icon="fa-solid fa-file-import"/></span> Import</button>
                    </div>
                    <hr> 
                            <ProjectName @projectData="getProjectName($event)"  /> 

                            <div class="form-group mb-3 mt-3">
                                <div class="form-group">
                                    <label for="title">
                                        <span class="text-danger">*</span> <small><b> {{ $t('title_bd') }} </b></small>
                                    </label>
                                </div>                               
                                <el-input type="text" id="title" :placeholder="$t('please_enter')" v-model="FormData.invoice.title" clearable />
                            </div>

                            <div class="col-md-3 m-0 p-0">
                                <div class="form group mb-3">
                                    <div class="form-group mb-3">
                                        <label for="billing_date"> 
                                            <span class="text-danger">*</span> <small><b> {{ $t('billing_date') }} </b></small>      
                                        </label>
                                    </div>                        
                                    <el-date-picker v-model="FormData.invoice.billing_date"  id="billing_date" type="date" 
                                    format="YYYY-MM-DD" value-format="YYYY-MM-DD" placeholder="Pick a Date" size="default"  style="width: 100%;" editable clearable  />
                                </div>
                            </div>

                            <Picker @pickerData="getPickerName($event)"  />
                            <SpendingContract @spendingData="getSpendingName($event)" /> 
                        
                            <Supplier @supplierData="getSuppliperData($event)" /> 

                            
                            <div class="form-group mb-3">
                                <label for="">
                                    <span class="text-danger">*</span>  <small><b> {{ $t('purchase_order') }} </b></small>    
                                </label>

                                <!-- <table class="table table-hover mt-3 table_main_box" cellspacing="0" cellpadding="0">
                                    <thead>
                                        <tr>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"></th>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"> <span class="text-danger">*</span> {{ $t('purchase_order') }} </th>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"> <span class="text-danger">*</span> {{ $t('order_amt') }} </th>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"> {{ $t('invoiced_amt') }} </th>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"> <span class="text-danger">*</span> {{ $t('invoicing_amt') }} </th>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"> <span class="text-danger">*</span> {{ $t('billable_amt') }} </th>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"> <span class="text-danger">*</span> {{ $t('billing_amt') }} </th>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"> {{ $t('remark') }} </th>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"> <span class="text-danger">*</span> {{ $t('operate') }}</th>                                            
                                        </tr>
                                    </thead>
        
                                    <tbody>
                                        <tr v-for="(detail,index) in FormData.orders" :key=index>
                                            <td>{{ index+1 }}</td>
                                            <td>
                                                <el-input type="text"  :placeholder="$t('please_enter')"  v-model="detail.title" disabled />
                                            </td>
                                            <td>
                                                <el-input type="number"  :placeholder="$t('please_enter')"  v-model="detail.order_amount" clearable />
                                            </td>
                                            <td>
                                                <el-input type="number"  :placeholder="$t('please_enter')"  v-model="detail.invoice_amount" clearable />
                                            </td>
                                            <td>
                                                <el-input type="number"  :placeholder="$t('please_enter')"  v-model="detail.invoicing_amount" clearable />
                                            </td> 
                                            <td>
                                                <el-input type="number"  :placeholder="$t('please_enter')"  v-model="detail.billable_amount" clearable />
                                            </td> 
                                            <td>
                                                <el-input type="number"  :placeholder="$t('please_enter')"  v-model="detail.billing_amount" clearable />
                                            </td>                                                                                    
                                            <td>
                                                <el-input v-model="detail.remark" type="textarea" autosize :placeholder="$t('please_enter')"  maxlength="100"  show-word-limit />
                                            </td>                                            
                                            <td>
                                               <small  @click="deletePurchaseOrder(detail.id)">{{ $t('delete') }}</small>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table> -->

                                <!-- start  -->

                                <div class="row mx-2 mb-4">
                                    <el-table :data="FormData.orders" border style="width: 100%;">
                                        <el-table-column  fixed type="index" width="55" />
                                        
                                        <el-table-column :label="$t('purchase_order')" width="190px"> 
                                            <template #default="scope">
                                                <el-input type="text"  :placeholder="$t('please_enter')"  v-model="scope.row.title" disabled />
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('order_amt')" width="190px"> 
                                            <template #default="scope">
                                                <el-input type="number" :placeholder="$t('please_enter')"  v-model="scope.row.order_amount" clearable />
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('invoiced_amt')" width="190px"> 
                                            <template #default="scope">
                                                <el-input type="number" :placeholder="$t('please_enter')"  v-model="scope.row.invoice_amount" clearable />
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('invoicing_amt')" width="190px"> 
                                            <template #default="scope">
                                                <el-input type="number" :placeholder="$t('please_enter')"  v-model="scope.row.invoicing_amount" clearable />
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('billable_amt')" width="190px"> 
                                            <template #default="scope">
                                                <el-input type="number" :placeholder="$t('please_enter')"  v-model="scope.row.billable_amount" clearable />
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('billing_amt')" width="190px"> 
                                            <template #default="scope">
                                                <el-input type="number"  :placeholder="$t('please_enter')"  v-model="scope.row.billing_amount" clearable />
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('remark')" width="190px"> 
                                            <template #default="scope">
                                                <el-input v-model="scope.row.remark" type="textarea" autosize :placeholder="$t('please_enter')"  maxlength="100" show-word-limit />
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('operate')" width="190px">

                                            <template #default="scope">
                                                <small class="text-danger" @click="deletePurchaseOrder(scope.row.id)"> {{ $t('delete') }} </small>
                                            </template>
                                            
                                        </el-table-column>
                                        
                                    </el-table>
                                </div>

                                <!-- end -->

                                    <div class="row">
                                        <small class="mt-2 ml-3 mr-3">{{ $t('total') }} 0</small>
                                        <nav aria-label="Page navigation example">
                                            <ul class="pagination">
                                                <li class="page-item">
                                                    <a class="page-link" href="#" aria-label="Previous">
                                                        <span aria-hidden="true">&laquo;</span>
                                                        <span class="sr-only">Previous</span>
                                                    </a>
                                                </li>
                                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                                <li class="page-item">
                                                <a class="page-link" href="#" aria-label="Next">
                                                    <span aria-hidden="true">&raquo;</span>
                                                    <span class="sr-only">Next</span>
                                                </a>
                                                </li>
                                            </ul>
                                        </nav>
                                        <div class="mr-3 ml-2 row">
                                            <small class="pt-1 mr-2 mt-1">{{ $t('go_to') }}</small>
                                            <input type="text" class="form-control footer-input" value="1">
                                            <small class="pt-1 ml-2 mt-1">{{ $t('page') }}</small>
                                        </div>
                                    </div>
        
                                    <div class="box-footer"  @click="addModal()">
                                        <font-awesome-icon icon="fa-solid fa-circle-plus" style="color:cornflowerblue;" /> <span class="text-primary"> {{ $t('add_to') }} </span>
                                    </div>
        
                             </div>
                            <!-- <div class="form-group mb-3">
                                <label for="invoice"> <span class="text-danger">*</span> Invoice Type</label>
                                <input type="text" class="form-control" id="invoice" :placeholder="$t('please_choose')" >

                            </div> -->

                            <div class="form-group mb-3">
                                <label for=""> <small><b> {{ $t('whether_enable_tolerance_modification') }} </b></small> </label>
                                <div class="">
                                    <el-switch
                                    v-model="FormData.invoice.tolerance_modification"
                                    size="large"
                                    active-text=""
                                    inactive-text=""
                                />
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="total_tax"><span class="text-danger">*</span> <small><b> {{ $t('total_tax') }} (¥)</b></small> </label>
                                <input type="text" class="form-control" id="total_tax" :placeholder="$t('please_enter')" readonly>
                                <small class="text-secondary ml-2"> {{ $t('capital') }} : </small>
                            </div>

                            <div class="form-group mb-3">
                                <label for="total_taxe"><span class="text-danger">*</span> <small><b> {{ $t('total_tax') }} (¥)</b></small> </label>
                                <input type="text" class="form-control" id="total_taxe" :placeholder="$t('please_enter')" readonly>
                            </div>

                            <div class="form-group mb-3">
                                <label for="total_tax_excluding"><span class="text-danger">*</span> <small><b> {{ $t('total_tax_excluding') }} </b></small>  </label>
                                <input type="text" class="form-control" id="total_tax_excluding" :placeholder="$t('please_enter')" readonly>
                            </div>
                            
                            <div class="form-group mb-3">
                                <div class="form-group">
                                    <label for="invoice_num"><span class="text-danger">*</span> <small><b> {{ $t('invoice_number') }} </b></small> </label>
                                </div>                               
                                <el-input v-model="FormData.invoice.invoice_number" maxlength="300" 
                                :placeholder="$t('please_enter')"  show-word-limit type="textarea" id="invoice_num"/>  
                                
                            </div>

                            <div class="form-group mb-3">
                                <label for="">
                                    <span class="text-danger">*</span> <small><b> {{ $t('details_of_expenditure') }} </b></small>   
                                </label>

                                <!-- <table class="table table-hover mt-3 table_main_box" cellspacing="0" cellpadding="0">
                                    <thead>
                                        <tr>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"></th>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"> <span class="text-danger">*</span> {{ $t('amount_with_tax') }} </th>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"> <span class="text-danger">*</span> {{ $t('amount_without_tax') }} </th>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"> {{ $t('tax_rate') }} </th>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"> {{ $t('tax') }} </th>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"> {{ $t('remark') }} </th>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"> <span class="text-danger">*</span> {{ $t('operate') }}</th>
                                        </tr>
                                    </thead>

                                    <tbody>                                       
                                        <tr v-for="(detail,index) in FormData.details" :key=index>
                                            <td>{{ index+1 }}</td>
                                            <td>
                                                <el-input type="number"  :placeholder="$t('please_enter')"  v-model="detail.amount_with_tax" clearable />
                                            </td>
                                            <td>
                                                <el-input type="number"  :placeholder="$t('please_enter')"  v-model="detail.amount_without_tax" clearable />
                                            </td>
                                            <td>
                                                <el-input type="number"  :placeholder="$t('please_enter')"  v-model="detail.tax_rate" clearable />
                                            </td> 
                                            <td>
                                                <el-input type="number"  :placeholder="$t('please_enter')"  v-model="detail.tax" clearable />
                                            </td>                                                                                    
                                            <td>
                                                <el-input v-model="detail.remark" type="textarea" autosize :placeholder="$t('please_enter')"  maxlength="100"  show-word-limit />
                                            </td>                                            
                                            <td>
                                            <small  @click="deleteDetail(detail.id)">{{ $t('delete') }}</small>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table> -->

                                <!-- start  -->

                                <div class="row mx-2 mb-4">
                                    <el-table :data="FormData.details" border style="width: 100%;">
                                        <el-table-column  fixed type="index" width="55" />
                                        
                                        <el-table-column :label="$t('amount_with_tax')" width="250px"> 
                                            <template #default="scope">
                                                <el-input type="number"  :placeholder="$t('please_enter')"  v-model="scope.row.amount_with_tax" clearable />
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('amount_without_tax')" width="250px"> 
                                            <template #default="scope">
                                                <el-input type="number"  :placeholder="$t('please_enter')"  v-model="scope.row.amount_without_tax" clearable />
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('tax_rate')" width="250px"> 
                                            <template #default="scope">
                                                <el-input type="number"  :placeholder="$t('please_enter')"  v-model="scope.row.tax_rate" clearable />
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('tax')" width="250px"> 
                                            <template #default="scope">
                                                <el-input type="number"  :placeholder="$t('please_enter')"  v-model="scope.row.tax" clearable />
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('remark')" width="250px"> 
                                            <template #default="scope">
                                                <el-input v-model="scope.row.remark" type="textarea" autosize :placeholder="$t('please_enter')" maxlength="100" show-word-limit />
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('operate')" width="250px">

                                            <template #default="scope">
                                                <small class="text-danger" @click="deleteDetail(scope.row.id)">{{ $t('delete') }}</small>
                                            </template>
                                            
                                        </el-table-column>
                                        
                                    </el-table>
                                </div>

                                <!-- end -->

                                    <div class="row">
                                        <small class="mt-2 ml-3 mr-3">{{ $t('total') }} 0</small>
                                        <nav aria-label="Page navigation example">
                                            <ul class="pagination">
                                                <li class="page-item">
                                                    <a class="page-link" href="#" aria-label="Previous">
                                                        <span aria-hidden="true">&laquo;</span>
                                                        <span class="sr-only">Previous</span>
                                                    </a>
                                                </li>
                                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                                <li class="page-item">
                                                <a class="page-link" href="#" aria-label="Next">
                                                    <span aria-hidden="true">&raquo;</span>
                                                    <span class="sr-only">Next</span>
                                                </a>
                                                </li>
                                            </ul>
                                        </nav>
                                        <div class="mr-3 ml-2 row">
                                            <small class="pt-1 mr-2 mt-1">{{ $t('go_to') }}</small>
                                            <input type="text" class="form-control footer-input" value="1">
                                            <small class="pt-1 ml-2 mt-1">{{ $t('page') }}</small>
                                        </div>
                                    </div>

                                    <div class="box-footer"  @click="addDetail()">
                                        <font-awesome-icon icon="fa-solid fa-circle-plus" style="color:cornflowerblue;" /> <span class="text-primary"> {{ $t('add_to') }} </span>
                                    </div>        
                            </div>
                            <div class="form-group mb-3">
                                <label for="address">
                                    <small><b> {{ $t('address') }} </b></small>
                                </label>
                                <el-input v-model="FormData.invoice.address" maxlength="100" 
                                :placeholder="$t('please_enter')"  show-word-limit type="textarea" />  
                            </div>
                            <div class="form-group mb-3">
                                <label for="phone_number">
                                    <small><b> {{ $t('telephone') }} </b></small>
                                </label>
                                <el-input type="number" id="phone_number" v-model="FormData.invoice.phone_number"
                                :placeholder="$t('please_enter')" clearable />
                            </div> 
                        
                            <div class="form-group mb-3">
                                <label for="bank">
                                    <small><b> {{ $t('bank') }} </b></small>
                                </label>
                                <el-input type="text" id="bank"  :placeholder="$t('please_enter')" v-model="FormData.invoice.bank_name" clearable />
                            </div>

                            <div class="form-group mb-3">
                                <label for="bank_card_number">
                                    <small><b> {{ $t('bank_card_number') }} </b></small>
                                </label>
                                <el-input type="text" id="bank_card_number" v-model="FormData.invoice.bank_card_number"
                                :placeholder="$t('please_enter')" clearable />
                            </div>
                            <div class="form-group mb-3">
                                <label for="remark">
                                    <small><b> {{ $t('remark') }} </b></small>
                                </label>
                                <el-input v-model="FormData.invoice.remark" maxlength="100" 
                                :placeholder="$t('please_enter')"  show-word-limit type="textarea" />  
                            </div>

                           <Picture @picture="getPicture($event)" />
                    <Document @appendix="getDocument($event)" /> 

                    <el-timeline>
                        <el-timeline-item>
                          <Approver @approverUser="getApproverUser($event)" />
                        </el-timeline-item>
                        <el-timeline-item>
                            <Cc @ccUser="getCcUser($event)" />
                          </el-timeline-item>
                      </el-timeline>
                            <div class="form-group mb-5"></div> 
        
                </div>
            </div>
            <div class="footer-main pt-2 pl-3">        
                <button type="submit" class="btn btn-primary btn-footer"> {{ $t('submit') }} </button>
            </div>
        </form> 
     
    </div>
 
   
    <div class="modal fade select-box" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"> <strong> {{ $t('select_purchaseOrder') }} </strong> </h5>
                </div>
                <div class="modal-body row">
                    <div class="col-2 left-side">
                        <h6>{{ $t('category_name') }}</h6>
                        <a href="#"><small> <font-awesome-icon icon="fa-solid fa-sliders"/>  {{ $t('category_management') }} </small></a>
                    </div>
                    <div class="col-10" style="position: relative;">
                        <div class="row">
                            <input type="text" autocomplete="off" class="input-inner form-control m-1" placeholder="please enter" style="width: 400px;">
                            <button type="button" class="btn btn-outline-secondary btn-sm mt-1" style="width: 70px; height: 35px;"> <small>{{ $t('save') }}</small> </button>
                            <div class="operation" style="position: absolute; right: 0;">
                                <button class="btn btn-primary">{{ $t('add') }}</button>
                            </div>
                        </div>
                        <div class="row operator">
                            <p class="ml-1 ">{{ $t('test_final') }}</p>
                            <p class=""> {{ $t('all_purchaseOrder') }} <span><font-awesome-icon icon="fa-solid fa-caret-down"/></span> </p>

                            <table class="table table-hover mt-3 table_main_box" cellspacing="0" cellpadding="0">
                                <thead>
                                <tr>
                                    <th scope="col" rowspan="1" colspan="1" class="table-box">
                                        <input type="checkbox">
                                    </th>
                                    <th scope="col" rowspan="1" colspan="1" class="table-box">
                                        {{ $t('purchaseOrder_name') }}
                                        <span class="caret-wrapper ml-2">
                                            <font-awesome-icon icon="fa-solid fa-sort-up"/>
                                            <font-awesome-icon icon="fa-solid fa-sort-down"/>
                                        </span>  
                                    </th>
                                    <!-- <th scope="col" rowspan="1" colspan="1" class="table-box">
                                        {{ $t('specification') }}
                                        <span class="caret-wrapper ml-2">
                                            <font-awesome-icon icon="fa-solid fa-sort-up"/>
                                            <font-awesome-icon icon="fa-solid fa-sort-down"/>
                                        </span>
                                    </th>
                                    <th scope="col" rowspan="1" colspan="1" class="table-box">
                                        {{ $t('brand') }}
                                        <span class="caret-wrapper ml-2">
                                            <font-awesome-icon icon="fa-solid fa-sort-up"/>
                                            <font-awesome-icon icon="fa-solid fa-sort-down"/>
                                        </span>
                                    </th> -->
                                   
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(obj, index) in purchaseOrder" :key="index">
                                    <th scope="row">
                                        <input type="checkbox" :checked=obj.isSelected @change="checkOne(obj.purchase_order_id, !obj.isSelected)">
                                    </th>
                                    <td class="table-box">
                                        <span class="filed_boxe">
                                            {{ obj.title }}
                                        </span>
                                    </td>
                                    <!-- <td class="table-box">
                                        <span class="filed_boxe">
                                            {{ obj.specification }}
                                        </span>
                                    </td>
                                    <td class="table-box">
                                        <span class="filed_boxe">
                                            {{ obj.brand }}
                                        </span>
                                    </td>
                                     -->
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
                                <nav aria-label="Page navigation example" class="mr-3">
                                    <ul class="pagination">
                                        <li class="page-item">
                                        <a class="page-link" href="#" aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                            <span class="sr-only">Previous</span>
                                        </a>
                                        </li>
                                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                                        <li class="page-item">
                                        <a class="page-link" href="#" aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                            <span class="sr-only">Next</span>
                                        </a>
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
                    </div>
                    
                </div>
                <div class="modal-footer">                   
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t('cancel') }}</button>
                    <button type="button" class="btn btn-primary" @click="addPurchaseOrder">{{ $t('sure') }}</button>
                </div>
            </div>
        </div>
    </div>
 </template>
 <script>     
 import {authApi} from '@/http/authApi'
 import { toast } from 'vue3-toastify';
 import 'vue3-toastify/dist/index.css';
 import ProjectName from '@/components/Share/ProjectName.vue';
 import SpendingContract from '@/components/Share/SpendingContract.vue';
 import Picker from '@/components/Share/Picker.vue';
 import Supplier from '@/components/Share/Supplier.vue';
 import Picture from '@/components/Share/Picture.vue';
 import Document from '@/components/Share/Document.vue';
 import Approver from '@/components/Share/ApproverUser.vue';
 import Cc from '@/components/Share/CcUser.vue';
 import $ from 'jquery';
 export default {
     name: 'InputinvoiceCreate',
     data() {
         return {  
             loading: true,        
             FormData: {
                invoice:{
                        title: "",
                        odd_number: "",
                        tolerance_modification: false,
                        receiver: "",
                        billing_date: "",
                        invoice_number: "",
                        phone_number: "",
                        address: "",
                        total_tax: "",
                        amount_without_tax: "",
                        bank_name: "",
                        bank_card_number: "",
                        remark: "",
                        picture: null,
                        appendix: null,
                        approver: [],
                        cc: [],
                        creation_time: "",
                        project_id: "",
                        spending_contract_id: "",
                        supplier_id: "",
                        created_by_user: "",
                    },
                details:[
                    {   
                        id: 1,
                        amount_with_tax: "",
                        amount_without_tax: "",
                        tax_rate: "",
                        tax: "",
                        remark: "",
                        input_invoice_id: ""
                    }
                ],
                orders:[
                    // {                        
                    //     order_amount: "",
                    //     invoice_amount: "",
                    //     invoicing_amount: "",
                    //     billable_amount: "",
                    //     billing_amount: "",
                    //     purchase_order_id: "",
                    //     input_invoice_id: "" 
                    // }
                ]
             },              
             detailCount: 1,
             purchaseOrderCount: 1,
             pictureImages: [] ,
             appendixImages: [], 
             showapprover: [],
             showcc: [], 
             purchaseOrder: [],
         }
     },   
     components: {
       ProjectName, 
       SpendingContract,
       Picker,
       Supplier, 
       Picture,
       Document,
       Approver,
       Cc    
     }, 
     created(){        
        this.getPurchaseOrder(); 
     },
     methods: { 
        async getPurchaseOrder(){
        let response = await authApi({
                method: 'POST',
                api:  '/materialmanagement/get_purchase_order',
                params: {
                       id: '',
                       keyword: '',             
                       page: '',
                       limit: ''
                }  
        });
       
        const list= response.data.data;
        this.purchaseOrder = list.map(v => ({...v, isSelected: false}));  
        console.log('purchaseOrder'+ JSON.stringify(this.purchaseOrder));        
       },
       checkOne(id, selected){
        for(let i=0; i<this.purchaseOrder.length; i++){
            if(id == this.purchaseOrder[i].purchase_order_id && selected){
                this.purchaseOrder[i].isSelected= selected;
            }
            else{
                this.purchaseOrder[i].isSelected= false
            }
        }        
       },
       addModal(){
        for(let i=0; i<this.purchaseOrder.length; i++){
            this.purchaseOrder[i].isSelected= false;
        }
        $('.select-box').modal('show');      
       },
       addPurchaseOrder() { 
            let purchaseOrder = this.purchaseOrder.find(x=> x.isSelected);
           //console.log('add'+ JSON.stringify(purchaseOrder))
            if(purchaseOrder !=null && purchaseOrder !=undefined){
                let detail= {
                        id: this.purchaseOrderCount,
                        order_amount: "",
                        invoice_amount: "",
                        invoicing_amount: "",
                        billable_amount: "",
                        billing_amount: "",
                        purchase_order_id: purchaseOrder.purchase_order_id,
                        title: purchaseOrder.title,
                        input_invoice_id: ""

                    }
                this.purchaseOrderCount = this.purchaseOrderCount +1;
                this.FormData.orders.push(detail);  
            }             
            $('.select-box').modal('hide'); 
        },
        deletePurchaseOrder(id){
            this.FormData.orders =this.FormData.orders.filter(x=> x.id != id);
        },
         getProjectName(data) {   
          this.FormData.invoice.project_id = data;        
         }, 
        getSpendingName(data){
            this.FormData.invoice.spending_contract_id= data;             
        },
        getSuppliperData(data){
          this.FormData.invoice.supplier_id= data;
        }, 
        getPickerName(data){
            this.FormData.invoice.receiver = data;   
        },        
         getPicture(data){
          this.pictureImages = data;
         },
         getDocument(data){
             this.appendixImages = data;          
         },
         getApproverUser(data){
           this.showapprover = data;
         },
         getCcUser(data){
           this.showcc = data;
         },       
       
         addDetail() { 
             this.detailCount = this.detailCount +1;            
                 let detail= {
                         id: this.detailCount,
                         amount_with_tax: "",
                         amount_without_tax: "",
                         tax_rate: "",
                         tax: "",
                         remark: "",
                         input_invoice_id: "",
                     }               
             this.FormData.details.push(detail);                
         },
         deleteDetail(id){
             this.FormData.details =this.FormData.details.filter(x=> x.id != id);
         },
         async createData(e){   
             this.showapprover.forEach((value) => {
                 if(value.isSelected){
                     this.FormData.invoice.approver.push(value.userid); 
                 }                 
             }); 
             this.showcc.forEach((value) => {
                 if(value.isSelected){
                     this.FormData.invoice.cc.push(value.userid); 
                 }  
             }); 
            
             let response = await authApi({
                 method: 'POST',
                 api: '/financialmanagement/input_invoice',
                 data: this.FormData 
             });
             if(response.status == 201){              
               //console.log(response.data.revenue_contract_id);
                 const id = response.data.input_invoice_id; 
                 const imgformData = new FormData();
                 imgformData.append('input_invoice_id',id);
                 this.pictureImages.forEach((value) => {
                      imgformData.append('picture', value.url);   
                 });
                 this.appendixImages.forEach((value) => {
                     imgformData.append('appendix', value.url);  
                 });  
                 
                 let imgResponse = await authApi({
                 method: 'POST',
                 api:  '/financialmanagement/input_invoice_datafiles',           
                 data: imgformData
                 });
                 if(imgResponse.status == 200){
                     e.target.reset();
                     toast.success("Input Invoice Insert successful !", {
                     position: toast.POSITION.TOP_RIGHT,
                     autoClose: 3000,
                     });
                 }
             }
         },
     }
     
 }
 </script>

<style lang="scss">

.box1{
    margin: 10px;
    background: rgb(244, 247, 255);
    padding: 10px;   
    img {
        width: 40px;
        height: 40px;
    }
    span {
        margin-left: 10px;
        font-size: 16px;
        font-weight: 600;
        
    }
}
a{
    text-decoration: none;
}
.date-input{
    width: 200px;
}
.designer_upload-image-list-container{
    display: flex;
    flex-wrap: wrap;
    vertical-align: baseline;
}
._designer-upload-btn{
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    border-radius: 4px;
    border: 1px dashed #c0ccda;
    background-color: #fbfdff;
    cursor: pointer;
    transition: all .15s;
}
.iconfont{
    font-family: "iconfont";
    font-size: 16px;
    font-style: normal;
    cursor: pointer;
}
.icontext{
    font-size: 14px;
    cursor: pointer;
}
.designer-upload-images-input{
    display: none;
}
.footer-main{
   position: fixed;
   right: 0;
   bottom: 0;
   width: 96%;
   height: 60px;
   border: 2px solid #eee;
   color: white;
   background-color: #FFFFFF;
}
.btn-footer{
    padding: 5px 70px 5px 70px;
    font-size: 13px;
}
.img-employee{
   width: 35px;
   height: 35px;
}
.j-box{
   position: relative;
   width: 100px;
   // height: 150px;
}
.xmark{
   top: 0;
   right: 0;
   cursor: pointer;
}
.circle-box{
   border: 1px dashed #6D92FB;
   border-radius: 50%;
   width: 40px;
   height: 40px;
   text-align: center;
   padding: 7px;
   cursor: pointer;
}
.model-input{
   width: 50%;

}
.table-box{
       box-sizing: border-box;
       border: 1px solid #ebeef5;
       border-right: none;
       border-bottom: none;
       vertical-align: inherit;
       font-size: 14px;
   }
   thead{
       background-color:#F6F7FB;
   }
   tfoot{
       background-color:#F6F7FB;
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
   .block-title{
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   align-items: center;
   align-content: space-between;
   flex-direction: row;
 }
 .block-title strong{
   flex-grow: 1;
 }
 .budget-box{
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   align-content: space-around;
 }
 .b-box{
   background-color: #F9F9FA;
   padding: 10px;
 }
 .box-footer{
   border: 1px solid #d5def0;
   border-radius: 5px;
   width: 100%;
   padding: 7px;
   text-align: center;
   cursor: pointer;
 }
 .box-footer:hover{
   background-color: #EDF3FE;
 }
 .first-box{
   border: 1px solid #D0D4D8;
   width: 100%;
   height: 100px;
   border-radius: 3px;
 }
 .second-box{
   border: 1px solid #D0D4D8;
   width: 49%;
   height: 400px;
   border-radius: 3px;
 }
 .third-box{
   border: 1px solid #D0D4D8;
   width: 49%;
   height: 400px;
   border-radius: 3px;
 }
 .input-inner{
       width: 100%;
       box-sizing: border-box;
       border: 1px solid #ccc;
       border-radius: 4px;
       font-size: 14px;
       background-color: white;
       background-image: url('../../assets/images/searchicon.png');
       background-size: 14px;
       background-position: 10px 10px;
       background-repeat: no-repeat;
       padding: 12px 20px 12px 40px;
       /* transition: width 0.4s ease-in-out; */
       transition: border-color .2s cubic-bezier(cubic-bezier(0.645, 0.045, 0.355, 1));
       height: 35px;
   }
   .box-circle{
       position: relative;
       width: 60px;
       height: 20px;
       margin-bottom: 70px;
       padding: 10px;
       box-sizing: border-box;
   }
   .li{
       position: absolute;
       background-color: #6D92FB;
       color: white;
       border-radius: 100%;
       padding: 10px;
       width: 50px;
       height: 50px;
       text-align: center;
   }
   .icon-font{
       position: absolute;
       top: 1;
       right: 0;
       cursor: pointer;
   }
   .status{
       position: absolute;
       top: 70px;

   }
   #complilation_date{
       width: 200px;
   }
   .left-side{
       border-right: 1px solid black;
   }
   .select-box{
       margin: auto;
       padding-right: 300px;
   }
   .operation{
       float: right;
       box-sizing: border-box;
       margin-right: 20px;
   }
   .operator{
       display: flex;
       flex-wrap: wrap;
       justify-content: center;
       align-items: center;
       align-content: space-between;
       flex-direction: row;
   }
   .operator p{
       flex-grow: 1;
   }
   .caret-wrapper{
       display: inline-flex;
       flex-direction: column;
       vertical-align: middle;
       cursor: pointer;
       font-size: 10px;
   }
   .payment_complete{
       color:rgb(40, 31, 31);
   }
   .payment_complete:hover{
       color: #6D92FB;
       text-decoration: underline;
   }
</style>