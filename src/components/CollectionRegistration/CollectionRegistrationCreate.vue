<template>
    <div class="container-fluid"  @click="$store.commit('setActive', false)">   
        <form  @submit.prevent="createData">
            <div class="row">
                <div class="col-md-12">
                    <div class="block-title mt-2">
                        <strong> {{ $t('basic_info') }} </strong>
                        <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter"> <span><font-awesome-icon icon="fa-solid fa-file-import"/></span> Import</button>
                    </div>
                    <hr>
                                <ProjectName  @projectData="getProjectName($event)"  />
                                <span v-if="v$.FormData.project_id.$error" class="text-danger">
                                    <span v-if="v$.FormData.project_id.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('project')}) }} 
                                    </span>                                                                                         
                                </span> 

                            <div class="form-group mb-3 mt-3">
                                <label for="title">
                                    <span class="text-danger">*</span> <small><b>{{ $t('title_bd') }}</b></small> 
                                </label>
                                <el-input type="text" class="" id="title" :placeholder="$t('please_enter')" v-model="FormData.title" clearable/>
                            </div>

                            <RevenueContractName :projectId="FormData.project_id" @revenueData="getRevenueData($event)" />   
                            <span v-if="v$.FormData.revenue_contract_id.$error" class="text-danger">
                                    <span v-if="v$.FormData.revenue_contract_id.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('revenue_contract')}) }} 
                                    </span>                                                                                         
                            </span>
                            <Client @clientData="getClientData($event)" />
                            <span v-if="v$.FormData.client_id.$error" class="text-danger">
                                    <span v-if="v$.FormData.client_id.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('contract_party')}) }} 
                                    </span>                                                                                         
                            </span> 

                            <div class="form-group mb-3">
                                <label for=""> <span class="text-danger">*</span> <small><b> {{ $t('receipt_amount') }} (¥) </b></small></label>
                                <el-input type="number" class="" :placeholder="$t('please_enter')"
                                v-model="FormData.receipt_amount" clearable/>
                                <small class="ml-2 text-secondary">{{ $t('capital') }}  : </small>
                                <span v-if="v$.FormData.receipt_amount.$error" class="text-danger">
                                    <span v-if="v$.FormData.receipt_amount.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('receipt_amount')}) }} 
                                    </span>                                                                                         
                                </span> 
                            </div>

                            <div class="form-group mb-3">
                                <label for="payment_method"> <small><b> {{ $t('payment_method') }} </b></small></label>
                                <el-select name="" style="width: 100%;" id="payment_method" class="" v-model="FormData.payment_method_id">
                                    <el-option value="">{{ $t('please_choose') }}</el-option>
                                    <el-option v-for="pay of paymentMethod" :key="pay.payment_method_id" :value="pay.payment_method_id"> {{ pay.payment_name}}</el-option>
                                </el-select>
                                <span v-if="v$.FormData.payment_method_id.$error" class="text-danger">
                                    <span v-if="v$.FormData.payment_method_id.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('payment_method')}) }} 
                                    </span>                                                                                         
                                </span> 
                            </div>

                            <div class="form-group mb-3">
                                <label for="income_category"> <span class="text-danger">*</span> <small><b> {{ $t('income_category') }} </b></small></label>
                                <el-select name="" style="width: 100%;" id="income_category" class="" v-model="FormData.income_category">
                                    <el-option value="">{{ $t('please_choose') }}</el-option>
                                    <el-option v-for="income of incomeCategory" :key="income.category_id" :value="income.category_id">{{ income.category_name }}</el-option>                              
                                </el-select>
                                <span v-if="v$.FormData.income_category.$error" class="text-danger">
                                    <span v-if="v$.FormData.income_category.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('income_category')}) }} 
                                    </span>                                                                                         
                                </span> 
                            </div>

                            <div class="col-md-3 m-0 p-0">
                                <div class="form group mb-3">
                                    <label for="payment_date"> 
                                        <span class="text-danger">*</span> <small><b> {{ $t('payment_date') }} </b></small>    
                                    </label>
                                    <el-date-picker :placeholder="$t('pick_a_day')" type="date" class=""  format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                                     id="payment_date" style="width: 100%;"  v-model="FormData.payment_date" clearable/>
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="remark">
                                    <small><b>{{ $t('remark') }}</b></small>
                                </label>
                                <el-input type="textarea" :placeholder="$t('please_enter')" id="remark" v-model="FormData.remark" maxlength="100" show-word-limit />
                            </div>

                            <Picture @picture="getPicture($event)" />
                            <Document @appendix="getDocument($event)" /> 

                            <el-timeline>
                                <el-timeline-item>
                                <Approver @approverUser="getApproverUser($event)" />
                                </el-timeline-item>
                                <el-timeline-item>
                                    <Cc @ccUser="getCcUser($event)" />
                                </el-timeline-item>
                            </el-timeline>                          
                
                </div>
            </div>
            <div class="footer-main pt-2 pl-3">        
                <el-button type="primary" loading v-if="submitting">Submiting ...</el-button>     
                <button type="submit" class="btn btn-primary btn-footer" v-if="!submitting"> {{ $t('submit') }} </button>
            </div> 
        </form>
    </div>

</template>

<script>  
import {authApi} from '@/http/authApi'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import ProjectName from '@/components/Share/ProjectName.vue';
import Client from '@/components/Share/Client.vue';
import RevenueContractName from '@/components/Share/RevenueContractName.vue';
import Picture from '@/components/Share/Picture.vue';
import Document from '@/components/Share/Document.vue';
import Approver from '@/components/Share/ApproverUser.vue';
import Cc from '@/components/Share/CcUser.vue';
import useValidate from '@vuelidate/core'
import { required} from '@vuelidate/validators'

export function validName(name) {
  let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
  if (validNamePattern.test(name)){
    return true;
  }
  return false;
}
export default {
    name: 'CollectionRegistrationCreate',
    data() {
        return {
             v$: useValidate(),
            submitting: false,
            FormData: {
                        title: "",
                        odd_number: "",
                        payment_date:  new Date().toISOString().slice(0,10),    
                        receipt_amount: "",                       
                        remark: "",        
                        picture: null,
                        appendix: null,
                        approver:[],
                        cc: [],                        
                        creation_time: "", 
                        project_id: "", 
                        revenue_contract_id: "",
                        client_id: "", 
                        payment_method_id: "",   
                        income_category: "",     
                        created_by_user: ""       
            },
            paymentMethod: [],
            incomeCategory: [],           
            pictureImages: [] ,
            appendixImages: [], 
            showapprover: [],
            showcc: []            
        }
    },
    validations() {
        return {

            FormData: {
                    client_id: {
                        required,        
                    },                   
                    income_category: {
                        required, 
                    },
                    payment_method_id: {
                        required, 
                    },
                    project_id: {
                        required,
                    },
                    receipt_amount: {
                        required,
                    },
                    revenue_contract_id: {                      
                        required,
                    },      
            }
        }
    },
    components: {
      ProjectName,
      Client,
      RevenueContractName,  
      Picture,
      Document,
      Approver,
      Cc    
    }, 
    created(){                
        this.getPaymentMethod();
        this.getIncomeCategory();
    },
    computed: {
        

    },
    methods: {        
        getProjectName(data) {   
         this.FormData.project_id = data;        
        },
        getRevenueData(data) {
          this.FormData.revenue_contract_id= data;
        },
        getClientData(data){
          this.FormData.client_id= data;
        },       
        getPicture(data){
         this.pictureImages = data;
        },
        getDocument(data){
            this.appendixImages = data;          
        },
        getApproverUser(data){
          this.showapprover = data;
        },
        getCcUser(data){
          this.showcc = data;
        },
        async getPaymentMethod(){
        let response = await authApi({
                method: 'GET',
                api: '/financialmanagement/payment_method',
                params: {                       
                      name: ""
                }   
        });
        //console.log('payment'+ JSON.stringify(response.data.data));
        this.paymentMethod= response.data.data;           
       },
       
       async getIncomeCategory(){
        let response = await authApi({
                method: 'GET',
                api: '/financialmanagement/income_category',
                params: {                       
                      name: ""
                }   
        });
        //console.log('payment'+ JSON.stringify(response.data.data));
        this.incomeCategory= response.data.data;           
       },
       async createData(e){  
            this.submitting = true; 
                this.v$.$validate(); 
                if (this.v$.$error) {
                    this.submitting = false;
                    return;
                }
            this.showapprover.forEach((value) => {
                this.FormData.approver.push(value.userid);                
            }); 
            this.showcc.forEach((value) => {
                this.FormData.cc.push(value.userid); 
            });  
            let response = await authApi({
                method: 'POST',
                api: '/financialmanagement/registration_collection',
                data: this.FormData 
            });
            if(response.status == 201){              
              //console.log(response.data.revenue_contract_id);
                const id = response.data.collection_registration_id; 
                const imgformData = new FormData();
                imgformData.append('collection_registration_id',id);
                this.pictureImages.forEach((value) => {
                     imgformData.append('picture', value.url);   
                });
                this.appendixImages.forEach((value) => {
                    imgformData.append('appendix', value.url);  
                });    
                
                let imgResponse = await authApi({
                method: 'POST',
                api:  '/financialmanagement/collectregister_datafiles',       
                data: imgformData
                });
                if(imgResponse.status == 200){                    
                    toast.success("CollectionRegistration Insert successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
                    this.$router.back();
                }
            }
        },
    }
}
</script>

<style lang="scss" scoped>


a{
    text-decoration: none;
}

.designer_upload-image-list-container{
    display: flex;
    flex-wrap: wrap;
    vertical-align: baseline;
}
._designer-upload-btn{
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    border-radius: 4px;
    border: 1px dashed #c0ccda;
    background-color: #fbfdff;
    cursor: pointer;
    transition: all .15s;
}
.iconfont{
    font-family: "iconfont";
    font-size: 16px;
    font-style: normal;
    cursor: pointer;
}
.icontext{
    font-size: 14px;
    cursor: pointer;
}
.designer-upload-images-input{
    display: none;
}
.footer-main{
   position: fixed;
   right: 0;
   bottom: 0;
   width: 96%;
   height: 60px;
   border: 2px solid #eee;
   color: white;
   background-color: #FFFFFF;
}
.btn-footer{
    padding: 5px 70px 5px 70px;
    font-size: 13px;
}
.img-employee{
   width: 35px;
   height: 35px;
}
.j-box{
   position: relative;
   width: 100px;
}
.xmark{
   top: 0;
   right: 0;
   cursor: pointer;
}
.circle-box{
   border: 1px dashed #6D92FB;
   border-radius: 50%;
   width: 40px;
   height: 40px;
   text-align: center;
   padding: 7px;
   cursor: pointer;
}
.model-input{
   width: 50%;

}
.table-box{
       box-sizing: border-box;
       border: 1px solid #ebeef5;
       border-right: none;
       border-bottom: none;
       vertical-align: inherit;
       font-size: 14px;
   }
   thead{
       background-color:#F6F7FB;
   }
   tfoot{
       background-color:#F6F7FB;
   }
   .table_main_box{
       width: 100%;
       border-left: 1px solid gainsboro;
       border-right: 1px solid gainsboro;
       border-bottom: 1px solid gainsboro;
   }
   .footer-input{
       width: 40px;
   }
   .block-title{
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   align-items: center;
   align-content: space-between;
   flex-direction: row;
 }
 .block-title strong{
   flex-grow: 1;
 }
 .first-box{
   border: 1px solid #D0D4D8;
   width: 100%;
   height: 100px;
   border-radius: 3px;
 }
 .second-box{
   border: 1px solid #D0D4D8;
   width: 49%;
   height: 400px;
   border-radius: 3px;
 }
 .third-box{
   border: 1px solid #D0D4D8;
   width: 49%;
   height: 400px;
   border-radius: 3px;
 }
 .input-inner{
       width: 100%;
       box-sizing: border-box;
       border: 1px solid #ccc;
       border-radius: 4px;
       font-size: 14px;
       background-color: white;
       background-image: url('../../assets/images/searchicon.png');
       background-size: 14px;
       background-position: 10px 10px;
       background-repeat: no-repeat;
       padding: 12px 20px 12px 40px;
       transition: border-color .2s cubic-bezier(cubic-bezier(0.645, 0.045, 0.355, 1));
       height: 35px;
   }

   .li{
       position: absolute;
       background-color: #6D92FB;
       color: white;
       border-radius: 100%;
       padding: 10px;
       width: 50px;
       height: 50px;
       text-align: center;
   }

   .status{
       position: absolute;
       top: 70px;

   }
   #complilation_date{
       width: 200px;
   }

   .operation{
       float: right;
       box-sizing: border-box;
       margin-right: 20px;
   }

   .caret-wrapper{
       display: inline-flex;
       flex-direction: column;
       vertical-align: middle;
       cursor: pointer;
       font-size: 10px;
   }
</style>
