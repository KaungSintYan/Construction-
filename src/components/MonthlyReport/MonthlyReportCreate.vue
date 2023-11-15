<template>
    <div class="container-fluid"  @click="$store.commit('setActive', false)">   
        <form  @submit.prevent="createData" >  
        <div class="row">
            <div class="col-md-12">                 
                        <ProjectName  @projectData="getProjectName($event)"  />
                        <span v-if="v$.FormData.project_id.$error" class="text-danger">
                            <span v-if="v$.FormData.project_id.$errors[0].$message != ''">
                                {{ $t('is_required',{'name': $t('project')}) }}
                            </span>
                        </span>

                        <div class="form-group mb-3 mt-3">
                            <label for="title">
                                <span class="text-danger">*</span> <small> <b> {{ $t('title_bd') }} </b> </small> 
                            </label>                            
                            <el-input type="text" id="title" :placeholder="$t('please_enter')" v-model="FormData.title" clearable />
                            <!-- <span v-if="v$.FormData.title.$error" class="text-danger">
                                <span v-if="v$.FormData.title.$errors[0].$message != ''">
                                    {{ $t('is_required',{'name': $t('title_bd')}) }}
                                </span>
                            </span> -->
                        </div>                        
                        <div class="row">
                            <div class="col-6">
                                <div class="form-group mb-3">
                                    <label for="year"> 
                                    <span class="text-danger">*</span> <small> <b> {{ $t('reporting_year') }} </b> </small>       
                                    </label>
                                    <el-date-picker v-model="FormData.year"  id="year" type="year" 
                                    format="YYYY" value-format="YYYY" placeholder="Pick a Date" size="default"  style="width: 100%;" editable clearable  />
                                    <span v-if="v$.FormData.year.$error" class="text-danger">
                                        <span v-if="v$.FormData.year.$errors[0].$message != ''">
                                            {{ $t('is_required',{'name': $t('reporting_year')}) }}
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group mb-3">
                                    <label for="month"> 
                                    <span class="text-danger">*</span> <small> <b> {{ $t('reporting_month') }} </b> </small>       
                                    </label>
                                    <el-date-picker v-model="FormData.month"  id="month" type="month" 
                                    format="MMMM" value-format="M" placeholder="Pick a Date" size="default"  style="width: 100%;" editable clearable  />
                                    <span v-if="v$.FormData.month.$error" class="text-danger">
                                        <span v-if="v$.FormData.month.$errors[0].$message != ''">
                                            {{ $t('is_required',{'name': $t('reporting_month')}) }}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="form-group mb-3">
                            <label for="work_content_month">
                                <small> <b> {{ $t('work_content_month') }} </b> </small>   
                            </label>
                            <el-input v-model="FormData.work_content" maxlength="3000" 
                            :placeholder="$t('please_enter')"  show-word-limit type="textarea" />  
                        </div>

                        <div class="form-group mb-3">
                            <label for="not_done_work_this_month">
                                <small> <b> {{ $t('not_done_work_month') }} </b> </small>      
                            </label>
                            <el-input v-model="FormData.unfinished_work" maxlength="3000" 
                            :placeholder="$t('please_enter')"  show-word-limit type="textarea" />  
                        </div>
                        
                        <div class="form-group mb-3">
                            <label for="work_plan_for_next_month">
                                <small> <b> {{ $t('work_plan_next_month') }} </b> </small>  
                            </label>
                            <el-input v-model="FormData.plan_for_nextmonth" maxlength="3000" 
                            :placeholder="$t('please_enter')"  show-word-limit type="textarea" />  
                        </div>

                        <div class="form-group mb-3">
                            <label for="remark">
                                <span class="text-danger">*</span> <small> <b> {{ $t('remark') }} </b> </small>  
                            </label>
                            <el-input v-model="FormData.remark" maxlength="500" 
                            :placeholder="$t('please_enter')"  show-word-limit type="textarea" />  
                        </div>

                        <Picture @picture="getPicture($event)" />
                        <Document @appendix="getDocument($event)" /> 
                        <!-- <el-timeline>
                            <el-timeline-item>
                            <Approver @approverUser="getApproverUser($event)" />
                            </el-timeline-item>
                            <el-timeline-item>
                                <Cc @ccUser="getCcUser($event)" />
                            </el-timeline-item>
                        </el-timeline> -->

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
    import {required} from '@vuelidate/validators'

    export function validName(name){
        let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
        if (validNamePattern.test(name)){
            return true;
        }
        return false;
    }

   export default {
         name: 'MonthlyReportCreate',
         data() {
             return {
                 v$: useValidate(),
                 data: [],
                 submitting: false,
                 FormData: {
                    title: "",
                    odd_number: "",
                    year: "",
                    month: "",
                    work_content: "",
                    unfinished_work: "",
                    plan_for_nextmonth: "",
                    remark: "",
                    picture: null,
                    appendix: null, 
                    approver: [],
                    cc: [],                        
                    creation_time: "",
                    project_id: "", 
                    created_by_user: ""                         
                 },                     
                 pictureImages: [] ,
                 appendixImages: [],
                 showapprover: [],
                 showcc: [],
             }
         },     
         components: {        
           ProjectName,       
           Picture,
           Document, 
           Approver,
           Cc       
         },
         validations (){
            return {
                FormData : {
                    month : {
                        required,
                    },
                    project_id : {
                        required,
                    },
                    // title : {
                    //     required,
                    // },
                    year : {
                        required,
                    }
                },
            }
         },
         created(){        
          
         },
         methods:{       
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
               this.submitting= true; 
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
                    api: '/constructionmanagement/monthly_report',
                    data: this.FormData 
                });
                if(response.status == 201){     
                   const id = response.data.report_id; 
                    let imgformData = new FormData();
                    imgformData.append('report_id',id);
                    this.pictureImages.forEach((value) => {                     
                        imgformData.append('picture', value.url);  
                    });
                    this.appendixImages.forEach((value) => {
                        imgformData.append('appendix', value.url);  
                    });       
                    let imgResponse = await authApi({
                    method: 'POST',
                    api: '/constructionmanagement/monthly_report_datafiles',       
                    data: imgformData
                    });
                    if(imgResponse.status == 200){
                        //e.target.reset();
                        toast.success("Monthly Report Insert successful !", {
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
   
   <style lang="scss">
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
   </style>