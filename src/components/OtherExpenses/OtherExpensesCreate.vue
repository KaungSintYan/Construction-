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

                            <div class="form-group mb-3 mt-3">
                                <label for="title">
                                    <span class="text-danger">*</span> <small><b>{{ $t('title_bd') }}</b></small>
                                </label>
                                <el-input type="text" id="title" :placeholder="$t('please_enter')" v-model="FormData.expense.title"  clearable />
                            </div>

                            <div class="col-md-3 m-0 p-0">
                                <div class="form-group mb-3">
                                    <label for="fee_date"> 
                                        <span class="text-danger">*</span> <small><b> {{ $t('fee_date') }} </b></small>      
                                    </label>
                                    <el-date-picker v-model="FormData.expense.fee_date"  id="fee_date" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                                    placeholder="Pick a Date" size="default"  style="width: 100%;" editable clearable  />
                                </div>
                            </div>

                            <Supplier @supplierData="getSuppliperData($event)" />
                            <div class="form-group mb-3">
                                <label for="bank">
                                    <small><b>{{ $t('bank') }}</b></small>
                                </label>
                                <el-input type="text" id="bank"  :placeholder="$t('please_enter')" v-model="FormData.expense.bank_name" clearable />
                            </div>

                            <div class="form-group mb-3">
                                <label for="bank_card_number">
                                    <small><b>{{ $t('bank_card_number') }}</b></small> 
                                </label>
                                <el-input type="number" id="bank_card_number" v-model="FormData.expense.bank_card_number"
                                 :placeholder="$t('please_enter')" clearable />
                            </div>

                            <!-- <div class="form-group mb-3">
                                <label for="total_spending_amount">
                                    <span class="text-danger">*</span> Total spending Amount (¥)
                                </label>
                                <input type="text" id="total_spending_amount" class="form-control" placeholder="Automatic summary calculation from expenditure details" readonly>
                                <small class="text-secondary ml-2 mt-1">{{ $t('capital') }} : </small>
                            </div> -->

                            <div class="form-group mb-3">
                                <label for="">
                                    <span class="text-danger">*</span> <small><b>{{ $t('details_of_expenditure') }}</b></small>   
                                </label>

                                <!-- <table class="table table-hover mt-3 table_main_box" cellspacing="0" cellpadding="0">
                                    <thead>
                                        <tr>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"></th>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"> <span class="text-danger">*</span> {{ $t('expenditure_amt') }} </th>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"> <span class="text-danger">*</span> {{ $t('category_of_expenditure') }} </th>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"> {{ $t('fee_description') }} </th>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"> {{ $t('invoice_amount') }} (¥) </th>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"> <span class="text-danger">*</span> {{ $t('operate') }}</th>
                                        </tr>
                                    </thead>
        
                                    <tbody>                                       
                                        <tr v-for="(detail,index) in FormData.details" :key=index>
                                            <td>{{ index+1 }}</td>
                                            <td><el-input type="number"  :placeholder="$t('please_enter')"  v-model="detail.expenditure_amount" clearable /></td>
                                            <td>
                                                <el-select v-model="detail.category_of_expenditure" class="" :placeholder="$t('please_choose')"  style="width: 100%">
                                                    <el-option
                                                      v-for="item in expenditure_category"
                                                      :key="item.expenditure_category_id"
                                                      :label="item.name"
                                                      :value="item.expenditure_category_id"
                                                    />  
                                                </el-select> 
                                            </td>
                                            <td><el-input v-model="detail.description" type="textarea" autosize :placeholder="$t('please_enter')"  maxlength="100"  show-word-limit /></td>
                                            <td><el-input type="number"  :placeholder="$t('please_enter')"  v-model="detail.invoice_amount" clearable /></td>                                                                                     
                                            <td>
                                               <small  @click="deleteDetail(detail.id)">{{ $t('delete') }}</small>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table> -->

                                <!-- start  -->

                                <div class="row mx-2 mb-4">
                                    <el-table :data="FormData.details" border style="width: 100%;">
                                        <el-table-column  fixed type="index" width="55" />
                                        
                                        <el-table-column :label="$t('expenditure_amt')" width="300px"> 
                                            <template #default="scope">
                                                <el-input type="number" :placeholder="$t('please_enter')"  v-model="scope.row.expenditure_amount" clearable />
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('category_of_expenditure')" width="300px"> 
                                            <template #default="scope">
                                                <el-select v-model="scope.row.category_of_expenditure" class="" :placeholder="$t('please_choose')"  style="width: 100%">
                                                    <el-option
                                                      v-for="item in expenditure_category"
                                                      :key="item.expenditure_category_id"
                                                      :label="item.name"
                                                      :value="item.expenditure_category_id"
                                                    />  
                                                </el-select> 
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('fee_description')" width="300px"> 
                                            <template #default="scope">
                                                <el-input v-model="scope.row.description" type="textarea" autosize :placeholder="$t('please_enter')"  maxlength="100"  show-word-limit />
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('invoice_amount')" width="300px"> 
                                            <template #default="scope">
                                                <el-input type="number" :placeholder="$t('please_enter')"  v-model="scope.row.invoice_amount" clearable />
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('operate')" width="300px">

                                            <template #default="scope">
                                                <small class="text-danger" @click="deleteDetail(scope.row.id)"> {{ $t('delete') }} </small>
                                            </template>
                                            
                                        </el-table-column>
                                        
                                    </el-table>
                                </div>

                                <!-- end -->

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
                                <label for="">
                                    <small><b>{{ $t('whether_to_offset_reserve_fund') }}</b></small> 
                                </label>
                                <div class="ml-1">
                                    <el-switch
                                    v-model="FormData.expense.isoffset"
                                    size="large"
                                    active-text=""
                                    inactive-text=""
                                  />
                                
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="remark">
                                    <small><b>{{ $t('remark') }}</b></small>
                                </label>
                                <el-input v-model="FormData.expense.remark" maxlength="100" 
                                :placeholder="$t('please_enter')"  show-word-limit type="textarea" />  
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
import Supplier from '@/components/Share/Supplier.vue';
import Picture from '@/components/Share/Picture.vue';
import Document from '@/components/Share/Document.vue';
import Approver from '@/components/Share/ApproverUser.vue';
import Cc from '@/components/Share/CcUser.vue';
export default {
    name: 'OtherExpensesCreate',
    data() {
        return {          
            FormData: {
                expense: {
                        title: "",
                        odd_number: "",
                        fee_date: "",
                        bank_name: "",
                        bank_card_number: "",                       
                        total_amount: 0,                        
                        isoffset: false,                                            
                        remark: "",        
                        picture: null,
                        appendix: null,
                        approver:[],
                        cc: [],                        
                        creation_time: "", 
                        project_id: "",   
                        supplier_id: "",                     
                        created_by_user: ""
                        } ,
                        details: [
                            {
                                id: 1,
                                expenditure_amount: "",
                                description: "",
                                invoice_amount: "",
                                picture: null,
                                other_expense_id: "",
                                category_of_expenditure: "",                             
                            }
                        ]      
            },
            detailCount: 1,
            pictureImages: [] ,
            appendixImages: [], 
            showapprover: [],
            showcc: [], 
            expenditure_category: [],           
        }
    },   
    components: {
      ProjectName,      
      Supplier,           
      Picture,
      Document,
      Approver,
      Cc    
    }, 
    created(){        
        this.getExpenditureCategory();  
    },
    methods: {        
        getProjectName(data) {   
         this.FormData.expense.project_id = data;        
        },            
        getSuppliperData(data){
          this.FormData.expense.supplier_id= data;
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
       async getExpenditureCategory(){
            let response = await authApi({
                method: 'GET',
                api: '/costmanagement/expenditure_category',
                params: {
                       name: ""                     
                }  
            });       
            const list= response.data;
            this.expenditure_category= list;
            //console.log('list'+ JSON.stringify(this.expenditure_category));
        },
        addDetail() { 
            this.detailCount = this.detailCount +1;            
                let detail= {
                        id: this.detailCount,
                        expenditure_amount: "",
                        description: "",
                        invoice_amount: "",
                        picture: null,
                        other_expense_id: "",
                        category_of_expenditure: "",  
                    }               
            this.FormData.details.push(detail);                
        },
        deleteDetail(id){
            this.FormData.details =this.FormData.details.filter(x=> x.id != id);
        },
        async createData(e){   
            this.showapprover.forEach((value) => {
                if(value.isSelected){
                    this.FormData.expense.approver.push(value.userid); 
                }                 
            }); 
            this.showcc.forEach((value) => {
                if(value.isSelected){
                    this.FormData.expense.cc.push(value.userid); 
                }  
            }); 
           
            let response = await authApi({
                method: 'POST',
                api: '/financialmanagement/other_expense',
                data: this.FormData 
            });
            if(response.status == 201){              
              //console.log(response.data.revenue_contract_id);
                const id = response.data.other_expense_id; 
                const imgformData = new FormData();
                imgformData.append('other_expense_id',id);
                this.pictureImages.forEach((value) => {
                     imgformData.append('picture', value.url);   
                });
                this.appendixImages.forEach((value) => {
                    imgformData.append('appendix', value.url);  
                });    
                
                let imgResponse = await authApi({
                method: 'POST',
                api:  '/financialmanagement/other_expense_datafiles',           
                data: imgformData
                });
                if(imgResponse.status == 200){
                    e.target.reset();
                    toast.success("Other Expenses Insert successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
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
</style>