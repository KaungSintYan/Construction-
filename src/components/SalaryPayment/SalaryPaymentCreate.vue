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
                                <el-input type="text"  id="title" :placeholder="$t('please_enter')"
                                v-model="FormData.title" clearable />
                                <span v-if="v$.FormData.title.$error" class="text-danger">
                                    <span v-if="v$.FormData.title.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('title_bd')}) }} 
                                    </span>                                                                                         
                                </span> 
                            </div>

                            <div class="form-group mb-3">
                                <div class="form-group">
                                    <label for="distribution"> <small><b>{{ $t('distribution_method') }}</b></small> </label>
                                </div> 
                                <el-select v-model="FormData.distributed_type" id="distribution" class="" :placeholder="$t('please_choose')"  style="width: 100%">
                                    <el-option
                                      v-for="item in distributed_type"
                                      :key="item.key"
                                      :label="item.value"
                                      :value="item.key"
                                    />  
                                </el-select>
                                <span v-if="v$.FormData.distributed_type.$error" class="text-danger">
                                    <span v-if="v$.FormData.distributed_type.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('distribution_method')}) }} 
                                    </span>                                                                                         
                                </span>
                            </div>

                            <div class="form-group mb-3">
                                <div class="form-group">
                                    <label for="issue"><small><b>{{ $t('issue_type') }}</b></small></label>
                                </div>                                
                                <el-select v-model="FormData.issue_type" class="" id="issue" :placeholder="$t('please_choose')"  style="width: 100%">
                                    <el-option
                                      v-for="item in issue_type"
                                      :key="item.key"
                                      :label="item.value"
                                      :value="item.key"
                                    />  
                                </el-select>
                                <span v-if="v$.FormData.issue_type.$error" class="text-danger">
                                    <span v-if="v$.FormData.issue_type.$errors[0].$message != ''" >
                                        {{ $t('is_required', {'name': $t('issue_type')}) }} 
                                    </span>                                                                                         
                                </span>
                            </div>
                            
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form group mb-3">
                                        <label for="issue_year"> 
                                        <span class="text-danger">*</span> <small><b>{{ $t('issue_year') }}</b></small>  
                                        </label>
                                        <el-date-picker v-model="FormData.issueyear"  id="issue_year" type="year" 
                                        format="YYYY" value-format="YYYY"
                                        :placeholder="$t('pick_a_year')" size="default"  style="width: 100%;" editable clearable />                               
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label for="issue_month"> 
                                        <span class="text-danger">*</span> <small><b>{{ $t('issue_month') }}</b></small>       
                                        </label>
                                        <el-date-picker v-model="FormData.issuemonth"  id="issue_month" type="month" 
                                        format="MMMM" value-format="M"
                                        :placeholder="$t('pick_a_month')" size="default"  style="width: 100%;" editable clearable />   
                                        <span v-if="v$.FormData.issuemonth.$error" class="text-danger">
                                            <span v-if="v$.FormData.issuemonth.$errors[0].$message != ''" >
                                                {{ $t('is_required', {'name': $t('issue_month')}) }} 
                                            </span>                                                                                         
                                        </span>                            
                                    </div>
                                </div>
                            </div> 

                            <!-- <div class="form-group mb-3">
                                <label for="">Total amount (¥) </label>
                                <input type="text" class="form-control" value="summary by details" readonly>
                            </div> -->

                            <div class="form-group mb-3">
                                <label for=""> <small><b>{{ $t('total_amt_capitalized') }}</b></small> </label>
                            </div>

                            <div class="form-group mb-3">
                                <label for="release"> <span class="text-danger">*</span> <small><b>{{ $t('release_details') }}</b></small> </label>
                                <el-input type="button" id="release" class="text-primary" :model-value="$t('add_release_details')" data-toggle="modal" data-target="#release_details" clearable/>

                                <!-- start  -->
                                <!-- value=" + Add Release Details " -->
                                <!-- Modal -->
                                    <div class="modal fade" id="release_details" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body m-auto p-5">
                                                    <img src="../../assets/no_note.png" alt="">
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">{{ $t('cancel') }}</button>
                                                    <button type="button" class="btn btn-sm btn-primary">{{ $t('save') }}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                <!-- end  -->

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
    name: 'SalaryPaymentCreate',
    data() {
        return {          
            v$: useValidate(),
            submitting: false,
            FormData: {
                        title: "",
                        odd_number: "",
                        total_amount: 0,                       
                        issue_type: "",
                        distributed_type: "",
                        issuemonth: "",
                        issueyear: "",                                             
                        remark: "",        
                        picture: null,
                        appendix: null,
                        approver:[],
                        cc: [],                        
                        creation_time: "", 
                        project_id: "",                        
                        created_by_user: ""       
            },                    
            pictureImages: [] ,
            appendixImages: [], 
            showapprover: [],
            showcc: [],
            issue_type: [
                {key: 'living_expense',value: 'Living Expense'},
                {key: 'salary_giving',value: 'Salary Giving'},
            ],
            distributed_type: [
                {key: 'issue_per_person',value: 'Issue per person'},
                {key: 'distributed_by_person',value: 'Distributed by person'},
            ],                  
        }
    }, 
    validations() {
        return {
            FormData: {
                    distributed_type: {
                        required,        
                    },                   
                    issue_type: {
                        required,   
                    },
                    issuemonth: {
                        required, 
                    },
                    project_id: {
                        required, 
                    },
                    title: {
                        required,  
                    },
            }
        }
    },
    components: {
      ProjectName,     
      Picture,
      Document,
      Approver,
      Cc    
    }, 
    created(){        
        
    },
    methods: {        
        getProjectName(data) {   
         this.FormData.project_id = data;        
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
                api: '/financialmanagement/salarypayment',
                data: this.FormData 
            });
            if(response.status == 201){              
              //console.log(response.data.revenue_contract_id);
                const id = response.data.salary_payment_id; 
                const imgformData = new FormData();
                imgformData.append('salary_payment_id',id);
                this.pictureImages.forEach((value) => {
                     imgformData.append('picture', value.url);   
                });
                this.appendixImages.forEach((value) => {
                    imgformData.append('appendix', value.url);  
                });    
                
                let imgResponse = await authApi({
                method: 'POST',
                api:  '/financialmanagement/salarypayment_datafiles',       
                data: imgformData
                });
                if(imgResponse.status == 200){                  
                    toast.success("Salary Payment Insert successful !", {
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
</style>