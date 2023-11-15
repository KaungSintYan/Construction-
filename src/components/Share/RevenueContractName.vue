<template>   
    <div class="form-group mb-3">
        <label for="revenue_contract">
           <span class="text-danger">*</span> <small><b>{{ $t('revenue_contract') }}</b></small> 
        </label>
        <el-input type="text" class="" v-model="contract_title" 
        @click="showModel()" :placeholder="$t('please_choose')" clearable/>
        <el-alert class="mt-2" title="please choose project" type="warning" v-if="showError" :closable="false" />
    </div>
    <el-dialog v-model="dialogVisible" :title="$t('revenue_contract')" width="60%" draggable>
        <div class="container-fluid">
            <div class="row mx-2 mb-4">
                <el-table :data="revenueData" border style="width: 100%;"  @row-click="handleSelectionChange">
                    <el-table-column fixed label="" width="60" >
                        <template #default="scope">
                            <el-radio-group v-model="selected_id" class="ml-4">
                                <el-radio :label="scope.row.revenue_contract_id" size="large">{{ selected_name }}</el-radio>                                  
                              </el-radio-group>                              
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('project')" width="270px"> 
                        <template #default="scope">
                            {{scope.row.project_id}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('contract_title')" width="270px"> 
                        <template #default="scope">
                            {{scope.row.contract_title}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('approval_status')" width="270px"> 
                        <template #default="scope">
                            {{scope.row.approve_status}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('contract_no')" width="270px"> 
                        <template #default="scope">
                            {{scope.row.contract_no}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('type_of_contract')" width="270px"> 
                        <template #default="scope">
                            {{scope.row.contract_type_id}}
                        </template>
                    </el-table-column>

                    <!-- <el-table-column :label="$t('receipt_status')" width="270px"> 
                        <template #default="scope">
                            {{scope.row.contract_title}}
                        </template>
                    </el-table-column> -->

                    <!-- <el-table-column :label="$t('revision_status')" width="270px"> 
                        <template #default="scope">
                            {{scope.row.contract_title}}
                        </template>
                    </el-table-column> -->

                    <!-- <el-table-column :label="$t('contract_version')" width="270px"> 
                        <template #default="scope">
                            {{scope.row.contract_title}}
                        </template>
                    </el-table-column> -->

                    <el-table-column :label="$t('amount_including_tax')" width="270px"> 
                        <template #default="scope">
                            {{scope.row.amount_with_tax}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('tax_rate')" width="270px"> 
                        <template #default="scope">
                            {{scope.row.tax_rate}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('tax')" width="270px"> 
                        <template #default="scope">
                            {{scope.row.tax}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('excluding_tax_amount')" width="270px"> 
                        <template #default="scope">
                            {{scope.row.amount_without_tax}}
                        </template>
                    </el-table-column>

                    <!-- <el-table-column :label="$t('contract_party')" width="270px"> 
                        <template #default="scope">
                            {{scope.row.contract_title}}
                        </template>
                    </el-table-column> -->

                    <!-- <el-table-column :label="$t('party_b')" width="270px"> 
                        <template #default="scope">
                            {{scope.row.contract_title}}
                        </template>
                    </el-table-column> -->

                    <el-table-column :label="$t('date_of_signing')" width="270px"> 
                        <template #default="scope">
                            {{scope.row.date_of_signing}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('visa_amount')" width="270px"> 
                        <template #default="scope">
                            {{scope.row.total_visa_amount}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('execution_amount')" width="270px"> 
                        <template #default="scope">
                            {{scope.row.total_execution_amount}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('settlement_amount')" width="270px"> 
                        <template #default="scope">
                            {{scope.row.total_settlement_amount}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('billing_app_amount')" width="270px"> 
                        <template #default="scope">
                            {{scope.row.billing_app_amount}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('invoice_amount')" width="270px"> 
                        <template #default="scope">
                            {{scope.row.total_invoice_amount}}
                        </template>
                    </el-table-column>

                    <!-- <el-table-column :label="$t('receipt_registration_amount')" width="270px"> 
                        <template #default="scope">
                            {{scope.row.contract_title}}
                        </template>
                    </el-table-column> -->

                    <el-table-column :label="$t('contract_visa_out_amount')" width="300px"> 
                        <template #default="scope">
                            {{scope.row.contract_n_visa}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('start_date')" width="270px"> 
                        <template #default="scope">
                            {{scope.row.start_date}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('end_date')" width="270px"> 
                        <template #default="scope">
                            {{scope.row.end_date}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('created_by_user')" width="270px"> 
                        <template #default="scope">
                            {{scope.row.created_by_user}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('creation_time')" width="270px"> 
                        <template #default="scope">
                            {{scope.row.creation_time}}
                        </template>
                    </el-table-column> 
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
            <el-button type="primary" @click="selectProjectName" >{{ $t('sure') }}</el-button>           
          </span>
        </template>
    </el-dialog>     
</template>
<script>
import {authApi} from '@/http/authApi';
export default {
      data() {
        return {
             dialogVisible: false,
             contract_title: "",
             revenueData: [],
             selected_id: "", 
             selected_name: "",   
             background: false,
             disabled: false,
             small: false,
             pageSize: 20,   
             currentPage: 1,  
             total: 0,  
             showError: false, 
        }
      },
     props: ['oldRevenueContractId', 'projectId'],
     created(){ 
        this.getRevenueData();        
     },
     emits :{
        revenueData: null, 
    },
    methods: { 
        showModel(){
            if(this.projectId != null && this.projectId != undefined && this.projectId != ""){
               this.dialogVisible = true; 
               this.getRevenueData();
               this.showError = false;               
            }
            else{
                this.showError = true;
            }            
        },
        async getRevenueData(){         
            let response = await authApi({
                method: 'POST',
                api: '/contractmanagement/get_revenue_contract',
                params: {
                       id: '',
                       keyword: '',                      
                    //    page: '',
                    //    limit: ''
                       page: this.currentPage,
                       limit: this.pageSize,
                },
                data: {
                    project_id: this.projectId,
                    approve_status: "approved"

                }
            });
            if(response.message){
                this.revenueData = response.data.data;
                this.total = response.data.total;        
                if(this.oldRevenueContractId !=null){
                this.revenueData.forEach((value)=> {
                    if(value.revenue_contract_id == this.oldRevenueContractId){
                        this.selected_id = value.revenue_contract_id;
                        this.contract_title= value.contract_title;
                    }                   
                }) 
                }             
                         
            }          
        }, 
         selectProjectName(){
            if(this.selected_id != null && this.selected_id != undefined && this.selected_id != ""){    
                this.contract_title = this.revenueData.find(x=> x.revenue_contract_id == this.selected_id).contract_title;         
                this.$emit("revenueData", this.selected_id);
                this.dialogVisible = false;
            }     
        }, 
        handleSelectionChange(val){          
           this.selected_id = val.revenue_contract_id;
        },
        handleSizeChange(val){
           this.pageSize = val;
        //    this.getData();
           this.getRevenueData();
        },
        handleCurrentChange(val){
           this.currentPage =val;
        //    this.getData();
           this.getRevenueData(); 
        }    
       
    }
}
</script>
