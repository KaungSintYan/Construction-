<template>  
    <div v-loading="loading" class="loading__div" v-if="loading"></div>   
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading" style="padding: 0px;">    
        <div class="bg-primary py-2">
            <div class="row bg-white p-4" style="border-radius: 5px; margin: 0px 1px;">
                 <div class="col-12">
                    <div class="row">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item :to="{ path: '/profit' }"><span style="font-size: large; color: cornflowerblue;"><b> {{ data.project_name }} </b></span></el-breadcrumb-item>            
                            <!-- <el-breadcrumb-item><span>{{ projectStatus }}</span>
                            </el-breadcrumb-item>            -->
                        </el-breadcrumb>
                    </div>
                    <div class="row mt-5">
                        <span class="mb-1"><b>Income</b></span>
                        <div class="col-sm-12"> 
                         
                            <el-table :data="income" show-summary sum-text="Total" border style="width: 100%;">
                                        <el-table-column  fixed type="index" width="100" label="#" /> <!-- :index="indexMethod"  -->
                                        <el-table-column prop="contract_title" label="Contract Title" width="300px" />                                           
                                        <el-table-column prop="contract_type" label="Contract Type" width="300px" />                                         
                                        <el-table-column prop="contract_amount" label="Contract Amount" width="200px" /> 
                                        <el-table-column prop="invoice_amount" label="Invoice Amount" width="200px" />                                          
                                        <el-table-column prop="actual_amount" label="Actual Amount" width="200px" />
                                        <el-table-column fixed="right" prop="remaining_amount" label="Remaining Amount" width="200px" />   
                            </el-table>                      
                        </div>
                    </div>
                    <div class="row mt-5">
                        <span class="mb-1"><b>Outcome</b></span>
                        <div class="col-sm-12">   
                            <el-table :data="outcome" show-summary sum-text="Total" border style="width: 100%;">
                                        <el-table-column  fixed type="index" width="100" label="#"  /> 
                                        <el-table-column prop="payment_title" label="Payment Title" width="300px" />                                            
                                        <el-table-column prop="category"  label="Payment Category" width="300px" />                                      
                                        <el-table-column prop="payment_type" label="Payment Type" width="200px" />                                          
                                        <el-table-column prop="amount" label="Amount" width="200px" />                                            
                                        <el-table-column prop="paid_amount" label="Paid Amount" width="200px" />                                           
                                        <el-table-column fixed="right" prop="remaining_amount" label="Remaining Amount" width="200px" />                                             
                            </el-table>                      
                        </div>
                    </div>   
                    
                    <div class="row mt-5">
                        <span class="mb-1 mr-2"><b>Total price of profit ({{ this.total_amount }} - {{ this.total_outcome }})</b></span> <b> = </b> <span class="text-primary ml-2"><p>{{ this.total }}</p></span> 
                    </div>
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
    name: 'ProjectDetail',
    data() {
        return { 
            data: {}, 
            loading: false, 
            projectStatus: "",
            activeShedule: "schedule",
            plans: [],
            income: {},
            outcome: {},
           
        }
    }, 
    created(){        
        this.getData();
       // this.getPlan();        
    },
    methods:{  
        indexMethod(index){
            return index * 2
        },
        // arraySpanMethod({
        //     row,
        //     column,
        //     rowIndex,
        //     columnIndex
        //         }) {
        //             if (rowIndex === 0) {
        //                return [1, 2]
        //             if (columnIndex === 1) {                        
        //                 return [1, 3]
        //             } else if (columnIndex === 1) {                      
        //             return [0, 0]
        //             }
        //         }
        //     },        
        async getData(){           
            this.loading = true;  
            let response = await authApi({
                method: 'POST',
                api: '/staticalanalysismanagement/profit_detail',
                params: {                      
                       keyword: '',                     
                       page: "",
                       limit: "",
                }, 
                data: {
                    project_id: this.$route.params.id,
                }  
            });
            if(response.message){            
                this.data = response.data;
                // let newincome= {                    
                //         contract_title:"",
                //         contract_type:"",
                //         contract_amount: response.data.income.total_contract_amount,
                //         invoice_amount: response.data.income.total_invoice_amount,
                //         actual_amount: response.data.income.total_amount,             
                //         remaining_amount: response.data.income.total_remaining_amount,            
                // }
                // let newoutcome = {
                //     payment_title: "",
                //     category: "",
                //     payment_type: "",
                //     amount: response.data.outcome.total_amount,
                //     paid_amount: response.data.outcome.total_outcome, 
                //     remaining_amount: response.data.outcome.total_remaining_amount, 
                // }
                
                this.income = response.data.income_details;
                // this.income.push(newincome);
                 
                this.outcome = response.data.outcome_details;
                // this.outcome = response.data.income.total_amount - response.data.outcome.total_outcome; 
                // this.outcome.push(newoutcome);

                this.total_amount = response.data.income.total_amount;
                this.total_outcome = response.data.outcome.total_outcome; 
                this.total = response.data.income.total_amount - response.data.outcome.total_outcome; 
                // this.total.push(newoutcome); 
                console.log(this.total); 
                // console.log(this.outcome + "444"); 
                console.log('projecdddt'+ JSON.stringify(response.data)); 
                this.loading = false;                
               // this.getProjectstatus(this.data.project_status);
            }          
        }, 
        async getPlan(){  
              let response = await authApi({
                  method: 'POST',
                  api: '/constructionmanagement/get_schedule_plan',
                  params: {
                         id: '',
                         keyword: '',             
                         page: "",
                         limit: "",
                  },  
                  data: {
                      project_id: this.$route.params.id,
                  } 
              });
              if(response.status == 200){  
                this.plans = response.data.data;     
                      
              }
            
          }, 
        async getProjectstatus(id){        
        let response = await authApi({
                method: 'GET',
                api: '/projectstatus',
                params: {                       
                      name: ""
                }   
        });
        this.projectStatus = response.data.data.find(x=> x.project_status_id == id).project_status_name;
        this.loading = false;   
       },     
       getToNewPlan(){
        this.$router.push({ path: "/schedule/project_detail/"+ this.$route.params.id+ "/create" });
       },
       editNewPlan(id){
        this.$router.push({ path: "/schedule/project_detail/"+ this.$route.params.id+ "/edit/"+ id });
       }
    }    
}
</script>

<style lang="scss">
.team__right {
    display: flex;
    h5 {
        font-size: 14px;
        margin-top: 10px;
        margin-left: 10px;
    } 
    .icon__ellipsis {
        margin-top: 14px;
        margin-left: 10px;
       
        .ellipsis__icon:focus {
            outline: none;
        }
    }
    
}
.demo-tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
  }
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