<template>  
    <div class="container-fluid"  @click="$store.commit('setActive', false)">
        <div class="row">
            <ProjectSearching :api="apiName" :advanced="advanced"  :createBtn="createBtn" :routeName="routeName" :budget="budget"
            @searchingData="getSearchingData($event)" />
        </div>
        <div class="row mx-2">   
        <el-table :data="data" border style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column  fixed type="selection" width="55" />          
            <!-- <el-table-column prop="approval_status" :label="$t('approval_status')" width="200" /> -->
            <el-table-column prop="project_id" :label="$t('project')" width="200" sortable />
            <el-table-column prop="total_budgets" :label="$t('total_budget')" width="200" sortable />
            <el-table-column prop="labor_budgets" :label="$t('total_labor_budget')" width="270" sortable />
            <el-table-column prop="material_budgets" :label="$t('total_material_budget')" width="220" sortable />
            <el-table-column prop="equipment_budgets" :label="$t('total_equipment_budget')" width="250" sortable />
            <el-table-column prop="cost_budgets" :label="$t('total_cost_budget')" width="270" sortable />
            <el-table-column prop="subcontract_budgets" :label="$t('subcontract_total_budget')" width="250" sortable />
            <el-table-column prop="other_budgets" :label="$t('other_total_budget')" width="230" sortable />
            <!-- <el-table-column prop="revision_status" :label="$t('revision_status')" width="230" sortable />           -->
            <!-- <el-table-column prop="budget_version" :label="$t('budget_version')" width="200" sortable /> -->
            <el-table-column prop="created_by_user" :label="$t('created_by_user')" width="200" />  
            <el-table-column prop="creation_time" :label="$t('creation_time')" width="200" />         
            <el-table-column fixed="right" :label="$t('operate')"  width="160" >
            <template #default="scope">
             <div class="action__btn d-flex">   
                            <router-link :to="`/budget/show/${scope.row.project_budget_id}`" 
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
                            <router-link :to="`/budget/edit/${scope.row.project_budget_id}`" 
                             v-show="updateBtn && scope.row.approve_status != 'approved'  && scope.row.approve_status != 'approval_rejected' && scope.row.editable">
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
                            <button class="btn-danger circle__btn" @click="deleteAll(scope.row.project_budget_id)" v-show="deleteBtn && scope.row.editable">
                                <font-awesome-icon icon="fa-solid fa-trash" class="icon"/>
                            </button>
                            </el-tooltip>  
                            <!-- <el-tooltip
                            class="box-item"
                            effect="dark"
                            :content="$t('approver')"
                            placement="top"
                            >
                            <button class="btn-warning circle__btn"  @click="showApprover(scope.row.project_budget_id)" >
                                <font-awesome-icon icon="fa-solid fa-check" class="icon"/>
                            </button>
                            </el-tooltip> -->
             </div>
            </template>
            </el-table-column>
        </el-table>       
            <!-- <table class="table table-bordered custom__table" >
                <thead class="table-header">
                    <tr>
                    <th scope="col" class="fixed__column__header">
                        <input type="checkbox" id="checkall" @click="checkAll()">
                    </th>
                    <th scope="col">{{ $t('approval_status') }}</th>
                    <th scope="col">{{ $t('project') }}</th>                   
                    <th scope="col">{{ $t('total_budget') }}</th>  
                    <th scope="col">{{ $t('total_labor_budget') }}</th>
                    <th scope="col">{{ $t('total_material_budget') }}</th>
                    <th scope="col">{{ $t('total_equipment_budget') }}</th>   
                    <th scope="col">{{ $t('total_cost_budget') }}</th>                        
                    <th scope="col">{{ $t('subcontract_total_budget') }}</th>
                    <th scope="col">{{ $t('other_total_budget') }}</th>                        
                    <th scope="col">{{ $t('revision_status') }}</th>
                    <th scope="col">{{ $t('budget_version') }}</th>                        
                    <th scope="col">{{ $t('founder') }}</th>
                    <th scope="col">{{ $t('creation_time') }}</th>
                    <th scope="col" class="fixed__column__header_right">{{ $t('operate') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="items in data" :key="items.project_budget_id">
                    <th scope="row" class="fixed__column">
                        <input type="checkbox" :value=items.project_budget_id @click="checkOne(items.project_budget_id, !items.isSelected)" :checked="items.isSelected" >
                    </th>
                    <td>{{ items.approval_status }}</td>
                    <td>{{ items.project_id }}</td> 
                    <td>{{ items.total_budgets }}</td>
                    <td>{{ items.labor_budgets }}</td>
                    <td>{{ items.material_budgets }}</td>
                    <td>{{ items.equipment_budgets }}</td>
                    <td>{{ items.cost_budgets }}</td>
                    <td>{{ items.subcontract_budgets }}</td>
                    <td>{{ items.other_budgets }}</td>
                    <td>{{ items.revision_status }}</td>
                    <td>{{ items.budget_version }}</td>
                    <td>{{ items.created_by_user }}</td>
                    <td>{{ items.creation_time }}</td>
                    <td class="fixed__column_right">    
                    <div class="action__btn d-flex">
                        <router-link :to="`/budget/edit/${items.project_budget_id}`" 
                        v-show="updateBtn && items.approve_status != 'approved'  && items.approve_status != 'approval_rejected'">
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
                        <button class="btn-danger circle__btn" @click="deleteAll(items.project_budget_id)" v-show="deleteBtn && scope.row.editable">
                            <font-awesome-icon icon="fa-solid fa-trash" class="icon"/>
                        </button>
                        </el-tooltip>  
                        <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="Approver"
                        placement="top"
                        >
                        <button class="btn-warning circle__btn"  @click="showApprover(items.project_budget_id)" v-show="updateBtn">
                            <font-awesome-icon icon="fa-solid fa-check" class="icon"/>
                        </button>
                        </el-tooltip>
                        </div>                           
                    </td>               
                    </tr>                    
                </tbody>
            </table>          -->
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
   
    <div class="modal fade" id="approver__list__modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">         
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"> <strong> Approver List </strong> </h5>
                </div>               
                <div class="modal-body row">
                    <div class="container">
                        <div class="row"> 
                        <div class="col-md-12">
                            <table class="table table-striped">
                                <thead>
                                  <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">User Role</th>
                                    <th scope="col">Status</th>
                                    <th scope="col"> Remark </th>
                                  </tr>
                                </thead>
                                <tbody>                                 
                                  <tr v-for="(obj ,i) in ApproverFormData" :key="i">
                                    <th scope="row"> {{ i+1 }}</th>
                                    <td>{{ obj.userid }}</td>
                                    <td>{{ obj.user_role }}</td>
                                    <td>{{ obj.status }}</td>
                                    <td>{{ obj.remark }}</td>
                                  </tr>
                                </tbody>
                              </table>
                        </div> 
                        </div>
                    </div>
                </div>
                <div class="modal-footer">                   
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t('cancel') }}</button>                  
                </div>
               
            </div>         
        </div>
    </div>
    
</template>
<script>
import {authApi} from '@/http/authApi'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import $ from 'jquery';
import ProjectSearching from '@/components/Share/ProjectSearching.vue';
export default {
    name: 'Budget',
    data() {
        return {  
              //searching
            apiName: "/projectmanagement/getprojectbudget",
            advanced: true,            
            routeName: "/budget/",
            budget: true,
            //endsearching
            
            data: [],
             //permission
            showBtn: false,
            createBtn: false,
            updateBtn: false,
            deleteBtn: false,
            ApproverFormData: {},    
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
        this.getData()
    },
    methods:{  
        getSearchingData(data){
        this.data = [];
        this.data = data.data;
        this.total = data.total;
       },  
        async getData(){  
            this.data= [];   
            this.loading= true;        
            let response = await authApi({
                method: 'POST',
                api: '/projectmanagement/getprojectbudget',
                params: {
                       id: '',
                       keyword: '',                                    
                       page: '',
                       limit: ''
                }   
            });
            if(response.message){ 
                console.log('budget'+JSON.stringify(response));           
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
        async showApprover(id){ 
            let response = await authApi({
                method: 'GET',
                api: '/projectmanagement/get_budget_approve_cc',
                params: {
                    projectbudget_id: id,                   
                }   
            });
            if(response.status == 200){
                console.log("appr"+ JSON.stringify(response))
                this.ApproverFormData= response.data.data;
                if(this.ApproverFormData.length >0){
                    $('#approver__list__modal').modal('show');
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
                    list.push(this.selectedData[i].project_budget_id);    
                }
            } 
          
            if(list.length > 0){
                let response = await authApi({
                method: 'DELETE',
                api: '/projectmanagement/projectbudget',
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
                    this.getData();
                    toast.success("Budget Delete successful !", {
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

section#content {
    height: 85vh !important;
}


</style>