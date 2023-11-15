<template>
    <div class="form-group">
        <label for="supplier"> <small><b>{{ $t('supplier') }}</b></small> </label>     
        <el-input type="text" id="contract_party" placeholder="supplier" 
        v-model="supplier_name" @click="dialogVisible = true" clearable />
     </div>
     <el-dialog v-model="dialogVisible" :title="$t('supplier')" width="60%" draggable>
        <div class="container-fluid">
            <div class="row mx-2 mb-4">
                <el-table :data="supplierData" border style="width: 100%;"  @row-click="handleSelectionChange">
                    <el-table-column fixed label="" width="60" >
                        <template #default="scope">
                            <el-radio-group v-model="selected_id" class="ml-4">
                              <el-radio :label="scope.row.supplierid" size="large">{{ selected_name }}</el-radio>                                  
                              </el-radio-group>                              
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('supplier_name')" width="200px"> 
                        <template #default="scope">
                            {{scope.row.supplier_name}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('classification')" width="200px"> 
                        <template #default="scope">
                            {{scope.row.classification}}
                        </template>
                    </el-table-column> 
                    <el-table-column :label="$t('contact_person')" width="200px"> 
                        <template #default="scope">
                            {{scope.row.contact_person}}
                        </template>
                    </el-table-column> 
                    <el-table-column :label="$t('contact_number')" width="200px"> 
                        <template #default="scope">
                            {{scope.row.contact_number}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('state')" width="200px"> 
                        <template #default="scope">
                            {{scope.row.status}}
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
import {authApi} from '@/http/authApi'

export default {
      data() {
        return {
             loading: true,
             dialogVisible: false,
             selected_id: "", 
             selected_name: "", 
             supplier_name: "",
             supplierData: "",  
             background: false,
            disabled: false,
            small: false,
            pageSize: 20,   
            currentPage: 1,  
            total: 0,              
        }
      },
     props: ['oldSupplierId'],
     emits :{
        supplierData: null, 
    },
     created(){ 
          this.getSupplierData();
     },
    methods: {  
        async getSupplierData(){         
            let response = await authApi({
                method: 'POST',
                api: '/getsupplier',
                params: {
                       id: '',
                       keyword: '',
                       status: '',                       
                    //    page: '',
                    //    limit: ''
                       page: this.currentPage,
                       limit: this.pageSize,
                }   
            });
            if(response.message){            
                const list= response.data.data;
                this.supplierData = list;
                this.total = response.data.total;       
                if(this.oldSupplierId !=null){
                    this.supplierData.forEach((value)=> {
                        if(value.supplierid == this.oldSupplierId){
                            this.selected_id = value.supplierid;
                        this.supplier_name= value.supplier_name;
                        }                   
                    })  
                }
                                          
                //console.log('supplier>>'+ JSON.stringify(this.supplierData))                
                this.pageCount = response.data.pagecount;
                this.loading = false;
            }          
        }, 
         selectProjectName(){
            if(this.selected_id != null && this.selected_id != undefined && this.selected_id != ""){    
                this.supplier_name = this.supplierData.find(x=> x.supplierid == this.selected_id).supplier_name;         
                this.$emit("supplierData", this.selected_id);
                this.dialogVisible = false;
            }      
                    
        }, 
        handleSelectionChange(val){          
           this.selected_id = val.supplierid;
        },
        handleSizeChange(val){
           this.pageSize = val;
        //    this.getData();
            this.getSupplierData();
        },
        handleCurrentChange(val){
           this.currentPage =val;
        //    this.getData();
            this.getSupplierData(); 
        }    
       
    }
}
</script>
<style scoped>
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