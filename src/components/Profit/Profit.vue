<template>  
    <div v-loading="loading" class="loading__div" v-if="loading"></div>   
    <div class="container-fluid"  @click="$store.commit('setActive', false)" > 
        <div class="row">
                    <div class="col-6">
                        <div class="form-group">
                            <label for="project_status">
                                <small><b>{{ $t('project_status') }}</b></small>   
                            </label>
                            <div class="form-group">
                                <!-- <el-select class="" style="width: 100%;" v-model="project_status" @change="getData()">                                  
                                    <el-option v-for="items in projectStatus" 
                                               :key="items.project_status"
                                                :label="items.project_status"
                                                :value="items.project_status"
                                               > 
                                               
                                    </el-option>                                      
                                </el-select> -->
                                <!-- <el-select style="width: 100%;" id="project_status" v-model="project_status" @change="getData()">                          
                                    <el-option value="">{{$t('please_choose')}}</el-option>
                                    <el-option v-for="items of projectStatus" :key="items.project_status_id" :label="items.project_status_name" :value="items.project_status_id">{{ items.project_status_name }}</el-option>                           
                                </el-select> -->
                                <el-select style="width: 100%" id="project_status" placeholder="On Going" v-model="project_status" @change="getData()">
                                    <el-option label="On Going" value="on_going">On Going</el-option>
                                    <el-option label="Completed" value="completed">Completed</el-option>
                                    <el-option label="Pending" value="pending">Pending</el-option>
                                    <el-option label="Overdue" value="overdue">Overdue</el-option>
                                </el-select>
                            </div>    

                        </div>

                    </div>
                    
        </div>
    </div>
    <div v-loading="loading" class="loading__div" v-if="loading"></div>   
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading">         
        <div class="row mx-2" v-for="(items, i) of data" :key="i" :value="items.key">        
            <div class="container-fluid" @click="goToProjectDetail(items.project_id)">                
                <div class="row">
                    <div class="col-12">
                        <div class="row">
                            <span class="mr-2 mx-2">{{ items.project_name }}</span>  <el-tag>{{ items.project_status }}</el-tag>
                        </div>
                        <div class="row my-4" >
                            <div class="col-sm-6 d-flex justify-content-between"> 
                                <sapn class="text-muted"><img src="../../assets/planner.png" class="mr-1" alt="planner_icon" width="26"> Plan to start: {{ items.start_date }} </sapn>                      
                                <sapn class="text-muted">Planned Completion: {{ items.completion_date }} </sapn>
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
    name: 'Profit',
    data() {
        return { 
            // FormData:{},
            data: [], 
            loading: false,           
            //pagination
            background: false,
            disabled: false,
            small: false,
            pageSize: 20,   
            currentPage: 1,  
            total: 0,  
            projectStatus: [],
            project_status: "",
            projectStatus: "",
            project_status_id: "",
            //permission
            showBtn: false,
            createBtn: false,
            updateBtn: false,
            deleteBtn: false ,
            project_status: [
                {key: 'On Going', value: 'on_going'},
                {key: 'Completed', value: 'completed'}, 
                {key: 'Pending', value: 'pending'},
                {key: 'Overdue', value: 'overdue'}             
            ],   
            // project_status: "",        
        }
    }, 
    created(){ 
        this.getData(); 
        this.getProjectstatus();     
    },
    methods:{   
        goToProjectDetail(id){
            this.$router.push("/profit/project_detail/"+ id);
        },         
        async getData(){ 
            // let status;
            // status = project_status; 
            // if(this.project_status == "On Going"){
            //     status= 0;
            // }
            // else{
            //     status= 1;
            // }
            this.data= [];
            this.loading = true;
            let response = await authApi({
                method: 'GET',
                api: '/staticalanalysismanagement/get_profit',
                params: {
                       id: '',
                       project_status: this.project_status,
                       keyword: '',                     
                       page: this.currentPage,
                       limit: this.pageSize,
                }   
            });
            // let response = await authApi({
            //     method: 'POST',
            //     api: '/projectmanagement/getproject',
            //     params: {
            //            id: '',
            //            keyword: '',                     
            //            page: this.currentPage,
            //            limit: this.pageSize,
            //     }   
            // });
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
                // this.project_status= this.data[0];
                this.loading = false;
            }
          
        },

        async getProjectstatus(){        
        let response = await authApi({
                method: 'GET',
                api: '/projectstatus',
                params: {                       
                      name: ""
                }   
        });
        this.projectStatus = response.data.data;      
       
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