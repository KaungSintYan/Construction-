<template>  

  <div v-loading="loading" class="loading__div" v-if="loading"></div>   
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading"> 
        <div class="row">
            <ProjectSearching :api="apiName" :advanced="advanced"  :routeName="routeName" :createBtn="createBtn" :hideCreateBtn="hideCreateBtn"
                @searchingData="getSearchingData($event)" />
        </div>       
        <div class="row mx-2">
         <el-table :data="data" border show-summary  sum-text="su..." style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column  fixed type="selection" width="55" />          
            <el-table-column prop="project_name" :label="$t('project_name')" width="200" sortable />
             <!-- <el-table-column prop="project_itemid" :label="$t('item_number')" width="200" sortable />            -->
            <el-table-column prop="participation_status" :label="$t('participation_status')" width="200" />
            <el-table-column :label="$t('archive_status')" width="200" sortable >
                  <template #default="scope"> 
                       <span v-show="scope.row.archive_status"> Archived </span>
                       <span v-show="!scope.row.archive_status">Unarchived</span>
                  </template>
            </el-table-column>           
            <el-table-column prop="project_status" :label="$t('project_status')" width="200" sortable />
            <el-table-column prop="section_type" :label="$t('types_of_section')" width="200" sortable />
            <el-table-column prop="project_manager" :label="$t('project_manager')" width="200" sortable />
            <el-table-column prop="start_date" :label="$t('start_date')" width="200" sortable />
            <el-table-column prop="completion_date" :label="$t('completion_date')" width="200" sortable />          
            <el-table-column prop="fund_begining_projects" :label="$t('funds_at_beginning_period')" width="320" sortable />
            <el-table-column fixed="right" prop="fund_of_material" :label="$t('total_amount_of_materials')" width="300" />          
           
        </el-table> 
        </div>     
    </div>
     <div class="footer__bar">
        <div class="container-fluid mt-3">           
            <div class="row">    
                <div class="col-md-6"></div>               
                <div class="col-md-6">
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
import $ from 'jquery';
export default {
    name: 'Project',
    data() {
        return {
             //searching
            apiName: "/projectmanagement/getproject",
            advanced: true,            
            routeName: "/project/",  
            hideCreateBtn: true,                  
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