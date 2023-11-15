<template>  
   <div v-loading="loading" class="loading__div" v-if="loading"></div>   
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading"> 
        <div class="row">
            <ProjectSearching :api="apiName" :advanced="advanced"  :routeName="routeName" :createBtn="createBtn"
                @searchingData="getSearchingData($event)" />
        </div>       
        <div class="row mx-2">
         <el-table :data="data" border style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column  fixed type="selection" width="55" />          
            <el-table-column prop="project_name" :label="$t('project_name')" width="200" sortable />
            <el-table-column prop="project_code" :label="$t('project_code')" width="200" sortable />
            <el-table-column prop="participation_status" :label="$t('participation_status')" width="200" />
            <el-table-column :label="$t('archive_status')" width="200" sortable >
                  <template #default="scope"> 
                       <span v-show="scope.row.archive_status"> Archived </span>
                       <span v-show="!scope.row.archive_status">Unarchived</span>
                  </template>
            </el-table-column>
            <!-- <el-table-column prop="project_itemid" :label="$t('item_number')" width="200" sortable />            -->
            <el-table-column prop="project_status" :label="$t('project_status')" width="200"  />
            <el-table-column prop="section_type" :label="$t('types_of_section')" width="200" sortable />
            <el-table-column prop="project_manager" :label="$t('project_manager')" width="200" sortable />
            <el-table-column prop="start_date" :label="$t('start_date')" width="200" sortable />
            <el-table-column prop="completion_date" :label="$t('completion_date')" width="200" sortable />          
            <el-table-column prop="client" :label="$t('party_a_unit')" width="200" sortable />
            <el-table-column prop="construction_unit" :label="$t('construction_unit')" width="200" /> 
            <el-table-column prop="construction_address" :label="$t('construction_address')" width="200" />           
            <el-table-column fixed="right" :label="$t('operate')"  width="160" >
            <template #default="scope">
             <div class="action__btn d-flex">
                            <router-link  :to="`/project/show/${scope.row.project_id}`"
                            v-show="showBtn">
                                <el-tooltip
                                    class="box-item"
                                    effect="dark"
                                    :content="$t('show')"
                                    placement="top"
                                >
                                <button class="btn-primary circle__btn">
                                    <font-awesome-icon icon="fa-solid fa-eye" class="icon"/>
                                </button>
                                </el-tooltip>                         
                            </router-link>  
                            <router-link  :to="`/project/edit/${scope.row.project_id}`"
                            v-show="updateBtn && scope.row.approve_status != 'approved'  && scope.row.approve_status != 'approval_rejected' ">
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
                            <button class="btn-danger circle__btn" @click="deleteAll(scope.row.project_id)" v-show="deleteBtn && scope.row.editable">
                                <font-awesome-icon icon="fa-solid fa-trash" class="icon"/>
                            </button>
                            </el-tooltip>  
                            <el-tooltip
                            class="box-item"
                            effect="dark"
                            :content="$t('archive')"
                            placement="top"
                            >
                            <button class="btn-warning circle__btn"  @click="archive(scope.row)" v-show="updateBtn">
                            <font-awesome-icon icon="fa-solid fa-file-archive" class="icon"/>
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
import ProjectSearching from '@/components/Share/ProjectSearching.vue';
export default {
    name: 'Project',
    data() {
        return {
             //searching
            apiName: "/projectmanagement/getproject",
            advanced: true,            
            routeName: "/project/",                    
            data: [],   
            //permission
            showBtn: false,
            createBtn: false,
            updateBtn: false,
            deleteBtn: false,

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
    components: {
        ProjectSearching,
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
        getSearchingData(data){
        this.data = [];
        this.data = data.data;
        this.total = data.total;
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
                this.total = response.data.total;
                this.loading = false;
            }
          
        },
        async archive(data){             
            let archive="";
            if(data.status == true){
                archive = false;
            }    
            else{
                archive = true;
            }       
            let response = await authApi({
                method: 'PUT',
                api: '/projectmanagement/project',
                params: {
                       id: '',
                       keyword: '',
                       status: '',                       
                       page: '',
                       limit: ''
                },
                data: {
                    project_id: data.project_id,                                   
                    archive_status: archive
                }
            });
            if(response.status == 200){             
               this.getData();
            }
        }, 
        async deleteAll(id = null){       
            let list=[];            
            if(id != null && id != ""){
                list.push(id);             
            }
            else{
                for(let i=0; i< this.selectedData.length; i++){
                    list.push(this.selectedData[i].project_id);         
                }
            }           
            if(list.length > 0){
                let response = await authApi({
                method: 'DELETE',
                api: '/projectmanagement/project',
                params: {
                       id: '',
                       keyword: '',
                       status: '',                       
                       page: '',
                       limit: ''
                                          
                },
                data: {
                    "id_list": list
                }    
                });
                if(response.message){ 
                    this.getData();
                    toast.success("Project Delete successful !", {
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
section#content {
    height: 82vh !important;
}
</style>