<template>
<div class="form-group mb-3">
                                <label for="purchase_requisition">
                                    <span class="text-danger">*</span> <small><b>{{ $t('purchase_requisition') }}</b></small>
                                </label>
                                <el-input type="text" id="purchase_requisition" class="" 
                                :placeholder="$t('please_choose')" v-model="title" @click="showModel()" clearable/>
                                <el-alert class="mt-2" title="please choose project" type="warning" v-if="showError" :closable="false" />
                            </div>
  
    <el-dialog v-model="dialogVisible" :title="titleHeader" width="60%" draggable>
        <div class="container-fluid">
            <div class="row mx-2 mb-4">
                <el-table :data="purchaseRequisitoinData" border style="width: 100%;"  @row-click="handleSelectionChange">
                    <el-table-column fixed label="" width="60" >
                        <template #default="scope">
                            <el-radio-group v-model="selected_id" class="ml-4">
                                <el-radio :label="scope.row.purchase_requisition_id" size="large">{{ selected_name }}</el-radio>                                  
                              </el-radio-group>                              
                        </template>
                    </el-table-column>
                    <el-table-column prop="approve_status" :label="$t('approval_status')" width="200" />
                    <el-table-column prop="project_id" :label="$t('project')" width="200" sortable />
                    <el-table-column prop="title" :label="$t('title_bd')" width="200" sortable />
                    <el-table-column prop="odd_number" :label="$t('odd_number')" width="200" sortable />
                    <el-table-column prop="" :label="$t('material_details')" width="200" />
                    <el-table-column prop="purchase_status" :label="$t('purchase_status')" width="200" sortable />
                    <el-table-column prop="application_date" :label="$t('applicat_data')" width="200" sortable />
                    <el-table-column prop="created_by_user" :label="$t('founder')" width="200" sortable />
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
            <el-button type="primary" @click="selectPurchaseName" >{{ $t('sure') }}</el-button>           
          </span>
        </template>
    </el-dialog>

   
</template>
<script>
import {authApi} from '@/http/authApi';
export default {
      props: ['oldPurchaseRequisitoinId', 'projectId'],
      data() {
        return {
             dialogVisible: false,
             loading: true,
             selected_id: "", 
             selected_name: "",  
             purchase_requisition_id: "",
             title: "",
             purchaseRequisitoinData: [], 
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
        purchaseRequisitoinData: null, 
    },
    mounted() {       
         this.getPurchaseData();      
    },     
    methods: {
        showModel(){           
            if(this.projectId != null && this.projectId != undefined && this.projectId != ""){
               this.dialogVisible = true; 
               this.getPurchaseData();
               this.showError = false;               
            }
            else{
                this.showError = true;
            }            
        },    
        async getPurchaseData(){                
            let response = await authApi({
                method: 'POST',
                api:  '/materialmanagement/get_purchase_requisition',
                params: {
                       id: '',
                       keyword: '',
                       page: this.currentPage,
                       limit: this.pageSize,
                },
                data: {
                    project_id: this.projectId,
                    approve_status: "approved"
                }   
            });
            if(response.status == 200){  
                console.log('list'+ JSON.stringify(response));
                this.purchaseRequisitoinData = response.data.data;      
                this.total = response.data.total;    
                //console.log("purchase"+ this.oldPurchaseRequisitoinId);
                if(this.oldPurchaseRequisitoinId != null){                
                    this.purchaseRequisitoinData.forEach((value)=> {
                        if(value.purchase_requisition_id == this.oldPurchaseRequisitoinId){
                            this.selected_id = value.purchase_requisition_id;                           
                            this.title = value.title;
                        }
                    });
                }                
            }          
        }, 
         selectPurchaseName(){
            if(this.selected_id != null && this.selected_id != undefined && this.selected_id != ""){    
                this.title = this.purchaseRequisitoinData.find(x=> x.purchase_requisition_id == this.selected_id).title;         
                this.$emit("purchaseRequisitoinData", this.selected_id);
                this.dialogVisible = false;
            }                         
        }, 
        handleSelectionChange(val){          
           this.selected_id = val.purchase_requisition_id;
        },
        handleSizeChange(val){
           this.pageSize = val;
           this.getData();
        },
        handleCurrentChange(val){
           this.currentPage =val;
           this.getData();
        }      
       
    }
}
</script>
