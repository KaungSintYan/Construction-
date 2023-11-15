<template>  
    <div v-loading="loading" class="loading__div" v-if="loading"></div>   
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading"> 
        <div class="row">
            <SalaryPaymentSearching :api="apiName" :advanced="advanced"  :routeName="routeName" :createBtn="createBtn"
            @searchingData="getSearchingData($event)" />
        </div>
        <div class="row" v-for="(items, i) in data" :key="i">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-6 ">
                        <h4>{{ items.title }}</h4>                       
                        <p class="text-muted"> Order number: {{ items.odd_number }} </p>  
                    </div>
                    <div class="col-md-6 d-flex justify-content-end">
                       <p class="text-muted"> {{ items.work_date }} </p>                       
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <h4 class="text-warning">{{ items.total_amount }}</h4>                       
                        <p class="text-muted">  Total Amount (¥) </p>  
                    </div>
                    <div class="col-md-6">
                        <h4 class="text-warning">5</h4>     
                        <p class="text-muted"> Distribution Team </p>  
                    </div>                             
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <el-tag class="mx-1" effect="light">
                        {{ items.approve_status }}
                        </el-tag>
                    </div>
                    <div class="col-md-6 d-flex justify-content-end">
                        <span class="icon__ellipsis">
                            <el-popover  popper-style="width: 100px !important;min-width: 100px !important;"
                            placement="bottom">  
                            <div class="container" >
                                <div class="row" >
                                    <router-link :to="`/order/edit/${items.work_order_id}`">
                                    <font-awesome-icon icon="fa-solid fa-pencil" style=" margin-right: 5px !important; padding: 2px !important;color: #7d7d7d;" /> edit
                                    </router-link>    
                                </div>
                                <div class="row" >
                                    <font-awesome-icon icon="fa-solid fa-trash" style=" margin-right: 5px !important; padding: 2px !important;color: #7d7d7d;" @click="deleteAll(items.team_id)"  /> delete
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
            <el-divider />
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
import SalaryPaymentSearching from '@/components/Share/SalaryPaymentSearching.vue';
export default {
    name: 'SalaryPayment',
    data() {
        return {  
             //searching
            apiName: '/financialmanagement/get_salary_payment',
            advanced: true,            
            routeName: "/salary_payment/",
           
            //endsearching        
            data: [],
            loading: false,
            //permission
            showBtn: false,
            createBtn: false,
            updateBtn: false,
            deleteBtn: false,
            ApproverFormData: {},                  
        }
    },   
    components: {
        SalaryPaymentSearching
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
                api: '/financialmanagement/get_salary_payment',
                params: {
                       id: '',
                       keyword: '',             
                       page: '',
                       limit: ''
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
                this.data = list;
                this.loading = false;
                console.log('salarypayment'+ JSON.stringify(this.data));
            }
          
        },
        async showApprover(id){ 
            let response = await authApi({
                method: 'GET',
                api: '/financialmanagement/get_salary_payment_approve_cc',
                params: {
                    salary_payment_id: id,                  
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
                    toast.success("Salary Payment Delete successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
                }                         
            }
        },
    }
    
}
</script>


<style lang="scss">
.icon__ellipsis {
    margin-top: 14px;
    margin-left: 10px;
   
    .ellipsis__icon:focus {
        outline: none;
    }
}
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


.search_btn {
    padding: 10px 15px;
    font-size: 12px;
    border-radius: 3px;
    border: 1px solid #ddd;

}




.unarchive_color {
    background: rgba(80,165,241,.12);
    color: #50a5f1;
}

.pagination {
    .active {
        background: blue;
        color: #fff;
    }
}
.error_border {
    border-color: red !important;
}

@media only screen and (min-width: 1024px) {
 #dynamicLabelCreate > .modal-dialog , #dynamicLabelEdit > .modal-dialog {
    max-width: 800px !important;
 }
}
</style>