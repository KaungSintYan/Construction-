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

                            <div class="col-md-3 m-0 p-0">
                                <div class="form-group mb-3">
                                    <label for="borrowing_date"> 
                                        <span class="text-danger">*</span> <small><b>{{ $t('borrowing_date') }}</b></small>       
                                    </label>
                                    <el-date-picker :placeholder="$t('pick_a_day')" type="date" class=""   format="YYYY-MM-DD" value-format="YYYY-MM-DD" 
                                    id="borrowing_date" style="width: 100%;"  v-model="FormData.borrowing_date" clearable/>
                                </div>
                            </div>

                            <!-- <Picker :oldPickerId="oldPickerId" @pickerData="getPickerName($event)"  /> -->

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
                                <el-input type="text" class="" id="bank_card_number" :placeholder="$t('please_enter')"
                                v-model="FormData.card_number" clearable/>
                            </div>
                            
                            <div class="form-group mb-3">
                                <label for="">
                                    <small><b>{{ $t('payment_plan_details') }}</b></small> 
                                </label>

                                <!-- <table class="table table-hover mt-3 table_main_box" cellspacing="0" cellpadding="0">
                                    <thead>
                                        <tr>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"></th>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"> <span class="text-danger">*</span> {{ $t('loan_amount') }} </th>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"> {{ $t('reason_for_borrowing') }} </th>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box">{{ $t('operate') }}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr  v-for="(detail,index) in Detail" :key=index>
                                            <td>{{ index+1 }}</td>
                                            <td>
                                               
                                                <el-input type="number" v-model="detail.loan_amount" :placeholder="$t('please_enter')" clearable />
                                            </td>                                            
                                            <td>
                                                <el-input type="textarea" v-model="detail.reason_for_borrowing" :placeholder="$t('please_enter')" maxlength="100" show-word-limit/>
                                                
                                            </td>
                                            
                                            <td>
                                                <small  @click="deletePlanDetail(detail.id)">{{ $t('delete') }}</small>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table> -->

                            <!-- start  -->

                            <div class="row mx-2 mb-4" style="width: 100%;">
                                <el-table :data="Detail" border style="width: 100%;">
                                    <el-table-column  fixed type="index" width="55" />
                                    
                                    <el-table-column :label="$t('plan_name')" width="500px"> 
                                        <template #default="scope">
                                            <el-input type="name" :placeholder="$t('please_choose')" v-model="scope.row.plan_name" clearable/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('plan_date')" width="500px"> 
                                        <template #default="scope">
                                            <el-input type="date" v-model="scope.row.plan_date" :placeholder="$t('please_enter')" maxlength="100" autosize show-word-limit/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('operate')" width="500px">

                                        <template #default="scope">
                                            <small class="text-danger" @click="deletePlanDetail(scope.row.id)"> {{ $t('delete') }} </small>
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
                                    <div class="box-footer" @click="addPlanDetail">
                                        <font-awesome-icon icon="fa-solid fa-circle-plus" style="color:cornflowerblue;" /> <span class="text-primary">{{ $t('add_to') }}</span>
                                    </div>
                            </div>
                            
                            <div class="form-group mb-3">
                                <label for="remark">
                                    <small><b>{{ $t('remark') }}</b></small>
                                </label>
                                 <el-input type="textarea" :placeholder="$t('please_enter')" id="remark" v-model="FormData.remark" maxlength="100" show-word-limit  />
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
// import Picker from '@/components/Share/Picker.vue';
import Picture from '@/components/Share/Picture.vue';
import Document from '@/components/Share/Document.vue';
import Approver from '@/components/Share/ApproverUser.vue';
import Cc from '@/components/Share/CcUser.vue';
export default {
    name: 'DebitNoteEdit',
    data() {
        return {
            loading: true,
            FormData: {
                          
            },            
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
                debit_note_id: "",
                current_list: [],
                add_list: []
            }    
                   
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
    created(){  
        this.getData();
        this.getDetail();              
      
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
         this.FormData.note.project_id = data;        
        },
        // getPickerName(data){
        //     this.FormData.note.borrower = data;   
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
        async getDetail(){
            let response = await authApi({
                method: 'GET',
                api: '/costmanagement/debit_note_detail',
                params: {
                    debit_note_id: this.$route.params.id,                       
                }   
            });
            if(response.status == 200){ 
                console.log('de'+ JSON.stringify(response))
                const list1= response.data;
                 this.Detail= list1.map((v,index) => (
                     {...v, id: index}
                    ));
                this.detailCount = this.Detail.length;
                this.loading = false;   
            }
        },  
        async getData(){         
            let response = await authApi({
                method: 'POST',
                api: '/costmanagement/get_debit_note',
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
                this.oldPickerId= this.FormData.borrower;
                this.oldApprover = this.FormData.approver.approvers;  
                this.oldCc = this.FormData.cc.cc;  
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
        addPlanDetail() {
            this.detailCount = this.detailCount +1;
            let id= this.detailCount;
            let detail= {
                        id: id,
                        debit_note_id: null,
                        loan_amount: "",
                        reason_for_borrowing: "",
                        
                    }
            this.Detail.push(detail);
           
        },
        deletePlanDetail(id){
          this.Detail =this.Detail.filter(x=> x.id != id);
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
                api: '/costmanagement/debit_note',
                data: this.FormData 
            });
            if(response.status == 200){              
              //console.log(response.data.revenue_contract_id);
                const id =this.$route.params.id;
                const formData = new FormData();
                formData.append('debit_note_id',id);
                
                 
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
                api:  '/costmanagement/debit_note_datafiles',       
                data: formData
                });
                if(imgResponse.status == 200){
                    this.FormDetail.debit_note_id= this.$route.params.id;
                            this.Detail.forEach((value)=>{
                            if(value.debit_note_id == null){
                                let newdata={
                                    loan_amount: value.loan_amount,
                                    reason_for_borrowing: value.reason_for_borrowing
                                    }
                                  this.FormDetail.add_list.push(newdata);
                            }
                            else{
                                this.FormDetail.current_list.push(value);
                            }
                         }); 
                            let detailResponse = await authApi({
                            method: 'PUT',
                            api: '/costmanagement/debit_note_detail',               
                            data: this.FormDetail
                            });
                            if(detailResponse.status == 200){                           
                                toast.success("Debit Note Update successful !", {
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

<style lang="scss" scoped>
#content {
    background-color: red !important;
}
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
