<template>
    <div class="form-group">
        <label for="user_role">
            <small><b>UserRole</b></small>
         </label> 
         <el-input type="text"  id="userrole" placeholder="Please enter" 
            v-model="role_name"  @click="dialogVisible = true" clearable />
     </div> 
     <el-dialog v-model="dialogVisible" :title="titleHeader" width="60%" draggable>
        <div class="container-fluid">
            <div class="row mx-2 mb-4">
                <el-table :data="userroleData" border style="width: 100%;"  @row-click="handleSelectionChange">
                    <el-table-column fixed label="" width="60" >
                        <template #default="scope">
                            <el-radio-group v-model="selected_id" class="ml-4">
                                <el-radio :label="scope.row.role_id" size="large">{{ selected_name }}</el-radio>                                  
                              </el-radio-group>                              
                        </template>
                    </el-table-column>
                    <el-table-column label="Name" width="750px" > 
                        <template #default="scope">
                            {{ scope.row.role_name }}                           
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
            <el-button type="primary" @click="selectUserRoleName" >{{ $t('sure') }}</el-button>           
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
             loading: true,
             selected_id: "", 
             selected_name: "",
             role_name: "",
             userroleData: [],
             
             background: false,
             disabled: false,
             small: false,
             pageSize: 20,   
             currentPage: 1,  
             total: 0,   
        }
      },
     props: ['oldUserRoleId'],
     emits :{
        userroleData: null, 
    },
     created(){ 
          this.getUserRoleData();
     },
    methods: {        
        async getUserRoleData(){         
            let response = await authApi({
                method: 'GET',
                api: '/cmsrole',
                params: {
                       id: '',
                       keyword: '',                                           
                       page: '',
                       limit: ''
                }   
            });
            if(response.message){ 
                this.userroleData = response.data.data;
                this.total = response.data.total;               
                if(this.oldUserRoleId !=null){
                    this.userroleData.forEach((value)=> {
                        if(value.role_id == this.oldUserRoleId){
                            this.selected_id = value.role_id;
                            this.role_name= value.role_name;
                        }                   
                    });  
                } 
            }          
        }, 
         selectUserRoleName(){
            if(this.selected_id != null && this.selected_id != undefined && this.selected_id != ""){    
                this.role_name = this.userroleData.find(x=> x.role_id == this.selected_id).role_name;         
                this.$emit("userroleData", this.selected_id);
                this.dialogVisible = false;
            }        
        }, 
        handleSelectionChange(val){          
           this.selected_id = val.role_id;
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
