<template>
    <div class="form-group">       
        <label for="department">
            <small><b> {{ $t('printing_dep') }}</b></small> 
            <!-- {{ titledepartment }} -->
         </label>  
        <el-input type="text" class="" id="department" :placeholder="$t('please_enter')" 
        v-model="department_name"  @click="dialogVisible = true" />  
     </div>    
     <el-dialog v-model="dialogVisible" :title="titledepartment" width="60%" draggable>
        <div class="container-fluid">
            <div class="row mx-2 mb-4">
                <el-table :data="departmentData" border style="width: 100%;"  @row-click="handleSelectionChange">
                    <el-table-column fixed label="" width="60" >
                        <template #default="scope">
                            <el-radio-group v-model="selected_id" class="ml-4">
                                <el-radio :label="scope.row.departmentid" size="large">{{ selected_name }}</el-radio>                                  
                              </el-radio-group>                              
                        </template>
                    </el-table-column>                    
                    <el-table-column :label="$t('name')" width="750px"> 
                        <template #default="scope">
                            {{scope.row.department_name}}
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
             department_name: "",
             departmentData: "",               
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
     props: ['oldDepartmentId', 'titledepartment', 'officeId'],
     emits :{
        departmentData: null, 
    },
     created(){ 
          this.getDepartment();
     },
    methods: {    
        
        async getDepartment(){   
                 
            let response = await authApi({
                method: 'GET',
                api: '/department',
                params: {
                       id: '',
                       office_id: this.officeId,
                       keyword: '',                       
                       page: '',
                       limit: '',
                }   
            });
            if(response.message){  
                console.log('dep'+ JSON.stringify(response.data.data)); 
                const list= response.data.data;
                this.departmentData = list;
                this.total = response.data.total; 
                if(this.oldDepartmentId !=null){
                    this.departmentData.forEach((value)=> {
                        if(value.departmentid == this.oldDepartmentId){
                            this.selected_id = value.departmentid;
                            this.department_name= value.department_name;
                        }                   
                    })  
                }               
            }          
        }, 
        selectDepartmentName(){
            if(this.selected_id != null && this.selected_id != undefined && this.selected_id != ""){    
                this.department_name = this.departmentData.find(x=> x.departmentid == this.selected_id).department_name;                   
                this.$emit("departmentData", this.selected_id);
                this.dialogVisible = false;
            }  
                     
        }, 
        handleSelectionChange(val){          
           this.selected_id = val.departmentid;
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
