<template>  
    <div class="container-fluid"  @click="$store.commit('setActive', false)">
        <div class="row">
            <FinancialSearching :api="apiName" :advanced="advanced" :routeName="routeName" :createBtn="createBtn" :showMarginRegistration="showMarginRegistration"           
            @searchingData="getSearchingData($event)" />
        </div>
        <div class="row my-1">
            <div class="col-md-8"></div>
            <div class="col-md-4 d-flex justify-content-end">
                <el-radio-group v-model="activeTab" class="ml-4" @change="getData()">
                    <el-radio label="customer" size="large"> Customer </el-radio>
                    <el-radio label="supplier" size="large"> Supplier </el-radio>
                </el-radio-group>    
              
            </div>            
        </div>      
        <div class="row mx-2"> 
          <el-table :data="data" border show-summary sum-text="su..." style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column  fixed type="selection" width="55" />          
            <el-table-column prop="approve_status" :label="$t('approval_status')" width="200" />
            <el-table-column prop="project_id" :label="$t('project')" width="200" sortable />
            <el-table-column prop="title" :label="$t('title_bd')" width="200" sortable />
            <el-table-column prop="odd_number" :label="$t('odd_number')" width="200" sortable />           
            <!-- <el-table-column prop="margin_nature" :label="$t('margin_nature')" width="200" sortable />            -->
            <el-table-column prop="margin_type" :label="$t('margin_type')" width="200" sortable />
            <el-table-column prop="revenue_contract_id" :label="$t('revenue_contract')" width="200" sortable v-if="activeTab == 'customer'" />
            <el-table-column prop="spending_contract_id" label="Spending Contract" width="200" sortable v-if="activeTab == 'supplier'" />
            <el-table-column prop="created_by_user" :label="$t('created_by_user')" width="200" sortable />
            <el-table-column prop="creation_time" :label="$t('creation_time')" width="200" />          
            <el-table-column fixed="right" :label="$t('operate')"  width="220" >
            <template #default="scope">
             <div class="action__btn d-flex">
                
                            <router-link :to="`/margin_registration/show/customer/${scope.row.margin_registration_id}`"
                            v-if="showClientTable && showBtn">
                                    <el-tooltip
                                        class="box-item"
                                        effect="dark"
                                        :content="$t('show')"
                                        placement="top"
                                    >
                                    <button class="btn-primary circle__btn">
                                        <font-awesome-icon icon="fa-solid fa-eye" class="icon" />
                                    </button>
                                    </el-tooltip>
                            </router-link>
                            <router-link :to="`/margin_registration/show/supplier/${scope.row.margin_registration_id}`"
                            v-if="!showClientTable && showBtn">
                                    <el-tooltip
                                        class="box-item"
                                        effect="dark"
                                        :content="$t('show')"
                                        placement="top"
                                    >
                                    <button class="btn-primary circle__btn">
                                        <font-awesome-icon icon="fa-solid fa-eye" class="icon" />
                                    </button>
                                    </el-tooltip>
                            </router-link>
                            <!-- <router-link :to="`/margin_registration/edit/customer/${scope.row.margin_registration_id}`"
                             v-if="showClientTable && updateBtn && scope.row.approve_status != 'approved'  && scope.row.approve_status != 'approval_rejected'">
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
                            </router-link>  -->
                            <!-- <router-link :to="`/margin_registration/edit/supplier/${scope.row.margin_registration_id}`"
                             v-if="!showClientTable && updateBtn && scope.row.approve_status != 'approved'  && scope.row.approve_status != 'approval_rejected'">
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
                            </router-link>     -->
                            <el-tooltip
                            class="box-item"
                            effect="dark"
                            :content="$t('delete')"
                            placement="top"
                            >
                            <button class="btn-danger circle__btn" @click="deleteAll(scope.row.margin_registration_id)" v-show="deleteBtn && scope.row.editable">
                                <font-awesome-icon icon="fa-solid fa-trash" class="icon"/>
                            </button>
                            </el-tooltip>  
                            <el-tooltip
                            class="box-item"
                            effect="dark"
                            :content="$t('approver')"
                            placement="top"
                            >
                            <button class="btn-warning circle__btn"  @click="showApprover(scope.row.margin_registration_id)" >
                                <font-awesome-icon icon="fa-solid fa-check" class="icon"/>
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
    <div class="modal fade" id="approver__list__modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">         
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"> <strong> {{ $t('approver_list') }} </strong> </h5>
                </div>               
                <div class="modal-body row">
                    <div class="container">
                        <div class="row"> 
                        <div class="col-md-12">
                            <table class="table table-striped">
                                <thead>
                                  <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">{{ $t('name') }}</th>
                                    <th scope="col">{{ $t('user_role') }}</th>
                                    <th scope="col">{{ $t('status') }}</th>
                                    <th scope="col"> {{ $t('remark') }} </th>
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
import FinancialSearching from '@/components/Share/FinancialSearching.vue';
export default {
    name: 'MarginRegistration',
    data() {
        return { 
            //searching
            apiName: '',
            advanced: true,            
            routeName: "/margin_registration/",
            showMarginRegistration: true, 
            //endsearching       
            showClientTable: true,         
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
            //permission
            showBtn: false,
            createBtn: false,
            updateBtn: false,
            deleteBtn: false,
            showClientTable: true,   
            ApproverFormData: {},
            activeTab: "customer",

        }
    },   
    components: {
        FinancialSearching
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
            //alert(this.activeTab)

            this.data= [];   
            this.loading= true;  
            if(this.activeTab == 'customer'){
                this.showClientTable = true;      
            }
            if(this.activeTab != 'customer'){
                this.showClientTable = false;      
            }
                             
            let api= "";
            if(this.showClientTable && this.activeTab == 'customer'){
                api = '/financialmanagement/get_client_margin_registration';
                this.apiName = '/financialmanagement/get_client_margin_registration';
            }   
            else{
                api = '/financialmanagement/get_supplier_margin_registration';
                this.apiName = '/financialmanagement/get_supplier_margin_registration';
            } 
            let response = await authApi({
                method: 'POST',
                api: api,
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
                console.log('data'+ JSON.stringify(this.data));
                this.total = response.data.total;
                this.loading = false;
            }
          
        },
        async showApprover(id){ 
            let api= "";
            if(this.showClientTable){
                api = '/financialmanagement/get_client_margin_approve_cc';
            }   
            else{
                api = '/financialmanagement/get_supplier_margin_approve_cc';
            } 
            let response = await authApi({
                method: 'GET',
                api: api,
                params: {
                    margin_registration_id: id,                  
                }   
            });          
            if(response.status == 200){
               console.log("appr"+ JSON.stringify(response))
                this.ApproverFormData = response.data.data;
                if(this.ApproverFormData.length >0){
                    $('#approver__list__modal').modal('show');
                }
            }
           
        },  
        async deleteAll(id = null){          
            let api="";
            let list=[];            
            if(id != null && id != ""){
                list.push(id);             
            }
            else{
                for(let i=0; i< this.selectedData.length; i++){
                    list.push(this.selectedData[i].margin_registration_id);   
                }
            } 
            if(this.showClientTable){
                api = '/financialmanagement/client_margin_registration';     
            }   
            else{
                api = '/financialmanagement/supplier_margin_registration';              
            }
            if(list.length > 0){
                let response = await authApi({
                method: 'DELETE',
                api: api,
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
                    if(this.showClientTable){
                        toast.success("Client Margin Delete successful !", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                        });
                        this.getData();
                    }
                    else{
                        toast.success("Supplier Margin Delete successful !", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                        });
                        this.getData();
                    }
                   
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
.search_btn {
    padding: 10px 15px;
    font-size: 12px;
    border-radius: 3px;
    border: 1px solid #ddd;
}
</style>