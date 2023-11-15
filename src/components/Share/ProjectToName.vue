<template>
    <div class="form-group mb-3">             
            <label for="project_name_to">
                <span class="text-danger">*</span> <small><b>{{ $t('project_to_name') }}</b></small>
            </label>
            <el-input type="text" :placeholder="$t('please_enter')" class="" id="project_name_to" 
            v-model="project_name" @click="dialogVisible = true" clearable/>
    </div>
    <el-dialog v-model="dialogVisible" :title="titleHeader" width="60%" draggable>
        <div class="container-fluid">
            <div class="row mx-2 mb-4">
                <el-table :data="projectData" border style="width: 100%;"  @row-click="handleSelectionChange">
                    <el-table-column fixed label="" width="60" >
                        <template #default="scope">
                            <el-radio-group v-model="selected_id" class="ml-4">
                                <el-radio :label="scope.row.project_id" size="large">{{ selected_name }}</el-radio>                                  
                              </el-radio-group>                              
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('project_name')" width="180px" > 
                        <template #default="scope">
                            {{ scope.row.project_name }}                           
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('participation_status')" width="180px"> 
                        <template #default="scope">
                            {{ scope.row.participation_status }}                               
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('archive_status')" width="180px"> 
                        <template #default="scope">
                            {{ scope.row.archive_status }}                              
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('item_number')" width="180px"> 
                        <template #default="scope">
                            {{ scope.row.project_itemid }}                             
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('project_status')" width="180px"> 
                        <template #default="scope">
                            {{ scope.row.project_status }}                              
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('types_of_section')" width="180px"> 
                        <template #default="scope">
                            {{ scope.row.section_type }}                             
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('project_manager')" width="180px"> 
                        <template #default="scope">
                            {{ scope.row.project_manager }}                              
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('start_date')" width="180px"> 
                        <template #default="scope">
                            {{ scope.row.start_date }}                               
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('completion_date')" width="180px"> 
                        <template #default="scope">
                            {{ scope.row.completion_date }}                              
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('party_a_unit')" width="180px"> 
                        <template #default="scope">
                            {{ scope.row.archive_status }}                               
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('construction_unit')" width="180px"> 
                        <template #default="scope">
                            {{ scope.row.archive_status }}                                
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('construction_address')" width="180px"> 
                        <template #default="scope">
                            {{ scope.row.construction_address }}                           
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
import $ from 'jquery';

export default {
      props: ['oldProjectToId',  'projectDisabled'],
      data() {
        return {
            
             
             dialogVisible: false,
             loading: true,
             selected_id: "", 
             selected_name: "",           
             project_id: "",
             project_name: "",
             projectData: [],
          
            background: false,
            disabled: false,
            small: false,
            pageSize: 20,   
            currentPage: 1,  
            total: 0,   
        }
      },
      emits :{
        projectData: null, 
    },
    created() {
      this.getProjectData();      
    },     
    methods: {  
        async getProjectData(){            
            let response = await authApi({
                method: 'POST',
                api: '/projectmanagement/getproject',
                params: {
                       id: '',
                       keyword: '',
                    //    status: '',                       
                    //    page: '',
                    //    limit: ''
                       page: this.currentPage,
                       limit: this.pageSize,
                }   
            });
            if(response.status == 200){            
                const list= response.data.data;                
                this.projectData= list; 
                this.total = response.data.total;                
                this.projectData.forEach((value)=> {
                    if(value.project_id == this.oldProjectToId){
                        this.selected_id = value.project_id;
                        this.project_name = value.project_name;
                    }
                })                         
                this.loading = false;              
            }          
        }, 
        selectProjectName(){
            if(this.selected_id != null && this.selected_id != undefined && this.selected_id != ""){    
                this.project_name = this.projectData.find(x=> x.project_id == this.selected_id).project_name;         
                this.$emit("projectData", this.selected_id);
                this.dialogVisible = false;
            }                
        },
        handleSelectionChange(val){          
           this.selected_id = val.project_id;
        },
        handleSizeChange(val){
           this.pageSize = val;
        //    this.getData();
           this.getProjectData(); 
        },
        handleCurrentChange(val){
           this.currentPage =val;
        //    this.getData();
           this.getProjectData(); 
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