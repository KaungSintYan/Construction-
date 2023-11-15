<template>  
    <div class="container-fluid"  @click="$store.commit('setActive', false)">
        <div class="row">
            <div class="col-md-8">
                <div class="row my-2">
                    <div class="col-md-6">               
                        <div class="input-group">
                            <div class="input-group-prepend">
                            <div class="input-group-text"> <font-awesome-icon icon="fa-solid fa-search" /></div>
                            </div>
                            <input type="text" class="form-control" v-model="formSearching" id="inlineFormInputGroup" placeholder="Please enter keywords to search"  v-on:keyup.enter="searching()">
                        </div>                 
                    </div>
                    <div class="col-md-6"> 
                        <div style="margin-top: 5px;">
                            <span class="search_btn" @click="searching()">Search</span>
                        </div>
                    </div> 
                </div> 
            </div> 
            <div class="col-md-4 mt-2">
                <div class="" style="float: right;">
                    <router-link to="/users/create">
                    <button type="button" class="btn btn-sm btn-success">                     
                            <font-awesome-icon icon="fa-solid fa-plus" /> <span class="ml-1">{{ $t('add') }}</span>                                            
                    </button>
                    </router-link>
                </div>
                
            </div>           
        </div>
        <div class="row mx-2">   
            <el-table :data="data" border style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column  fixed type="selection" width="55" />
                <el-table-column prop="username" label="UserName" width="200" sortable />
                <el-table-column prop="employee_no" label="Employee No" width="200" />
                <el-table-column prop="user_status" label="User Status" width="200" sortable />                    
                <el-table-column label="Picture" width="200"> 
                    <template #default="scope">
                        <img :src="scope.row.profile_picture.url" alt="" width="20">
                    </template>                   
                </el-table-column>
                <el-table-column prop="department" label="Department" width="200" sortable />
                <el-table-column prop="user_role" label="User Role" width="200" sortable />                 
                <el-table-column fixed="right" :label="$t('operate')"  width="160" >
                <template #default="scope">
                 <div class="action__btn d-flex">                      
                                <router-link :to="`/users/show/${scope.row.userid}`">
                                    <el-tooltip
                                        class="box-item"
                                        effect="dark"
                                        content="show"
                                        placement="top"
                                    >
                                    <button class="btn-primary circle__btn">
                                        <font-awesome-icon icon="fa-solid fa-pencil" class="icon"/>
                                    </button>
                                    </el-tooltip>                         
                                </router-link>    
                                <el-tooltip
                                class="box-item"
                                effect="dark"
                                :content="$t('delete')"
                                placement="top"
                                >
                                <button class="btn-danger circle__btn" @click="deleteAll(scope.row.userid)" >
                                    <font-awesome-icon icon="fa-solid fa-trash" class="icon"/>
                                </button>
                                </el-tooltip> 
                 </div>
                </template>
                </el-table-column>
            </el-table>        
                  
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
    
</template>
<script>
import {authApi} from '@/http/authApi'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
    name: 'Users',
    data() {
        return {   
            // indeterminate: false,     
            // checkall: true,
            // pageCount: 1,
            // pageCountActive: 1,
            // selectedCount: 0,
            // data: "",  
            // formData: {
            //     name: ''
            // },       
            // errorMessage: false,
            // formSearching: "" ,
            // editFormData: "",  
            
            //
            data: [], 
            loading: false,
            selectedData: [],
            //pagination
            background: false,
            disabled: false,
            small: false,
            pageSize: 20,   
            currentPage: 1,  
            total: 0,
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
       
        async getData(){   
            this.data= [];   
            this.loading= true;         
            let response = await authApi({
                method: 'GET',
                api: '/cmsuser',
                params: {
                       id: '',
                       keyword: '',             
                       page: this.currentPage,
                       limit: this.pageSize,
                }   
            });
            if(response.message){            
                const list= response.data.data;
                this.data= list; 
                //console.log('data'+ JSON.stringify(this.data));
                this.total = response.data.total;
                this.loading = false;
            }          
        },
        async deleteAll(id = null){            
            let list=[];            
            if(id != null && id != ""){
                list.push(id);             
            }
            else{
                for(let i=0; i< this.selectedData.length; i++){
                     list.push(this.selectedData[i].userid);   
                }
            }           
            if(list.length > 0){
                let response = await authApi({
                method: 'DELETE',
                api: '/userdetail',
                params: {
                       id: '',
                       keyword: '',                 
                       page: '',
                       limit: ''
                                          
                },
                data: {
                    "id_list": list
                }    
                });
                if(response.message){  
                    this.getData();
                    toast.success("User Delete successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
                }                         
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
<style lang="scss">

#user__table {  
    width: 100% !important;
    overflow-x: scroll !important;

    .fixed__column__header {
        left: 0px;
        position: sticky;
        background: #F6F6F7;
        border: 1px solid #ddd;
    }
    .fixed__column{
        left: 0px;
        position: sticky;
        background: #fff;
        border: 1px solid #ddd;
    }
    .fixed__column__header_right {
        right: 0px;
        position: sticky;
        background: #F6F6F7;
        border: 1px solid #ddd;
    }
    .fixed__column_right{
        right: 0px;
        position: sticky;
        background: #fff;
        border: 1px solid #ddd;
    }
    
    .action__btn {
        .text {
            font-size: 12px;
        }
    }
   
}

.table td, .table th {
    padding: 0.25rem;
}
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