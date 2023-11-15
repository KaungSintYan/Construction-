<template>
    <div class="form-group">       
        <label for="department">
            <small><b>{{ titleOffice }}</b></small>
         </label>  
        <el-input type="text" class="" id="department" :placeholder="$t('please_enter')" 
        v-model="office_name"  @click="dialogVisible = true" />  
     </div>    
     <el-dialog v-model="dialogVisible" :title="titleOffice" width="60%" draggable>
        <div class="container-fluid">
            <div class="row mx-2 mb-4">
                <el-table :data="officeData" border style="width: 100%;"  @row-click="handleSelectionChange">
                    <el-table-column fixed label="" width="60" >
                        <template #default="scope">
                            <el-radio-group v-model="selected_id" class="ml-4">
                                <el-radio :label="scope.row.office_id" size="large">{{ selected_name }}</el-radio>                                  
                              </el-radio-group>                              
                        </template>
                    </el-table-column>                    
                    <el-table-column :label="$t('name')" width="750px"> 
                        <template #default="scope">
                            {{scope.row.office_name}}
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
            <el-button type="primary" @click="selectDepartmentName" >{{ $t('sure') }}</el-button>           
          </span>
        </template>
    </el-dialog>


</template>
<script>
import {authApi} from '@/http/authApi';
export default {
      data() {
        return {     
             office_name: "",
             officeData: "",               
             selected_id: "", 
             selected_name: "", 
             dialogVisible: false,
             background: false,
             disabled: false,
             small: false,
             pageSize: 20,   
             currentPage: 1,   
             total: 0,  
        }
      },
     props: ['oldOfficeId', 'titleOffice'],
     emits :{
        officeData: null, 
    },
     created(){ 
          this.getOffice();
     },
    methods: {        
        async getOffice(){         
            let response = await authApi({
                method: 'GET',
                api: '/office',
                params: {
                       id: '',
                       keyword: '',                       
                       page: '',
                       limit: ''
                }   
            });
            if(response.message){ 
                console.log('list'+ JSON.stringify(response))                 
                this.officeData = response.data.message;
                this.total = response.data.total; 
                if(this.oldOfficeId !=null){
                    this.officeData.forEach((value)=> {
                        if(value.office_id == this.oldOfficeId){
                            this.selected_id = value.office_id;
                            this.office_name= value.office_name;
                        }                   
                    })  
                }               
            }          
        }, 
        selectDepartmentName(){
            if(this.selected_id != null && this.selected_id != undefined && this.selected_id != ""){    
                this.office_name = this.officeData.find(x=> x.office_id == this.selected_id).office_name;                   
                this.$emit("officeData", this.selected_id);
                this.dialogVisible = false;
            }  
                     
        }, 
        handleSelectionChange(val){          
           this.selected_id = val.office_id;
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
