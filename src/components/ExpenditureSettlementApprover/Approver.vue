<template>  
    <div class="container-fluid"  @click="$store.commit('setActive', false)">      

        <div class="row">            
            <div class="col-md-12 my-2">
                <div class="" style="float: right;">
                    <button type="button" class="btn btn-sm btn-success" @click="showApprover ? showCC() : getData(showApprover)">                     
                     <span class="ml-1" v-show="!showApprover"> Approver </span> 
                     <span class="ml-1" v-show="showApprover"> CC </span>                                            
                    </button>
                </div>
                
            </div>
        </div>
        <div class="row mx-2"  v-show="showApprover">        
            <table class="table table-bordered" id="budget__app__table">
                <thead class="table-header">
                    <tr>                   
                        <th scope="col">{{ $t('approval_status') }}</th>  
                        <th scope="col">{{ $t('project') }}</th>
                        <th scope="col">{{ $t('contract_statement_name') }}</th>                   
                        <th scope="col">{{ $t('order_number') }}</th>
                        <th scope="col">{{ $t('settlement_amount') }}</th>
                        <th scope="col">{{ $t('settlement_date') }}</th>
                        <th scope="col">{{ $t('revenue_content') }}</th>                        
                        <th scope="col">{{ $t('client') }}</th>
                        <th scope="col">{{ $t('founder') }}</th>                    
                        <th scope="col"> Approver </th>
                        <th scope="col"> CC </th>
                        <th scope="col">{{ $t('creation_time') }}</th>
                    <th scope="col" class="fixed__column__header_right">{{ $t('operate') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="items in data" :key="items.spending_contract_settlement_id">                   
                        <td>{{ items.approve_status }}</td>
                        <td>{{ items.project_id }}</td> 
                        <td>{{ items.contract_statement_name }}</td>
                        <td>{{ items.settlement_number }}</td>
                        <td>{{ items.settlement_amount }}</td>
                        <td>{{ items.settlement_date}}</td>
                        <td>{{ items.settlement_content}}</td>
                        <td>{{ items.client_id }}</td>
                        <td>{{ items.created_by_user }}</td>
               
                    <td> 
                        <div class="my-3">
                            <span class="approver_cc" v-for="(obj, i) in items.approver" :key="i">
                                {{ obj }}
                            </span>
                        </div>
                      
                    </td>
                    <td> 
                        <div class="my-3">
                            <span class="approver_cc" v-for="(obj, i) in items.cc" :key="i">
                                {{ obj }}
                            </span>
                        </div>
                        
                    </td>
                    <td>{{ items.creation_time }}</td>
                    <td class="fixed__column_right">    
                        <div class="action__btn">                          
                        <span class="ml-2 text" @click="getEdit(items)" >{{ $t('edit') }}</span>
                        </div>                        
                    </td>               
                    </tr>                    
                </tbody>
            </table>         
        </div>
        <!-- cc table  -->
        <div class="row mx-2"  v-show="!showApprover">        
            <table class="table table-bordered" id="budget__cc__table">
                <thead class="table-header">
                    <tr>                   
                        <th scope="col">{{ $t('approval_status') }}</th>  
                        <th scope="col">{{ $t('project') }}</th>
                        <th scope="col">{{ $t('contract_statement_name') }}</th>                   
                        <th scope="col">{{ $t('order_number') }}</th>
                        <th scope="col">{{ $t('settlement_amount') }}</th>
                        <th scope="col">{{ $t('settlement_date') }}</th>
                        <th scope="col">{{ $t('revenue_content') }}</th>                        
                        <th scope="col">{{ $t('client') }}</th>
                        <th scope="col">{{ $t('founder') }}</th>
                    <th scope="col"> Approver </th>
                    <th scope="col"> CC </th>
                    <th scope="col">{{ $t('creation_time') }}</th>
                    <!-- <th scope="col" class="fixed__column__header_right">{{ $t('operate') }}</th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="items in ccData" :key="items.project_budget_id">                   
                        <td>{{ items.approve_status }}</td>
                        <td>{{ items.project_id }}</td> 
                        <td>{{ items.contract_statement_name }}</td>
                        <td>{{ items.settlement_number }}</td>
                        <td>{{ items.settlement_amount }}</td>
                        <td>{{ items.settlement_date}}</td>
                        <td>{{ items.settlement_content}}</td>
                        <td>{{ items.client_id }}</td>
                        <td>{{ items.created_by_user }}</td>
                        <td>{{ items.creation_time }}</td>
                    <td> 
                        <div class="my-3">
                            <span class="approver_cc" v-for="(obj, i) in items.approver" :key="i">
                                {{ obj }}
                            </span>
                        </div>
                      
                    </td>
                    <td> 
                        <div class="my-3">
                            <span class="approver_cc" v-for="(obj, i) in items.cc" :key="i">
                                {{ obj }}
                            </span>
                        </div>
                        
                    </td>
                    <td>{{ items.creation_time }}</td>
                    <!-- <td class="fixed__column_right">    
                        <div class="action__btn">                          
                        <span class="ml-2 text" @click="getEdit(items)" >{{ $t('edit') }}</span>
                        </div>                        
                    </td>                -->
                    </tr>                    
                </tbody>
            </table>         
        </div> 
    </div>
    
   
    <div class="modal fade" id="approve__modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
         <form  @submit.prevent="updateData">   
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"> <strong> {{ $t('edit') }} </strong> </h5>
                </div>               
                <div class="modal-body row">
                    <div class="container">
                        <div class="row"> 
                        <div class="col-md-12">
                         <div class="form-group mb-3">
                                        <label for="remark"> 
                                        <span class="text-danger">*</span>  {{ $t('remark') }}
                                        </label>
                                        <textarea cols="30" rows="3" class="form-control" v-model="FormData.remark"></textarea>
                                    
                            </div>
                            <div class="form-group  mb-3 mt-3">
                                            <select class="form-control" v-model="FormData.approval_status">
                                                <option value=""> {{ $t('selected') }} </option>
                                                <option v-for="(app, i) in approval" :key="i" :value="app.key"> {{ app.value }}</option>                                      
                                            </select>
                            </div>
                        </div> 
                        </div>
                    </div>
                </div>
                <div class="modal-footer">                   
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t('cancel') }}</button>
                    <button type="submit" class="btn btn-primary">{{ $t('sure') }}</button>
                </div>
                
            </div>
         </form>
        </div>
    </div>
</template>
<script>
import {authApi} from '@/http/authApi'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import $ from 'jquery';
export default {
    name: 'BudgetApprover',
    data() {
        return { 
            showApprover: true,
            data: [], 
            ccData: [], 
            FormData: {
              settlement_id: "",
              remark: "",
              approval_status: ""
            },  
            approval: [
                {key: 'approval', value: 'Approval'},
                {key: 'approved', value: 'Approved'},
                {key: 'approval_rejected', value: 'Approval Rejected'},
                {key: 'revoked', value: 'Revoked'},
                {key: 'draft', value: 'Draft'},
            ]      
        }
    },    
    created(){        
        this.getData();
    },
    methods:{ 
        async getData(select){         
            let response = await authApi({
                method: 'GET',
                api: '/contractmanagement/sp_settlement_approver_cc',
                params: {
                       id: '',
                       type: 1,
                }   
            });
            if(response.message){            
                const list= response.data.data;  
                this.data = list.map(v => ({...v, isSelected: false}));                
                if(select !=null && select != undefined){
                    this.showApprover = !this.showApprover;
                }
                //console.log('budget>>'+ JSON.stringify(this.data))
              
            }
          
        },
        async showCC(){
            let response = await authApi({
                method: 'GET',
                api: '/contractmanagement/sp_settlement_approver_cc',
                params: {
                       id: '',
                       type: 0,
                }   
            });
            if(response.message){            
                const list= response.data.data;  
                this.ccData = list.map(v => ({...v, isSelected: false})); 
                //console.log('budget>>'+ JSON.stringify(this.data))
                this.showApprover = !this.showApprover;
              
            }
        },
        getEdit(data){
        this.FormData.settlement_id= data.spending_contract_settlement_id;
        this.FormData.remark = data.remark;
        this.FormData.approval_status= data.approve_status;
        $('#approve__modal').modal('show');
        },
        async updateData() {
            let response = await authApi({
                method: 'POST',
                api: '/contractmanagement/sp_settlement_approver_cc',
                params: {
                       id: '',
                       type: 1,
                },
                data: this.FormData
            });
            
            if(response.status == 200){
                $('#approve__modal').modal('hide');
                 toast.success("BudgetApprover Update successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
               
            }
        }
    }
    
}
</script>
<style lang="scss">
span.approver_cc {
    padding: 5px 10px;
    margin: 0px 5px;
    background: #eee;
    border-radius: 10px;
}
#budget__app__table, #budget__cc__table {  
    width: 100% !important;
    overflow-x: scroll !important;
    display: block;
    .table-header {
        background-color: #F6F6F7;        
        th {
            padding: 0.25rem;
            color: #909399;
        }
    }
    tbody{
        td {
            padding: 0.25rem;
        }
    }
    
    .fixed__column__header_right {
        right: 0px;
        position: sticky;
        background: #eee;        
        padding: 0rem;
    }
    .fixed__column_right{
        right: 0px;
        position: sticky;
        background: #eee;       
        border-right: 0px;
        padding: 0rem;
    }    
    .action__btn {
        .text {
            font-size: 12px;
        }
    }
   
}

</style>