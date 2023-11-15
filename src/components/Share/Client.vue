<template>
    <div class="form-group mb-3">
        <label for="contract_party"  v-if="titleHeader == null"> <small><b>{{ $t('client') }}</b></small> </label>
        <label for="contract_party" v-if="titleHeader !=null"> <small><b>{{ titleHeader }}</b></small> </label>

        <el-input type="text" class="" id="contract_party" placeholder="Please Enter" 
        v-model="client_name"  @click="dialogVisible = true" clearable/>
        <!-- <span v-if="v$.client_name.$error" class="text-danger">
            {{ v$.client_name.$errors[1].$message }}
        </span> -->
    </div>
    
    <el-dialog v-model="dialogVisible" :title="titleHeader" width="60%" draggable>
        <div class="container-fluid">
            <div class="row mx-2 mb-4">
                <el-table :data="clientData" border style="width: 100%;"  @row-click="handleSelectionChange">
                    <el-table-column fixed label="" width="60" >
                        <template #default="scope">
                            <el-radio-group v-model="selected_id" class="ml-4">
                                <el-radio :label="scope.row.clientid" size="large">{{ selected_name }}</el-radio>                                  
                            </el-radio-group>                              
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('client_name')" width="200px"> 
                        <template #default="scope">
                            {{scope.row.client_name}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('classification')" width="200px">
                        <template #default="scope">
                            {{ scope.row.classification }}
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
import {authApi} from '@/http/authApi';
export default {
      data() {
        return {
             dialogVisible: false,
             loading: true,
             client_name: "",
             clientData: "", 

             selected_id: "", 
             selected_name: "",   
             background: false,
            disabled: false,
            small: false,
            pageSize: 20,   
            currentPage: 1,  
            total: 0,   
        }
      },
     props: ['oldClientId', 'titleHeader', 'salesId'],
     emits :{
        clientData: null, 
    },
     created(){ 
          this.getClientData();
     },
    methods: {
       
        showModel(){
            if(this.salesId != null && this.salesId != undefined && this.salesId != ""){
               this.dialogVisible = true; 
               this.getClientData();
               this.showError = false;               
            }
            else{
                this.showError = true;
            }            
        },
        
        async getClientData(){         
            let response = await authApi({
                method: 'POST',
                api: '/getclient',
                params: {
                       id: '',
                       keyword: '',
                       status: '',                       
                    //    page: '',
                       page: this.currentPage,
                       limit: this.pageSize,
                    //    limit: ''
                },
                data: {
                    sales_invoice_id: this.salesId
                } 
            });
            if(response.message){            
                const list= response.data.data;
                this.clientData= list;
                this.total = response.data.total;              
               
                if(this.oldClientId !=null){
                    this.clientData.forEach((value)=> {
                        if(value.clientid == this.oldClientId){
                            this.selected_id = value.clientid;
                            this.client_name= value.client_name;
                        }                   
                    })  
                }
                
            }          
        }, 
         selectProjectName(){
            if(this.selected_id != null && this.selected_id != undefined && this.selected_id != ""){    
                this.client_name = this.clientData.find(x=> x.clientid == this.selected_id).client_name;         
                this.$emit("clientData", this.selected_id);
                this.dialogVisible = false;
            }        
        }, 
        handleSelectionChange(val){          
           this.selected_id = val.clientid;
        },
        handleSizeChange(val){
           this.pageSize = val;
        //    this.getData();
            this.getClientData(); 
        },
        handleCurrentChange(val){
           this.currentPage =val;
        //    this.getData();
            this.getClientData(); 
        } 
    }
}
</script>
