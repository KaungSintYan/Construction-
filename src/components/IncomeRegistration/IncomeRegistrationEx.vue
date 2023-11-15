<template>
    <div v-loading="loading" class="loading__div" v-if="loading"></div>
    <div class="container-fluid" @click="$store.commit('setActive', false)">
        <div class="row">
            
              <FinancialSearching :api="apiName" :advanced="advanced"  :routeName="routeName" :createBtn="createBtn" 
              :showIncomeRegistration="showIncomeRegistration"           
            @searchingData="getSearchingData($event)" />

        </div>
    </div>
    <div class="container-fluid" @click="$store.commit('setActive', false)" v-if="!loading">
        <div class="row mx-2">
            <el-table :data="data" border style="width: 100%;" @selection-change="handleSelectionChange">
                <el-table-column fixed type="selection" width="55"/>
                <el-table-column prop="project_id" :label="$t('project')" width="200" sortable />
                <el-table-column prop="title" :label="$t('title_bd')" width="200" sortable />
                <el-table-column prop="invoice_amount" :label="$t('invoice_amount')" width="200" sortable />
                <el-table-column prop="amount" :label="$t('amount')" width="200" sortable />
                <el-table-column prop="bank_name" :label="$t('bank')" width="200" sortable />
                <el-table-column prop="bank_card_number" :label="$t('bank_card_number')" width="200" sortable />
                <el-table-column prop="invoice_type" :label="$t('invoice_type')" width="200" sortable />
                <el-table-column prop="client_id" :label="$t('client')" width="200" sortable />
                <el-table-column prop="revenue_contract_id" :label="$t('revenue_contract')" width="200" sortable />
                <el-table-column prop="remark" :label="$t('remark')" width="200" sortable />
                <el-table-colum fixed="right" :label="$t('operate')" width="200" sortable >
                    <template #default="scope">
                        <div class="action__btn d-flex">
                            <router-link :to="`/income_registration/show/${scope.row.income_register_id}`" 
                             v-show="showBtn">
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
                            <router-link :to="`/income_registration/edit/${scope.row.income_register_id}`"
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
                            <button class="btn-danger circle__btn" @click="deleteAll(scope.row.income_register_id)" v-show="deleteBtn && scope.row.editable">
                                <font-awesome-icon icon="fa-solid fa-trash" class="icon"/>
                            </button>
                            </el-tooltip>  
                        </div>
                    </template>
                </el-table-colum>
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
import { authApi } from '@/http/authApi';
import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'; 
import $ from 'jquery';
import FinancialSearching from '@/components/Share/FinancialSearching.vue';
export default {
    name: 'IncomeRegistration',
    data() {
        return {
            // searching 
            apiName: 'financialmanagement/get_income_registration',
            advanced: true,
            routeName: "/income_registration/",
            showIncomeRegistration: true,
            // endsearching 

            data: [],
            loading: false,
            selectedData: [],

            // pagination
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

        }
    },
    
    components: {
        FinancialSearching,
    },

    computed: {
        selectedCount(){
            return this.selectedData.length;
        }
    },

    created: {

    },

    methods: {
        getSearchingData(data){
            this.data = [];
            this.data = data.data;
            this.total = data.total;
        }, 

        async getData(){
            this.data = [];
            this.loading = true;
            let response = await authApi({
                method: 'POST',
                api: 'financialmanagement/get_income_registration',
                params: {
                    id: '',
                    keyword: '',
                    page: this.currentPage,
                    limit: this.pageSize,
                }
            });
            if(response.message){
                const list = response.data.data;
                for(let i=0; i < response.data.method.length; i++){
                   if(response.data.method[i] === 'get'){
                        this.showBtn = true; 
                   } 
                   if(response.data.method[i] === 'post'){
                        this.createBtn = true; 
                   }
                   if(response.data.method[i] === 'put'){
                        this.updateBtn = true;
                   }
                   if(response.data.method[i] === 'delete'){
                        this.deleteBtn = true; 
                   }
                }
                this.data = list;
                console.log('data' + JSON.stringify(this.data));
                this.total = response.data.total;
                this.loading = false; 
            }
        },

        async deleteAll(id = null){
            let list = [];
            if(id != null && id != ''){
                list.push(id); 
            }
            else{
                for(let i=0; i<this.selectedData.length; i++){
                    list.push(this.selectedData[i].income_register_id);
                }
            }
            if(list.length > 0){
                let response = await authApi({
                method: 'DELETE',
                api: 'financialmanagement/income_registration',
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
section#content {
    height: 82vh !important;
}
</style>