<template>
    <div class="container-fluid"  @click="$store.commit('setActive', false)">   
        <form  @submit.prevent="createData">
            <div class="row">
                <div class="col-md-12"> 
                    <div class="block-title mt-2">
                        <strong> {{ $t('basic_info') }} </strong>
                        <!-- <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter"> <span><font-awesome-icon icon="fa-solid fa-file-import"/></span> Import</button> -->
                    </div>
                    <hr>        
                            <ProjectName  @projectData="getProjectName($event)"  />
                            <span v-if="v$.FormData.project_id.$error" class="text-danger">
                                <span v-if="v$.FormData.project_id.$errors[0].$message != ''">
                                    {{ $t('is_required',{'name': $t('project')} ) }}
                                </span>
                            </span>

                            <div class="form-group mb-3 mt-3">
                                <label for="title">
                                    <span class="text-danger">*</span> <small><b>{{ $t('title_bd') }}</b></small> 
                                </label>
                                <el-input type="text" class="" id="title" :placeholder="$t('please_enter')"
                                v-model="FormData.title" clearable/>
                                <!-- <span v-if="v$.FormData.title.$error" class="text-danger">
                                    <span v-if="v$.FormData.title.$errors[0].$message != ''">
                                        {{ $t('is_required',{'name': $t('title_bd')} ) }}
                                    </span>
                                </span> -->
                            </div>

                            <div class="col-md-3 m-0 p-0">
                                <div class="form-group mb-3">
                                    <label for="pick_up_date"> 
                                        <span class="text-danger">*</span> <small><b>{{ $t('pick_up_date') }}</b></small>      
                                    </label>
                                    <el-date-picker :placeholder="$t('pick_a_day')" type="date" 
                                    format="YYYY-MM-DD" value-format="YYYY-MM-DD" 
                                    class="" id="pick_up_date" style="width: 100%;"  v-model="FormData.pick_up_date" clearable/>
                                </div>
                            </div>

                            <!-- <Picker :titleName="$t('receiver')" @pickerData="getPickerName($event)"  /> -->

                            <div class="form-group mb-3">
                                <label for="bank">
                                    <small><b>{{ $t('bank') }}</b></small> 
                                </label>
                                <el-input type="text" class="" id="bank" :placeholder="$t('please_enter')" key=""
                                v-model="FormData.bank_name" clearable/>
                                <span v-if="v$.FormData.bank_name.$error" class="text-danger">
                                    <span v-if="v$.FormData.bank_name.$errors[0].$message != ''">
                                        {{ $t('is_required',{'name': $t('bank')} ) }}
                                    </span>
                                </span>
                            </div>

                            <div class="form-group mb-3">
                                <label for="account_name">
                                    <small><b>{{ $t('account_name') }}</b></small> 
                                </label>
                                <el-input type="text" class="" id="account_name" :placeholder="$t('please_enter')"
                                v-model="FormData.acc_name" clearable/>
                                <span v-if="v$.FormData.acc_name.$error" class="text-danger">
                                    <span v-if="v$.FormData.acc_name.$errors[0].$message != ''">
                                        {{ $t('is_required',{'name': $t('account_name')} ) }}
                                    </span>
                                </span>
                            </div>

                            <div class="form-group mb-3">
                                <label for="bank_card_number">
                                    <small><b>{{ $t('bank_card_number') }}</b></small> 
                                </label>
                                <el-input type="number" class="" id="bank_card_number" :placeholder="$t('please_enter')" 
                                v-model="FormData.acc_number" clearable/>
                                <span v-if="v$.FormData.acc_number.$error" class="text-danger">
                                    <span v-if="v$.FormData.acc_number.$errors[0].$message != ''">
                                        {{ $t('is_required',{'name': $t('bank_card_number')} ) }}
                                    </span>
                                </span>
                            </div>

                            <div class="form-group mb-3">
                                <label for="receipt_amount">
                                    <span class="text-danger">*</span> <small><b> {{ $t('receipt_amount') }} (¥) </b></small> 
                                </label>
                                <el-input type="number" class="" id="receipt_amount" :placeholder="$t('please_enter')" 
                                v-model="FormData.receipt_amount" clearable/>
                                <span v-if="v$.FormData.receipt_amount.$error" class="text-danger">
                                    <span v-if="v$.FormData.receipt_amount.$errors[0].$message != ''">
                                        {{ $t('is_required',{'name': $t('receipt_amount')} ) }}
                                    </span>
                                </span>
                            </div>
                           
                            <div class="form-group mb-3">
                                <label for="type">
                                    <span class="text-danger">*</span> <small><b>{{ $t('type') }}</b></small> 
                                </label>
                                <!-- <el-select  class="" v-model="FormData.type" clearable placeholder="Select" style="width: auto;">
                                    <el-option
                                      v-for="item in types"
                                      :key="item.key"
                                     
                                      :value="item.value"
                                    />
                                </el-select>                              -->
                                <el-select id="type" style="width: 100%;" class="" v-model="FormData.type">
                                    <el-option value="">Select</el-option>
                                    <el-option v-for="obj of types" :key="obj.key" :value="obj.key"> {{ obj.value}}</el-option>
                                </el-select>  
                                <span v-if="v$.FormData.type.$error" class="text-danger">
                                    <span v-if="v$.FormData.type.$errors[0].$message != ''">
                                        {{ $t('is_required',{'name': $t('type')} ) }}
                                    </span>
                                </span>                            
                            </div>

                            <div class="form-group mb-3">
                                <label for="remark">
                                    <small><b>{{ $t('remark') }}</b></small>
                                </label>
                                <el-input type="textarea" :placeholder="$t('please_enter')" id="remark" v-model="FormData.remark" maxlength="100" show-word-limit  />
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
                            <div class="form-group mb-5"></div> 
        
                </div>
            </div>
            <div class="footer-main pt-2 pl-3">    
                <el-button type="primary" loading v-if="submitting">Submitting ...</el-button>           
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
// import Picker from '@/components/Share/Picker.vue';
import Picture from '@/components/Share/Picture.vue';
import Document from '@/components/Share/Document.vue';
import Approver from '@/components/Share/ApproverUser.vue';
import Cc from '@/components/Share/CcUser.vue';
import useValidate from '@vuelidate/core'
import {required} from '@vuelidate/validators'

export function validName(name){
    let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
    if(validNamePattern.test(name)){
        return true;
    }
    return false; 
}

export default {
    name: 'ReserveFundCreate',
    data() {
        return {   
            v$: useValidate(),
            submitting: false,       
            FormData: {
                        title: "",
                        odd_number: "",
                        pick_up_date: "",
                        // receipient: "",
                        bank_name: "",
                        acc_name: "",
                        acc_number: "",
                        receipt_amount: "",
                        remark: "",        
                        picture: null,
                        appendix: null,
                        approver:[],
                        cc: [],
                        type: "",
                        creation_time: "", 
                        project_id: "",                       
                        created_by_user: ""       
            },
            types: [
                {key: 'cash_withdrawal', value: 'Cash Withdrawal'},
                {key: 'return_of_reverse_fund', value: 'Return of Reverse Fund'}
            ],   
                   
            pictureImages: [] ,
            appendixImages: [], 
            showapprover: [],
            showcc: [],
          
        }
    },
    components: {
      ProjectName,
    //   Picker,     
      Picture,
      Document,
      Approver,
      Cc    
    }, 
     validations(){
        return {
            FormData: {
                acc_name: {
                    required,
                },
                acc_number: {
                    required,
                },
                bank_name: {
                    required,
                },
                pick_up_date: {
                    required,
                },
                project_id: {
                    required,
                },
                // receipient: {
                //     required,
                // },
                receipt_amount: {
                    required,
                },
                // title: {
                //     required,
                // },
                type: {
                    required,
                },
            }
        }
     },
    created(){                
        
    },
    computed: {
        // calculateTax(){
        //     let tax ="";
        //     tax= (this.FormData.contract_info.amount_with_tax *(this.FormData.contract_info.tax_rate /100));
        //     this.FormData.contract_info.tax= tax;
        //     return tax;

        // },
        // calculateTaxAmount(){
        //     let amount= "";
        //     amount=this.FormData.contract_info.amount_with_tax - this.FormData.contract_info.tax;
        //     this.FormData.contract_info.amount_without_tax= amount;
        //     return amount;
        // }

    },
    methods: {   
         
        getProjectName(data) {   
         this.FormData.project_id = data;        
        },    
        // getPickerName(data){
        //     this.FormData.receipient = data;   
        // },   
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
        async createData(e){ 
            this.submitting = true; 
            this.v$.$validate();
            if(this.v$.$error){
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
                api: '/costmanagement/reserve_fund',
                data: this.FormData 
            });
            if(response.status == 201){              
              //console.log(response.data.revenue_contract_id);
                const id = response.data.reserve_fund_id; 
                const imgformData = new FormData();
                imgformData.append('reserve_fund_id',id);
                this.pictureImages.forEach((value) => {
                     imgformData.append('picture', value.url);   
                });
                this.appendixImages.forEach((value) => {
                    imgformData.append('appendix', value.url);  
                });    
                
                let imgResponse = await authApi({
                method: 'POST',
                api:  '/costmanagement/reserve_fund_datafiles',       
                data: imgformData
                });
                if(imgResponse.status == 200){
                    e.target.reset();
                    toast.success("ReserveFund Insert successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
                    this.submitting= false;  
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
   // height: 150px;
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
       /* transition: width 0.4s ease-in-out; */
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
   .caret-wrapper{
       display: inline-flex;
       flex-direction: column;
       vertical-align: middle;
       cursor: pointer;
       font-size: 10px;
   }
   #pick_up_date{
    width: 200px;
   }
</style>