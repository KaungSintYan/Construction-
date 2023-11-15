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
                <ProjectName :oldProjectId="oldProjectId" @projectData="getProjectName($event)"  /> 

                        <div class="form-group mb-3 mt-3">
                            <label for="title">
                                <span class="text-danger">*</span> <small><b>{{ $t('title_bd') }}</b></small>
                            </label>
                            <el-input type="text" class="" id="title" :placeholder="$t('please_enter')"
                            v-model="FormData.title" clearable/>
                        </div>

                        <div class="col-md-3 m-0">
                            <div class="form group mb-3">
                                <label for="reimbursement_date"> 
                                    <span class="text-danger">*</span> <small><b>{{ $t('reimbursement_date') }}</b></small>      
                                </label>
                                <el-date-picker :placeholder="$t('pick_a_day')" type="date"  format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                                class="" id="reimbursement_date" style="width: 100%;"  v-model="FormData.reimbursement_date" />
                            </div>
                        </div>

                        <Picker :oldPickerId="oldPickerId" @pickerData="getPickerName($event)"  />
                        <div class="form-group mb-3">
                            <label for="bank">
                                <small><b>{{ $t('bank') }}</b></small> 
                            </label>
                            <el-input type="text" class="" id="bank" :placeholder="$t('please_enter')"
                            v-model="FormData.bank_name" clearable/>
                        </div>

                        <div class="form-group mb-3">
                            <label for="account_name">
                                <small><b>{{ $t('account_name') }}</b></small>  
                            </label>
                            <el-input type="text" class="" id="account_name" :placeholder="$t('please_enter')"
                            v-model="FormData.acc_name" clearable/>
                        </div>

                        <div class="form-group mb-3">
                            <label for="bank_card_number">
                                <small><b>{{ $t('bank_card_number') }}</b></small> 
                            </label>
                            <el-input type="number" class="" id="bank_card_number" :placeholder="$t('please_enter')" 
                            v-model="FormData.card_number" clearable/>
                        </div>

                        <!-- <div class="form-group mb-3">
                            <label for="receipt_amount">
                                <span class="text-danger">*</span> Total Reimbursement Amount 
                            </label>
                            <el-input type="text" class="" id="receipt_amount" placeholder="Automatic summary calculation from loan details" readonly>
                            <small class="text-secondary ml-2">{{ $t('capital') }}:</small>
                        </div> -->

                        <div class="form-group mb-3">
                            <label for="">
                                <span class="text-danger">*</span> <small><b>{{ $t('reimbursement_details') }}</b></small>
                            </label>

                            <!-- <table class="table table-hover mt-3 table_main_box" cellspacing="0" cellpadding="0">
                                <thead>
                                    <tr>
                                        <th scope="col" rowspan="1" colspan="1" class="table-box"></th>
                                        <th scope="col" rowspan="1" colspan="1" class="table-box"> <span class="text-danger">*</span> {{ $t('reimbursement_amt') }} </th>
                                        <th scope="col" rowspan="1" colspan="1" class="table-box"> <span class="text-danger">*</span> {{ $t('category_of_expenditure') }} </th>
                                        <th scope="col" rowspan="1" colspan="1" class="table-box"> {{ $t('fee_description') }} </th>
                                        <th scope="col" rowspan="1" colspan="1" class="table-box"> {{ $t('invoice_amt') }} </th>
                                        <th scope="col" rowspan="1" colspan="1" class="table-box"> {{ $t('picture') }} </th>
                                        <th scope="col" rowspan="1" colspan="1" class="table-box">{{ $t('operate') }}</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    
                                    <tr v-for="(detail, i) in Detail" :key="i">
                                        <td>{{ i+1 }}</td>
                                        <td>                                           
                                            <el-input v-model="detail.reimbursement_amount" type="number" :placeholder="$t('please_enter')" clearable />
                                        </td>                                        
                                        <td>
                                            <el-select class="" style="width: 100%;" v-model="detail.expenditure_category">
                                                <el-option value="">{{ $t('please_choose') }}</el-option>
                                                <el-option v-for="obj of expenditure_category" :key="obj.expenditure_category_id" :value="obj.expenditure_category_id">{{ obj.name }}</el-option>
                                            </el-select>
                                        </td>

                                        <td>
                                            <el-input v-model="detail.fee_description" type="textarea" :placeholder="$t('please_enter')" />
                                        </td>

                                        <td>
                                            <el-input v-model="detail.invoice_amount" type="number" :placeholder="$t('please_enter')" clearable />
                                            
                                        </td>

                                        <td>
                                            <font-awesome-icon icon="fa-solid fa-plus" style="color:cornflowerblue;" /> <small>{{ $t('add') }}</small>
                                        </td>

                                        <td>
                                            <a href="#"><small>{{ $t('delete') }}</small> </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table> -->

                            <!-- start  -->

                            <div class="row mx-2 mb-4">
                                <el-table :data="Detail" border style="width: 100%;">
                                    <el-table-column  fixed type="index" width="55" />
                                    
                                    <el-table-column :label="$t('reimbursement_amt')" width="300px"> 
                                        <template #default="scope">
                                            <el-input v-model="scope.row.reimbursement_amount" type="number" :placeholder="$t('please_enter')" clearable />
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('category_of_expenditure')" width="300px"> 
                                        <template #default="scope">
                                            <el-select class="" style="width: 100%;" v-model="scope.row.expenditure_category">
                                                <el-option value="">{{ $t('please_choose') }}</el-option>
                                                <el-option v-for="obj of expenditure_category" :key="obj.expenditure_category_id" :value="obj.expenditure_category_id">{{ obj.name }}</el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('fee_description')" width="300px"> 
                                        <template #default="scope">
                                            <el-input v-model="scope.row.fee_description" type="textarea" :placeholder="$t('please_enter')" maxlength="100" autosize show-word-limit />
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('invoice_amt')" width="300px"> 
                                        <template #default="scope">
                                            <el-input v-model="scope.row.invoice_amount" type="number" :placeholder="$t('please_enter')" clearable />
                                        </template>
                                    </el-table-column>

                                    <!-- <el-table-column :label="$t('picture')" width="300px"> 
                                        <template #default="scope">
                                            <font-awesome-icon icon="fa-solid fa-plus" style="color:cornflowerblue;" /> <small> {{ $t('add') }} </small>
                                        </template>
                                    </el-table-column> -->


                                    <el-table-column :label="$t('operate')" width="300px">

                                        <template #default="scope">
                                            <!-- <a href="#"><small>{{ $t('delete') }}</small> </a> -->
                                            <small class="text-danger"  @click="deleteMaterial(scope.row.id)"> {{ $t('delete') }} </small>
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

                            <div class="box-footer"  @click="addMaterial()">
                                <font-awesome-icon icon="fa-solid fa-circle-plus" style="color:cornflowerblue;" /> <span class="text-primary"> {{ $t('add_to') }} </span>
                            </div>
                        </div>

                        <div class="form-group mb-3 ml-2">
                            <label for=""> <small><b> {{ $t('whether_to_offset') }} </b></small> </label><br>
                            <div class="ml-1">
                                <el-switch v-model="FormData.isoffset" size="large" active-text="" inactive-text=""/>
                            </div>
                           
                        </div>
                        <div class="form-group">
                            <label for=""> <small><b> {{ $t('offset_type') }} </b></small> </label><br>
                            <el-select class="" style="width: 100%;" v-model="FormData.offset_type">
                                <el-option value="">{{ $t('all') }}</el-option>
                                <el-option v-for="obj of borrow_offset_type" :key="obj.key" :value="obj.key">{{ obj.value }}</el-option>
                            </el-select>                            
                        </div>
                        <div class="form-group mb-3">
                            <label for="remark">
                                <small><b>{{ $t('remark') }}</b></small>
                            </label>
                            <el-input type="textarea" :placeholder="$t('please_enter')" v-model="FormData.remark"  id="remark" maxlength="100" show-word-limit  />
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
import Picker from '@/components/Share/Picker.vue';
import Picture from '@/components/Share/Picture.vue';
import Document from '@/components/Share/Document.vue';
import Approver from '@/components/Share/ApproverUser.vue';
import Cc from '@/components/Share/CcUser.vue';
import $ from 'jquery';
export default {
    name: 'ReimbursementEdit',
    data() {
        return {
            submitting: false,
            loading: true,
            FormData: {
                        
            },
            borrow_offset_type: [
                {key: 'offset_borrowing', value: 'Offset Borrowing'},
                {key: 'offset_reverse', value: 'Offset Reverse'},
            ],            
            detailCount: 1,
             oldProjectId: "",
             pictureImages: [] ,
             appendixImages: [], 
             showapprover: [],
             showcc: [],
             oldApprover: [],  
             oldCc: [],
             oldpictureImages: [],
             oldappendixImages: [],
             oldPickerId: "",
             Detail: [],             
             FormDetail: {
                reimbursement_id: "",
                current_list: [],
                add_list: []
            },   
            reimbursement: [], 
            expenditure_category: []                   
        }
    },
    components: {
      ProjectName,
      Picker,
      Picture,
      Document,
      Approver,
      Cc    
    }, 
    created(){  
        this.getReimbursement();  
        this.getExpenditureCategory();
        this.getData();            
        this.getDetail();       
       
    },
    computed: {

    },
    methods: {        
        getProjectName(data) {   
         this.FormData.project_id = data;        
        },   
        getPickerName(data){
            this.FormData.reimburser = data;   
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

        async getData(){         
            let response = await authApi({
                method: 'POST',
                api: '/costmanagement/get_reimbursement',
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
                this.oldPickerId = this.FormData.reimburser;
                this.oldApprover = this.FormData.approver;                
                this.oldCc = this.FormData.cc;                                  
                if(response.data.data.picture != null ){
                const list= response.data.data.picture.images;
                this.oldpictureImages = list.map(v => ({...v, isSelected: true}));
                }
                if(response.data.data.appendix !=null ){
                const list1= response.data.data.appendix.documents;
                this.oldappendixImages = list1.map(v => ({...v, isSelected: true}));
                }       
            }
          
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
        async getDetail(){
            let response = await authApi({
                method: 'GET',
                api: '/costmanagement/reimbursement_detail',
                params: {
                    reimbursement_id: this.$route.params.id,                       
                }   
            });
            if(response.status == 200){ 
               console.log('de'+ JSON.stringify(response.data))
                const list1= response.data;
                this.Detail= list1.map((v,index) => (
                     {...v, id: index }
                    ));
                this.detailCount = this.Detail.length;
                this.loading = false;
            
            }
        },
        async getReimbursement(){
        let response = await authApi({
                method: 'POST',
                api: '/costmanagement/get_reimbursement',
                params: {
                       id: '',
                       keyword: '',             
                       page: '',
                       limit: ''
                }  
        });       
        const list= response.data.data;
        this.reimbursement = list.map(v => ({...v, isSelected: false}));  
        //console.log('reimbursement'+ JSON.stringify(this.reimbursement));        
       },
      
       addMaterial() { 
            this.detailCount = this.detailCount +1;
            let id= this.detailCount;    
            let detail= {
                        id: id,
                        detail_id: null,
                        reimbursement_amount: "",
                        fee_description: "",
                        invoice_amount: "",
                        picture: null,
                        reimbursement_id: "",
                        expenditure_category: ""
                    }                
                this.Detail.push(detail);              
          
        },
        deleteMaterial(id){
            this.Detail =this.Detail.filter(x=> x.id != id);
        },
       async updateData(e){   
        this.submitting = true;
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
                api: '/costmanagement/reimbursement',
                data: this.FormData 
            });
            if(response.status == 200){ 
                
                const id = this.$route.params.id;
                const formData = new FormData();
                formData.append('reimbursement_id',id);
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
                api:  '/costmanagement/reimbursement_datafiles',           
                data: formData
                });
                if(imgResponse.status == 200){
                        this.FormDetail.reimbursement_id= this.$route.params.id;
                            this.Detail.forEach((value)=>{
                            if(value.detail_id == null){
                                let newdata={
                                    reimbursement_amount: value.reimbursement_amount,
                                    fee_description: value.fee_description,
                                    invoice_amount: value.invoice_amount,
                                    picture: null,
                                    reimbursement_id: this.$route.params.id,
                                    expenditure_category: value.expenditure_category
                                    }
                                  this.FormDetail.add_list.push(newdata);
                            }
                            else{
                                this.FormDetail.current_list.push(value);
                            }
                         }); 
                            let detailResponse = await authApi({
                            method: 'PUT',
                            api: '/costmanagement/reimbursement_detail',
                            data: this.FormDetail
                            });
                            if(detailResponse.status == 200){                           
                                toast.success("Reimbursement Update successful !", {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 3000,
                                });
                                this.submitting = false;
                                this.getData();            
                                this.getDetail();  
                            }
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
