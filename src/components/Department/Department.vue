<template>    
   <div class="container-fluid"  @click="$store.commit('setActive', false)" >
    <div class="row">
            <div class="col-md-11">
                <div class="row my-2">
                    <div class="col-md-4">               
                        <div class="input-group">
                            <div class="input-group-prepend">
                            <div class="input-group-text"> <font-awesome-icon icon="fa-solid fa-search" /></div>
                            </div>
                            <input type="text" class="form-control" v-model="formSearching" id="inlineFormInputGroup" :placeholder="$t('enter_keyword')"  v-on:keyup.enter="searching()">
                        </div>                 
                    </div>
                    <div class="col-md-4"> 
                        <div style="margin-top: 5px;">
                            <el-button v-show="!showAdvanced" @click="searching()">{{ $t('search') }}</el-button> 
                        </div>
                    </div> 
                    
                    <div class="col-md-4">
                        <div class="" style="">
                            <div class="form-group">                                               
                                <el-select v-model="office_id" :placeholder="$t('please_choose')"  style="width: 100%" @change="getData">
                                    <el-option
                                    v-for="item in officeData"
                                    :key="item.office_name"
                                    :label="item.office_name"
                                    :value="item.office_id"
                                    />  
                                </el-select>
                            </div>
                        </div>
                    </div>
                     
                </div> 
            </div>  
            <div class="col-md-1 mt-2">
                        <div class="" style="float: right;">
                            <router-link to="/department/create">
                            <button type="button" class="btn btn-sm btn-success">                     
                                    <font-awesome-icon icon="fa-solid fa-plus" /> <span class="ml-1">{{ $t('add') }}</span>                                            
                            </button>
                            </router-link>
                        </div> 
                    </div>           
    </div>
   </div> 
    <div v-loading="loading" class="loading__div" v-if="loading"></div>  
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading">       
        <div class="row mx-2">     
            <el-table :data="data" border style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column  fixed type="selection" width="55" />          
            <el-table-column prop="department_name" label="Department Name" width="1000" />               
            <el-table-column fixed="right" :label="$t('operate')"  width="200" >
            <template #default="scope">
             <div class="action__btn d-flex">
                            <router-link :to="`/department/edit/${scope.row.departmentid}`"
                            v-show="updateBtn">
                                <el-tooltip
                                    class="box-item"
                                    effect="dark"
                                    :content="$t('edit')"
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
                            <button class="btn-danger circle__btn" @click="deleteAll(scope.row.departmentid)" v-show="deleteBtn">
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
    name: 'Department',
    data() {
        return {  
            
            pageCount: 1,
            pageCountActive: 1,
            selectedCount: 0,
            data: [],  
            formData: {
                name: ''
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
            officeData: [], 
            office_id: "",  
            
            showBtn: false,
            createBtn: false,
            updateBtn: false,
            deleteBtn: false,
        }
    },   
    computed: {
        selectedCount(){
            return this.selectedData.length;
        }
    }, 
    created(){    
        this.getOffice();   
       
    },
    methods:{     
        async searching(){ 
            if(this.formSearching != ""){
                let response = await authApi({
                method: 'GET',
                api: '/department',
                params: {
                       id: '',                       
                       keyword: this.formSearching,
                       status: '',                       
                       page: '',
                       limit: ''
                }   
                });
                if(response.message){   
                    this.data=[];            
                    const list= response.data.data;
                    this.data = list.map(v => ({...v, isSelected: false})); 
                    this.pageCount = response.data.pagecount;
                }
            }
            else{
                this.data=[];
                this.getData();
            }
        },      
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
            if(response.status == 200){ 
                console.log('list'+ JSON.stringify(response))                 
                this.officeData = response.data.message;
                this.office_id= this.officeData[0].office_id;
                this.getData();
                          
            }          
        }, 
        async deleteAll(id = null){          
            
            let list=[];            
            if(id != null && id != ""){
                list.push(id);             
            }
            else{
                for(let i=0; i< this.data.length; i++){
                    if(this.data[i].isSelected){
                        list.push(this.data[i].departmentid);                    
                    }
                }
            } 
          
            if(list.length > 0){
                let response = await authApi({
                method: 'DELETE',
                api: '/department',
                params: {
                       id: '',
                       keyword: '',
                       status: '',                       
                       page: this.pageCountActive,
                       limit: ''
                                          
                },
                data: {
                    "id_list": list
                }    
                });
                if(response.message){
                    this.selectedCount=0;
                    this.data=[];
                    this.getData();
                    toast.success("Department Delete successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
                }                         
            }
        },
        
        async getData(){    
            this.selectedData = [];
            this.data= [];   
            this.loading= true;             
            let response = await authApi({
                method: 'GET',
                api: '/department',
                params: {
                       id: '',
                       office_id: this.office_id,
                       keyword: '',             
                       page: this.currentPage,
                       limit: this.pageSize,
                }   
            });
            if(response.message){            
                const list= response.data.data;
                for(let i=0; i< response.data.method.length; i++){                   
                   if(response.data.method[i] === 'get'){
                       this.showBtn = true;            
                   }
                   if(response.data.method[i] === 'post'){
                       this.createBtn = true;            
                   }
                   if(response.data.method[i] == 'put'){
                       this.updateBtn = true;            
                   }
                   if(response.data.method[i] == 'delete'){
                       this.deleteBtn = true;       
                   }                                       
               }   
               this.data= list; 
                console.log('data'+ JSON.stringify(this.data));
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