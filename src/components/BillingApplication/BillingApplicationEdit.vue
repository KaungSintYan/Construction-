<template>
    <div v-loading="loading" class="loading__div" v-if="loading"></div> 
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading"> 
        <form  @submit.prevent="updateData">  
            <div class="row">
                <div class="col-md-12"> 
                    <div class="block-title mt-2">
                        <strong> {{ $t('basic_info') }} </strong>
                        <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter"> <span><font-awesome-icon icon="fa-solid fa-file-import"/></span> Import</button>
                    </div>
                    <hr>
                            <ProjectName :oldProjectId="oldProjectId"   @projectData="getProjectName($event)"  />
                            <div class="form-group mb-3 mt-3">
                                <label for="title">
                                    <span class="text-danger">*</span> <small><b>{{ $t('title_bd') }}</b></small>
                                </label>
                                <el-input type="text" id="title" :placeholder="$t('please_enter')" v-model="FormData.title"  clearable />
                            </div>
                            <Picker :oldPickerId="oldPickerId" @pickerData="getPickerName($event)"  />

                            <div class="col-md-3 m-0 p-0">
                                <div class="form-group mb-3">
                                    <label for="application_date"> 
                                    <span class="text-danger">*</span> <small><b> {{ $t('fee_date') }} </b></small>      
                                    </label>
                                    <el-date-picker v-model="FormData.application_date"  id="application_date" type="date" 
                                    format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                                    placeholder="Pick a Date" size="default"  style="width: 100%;" editable clearable  />
                                </div>
                            </div>

                            <RevenueContractName  :projectId="oldProjectId" :oldRevenueContractId="oldRevenueContractId" @revenueData="getRevenueData($event)" />   
                            <Client :oldClientId="oldClientId" @clientData="getClientData($event)" />
                           
                            <div class="form-group mb-3 mt-3">
                                <label for="invoice_number">
                                    <span class="text-danger">*</span> <small><b> {{ $t('invoice_number') }} </b></small>
                                </label>
                                <el-input type="text" id="invoice_number" :placeholder="$t('please_enter')" v-model="FormData.invoice_number"  clearable />
                            </div>
                            <div class="form-group mb-3 mt-3">
                                <label for="tax_rate">
                                    <span class="text-danger">*</span> <small><b> {{ $t('tax_rate') }} </b></small>
                                </label>
                                <el-input type="number" id="tax_rate" :placeholder="$t('please_enter')" v-model="FormData.tax_rate"  clearable />
                            </div>
                            <div class="form-group mb-3">
                                <label for="billing_status"> <small><b> {{ $t('billing_status') }} </b></small></label>
                                <el-select v-model="FormData.billing_status" class="billing_status" :placeholder="$t('please_choose')"  style="width: 100%">
                                    <el-option
                                      v-for="item in billing_status"
                                      :key="item.key"
                                      :label="item.value"
                                      :value="item.key"
                                    />  
                                </el-select> 
                            </div>
                            <div class="form-group mb-3">
                                <label for="invoice_type"> <small><b> {{ $t('invoice_type') }} </b></small> </label>
                                <el-select v-model="FormData.invoice_type" class="invoice_type" :placeholder="$t('please_choose')"  style="width: 100%">
                                    <el-option
                                      v-for="type in invoiceType"
                                      :key="type.invoice_type_id"
                                      :label="type.name"
                                      :value="type.invoice_type_id"
                                    />  
                                </el-select>                                 
                            </div>
                            
                            <div class="form-group mb-3">
                                <label for="bank">
                                    <small><b> {{ $t('bank') }} </b></small>
                                </label>
                                <el-input type="text" id="bank"  :placeholder="$t('please_enter')" v-model="FormData.bank_name" clearable />
                            </div>

                            <div class="form-group mb-3">
                                <label for="bank_card_number">
                                    <small><b> {{ $t('bank_card_number') }} </b></small> 
                                </label>
                                <el-input type="text" id="bank_card_number" v-model="FormData.bank_card_number"
                                 :placeholder="$t('please_enter')" clearable />
                            </div>

                            <div class="form-group mb-3">
                                <label for="mailing_information">
                                    <small><b> {{ $t('mailing_information') }} </b></small>
                                </label>
                                <el-input v-model="FormData.mailing_information" maxlength="250" 
                                :placeholder="$t('please_enter')"  show-word-limit type="textarea" />  
                            </div>
                            <div class="form-group mb-3">
                                <label for="">
                                    <span class="text-danger">*</span> <small><b> {{ $t('details_of_expenditure') }} </b></small>   
                                </label>
                                <div class="row mx-2 mb-4">
                                    <el-table :data="Detail" border style="width: 100%;">
                                        <el-table-column  fixed type="index" width="55" />                                        
                                        <el-table-column :label="$t('amount_with_tax')" width="250px"> 
                                            <template #default="scope">
                                                <el-input type="number" :placeholder="$t('please_enter')"  v-model="scope.row.amount_with_tax" clearable />
                                            </template>
                                        </el-table-column>
                                        <el-table-column :label="$t('amount_without_tax')" width="250px"> 
                                            <template #default="scope">
                                                <el-input type="number" :placeholder="$t('please_enter')"  v-model="scope.row.amount_without_tax" clearable />
                                            </template>
                                        </el-table-column>
                                        <el-table-column :label="$t('tax_rate')" width="250px"> 
                                            <template #default="scope">
                                                <el-input type="number" :placeholder="$t('please_enter')"  v-model="scope.row.tax_rate" clearable />
                                            </template>
                                        </el-table-column>
                                        <el-table-column :label="$t('tax')" width="250px"> 
                                            <template #default="scope">
                                                <el-input type="number" :placeholder="$t('please_enter')"  v-model="scope.row.tax" clearable />
                                            </template>
                                        </el-table-column>
                                        <el-table-column :label="$t('remark')" width="250px"> 
                                            <template #default="scope">
                                                <el-input v-model="scope.row.remark" type="textarea" autosize :placeholder="$t('please_enter')"  maxlength="100"  show-word-limit />
                                            </template>
                                        </el-table-column>
                                        <el-table-column :label="$t('operate')" width="250px">
                                            <template #default="scope">
                                                <small class="text-danger" @click="deleteDetail(scope.row.id)">{{ $t('delete') }}</small>
                                            </template>                                            
                                        </el-table-column>                                        
                                    </el-table>
                                </div>
                                    <div class="row">
                                        <small class="mt-2 ml-3 mr-3">{{ $t('total') }} 0</small>
                                        <nav aria-label="Page navigation example">
                                            <ul class="pagination">
                                                <li class="page-item">
                                                    <a class="page-link" href="#" aria-label="Previous">
                                                        <span aria-hidden="true">&laquo;</span>
                                                        <span class="sr-only">Previous</span>
                                                    </a>
                                                </li>
                                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                                <li class="page-item">
                                                <a class="page-link" href="#" aria-label="Next">
                                                    <span aria-hidden="true">&raquo;</span>
                                                    <span class="sr-only">Next</span>
                                                </a>
                                                </li>
                                            </ul>
                                        </nav>
                                        <div class="mr-3 ml-2 row">
                                            <small class="pt-1 mr-2 mt-1">{{ $t('go_to') }}</small>
                                            <input type="text" class="form-control footer-input" value="1">
                                            <small class="pt-1 ml-2 mt-1">{{ $t('page') }}</small>
                                        </div>
                                    </div>
        
                                    <div class="box-footer"  @click="addDetail()">
                                        <font-awesome-icon icon="fa-solid fa-circle-plus" style="color:cornflowerblue;" /> <span class="text-primary"> {{ $t('add_to') }} </span>
                                    </div>        
                             </div>

                            
                            <div class="form-group mb-3">
                                <label for="phone_number">
                                    <small><b> {{ $t('ph_number') }} </b></small>
                                </label>
                                <el-input type="number" id="phone_number" v-model="FormData.phone_number"
                                 :placeholder="$t('please_enter')" clearable />
                            </div>
                            <div class="form-group mb-3">
                                <label for="address">
                                    <small><b> {{ $t('address') }} </b></small>
                                </label>
                                <el-input v-model="FormData.address" maxlength="100" 
                                :placeholder="$t('please_enter')"  show-word-limit type="textarea" />  
                            </div>

                            <div class="form-group mb-3">
                                <label for="remark">
                                    <small><b> {{ $t('remark') }} </b></small>
                                </label>
                                <el-input v-model="FormData.remark" maxlength="100" 
                                :placeholder="$t('please_enter')"  show-word-limit type="textarea" />  
                            </div>

                            <Picture :oldpictureImages="oldpictureImages" @picture="getPicture($event)" />
                            <Document :oldappendixImages="oldappendixImages" @appendix="getDocument($event)" /> 

                            <el-timeline>
                                <el-timeline-item>
                                <Approver :oldapprover="oldApprover"  @approverUser="getApproverUser($event)" />
                                </el-timeline-item>
                                <el-timeline-item>
                                    <Cc :oldcc="oldCc" @ccUser="getCcUser($event)" />
                                </el-timeline-item>
                            </el-timeline>                          
                </div>
            </div>
            <div class="footer-main pt-2 pl-3">                
                 <button type="submit" class="btn btn-primary btn-footer"> {{ $t('submit') }} </button>
            </div> 
        </form>
    </div>
 </template>

<script>     
import {authApi} from '@/http/authApi'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import ProjectName from '@/components/Share/ProjectName.vue';
import Picker from '@/components/Share/Picker.vue';
import RevenueContractName from '@/components/Share/RevenueContractName.vue';
import Client from '@/components/Share/Client.vue';
import Picture from '@/components/Share/Picture.vue';
import Document from '@/components/Share/Document.vue';
import Approver from '@/components/Share/ApproverUser.vue';
import Cc from '@/components/Share/CcUser.vue';
export default {
    name: 'BillingApplicationEdit',
    data() {
        return {  
            loading: true,        
            FormData: {                
            },
            billing_status: [
                {key: "not_billed", value: "Not billed"},
                {key: "invoiced", value: "Invoiced"},
            ], 
             invoiceType: [],    
             detailCount: 1,
             pictureImages: [] ,
             appendixImages: [], 
             showapprover: [],
             showcc: [],
             oldApprover: [],  
             oldCc: [],
             oldpictureImages: [],
             oldappendixImages: [],
             oldProjectId: "", 
             oldClientId: "", 
             oldRevenueContractId: "",        
             oldPickerId: "",
             Detail: [],
             FormDetail: {
                billing_application_id: "",
                current_list: [],
                add_list: [],
            },       
             
           
         
        }
    },   
    components: {
      ProjectName, 
      Picker,
      RevenueContractName,
      Client,
      Picture,
      Document,
      Approver,
      Cc    
    }, 
    created(){
        this.getData();        
        this.getInvoiceType();
        this.getDetail();      
    },
    methods: { 
        getProjectName(data) {   
         this.FormData.project_id = data;        
        },   
        getPickerName(data){
            this.FormData.receiver = data;   
        },         
        getRevenueData(data) {
          this.FormData.revenue_contract_id= data;
        },  
        getClientData(data){
            this.FormData.client_id = data;
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
       async getInvoiceType(){
            let response = await authApi({
                method: 'GET',
                api: '/financialmanagement/invoice_type',
                params: {
                       name: ""                     
                }  
            });      
           
            this.invoiceType= response.data.data;
            this.loading = false;
            //console.log('invoice_type'+ JSON.stringify(this.invoiceType));
        },
        addDetail() { 
            this.detailCount = this.detailCount +1;            
                let detail= {
                        id: this.detailCount,
                        detail_id: null,
                        amount_with_tax: "",
                        amount_without_tax: "",
                        tax_rate: "",
                        tax: "",
                        remark: "",
                        billing_application_id: "",
                    }               
            this.Detail.push(detail);                
        },
        deleteDetail(id){
            this.Detail =this.Detail.filter(x=> x.id != id);
        },
        async getData(){         
            let response = await authApi({
                method: 'POST',
                api: '/financialmanagement/get_billing_application',
                params: {
                       id: this.$route.params.id,
                       keyword: '',             
                       page: '',
                       limit: ''
                }   
            });
            if(response.message){            
                this.FormData = response.data.data;               
                this.oldProjectId = this.FormData.project_id;
                this.oldClientId= this.FormData.client_id;
                this.oldPickerId = this.FormData.receiver;
                this.oldRevenueContractId = this.FormData.revenue_contract_id;                
                this.oldApprover = this.FormData.approver;  
                this.oldCc = this.FormData.cc;  
                if(response.data.data.picture != null){
                const list= response.data.data.picture.images;
                this.oldpictureImages = list.map(v => ({...v, isSelected: true}));
                }
                if(response.data.data.appendix !=null ){
                const list1= response.data.data.appendix.documents;
                this.oldappendixImages = list1.map(v => ({...v, isSelected: true}));
                }                              
               
                console.log('res'+ JSON.stringify(this.FormData))
                      
            }
          
        },
        async getDetail(){            
            let response = await authApi({
                method: 'GET',
                api: '/financialmanagement/billing_application_detail',
                params: {
                    billing_application_id: this.$route.params.id,                      
                }   
            });
            if(response.status == 200){
                const list1= response.data.data;
                console.log('detail'+ JSON.stringify(list1));   
                if(list1.length > 0){
                    this.Detail= list1.map((v,index) => (
                     {...v, id: index,
                       
                    }
                    ));
                    this.detailCount = this.Detail.length; 
                }
                  this.loading= false;
                        
            }
            
        },
        async updateData(e){  
             this.FormData.approver= []; 
               this.showapprover.forEach((value) => {
                this.FormData.approver.push(value.userid);                
                }); 
                this.FormData.cc= [];
                this.showcc.forEach((value) => {
                    this.FormData.cc.push(value.userid); 
                });            
            let response = await authApi({
                method: 'PUT',
                api: '/financialmanagement/billing_application',
                data: this.FormData 
            });
            if(response.status == 200){              
                const id = this.$route.params.id;
                const formData = new FormData();
                formData.append('billing_application_id',id);
                
                 
                this.pictureImages.forEach((value) => {
                    if(value.image_id != null){
                        formData.append('imglist',value.image_id);                        
                    }
                    else{
                        formData.append('addimglist', value.url);  
                    }                   
                });
                this.appendixImages.forEach((value) => {
                    if(value.file_id != null){
                        formData.append('filelist',value.file_id);
                    }
                    else{
                        formData.append('addfilelist', value.url);  
                    }
                    
                }); 
                let imgResponse = await authApi({
                method: 'PUT',
                api:  '/financialmanagement/billing_application_datafiles',           
                data: formData
                });
                if(imgResponse.status == 200){
                        this.FormDetail.billing_application_id= this.$route.params.id;
                            this.Detail.forEach((value)=>{
                            if(value.detail_id == null){
                                let newdata={
                                    amount_with_tax: value.amount_with_tax,
                                    amount_without_tax: value.amount_without_tax,
                                    tax_rate: value.tax_rate,
                                    tax: value.tax,
                                    remark: value.remark,
                                    billing_application_id: this.$route.params.id,                               
                                    }
                                  this.FormDetail.add_list.push(newdata);
                            }
                            else{
                                this.FormDetail.current_list.push(value);
                            }
                         }); 
                            let bankResponse = await authApi({
                            method: 'PUT',
                            api: '/financialmanagement/billing_application_detail',
                            data: this.FormDetail
                            });
                            if(bankResponse.status == 200){                           
                                toast.success("Billing Application Update successful !", {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 3000,
                                });
                                this.getData();
                            }
                }
            }
        },
    }
    
}
</script>

<style lang="scss">

.box1{
    margin: 10px;
    background: rgb(244, 247, 255);
    padding: 10px;   
    img {
        width: 40px;
        height: 40px;
    }
    span {
        margin-left: 10px;
        font-size: 16px;
        font-weight: 600;
        
    }
}
a{
    text-decoration: none;
}
.date-input{
    width: 200px;
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
 .budget-box{
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   align-content: space-around;
 }
 .b-box{
   background-color: #F9F9FA;
   padding: 10px;
 }
 .box-footer{
   border: 1px solid #d5def0;
   border-radius: 5px;
   width: 100%;
   padding: 7px;
   text-align: center;
   cursor: pointer;
 }
 .box-footer:hover{
   background-color: #EDF3FE;
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
   .box-circle{
       position: relative;
       width: 60px;
       height: 20px;
       margin-bottom: 70px;
       padding: 10px;
       box-sizing: border-box;
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
   .icon-font{
       position: absolute;
       top: 1;
       right: 0;
       cursor: pointer;
   }
   .status{
       position: absolute;
       top: 70px;

   }
   #complilation_date{
       width: 200px;
   }
   .left-side{
       border-right: 1px solid black;
   }
   .select-box{
       margin: auto;
       padding-right: 300px;
   }
   .operation{
       float: right;
       box-sizing: border-box;
       margin-right: 20px;
   }
   .operator{
       display: flex;
       flex-wrap: wrap;
       justify-content: center;
       align-items: center;
       align-content: space-between;
       flex-direction: row;
   }
   .operator p{
       flex-grow: 1;
   }
   .caret-wrapper{
       display: inline-flex;
       flex-direction: column;
       vertical-align: middle;
       cursor: pointer;
       font-size: 10px;
   }
   .payment_complete{
       color:rgb(40, 31, 31);
   }
   .payment_complete:hover{
       color: #6D92FB;
       text-decoration: underline;
   }
</style>