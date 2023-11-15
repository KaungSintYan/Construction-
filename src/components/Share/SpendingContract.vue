<template>
    <div class="form-group">
        <label for="spending_contract">
            <span class="text-danger">*</span> <small><b>{{ $t('spending_contract') }}</b></small> 
        </label>
        <el-input type="text" id="spending_contract" 
        :placeholder="$t('please_choose')" v-model="contract_title" @click="showModel()" clearable />
        <el-alert class="mt-2" title="please choose project" type="warning" v-if="showError" :closable="false" />
    </div>
    
    <el-dialog v-model="dialogVisible" :title="titleHeader" width="60%" draggable>
        <div class="container-fluid">
            <div class="row mx-2 mb-4">
                <el-table :data="spendingData" border style="width: 100%;"  @row-click="handleSelectionChange">
                    <el-table-column fixed label="" width="60" >
                        <template #default="scope">
                            <el-radio-group v-model="selected_id" class="ml-4">
                                <el-radio :label="scope.row.spending_contract_id" size="large">{{ selected_name }}</el-radio>                                  
                              </el-radio-group>                              
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('approval_status')" width="220px"> 
                        <template #default="scope">
                            {{scope.row.approve_status}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('project')" width="220px"> 
                        <template #default="scope">
                            {{scope.row.project_id}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('contract_title')" width="220px"> 
                        <template #default="scope">
                            {{scope.row.contract_title}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('contract_no')" width="220px"> 
                        <template #default="scope">
                            {{scope.row.contract_no}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('type_of_contract')" width="220px"> 
                        <template #default="scope">
                            {{scope.row.contract_type_id}}
                        </template>
                    </el-table-column>

                    <!-- <el-table-column :label="$t('lease_type')" width="220px"> 
                        <template #default="scope">
                            {{scope.row.amount_without_tax}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('implementation_modalities')" width="220px"> 
                        <template #default="scope">
                            {{scope.row.contract_title}}
                        </template>
                    </el-table-column> -->

                    <el-table-column :label="$t('date_of_signing')" width="220px"> 
                        <template #default="scope">
                            {{scope.row.date_of_signing}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('amount_including_tax')" width="220px"> 
                        <template #default="scope">
                            {{scope.row.amount_with_tax}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('tax_rate')" width="220px"> 
                        <template #default="scope">
                            {{scope.row.tax_rate}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('tax')" width="220px"> 
                        <template #default="scope">
                            {{scope.row.tax}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('excluding_tax_amount')" width="220px"> 
                        <template #default="scope">
                            {{scope.row.amount_without_tax}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('start_date')" width="220px"> 
                        <template #default="scope">
                            {{scope.row.start_date}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('end_date')" width="220px"> 
                        <template #default="scope">
                            {{scope.row.end_date}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('created_by_user')" width="220px"> 
                        <template #default="scope">
                            {{scope.row.created_by_user}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('creation_time')" width="220px"> 
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
      props: ['oldSpendingId', 'projectId'],
      data() {
        return {
             dialogVisible: false,
             selected_id: "", 
             selected_name: "",  
             contract_title: "",
             spendingData: [],  
             background: false,
             disabled: false,
             small: false,
             pageSize: 20,   
             currentPage: 1,  
             total: 0, 
             showError: false,              
        }
      },
     emits :{
        spendingData: null, 
    },
    created() {
         this.getspendingData();      
    },     
    methods: {        
        showModel(){           
            if(this.projectId != null && this.projectId != undefined && this.projectId != ""){
               this.dialogVisible = true; 
               this.getspendingData();
               this.showError = false;               
            }
            else{
                this.showError = true;
            }            
        },
        async getspendingData(){
            let response = await authApi({
                method: 'POST',
                api: '/contractmanagement/get_spending_contract',
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
            if(response.status == 200){  
                this.spendingData = response.data.data; 
                this.total = response.data.total; 
                if(this.oldSpendingId !=null){
                    this.spendingData.forEach((value)=> {
                    if(value.spending_contract_id == this.oldSpendingId){
                        this.selected_id = value.spending_contract_id;
                        this.contract_title = value.contract_title;
                    }
                });  
                }     
                                            
            }          
        }, 
         selectProjectName(){
            if(this.selected_id != null && this.selected_id != undefined && this.selected_id != ""){    
                this.contract_title = this.spendingData.find(x=> x.spending_contract_id == this.selected_id).contract_title;         
                this.$emit("spendingData", this.selected_id);
                this.dialogVisible = false;
            }        
        }, 
        handleSelectionChange(val){          
           this.selected_id = val.spending_contract_id;
        },
        handleSizeChange(val){
           this.pageSize = val;
        //    this.getData();
           this.getspendingData();
        },
        handleCurrentChange(val){
           this.currentPage =val;
        //    this.getData();
           this.getspendingData(); 
        }   
       
    }
}
</script>
