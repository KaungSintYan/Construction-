<template>   
    <div class="form-group mb-3">        
            <label for="payment_request">
                <span class="text-danger">*</span> <small><b> {{ $t('sale_invoice') }} </b></small> 
            </label>                     
            <el-input type="text" :placeholder="$t('please_enter')"
            v-model="title"  @click="showModel()" clearable />
            <el-alert class="mt-2" title="please choose project" type="warning" v-if="showError" :closable="false" />
    </div> 
    <el-dialog v-model="dialogVisible" :title="$t('sale_invoice')" width="60%" draggable>
        <div class="container-fluid">
            <div class="row mx-2 mb-4">
                <el-table :data="saleInvoiceData" border style="width: 100%;"  @row-click="handleSelectionChange">
                    <el-table-column fixed label="" width="60" >
                        <template #default="scope">
                            <el-radio-group v-model="selected_id" class="ml-4">
                                <el-radio :label="scope.row.sales_invoice_id" size="large">{{ selected_name }}</el-radio>                                  
                            </el-radio-group>                              
                        </template>
                    </el-table-column>
                    <el-table-column prop="approve_status" :label="$t('approval_status')" width="200" />
                    <el-table-column prop="project_id" :label="$t('project')" width="200" sortable />
                    <el-table-column prop="title" :label="$t('title_bd')" width="200" sortable />
                    <el-table-column prop="odd_number" :label="$t('odd_number')" width="200" sortable />
                    <el-table-column prop="total_tax" :label="$t('total_tax')" width="200" sortable />
                    <el-table-column prop="revenue_contract_id" :label="$t('revenue_contract')" width="200" sortable />
                    <el-table-column prop="billing_date" :label="$t('billing_date')" width="200" sortable /> 
                    <el-table-column prop="client_id" :label="$t('client')" width="300" sortable />         
                    <el-table-column prop="created_by_user" :label="$t('created_by_user')" width="200" sortable />
                    <el-table-column prop="creation_date" :label="$t('creation_date')" width="200" /> 
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
            <el-button type="primary" @click="selectSaleInvoiceName" >{{ $t('sure') }}</el-button>           
          </span>
        </template>
    </el-dialog>     

</template>
<script>
import {authApi} from '@/http/authApi'
export default {    
      props: ['oldSaleInvoiceId', 'projectId'],
      data() {
        return {
             dialogVisible: false,
             loading: true,            
             sales_invoice_id: "",
             title: "",
             saleInvoiceData: [],  
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
     emits :{
        saleInvoiceData: null, 
    },
    created() {
      this.getSaleInvoiceData();      
    },     
    methods: {
        showModel(){
            if(this.projectId != null && this.projectId != undefined && this.projectId != ""){
               this.dialogVisible = true; 
               this.getSaleInvoiceData();
               this.showError = false;               
            }
            else{
                this.showError = true;
            }            
        },
        async getSaleInvoiceData(){ 
                   
            let response = await authApi({
                method: 'POST',
                api: '/financialmanagement/get_sales_invoice',
                params: {
                       id: '',
                       keyword: '',                                       
                    //    page: '',
                    page: this.currentPage,
                    //    limit: ''
                    limit: this.pageSize,
                },
                data: {
                    project_id: this.projectId,
                    approve_status: "approved"
                }   
            });
            if(response.status == 200){      
                this.saleInvoiceData = response.data.data;
                this.total = response.data.total; 
                if(this.saleInvoiceData != null){
                    this.saleInvoiceData.forEach((value)=> {
                        if(value.sales_invoice_id == this.oldSaleInvoiceId){
                            this.title = value.title;
                        }
                    });
                }                    
                this.loading = false;              
            }          
        }, 
         selectSaleInvoiceName(){
            if(this.selected_id != null && this.selected_id != undefined && this.selected_id != ""){    
                this.title = this.saleInvoiceData.find(x=> x.sales_invoice_id == this.selected_id).title;         
                this.$emit("saleInvoiceData", this.selected_id);
                this.dialogVisible = false;
            }  
            // for(let i=0; i<this.paymentRequestData.length; i++){
            //     if(this.paymentRequestData[i].isSelected){
            //         this.sales_invoice_id= this.paymentRequestData[i].sales_invoice_id;
            //         this.title = this.paymentRequestData[i].title;
            //         $('#PaymentRequestModal').modal('hide');
            //         this.$emit("paymentRequestData", this.sales_invoice_id);
            //     }                
            // }            
        }, 
        handleSelectionChange(val){          
           this.selected_id = val.sales_invoice_id;
        },
        handleSizeChange(val){
           this.pageSize = val;
        //    this.getData();
            this.saleInvoiceData(); 
        },
        handleCurrentChange(val){
           this.currentPage =val;
        //    this.getData();
            this.saleInvoiceData(); 
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