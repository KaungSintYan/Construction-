<template>  

        <div class="row mx-2">
                        <el-table :data="data" border style="width: 100%" @selection-change="handleSelectionChange">
                            <el-table-column  fixed type="selection" width="55" />          
                            <el-table-column prop="team_name" :label="$t('team_name')" width="250" sortable />
                            <el-table-column prop="team_leader" :label="$t('team_leader')" width="250" sortable />
                            <el-table-column prop="phone_number" :label="$t('ph_no')" width="250" sortable />
                            <el-table-column prop="people" :label="$t('people')" width="250" sortable />
                            <el-table-column prop="remark" :label="$t('remark')" width="250" sortable />
                            <el-table-column prop="created_by_user" :label="$t('created_by_user')" width="250" sortable />
                            <el-table-column prop="creation_time" :label="$t('creation_time')" width="250" sortable />
       
                            <el-table-column fixed="right" :label="$t('operate')"  width="500" >
                                <template #default="scope"> 
                                    <el-tooltip
                                                class="box-item"
                                                effect="dark"
                                                :content="$t('edit')"
                                                placement="top"
                                                >
                                                <el-button type="button" class="btn btn-sm btn-primary mr-2" @click="workTypeEdit(scope.row)">
                                                    <font-awesome-icon icon="fa-solid fa-pencil-square" /> <span class="ml-2">{{ $t('edit') }}</span>
                                                </el-button>
                                    </el-tooltip>
                                    <el-tooltip
                                                class="box-item"
                                                effect="dark"
                                                :content="$t('delete')"
                                                placement="top"
                                                >
                                                <el-button type="button" class="btn btn-sm btn-danger mr-2" @click="deleteAll(scope.row.team_id)">
                                                    <font-awesome-icon icon="fa-solid fa-trash" /> <span class="ml-2">{{ $t('delete') }}</span>
                                                </el-button>
                                    </el-tooltip>                                   

                                </template>
                            </el-table-column>
                        </el-table> 
                    </div> 

                    <!-- end -->
    
    <div class="footer__bar">
        <div class="container-fluid mt-3">           
            <div class="row">
                <div class="col-sm-6">
                      <span>{{ $t('selected') }} {{ selectedCount }} {{ $t('strip') }}</span>
                      <button type="button" class="footer__btn ml-2 mr-2" @click="deleteAll()" :disabled="selectedCount == 0">{{ $t('delete') }}</button>                                       
                </div>
                <div class="col-sm-6">
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
    </div> 
    <!-- create model -->
    <el-dialog v-model="dialogVisible" title="New job type" width="30%" center="true" draggable>     
        <div class="container-fluid">
            <div class="row">
                <div class="form-group">
                    <label for="type_of_work"> {{ $t('type_of_work') }}</label>
                    <el-input type="text" v-model="formData.name" :placeholder="$t('please_enter')" 
                    :class="{ error_border:errorMessage }" clearable />
                    <span v-if="errorMessage" class="text-danger">Please enter the job type name</span>
                </div> 
                
            </div>
        </div>        
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="workTypeCreate">
              Confirm
            </el-button>
          </span>
        </template>
    </el-dialog>
    <!-- edit model -->
    <el-dialog v-model="dialogEditVisible" title="Edit Team List" width="30%" center="true" draggable>     
        <div class="container-fluid">
            <div class="row">
                <div class="form-group">
                    <label for="team_list"> {{ $t('team_list') }}</label>
                    <el-input type="text" v-model="editFormData.team_name" :placeholder="$t('please_enter')" 
                    :class="{ error_border:errorMessage }" clearable />
                    <span v-if="errorMessage" class="text-danger">Please enter the job type name</span>
                </div> 
                
            </div>
        </div>        
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogEditVisible = false">Cancel</el-button>
            <el-button type="primary" @click="workTypeEditSave">
              Save
            </el-button>
          </span>
        </template>
    </el-dialog>    
    
</template>
<script>
import {authApi} from '@/http/authApi'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    name: 'TeamList',
    data() {
        return {
            loading: false,            
            data: [],  
            formData: {
                name: '',
                team_id: '',
                team_name: ''
            },       
            errorMessage: false,
            formSearching: "" ,
            editFormData: "",
            
            loading: false,
            selectedData: [],
             //pagination
            background: false,
            disabled: false,
            small: false,
            pageSize: 20,   
            currentPage: 1,  
            total: 0, 

            //permission
            showBtn: false,
            createBtn: false,
            updateBtn: false,
            deleteBtn: false,
            dialogVisible: false,
            dialogEditVisible: false,
        }
    },  
    computed: {        
        selectedCount(){
            return this.selectedData.length;
        }
    },   
    created(){        
        this.getData();
    },
    methods:{
        async archive(items){                  
            let archive="";
            archive = !items.status;       
            let response = await authApi({
                method: 'PUT',
                api: '/constructionmanagement/team',
                params: {
                       status: '',
                       name: '',
                       page: '',
                       limit: ''
                },
                data: {
                    team_id: items.team_id,
                    team_name: items.team_name,
                    status: archive
                }
            });
            if(response.status == 200){             
                toast.success("Archive successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
               this.getData();
            }
        },       
        workTypeEdit(items){
            this.dialogEditVisible = true;          
            this.editFormData = items;
        },
        async workTypeEditSave(){
            let response = await authApi({
                method: 'PUT',
                api: '/constructionmanagement/team',
                params: {
                       status: '',
                       name: '',
                       page: '',
                       limit: ''
                },
                data: {
                    team_id: this.editFormData.team_id,
                    team_name: this.editFormData.team_name
                }
            });
            if(response.status == 200){
                toast.success("Team List Update successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
                this.getData();
                this.dialogEditVisible = false;               
            }
        },
      
        async workTypeCreate(e){
           e.preventDefault()            
           if(this.formData.name == "" || this.formData.name == null){
            this.errorMessage = true;           
           }
           else{ 
            let response = await authApi({
                method: 'POST',
                api: '/constructionmanagement/team',                 
                data:{
                   team_name: this.formData.name
                }
            });
            if(response.message){
                this.dialogVisible = false;
                this.getData();    
            }
           }
        },
       
        
        async deleteAll(id = null){ 
            let list=[];            
            if(id != null && id != ""){
                list.push(id);             
            }
            else{
                for(let i=0; i< this.selectedData.length; i++){
                    list.push(this.selectedData[i].team_id);         
                }                
            } 
          
            if(list.length > 0){
                let response = await authApi({
                method: 'DELETE',
                api: '/constructionmanagement/team',
                params: {
                       status: '',
                       name: '',
                       page: this.pageCountActive,
                       limit: '',                      
                },
                data: {
                    "id_list": list
                }    
                });
                if(response.message){                   
                    toast.success("Team List Delete successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
                    this.getData();
                }                         
            }
        },
      
        async getData(){  
            this.data= [];
            this.loading = true;       
            let response = await authApi({
                method: 'GET',
                api: '/constructionmanagement/team',
                params: {
                       status: '',
                       name: '',
                       page: this.currentPage,
                       limit: this.pageSize,
                }   
            });
            if(response.message){               
                this.data= response.data.data;
                this.total = response.data.total;
                this.loading = false;
            }
          
        },
        handleSelectionChange(val){
            this.selectedData = val;
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
