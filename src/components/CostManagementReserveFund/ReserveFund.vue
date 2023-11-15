<template>  
    <div v-loading="loading" class="loading__div" v-if="loading"></div>   
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading"> 
        <div class="row">
            <CostSearching :api="apiName" :advanced="advanced"  :routeName="routeName" :createBtn="createBtn"          
                @searchingData="getSearchingData($event)" />
        </div>
        <div class="row mx-2">    
          <el-table :data="data" border style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column  fixed type="selection" width="55" />          
            <el-table-column prop="approve_status" :label="$t('approval_status')" width="200" />
            <el-table-column prop="project_id" :label="$t('project')" width="200" sortable />
            <el-table-column prop="title" :label="$t('title_bd')" width="200" sortable />
            <el-table-column prop="odd_number" :label="$t('odd_number')" width="200" sortable />
            <el-table-column prop="receipt_amount" :label="$t('receipt_amount')" width="200" sortable />
            <el-table-column prop="refund_amount" :label="$t('refund_amount')" width="200" sortable />
            <el-table-column prop="type" :label="$t('type')" width="200" sortable />
            <!-- <el-table-column prop="recipient" :label="$t('recipient')" width="200" sortable /> -->
            <el-table-column prop="created_by_user" :label="$t('created_by_user')" width="200" sortable />
            <el-table-column prop="creation_time" :label="$t('creation_time')" width="200" />          
            <el-table-column fixed="right" :label="$t('operate')"  width="160" >
            <template #default="scope">
             <div class="action__btn d-flex">
                
                            <router-link  :to="`/reserve_fund/show/${scope.row.reserve_fund_id}`"
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

                            <!-- <router-link :to="`/reserve_fund/edit/${scope.row.reserve_fund_id}`"
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
                            </router-link>     -->
                            <el-tooltip
                            class="box-item"
                            effect="dark"
                            :content="$t('delete')"
                            placement="top"
                            >
                            <button class="btn-danger circle__btn" @click="deleteAll(scope.row.reserve_fund_id)" v-show="deleteBtn && scope.row.editable">
                                <font-awesome-icon icon="fa-solid fa-trash" class="icon"/>
                            </button>
                            </el-tooltip>  
                            <el-tooltip
                            class="box-item"
                            effect="dark"
                            :content="$t('approver')"
                            placement="top"
                            >
                            <button class="btn-warning circle__btn"  @click="showApprover(scope.row.reserve_fund_id)">
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
import CostSearching from '@/components/Share/CostSearching.vue';
export default {
    name: 'ReserveFund',
    data() {
        return {
            //searching
            apiName: '/costmanagement/get_reserve_fund',
            advanced: true,            
            routeName: "/reserve_fund/",           
            //endsearching

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
            ApproverFormData: {},       
        }
    },   
    components: {
        CostSearching
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
            this.loading= true;       
            let response = await authApi({
                method: 'POST',
                api: '/costmanagement/get_reserve_fund',
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
            let response = await authApi({
                method: 'GET',
                api: '/costmanagement/get_reservefund_approve_cc',
                params: {
                    reserve_fund_id: id,                  
                }   
            });          
            if(response.status == 200){
               // console.log("appr"+ JSON.stringify(response))
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
                       list.push(this.selectedData[i].revenue_contract_visa_id);   
                }
            } 
          
            if(list.length > 0){
                let response = await authApi({
                method: 'DELETE',
                api: '/costmanagement/reserve_fund',
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
section#content {
    height: 82vh !important;
}
</style>