<template>  
    <div v-loading="loading" class="loading__div" v-if="loading"></div>   
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading"> 
        <div class="row">
            <div class="col-md-8">
                <div class="row my-2">
                    <div class="col-md-6">               
                        <div class="input-group">
                            <div class="input-group-prepend">
                            <div class="input-group-text"> <font-awesome-icon icon="fa-solid fa-search" /></div>
                            </div>
                            <input type="text" class="form-control" v-model="formSearching" id="inlineFormInputGroup" :placeholder="$t('enter_keyword')"  v-on:keyup.enter="searching()">
                        </div>                 
                    </div>
                    <div class="col-md-6"> 
                        <div style="margin-top: 5px;">
                            <el-button v-show="!showAdvanced" @click="searching()">{{ $t('search') }}</el-button> 
                        </div>
                    </div> 
                </div> 
            </div>
            <div class="col-md-4 mt-2">
                <div class="" style="float: right;">
                    <button type="button" class="btn btn-sm btn-success" @click="dialogVisible = true">
                        <font-awesome-icon icon="fa-solid fa-plus" /> <span class="ml-1">{{ $t('add') }}</span>
                    </button>
                </div>
                
            </div>
        </div>
        <div class="row mx-2">
            <el-table :data="data" border style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column  fixed type="selection" width="55" />          
                <el-table-column prop="margin_type_name" :label="$t('name')" width="500" sortable />
                <el-table-column :label="$t('state')" width="500" > 
                    <template #default="scope">
                        <span v-if="scope.row.status">Archived</span>
                        <span v-if="!scope.row.status">Unarchived</span>
                    </template>
                </el-table-column>                
                <el-table-column fixed="right" :label="$t('operate')"  width="500" >
                    <template #default="scope">
                        <el-button type="button" class="btn btn-sm btn-primary mr-2" @click="editFormModel(scope.row)">
                            <font-awesome-icon icon="fa-solid fa-pencil-square" /> <span class="ml-2">{{ $t('edit') }}</span>
                        </el-button>
                        <el-button type="button" class="btn btn-sm btn-danger mr-2" @click="deleteAll(scope.row.margin_type_id)">
                            <font-awesome-icon icon="fa-solid fa-trash" /> <span class="ml-2">{{ $t('delete') }}</span>
                        </el-button>
                        <el-button type="button" class="btn btn-sm btn-success " @click="archive(scope.row)">
                            <font-awesome-icon icon="fa-solid fa-file-archive" /> <span class="ml-2">{{ $t('archive') }}</span>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table> 

            <!-- end -->

        </div> 
    </div>
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
    <!-- create Model -->    
    <el-dialog v-model="dialogVisible" :title="$t('new_margin_type')" width="30%" center="true" draggable>     
        <div class="container-fluid">
            <div class="row">
                <div class="form-group">
                    <label for="type_of_work"> {{ $t('margin_type') }}</label>
                    <el-input type="text" v-model="formData.name" :placeholder="$t('please_enter')" 
                    :class="{ error_border:errorMessage }" clearable />
                    <span v-if="errorMessage" class="text-danger">Please enter the margin type</span>
                </div>                 
            </div>
        </div>        
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">{{ $t('cancel') }}</el-button>
            <el-button type="primary" @click="createForm">
                {{ $t('sure') }}
            </el-button>
          </span>
        </template>
    </el-dialog>

    <!-- edit Model -->   
    <el-dialog v-model="dialogEditVisible" :title="$t('new_margin_type')" width="30%" center="true" draggable>     
        <div class="container-fluid">
            <div class="row">
                <div class="form-group">
                    <label for="type_of_work"> {{ $t('margin_type') }}</label>
                    <el-input type="text" v-model="editFormData.margin_type_name" :placeholder="$t('please_enter')" 
                    :class="{ error_border:errorMessage }" clearable />
                    <span v-if="errorMessage" class="text-danger">Please enter the margin type</span>
                </div>                 
            </div>
        </div>        
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogEditVisible = false">{{ $t('cancel') }}</el-button>
            <el-button type="primary" @click="saveFormModel">
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
    name: 'BasicMarginType',
    data() {
        return {
            loading: false,
            data: [],  
            formData: {
                name: ''
            },      
            errorMessage: false,
            formSearching: "" ,
            editFormData: "",      
            selectedData: [],
             //pagination
            background: false,
            disabled: false,
            small: false,
            pageSize: 20,   
            currentPage: 1,  
            total: 0, 
            
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
        this.getData()
    },
    methods:{
       
        async archive(items){ 
            let archive="";
            archive = !items.status;       
            let response = await authApi({
                method: 'PUT',
                api: '/margintype',
                params: {
                       status: '',
                       name: '',
                       page: '',
                       limit: ''
                },
                data: {
                    margin_type_id: items.margin_type_id,
                    margin_type_name: items.margin_type_name,                  
                    status: archive
                }
            });
            if(response.status == 200){             
                toast.success("Archive successful!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
               this.getData();
            }
        },  
        editFormModel(items){
            this.dialogEditVisible = true;          
            this.editFormData = items;
        },
        async saveFormModel(){
            let response = await authApi({
                method: 'PUT',
                api: '/margintype',
                params: {
                       status: '',
                       name: '',
                       page: '',
                       limit: ''
                },
                data: {
                    margin_type_id: this.editFormData.margin_type_id,
                    margin_type_name: this.editFormData.margin_type_name,    
                }
            });
            if(response.message){
                toast.success("margin type Update successful!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });                
                this.dialogEditVisible = false;  
                this.getData();     
            }
        },
        async searching(){ 
            if(this.formSearching != ""){
                let response = await authApi({
                method: 'GET',
                api: '/margintype',
                params: {
                       status: '',
                       name: this.formSearching,
                       page: '',
                       limit: ''
                }   
                });
                if(response.message){   
                    this.data=[];            
                    let list= response.data.data;
                    for(let i=0; i< list.length; i++){
                        let item= {"margin_type_id": list[i].margin_type_id,"margin_type_name":list[i].margin_type_name,
                        "status": list[i].status, isSelected: false};
                        this.data.push(item)
                    }
                    this.pageCount = response.data.pagecount;
                }
            }
            else{
                this.data=[];
                this.getData();
            }
        },
        
        async createForm(e){
           e.preventDefault()            
           if(this.formData.name == "" || this.formData.name == null){
            this.errorMessage = true;           
           }
           else{ 
            let response = await authApi({
                method: 'POST',
                api: '/margintype',                 
                data:{
                    margin_type_name: this.formData.name,
                }
            });
            if(response.message){
                this.dialogVisible = false;
                toast.success("margin type insert successful!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
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
                    list.push(this.selectedData[i].margin_type_id);         
                }                
            } 
          
            if(list.length > 0){
                let response = await authApi({
                method: 'DELETE',
                api: '/margintype',
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
                    toast.success("margin type Delete successful !", {
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
                api: '/margintype',
                params: {
                       status: '',
                       name: '',
                       page: this.currentPage,
                       limit: this.pageSize,
                }   
            });
            if(response.status == 200 ){
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
<style lang="scss" >
section#content {
    height: 85vh !important;
}
.search_btn {
    padding: 10px 15px;
    font-size: 12px;
    border-radius: 3px;
    border: 1px solid #ddd;

}
.table-header {
    background-color: #F6F6F7;
    th {
        color: #909399;
    }
}

.archive_color {
    background: rgba(234,84,85,.12);
    color: #ea5455;
}
.unarchive_color {
    background: rgba(80,165,241,.12);
    color: #50a5f1;
}
.footer__bar {
    position: fixed;
    border-top: 2px solid #eee;
    background: #fff;
    bottom: 0;
    width: 100%;
    height: 65px;
    .footer__btn {
        padding: 6px 15px;
        font-size: 12px;
        border-radius: 3px;
        border: 1px solid #ddd;
    }
}
.pagination {
    .active {
        background: blue;
        color: #fff;
    }
}
.error_border {
    border-color: red !important;
}

@media only screen and (min-width: 1024px) {
 #dynamicLabelCreate > .modal-dialog , #dynamicLabelEdit > .modal-dialog {
    max-width: 800px !important;
 }
}
</style>