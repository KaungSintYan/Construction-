<template>   
    <div class="form-group mb-3">
        <label for="party_b">
           <span class="text-danger">*</span> <small><b>{{ $t('party_b') }}</b></small> 
        </label>
        <el-input type="text" id="party_b" class="" :placeholder="$t('please_enter')" 
        v-model="unit_name"  @click="dialogVisible = true"  clearable/>   
        <!-- <span v-if="v$.unit_name.$error" class="text-danger">
            {{ v$.unit_name.$errors[1].$message }}
        </span>   -->
    </div>

    <el-dialog v-model="dialogVisible" :title=" $t('party_b')" width="60%" draggable>
        <div class="container-fluid">
            <div class="row mx-2 mb-4">
                <el-table :data="internalData" border style="width: 100%;"  @row-click="handleSelectionChange">
                    <el-table-column fixed label="" width="60" >
                        <template #default="scope">
                            <el-radio-group v-model="selected_id" class="ml-4">
                                <el-radio :label="scope.row.unitid" size="large">{{ selected_name }}</el-radio>                                  
                              </el-radio-group>                              
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('internal_unit_name')" width="260px"> 
                        <template #default="scope">
                            {{scope.row.unitname}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('contact_person')" width="260px"> 
                        <template #default="scope">
                            {{scope.row.contact_person}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('contact_number')" width="260px"> 
                        <template #default="scope">
                            {{scope.row.contact_number}}
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
             dialogVisible: false,
             unit_name: "",
             internalData: "",     
             
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
     props: ['oldInternalUnitId'],
     created(){ 
          this.getInternalUnit();
     },
    emits :{
        internalUnitData: null, 
    },
    methods: {
        
        async getInternalUnit(){         
            let response = await authApi({
                method: 'GET',
                api: '/internalunit',
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
                this.internalData = list;
                this.total = response.data.total;             
                this.internalData.forEach((value)=> {
                    if(value.unitid == this.oldInternalUnitId){
                       this.selected_id = value.unitid;
                       this.unit_name= value.unitname;
                    }                   
                })                            
                            
            }          
        }, 
         selectProjectName(){
            if(this.selected_id != null && this.selected_id != undefined && this.selected_id != ""){    
                this.unit_name = this.internalData.find(x=> x.unitid == this.selected_id).unitname;         
                this.$emit("internalUnitData", this.selected_id);
                this.dialogVisible = false;
            }                    
        }, 
        handleSelectionChange(val){          
           this.selected_id = val.unitid;
        },
        handleSizeChange(val){
           this.pageSize = val;
        //    this.getData();
            this.getInternalUnit(); 
        },
        handleCurrentChange(val){
           this.currentPage =val;
        //    this.getData();
            this.getInternalUnit(); 
        }      
    }
}
</script>
