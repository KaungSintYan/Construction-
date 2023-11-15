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
                    <ProjectName @projectData="getProjectName($event)"  /> 
                    <span v-if="v$.FormData.note.project_id.$error" class="text-danger">
                        <span v-if="v$.FormData.note.project_id.$errors[0].$message != ''">
                            {{ $t('is_required',{'name': $t('project')}) }}
                        </span>
                    </span>

                            <div class="form-group mb-3 mt-3">
                                <label for="title">
                                    <span class="text-danger">*</span> <small><b>{{ $t('title_bd') }}</b></small> 
                                </label>
                                <el-input type="text" class="" id="title"  :placeholder="$t('please_enter')"
                                v-model="FormData.note.title" clearable/>
                                <!-- <span v-if="v$.FormData.note.title.$error" class="text-danger">
                                    <span v-if="v$.FormData.note.title.$errors[0].$message != ''">
                                        {{ $t('is_required',{'name': $t('title_bd')}) }}
                                    </span>
                                </span> -->
                            </div>

                            <div class="col-md-3 m-0 p-0">
                                <div class="form-group mb-3">
                                    <label for="repayment_date"> 
                                    <span class="text-danger">*</span> <small><b>{{ $t('repayment_date') }}</b></small>      
                                    </label>
                                    <el-date-picker :placeholder="$t('pick_a_day')" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                                    class="" id="repayment_date" style="width: 100%;"  v-model="FormData.note.repayment_date" />
                                    <span v-if="v$.FormData.note.repayment_date.$error" class="text-danger">
                                        <span v-if="v$.FormData.note.repayment_date.$errors[0].$message != ''">
                                            {{ $t('is_required',{'name': $t('repayment_date')}) }}
                                        </span>
                                    </span>
                                </div>
                            </div>

                            <!-- <Picker :titleName="$t('repayer')" @pickerData="getPickerName($event)"  /> -->

                            <div class="form-group mb-3">
                                
                                <div class="row">
                                    <div class="payment-box">
                                        <small class="text-secondary text-center ml-4"> <b> {{ $t('cumulative_loan_amt') }} </b></small>
                                        <p class="text-center"> <strong>0.00</strong> </p>
                                    </div>
                                    <div class="payment-box">
                                        <small class="text-secondary"><b> {{ $t('cumulative_repayment_amt') }} </b></small>
                                        <p class="text-center"> <strong>0.00</strong> </p>
                                    </div>
                                    <div class="payment-box">
                                        <small class="text-secondary"><b> {{ $t('cumulative_outstanding_amt') }} </b></small>
                                        <p class="text-center"> <strong>0.00</strong> </p>
                                    </div>
                                </div>
                                
                            </div>

                            <!-- <div class="form-group mb-3">
                                <label for="total_repayment_amount"> <span class="text-danger">*</span> Total repayment amount (¥) </label>
                                <el-input type="text" id="total_repayment_amount" class="" placeholder="Summarized by repayment amount and offset amount" readonly>
                                <small class="text-secondary ml-2"> {{ $t('capital') }} : </small>
                            </div> -->

                            <div class="form-group mb-3">
                                <label for="ordinary_repayment_amount">
                                    <small><b>{{ $t('ordinary_repayment_amount') }}</b></small>
                                </label>
                                <el-input type="number" class="" id="ordinary_repayment_amount"
                                 :placeholder="$t('please_enter')" v-model="FormData.note.ordinary_repayment_amount" clearable/>
                                 <span v-if="v$.FormData.note.ordinary_repayment_amount.$error" class="text-danger">
                                    <span v-if="v$.FormData.note.ordinary_repayment_amount.$errors[0].$message != ''">
                                        {{ $t('is_required',{'name': $t('ordinary_repayment_amount')}) }}
                                    </span>
                                 </span>
                            </div>

                            <!-- <div class="form-group mb-3">
                                <label for="total_repayment_amount"> Reimbursement offset amount (¥) </label>
                                <el-input type="text" id="total_repayment_amount" class="" 
                                placeholder="Automatically generated by the system, no need to fill in" v-model="FormData.note.reimbursement_offset_amount">
                                <small class="text-secondary ml-2"> {{ $t('capital') }} : </small>
                            </div> -->
                           
                            <div class="form-group mb-3">
                                <label for="">
                                    <span class="text-danger">*</span> <small><b>{{ $t('offset_details') }}</b></small>   
                                </label>

                                <!-- <table class="table table-hover mt-3 table_main_box" cellspacing="0" cellpadding="0">
                                    <thead>
                                        <tr>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"></th>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"> {{ $t('reimbursement') }} </th>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"> {{ $t('total_reimbursement_amount') }} (¥) </th>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"> {{ $t('amt_can_offset') }} </th>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box"> <span class="text-danger">*</span> {{ $t('offset_amt') }} </th>
                                            <th scope="col" rowspan="1" colspan="1" class="table-box">{{ $t('operate') }}</th>
                                        </tr>
                                    </thead>
        
                                    <tbody>
                                        <tr v-for="(detail,index) in FormData.details" :key=index>
                                            <td>{{ index+1 }}</td>
                                            <td>
                                                <el-input type="text" :placeholder="$t('please_choose')"
                                                 v-model="detail.reimbursement_name"
                                                 class="" readonly clearable/>
                                            </td>
                                            
                                            <td> <el-input type="text" :placeholder="$t('please_choose')"
                                                v-model="detail.reimbursement_amount"
                                                class="" readonly clearable/></td>
                                            <td><el-input type="text" placeholder="" class="" readonly clearable/></td>
                                            <td><el-input type="text" placeholder="" class="" v-model="detail.offset_amount" clearable/></td>                                           
                                            
                                            <td>
                                               <small  @click="deleteMaterial(detail.reimbursement_id)">{{ $t('delete') }}</small>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table> -->

                            <!-- start  -->

                            <div class="row mx-2 mb-4">
                                <el-table :data="FormData.details" border style="width: 100%;">
                                    <el-table-column  fixed type="index" width="55" />
                                    
                                    <el-table-column :label="$t('reimbursement')" width="300px"> 
                                        <template #default="scope">
                                            <el-input type="text" :placeholder="$t('please_choose')"
                                                 v-model="scope.row.reimbursement_name"
                                                 class="" readonly clearable/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('total_reimbursement_amount')" width="300px"> 
                                        <template #default="scope">
                                            <el-input type="text" :placeholder="$t('please_choose')"
                                                v-model="scope.row.reimbursement_amount"
                                                class="" readonly clearable/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('amt_can_offset')" width="300px"> 
                                        <template #default="">
                                            <el-input type="text" placeholder="" class="" readonly clearable/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('offset_amt')" width="300px"> 
                                        <template #default="scope">
                                            <el-input type="text" placeholder="" class="" v-model="scope.row.offset_amount" clearable/> 
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('operate')" width="300px">

                                        <template #default="scope">
                                            <!-- <small class="text-danger"  @click="deleteMaterial(scope.row.reimbursement_id)"> {{ $t('delete') }} </small> -->
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
        
                                    <div class="box-footer"  @click="addModal()">
                                        <font-awesome-icon icon="fa-solid fa-circle-plus" style="color:cornflowerblue;" /> <span class="text-primary"> {{ $t('add_to') }} </span>
                                    </div>
        
                             </div>

                            <div class="form-group mb-3">
                                <label for="remark">
                                    <small><b>{{ $t('remark') }}</b></small> 
                                </label>
                                 <el-input type="textarea" :placeholder="$t('please_enter')" id="remark" v-model="FormData.note.remark" maxlength="100" show-word-limit  />
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
                <el-button type="primary" loading v-if="submitting">Submiting ...</el-button>     
                <button type="submit" class="btn btn-primary btn-footer" v-if="!submitting"> {{ $t('submit') }} </button>
            </div>
        </form> 
    </div>
    <div class="modal fade select-box" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"> <strong> {{ $t('select_reimbursement') }} </strong> </h5>
                </div>
                <div class="modal-body row">
                    <div class="col-2 left-side">
                        <h6>{{ $t('category_name') }}</h6>
                        <a href="#"><small> <font-awesome-icon icon="fa-solid fa-sliders"/>  {{ $t('category_management') }} </small></a>
                    </div>
                    <div class="col-10" style="position: relative;">
                        <div class="row">
                            <input type="text" autocomplete="off" class="input-inner  m-1" :placeholder="$t('please_enter')" style="width: 400px;">
                            <button type="button" class="btn btn-outline-secondary btn-sm mt-1" style="width: 70px; height: 35px;"> <small>{{ $t('save') }}</small> </button>
                            <div class="operation" style="position: absolute; right: 0;">
                                <button class="btn btn-primary">{{ $t('add') }}</button>
                            </div>
                        </div>
                        <div class="row operator">
                            <p class="ml-1 ">{{ $t('test_final') }}</p>
                            <p class=""> {{ $t('all_reimbursement') }} <span><font-awesome-icon icon="fa-solid fa-caret-down"/></span> </p>

                            <table class="table table-hover mt-3 table_main_box" cellspacing="0" cellpadding="0">
                                <thead>
                                <tr>
                                    <th scope="col" rowspan="1" colspan="1" class="table-box">
                                        <input type="checkbox">
                                    </th>
                                    <th scope="col" rowspan="1" colspan="1" class="table-box">
                                        {{ $t('reimbursement_name') }}
                                        <span class="caret-wrapper ml-2">
                                            <font-awesome-icon icon="fa-solid fa-sort-up"/>
                                            <font-awesome-icon icon="fa-solid fa-sort-down"/>
                                        </span>  
                                    </th>
                                    <!-- <th scope="col" rowspan="1" colspan="1" class="table-box">
                                        {{ $t('specification') }}
                                        <span class="caret-wrapper ml-2">
                                            <font-awesome-icon icon="fa-solid fa-sort-up"/>
                                            <font-awesome-icon icon="fa-solid fa-sort-down"/>
                                        </span>
                                    </th>
                                    <th scope="col" rowspan="1" colspan="1" class="table-box">
                                        {{ $t('brand') }}
                                        <span class="caret-wrapper ml-2">
                                            <font-awesome-icon icon="fa-solid fa-sort-up"/>
                                            <font-awesome-icon icon="fa-solid fa-sort-down"/>
                                        </span>
                                    </th> -->
                                   
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(obj, index) in reimbursement" :key="index">
                                    <th scope="row">
                                        <input type="checkbox" :checked=obj.isSelected @change="checkOne(obj.reimbursement_id, !obj.isSelected)">
                                    </th>
                                    <td class="table-box">
                                        <span class="filed_boxe">
                                            {{ obj.title }}
                                        </span>
                                    </td>
                                    <!-- <td class="table-box">
                                        <span class="filed_boxe">
                                            {{ obj.specification }}
                                        </span>
                                    </td>
                                    <td class="table-box">
                                        <span class="filed_boxe">
                                            {{ obj.brand }}
                                        </span>
                                    </td>
                                     -->
                                </tr>
                                </tbody>
                               
                            </table>

                            <div class="row justify-content-end">
                                <p class="mr-3 mt-1">{{ $t('common') }} 3 {{ $t('strip') }}</p>
                                <div class="form-group mr-3">
                                    <el-select class="" style="width: 100%;" id="exampleFormControlSelect1">
                                        <el-option> 20 items/page</el-option>
                                        <el-option> 50 items/page</el-option>
                                        <el-option> 100 items/page</el-option>
                                        <el-option value=""></el-option>
                                    </el-select> 
                                </div>
                                <nav aria-label="Page navigation example" class="mr-3">
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
                                    <p class="pt-1 mr-2">{{ $t('go_to') }}</p>
                                    <input type="text" class="form-control footer-input" value="1">
                                    <p class="pt-1 ml-2">{{ $t('page') }}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    
                </div>
                <div class="modal-footer">                   
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t('cancel') }}</button>
                    <button type="button" class="btn btn-primary" @click="addMaterial">{{ $t('sure') }}</button>
                </div>
            </div>
        </div>
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
import $ from 'jquery';
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators';

export function validName(name){
    let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
    if (validNamePattern.test(name)){
        return true;
    }
    return false;
}

export default {
    name: 'RepaymentNoteCreate',
    data() {
        return {
            v$: useValidate(),
            submitting: false,
            FormData: {
                note:{ 
                        title: "",
                        odd_number: "",
                        repayment_date: "",
                        // repayer: "",
                        total_payment_amount: "",
                        ordinary_repayment_amount: "",
                        reimbursement_offset_amount: "",
                        remark: "",                        
                        picture: null,
                        appendix: null,
                        approver:[],
                        cc: [],
                        creation_time: "",
                        project_id: "",
                        created_by_user: ""
                    },
                    details:[]               
            },
           
            detailCount: 1,
            pictureImages: [] ,
            appendixImages: [], 
            showapprover: [],
            showcc: [],
            reimbursement: []             
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
            FormData : {
                note : {
                    ordinary_repayment_amount : {
                        required,
                    },
                    project_id : {
                        required,
                    },
                    // repayer : {
                    //     required,
                    // },
                    repayment_date : {
                        required,
                    },
                    // title : {
                    //     required,
                    // },
                },
            }
        }
    },
    created(){                
        this.getReimbursement(); 
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
        //     this.FormData.note.repayer = data;   
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
       checkOne(id, selected){
        for(let i=0; i<this.reimbursement.length; i++){
            if(id == this.reimbursement[i].reimbursement_id && selected){
                this.reimbursement[i].isSelected= selected;
            }
            else{
                this.reimbursement[i].isSelected= false
            }
        }        
       },
       addModal(){
        for(let i=0; i<this.reimbursement.length; i++){
            this.reimbursement[i].isSelected= false;
        }
        $('.select-box').modal('show');      
       },
       addMaterial() { 
            let reimbursement = this.reimbursement.find(x=> x.isSelected);
           //console.log('add'+ JSON.stringify(reimbursement))
            if(reimbursement !=null && reimbursement !=undefined){
                let detail= {
                        id: this.detailCount,
                        offset_amount: "",
                        repayment_note_id: "",                        
                        reimbursement_id: reimbursement.reimbursement_id,
                        reimbursement_name: reimbursement.title,
                        reimbursement_amount: reimbursement.total_reimbursement_amount,
                        // reimbursement_classification: reimbursement.classification,
                        // reimbursement_brand: reimbursement.brand,
                        // reimbursement_unit: reimbursement.measure_unit

                    }
                this.detailCount = this.detailCount +1;
                this.FormData.details.push(detail);  
            }             
            $('.select-box').modal('hide'); 
        },
        deleteMaterial(id){
            this.FormData.details =this.FormData.details.filter(x=> x.id != id);
        },
       async createData(e){   
        this.submitting= true; 
        this.v$.$validate();
        if(this.v$.$error){
            this.submitting = false;
            return;
        }
            this.showapprover.forEach((value) => {
                this.FormData.note.approver.push(value.userid);                
            }); 
            this.showcc.forEach((value) => {
                this.FormData.note.cc.push(value.userid); 
            }); 
            let response = await authApi({
                method: 'POST',
                api:  '/costmanagement/repayment_note',
                data: this.FormData 
            });
            if(response.status == 201){              
              //console.log(response.data.revenue_contract_id);
                const id = response.data.repayment_note_id; 
                const imgformData = new FormData();
                imgformData.append('repayment_note_id',id);
                this.pictureImages.forEach((value) => {
                     imgformData.append('picture', value.url);   
                });
                this.appendixImages.forEach((value) => {
                    imgformData.append('appendix', value.url);  
                });
                let imgResponse = await authApi({
                method: 'POST',
                api:  '/costmanagement/repayment_note_datafiles',           
                data: imgformData
                });
                if(imgResponse.status == 200){
                   
                    toast.success("Repayment Note Insert successful !", {
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
   .payment-box{
       width: 270px;
       height: 100px;
       padding: 20px;
       margin-right: 200px;
       margin-left: 20px;
   }
</style>
