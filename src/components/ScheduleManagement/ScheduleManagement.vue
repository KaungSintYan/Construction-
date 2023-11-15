<template>  
    <div v-loading="loading" class="loading__div" v-if="loading"></div>   
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading"> 
        <!-- <div class="row">
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
                            <span class="search_btn" @click="searching()">{{ $t('search') }}</span>
                        </div>
                    </div> 
                </div> 
            </div>
            <div class="col-md-4 mt-2">
                <div class="" style="float: right;">
                    <router-link to="/sales_invoice/create">
                    <button type="button" class="btn btn-sm btn-success">                     
                            <font-awesome-icon icon="fa-solid fa-plus" /> <span class="ml-1">{{ $t('add') }}</span>                                            
                    </button>
                    </router-link>
                </div>
                
            </div>
        </div> -->
        <div class="row mx-2" v-for="(items, i) of data" :key="i" >        
            <div class="container-fluid" @click="goToProjectDetail(items.project_id)">
                <div class="row">
                    <div class="col-12">
                        <div class="row">
                            <span class="mr-2 mx-2">{{ items.project_name }}</span>  <el-tag>{{ items.project_status }}</el-tag>
                        </div>
                        <div class="row my-4" >
                            <div class="col-sm-6 d-flex justify-content-between"> 
                                <span class="text-muted"><img src="../../assets/planner.png" class="mr-1" alt="planner_icon" width="26"> Plan to start: {{ items.start_date }} </span>                      
                                <span class="text-muted">Planned Completion: {{ items.completion_date }} </span>
                            </div>
                            <div class="col-sm-6 d-flex justify-content-end">
                                <span class="text-muted">Planned duration <span class="text-warning">{{ items.planned_duration }} day</span></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="demo-progress">
                                <el-progress :percentage="items.complete_task" />
                            </div>                  
                        </div>
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
    name: 'ScheduleManagement',
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
            deleteBtn: false            
        }
    }, 
    created(){        
        this.getData();
    },
    methods:{   
        goToProjectDetail(id){
            this.$router.push("/schedule/project_detail/"+ id);
        },           
        async getData(){     
            this.data= []; 
            this.loading = true;  
            let response = await authApi({
                method: 'POST',
                api: '/projectmanagement/getproject',
                params: {
                       id: '',
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
                console.log('project'+ JSON.stringify(this.data));
                this.total = response.data.total;
                this.loading = false;
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
                api: '/financialmanagement/payment_registration',
                params: {
                       id: '',
                       keyword: '',
                       status: '',                       
                       page: "",
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
                    toast.success("Schedule Management Delete successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
                }                         
            }
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