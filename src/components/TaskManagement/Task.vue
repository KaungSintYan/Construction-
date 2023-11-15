<template>  
    <div v-loading="loading" class="loading__div" v-if="loading"></div>   
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading"> 
        <div class="row my-2">
            <div class="col-sm-6">
                <router-link to="/task/create">
                    <el-button type="primary" >
                    <el-icon class="el-icon--left"><font-awesome-icon icon="fa-solid fa-plus" /></el-icon> {{ $t('add_task') }}
                  </el-button>
                </router-link>
            </div>
        </div>
        <div class="row mx-2">
            <el-tag class="mx-1" type="info" size="large" @click="changeTasks('')"  :effect="task_status == ''?'ligth' : 'dark'">All task</el-tag>
            <el-tag  v-for="(cat, i) of task_category" :key="i" class="mx-1" type="info" size="large" @click="changeTasks(cat.key)"  :effect="task_status == cat.key ?'ligth' : 'dark'">{{cat.value}}</el-tag>
        </div>     
        <div v-loading="subloading"  class="sub_loading__div" v-if="subloading"></div>     
        <div class="row mx-2 mt-2" v-for="(items, i) of data" :key="i" v-show="!subloading" >                   
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-8">
                        <div class="row">
                            <span class="mr-2 mx-2">{{ items.name }}</span>  <el-tag>{{ items.task_status }}</el-tag>
                        </div>
                        <div class="row my-4" >
                            <div class="col-sm-12 d-flex justify-content-between"> 
                                <sapn class="text-muted"><font-awesome-icon icon="fa-solid fa-user" class="mr-2" />{{ items.principal }} </sapn>                      
                                <sapn class="text-muted"><font-awesome-icon icon="fa-solid fa-calendar" class="mr-2" /> {{ items.start_date }}..{{ items.end_date }}</sapn>
                                <sapn class="text-muted"><font-awesome-icon icon="fa-solid fa-commenting" class="mr-2" />0</sapn>
                                <sapn class="text-muted">testing</sapn>
                            </div>                           
                        </div>                        
                    </div> 
                    <div class="col-sm-4 d-flex justify-content-end">
                        <span class="mt-3"><font-awesome-icon icon="fa-solid fa-star" class="text-primary" /></span>
                        <span class="icon__ellipsis">
                            <el-popover  popper-style="width: 100px !important;min-width: 100px !important;"
                            placement="bottom">  
                            <div class="container" >
                                <div class="row mb-2" >
                                    <router-link :to="`/task/edit/${items.task_id}`">
                                    <font-awesome-icon icon="fa-solid fa-pencil" style=" margin-right: 5px !important; padding: 2px !important;color: #7d7d7d;" /> edit
                                    </router-link>    
                                </div>
                                <div class="row" @click="deleteAll(items.task_id)"  >
                                    <font-awesome-icon icon="fa-solid fa-trash" style=" margin-right: 5px !important; padding: 2px !important;color: #7d7d7d;"  /> delete
                                </div>
                            </div> 
                       
                            <template #reference>
                                <font-awesome-icon icon="fa-solid fa-ellipsis-v" class="ellipsis__icon"/>
                            </template>
                            </el-popover>
                          
                        </span>
                    </div>
                </div>  
            </div>      
        </div> 
    </div>
    <div class="footer__bar">
        <div class="container-fluid mt-3">           
            <div class="row">
                <div class="col-sm-6">                     
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
    name: 'Task',
    data() {
        return { 
            data: [], 
            loading: false,           
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
            task_category : [
                {key: 'pending', value: 'Pending'},
                {key: 'in_progress', value: 'In Progress'},
                {key: 'overdue', value: 'Overdue'},
                {key: 'completed', value: 'Completed'},
            ], 
            task_status: "", 
            subloading: false,       
            subFirstLoading: false,              
        }
    }, 
    
    created(){        
        this.getData();        
    },
    methods:{  
        async getData(){     
            this.data= []; 
            if(!this.subFirstLoading){
                this.loading = true; 
            }           
            let response = await authApi({
                method: 'POST',
                api: '/constructionmanagement/get_task',
                params: {
                       id: '',
                       keyword: '',                     
                       page: this.currentPage,
                       limit: this.pageSize,                    
                },
                data: {
                    task_status: this.task_status,
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
                console.log('tasks'+ JSON.stringify(this.data));
                this.total = response.data.total;
                if(!this.subFirstLoading){
                    this.loading = false;
                }
                else{                   
                    this.subloading = false;
                }               
            }          
        },
        async deleteAll(id = null){      
            let list=[];            
            if(id != null && id != ""){
                list.push(id);             
            }
                
            if(list.length > 0){
                let response = await authApi({
                method: 'DELETE',
                api: '/constructionmanagement/task',
                params: {
                       id: '',
                       keyword: '',                                       
                       page: "",
                       limit: ''                                          
                },
                data: {
                    "id_list": list
                }    
                });
                if(response.message){
                    
                    this.getData();
                    toast.success("Task Delete successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
                }                         
            }
        }, 
        changeTasks(task){
            this.subloading = true;           
            this.task_status= task;
            this.subFirstLoading = true;
            this.getData();           
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
.icon__ellipsis {
    margin-top: 18px;
    margin-left: 10px;   
    .ellipsis__icon:focus {
        outline: none;
    }
}
.demo-progress {
    width: 100%;
    .el-progress--line {
        margin-bottom: 15px;   
    }
}

  section#content {
    height: 82vh !important;
}
</style>