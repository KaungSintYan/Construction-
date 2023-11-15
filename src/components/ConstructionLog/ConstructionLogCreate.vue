<template>
    <div class="container-fluid"  @click="$store.commit('setActive', false)">   
        <form  @submit.prevent="createData" > 
            <div class="row">
                <div class="col-md-12">              
                            <ProjectName  @projectData="getProjectName($event)"  />
                            <span v-if="v$.FormData.project_id.$error" class="text-danger">
                                    <span v-if="v$.FormData.project_id.$errors[0].$message != ''">
                                        {{ $t('is_required', {'name': $t('project')}) }}
                                    </span>
                                </span>
                            <div class="form-group mb-3 mt-3">
                                <label for="title">
                                    <span class="text-danger">*</span> <small> <b> {{ $t('title_bd') }} </b> </small>
                                </label>                            
                                <el-input type="text" id="title" :placeholder="$t('please_enter')" v-model="FormData.title" clearable />
                                <span v-if="v$.FormData.title.$error" class="text-danger">
                                    <span v-if="v$.FormData.title.$errors[0].$message != ''">
                                        {{ $t('is_required', {'name': $t('title_bd')}) }}
                                    </span>
                                </span>
                            </div>
                            <div class="form-group mb-3">
                                <div class="form-group mb-3">
                                    <label for="construction_date"> 
                                        <span class="text-danger">*</span> <small> <b> {{ $t('check_date') }} </b> </small> <small> <b> {{ $t('construction_date') }} </b> </small>          
                                    </label>
                                </div>                        
                                <el-date-picker v-model="FormData.construction_date"  id="check_date" type="date" 
                                format="YYYY-MM-DD" value-format="YYYY-MM-DD" placeholder="Pick a Date" size="default"  style="width: 100%;" editable clearable  />
                            </div>

                            <div class="form-group">
                                <label for="weather"> 
                                    <small> <b> {{ $t('weather') }} </b> </small>      
                                </label>
                                <el-input type="text" id="weather" :placeholder="$t('please_enter')" v-model="FormData.weather" clearable />
                            </div>

                            <div class="form-group mb-3">
                                <label for="air_temperature"> 
                                    <small> <b> {{ $t('air_temperature') }} </b> </small>     
                                </label>
                                <el-input type="number" id="air_temperature" :placeholder="$t('please_enter')" v-model="FormData.air_temperature" clearable />
                                <span v-if="v$.FormData.air_temperature.$error" class="text-danger">
                                    <span v-if="v$.FormData.air_temperature.$errors[0].$message != ''">
                                        {{ $t('is_required', {'name': $t('air_temperature')}) }}
                                    </span>
                                </span>
                            </div>

                            <div class="form-group mb-3">
                                <label for="production_status">
                                    <span class="text-danger">*</span> <small> <b> {{ $t('production_status') }} </b> </small> 
                                </label>
                                <el-input v-model="FormData.production_status" maxlength="2000" 
                            :placeholder="$t('please_enter')"  show-word-limit type="textarea" />  
                            </div>
                            
                            <div class="form-group mb-3">
                                <label for="technical_quality_safety">
                                    <span class="text-danger">*</span> <small> <b> {{ $t('technical_quality_safety') }} </b> </small>
                                </label>
                                <el-input v-model="FormData.tech_quality_safety" maxlength="2000" 
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
 import {required} from '@vuelidate/validators'

 export function validName(name){
    let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
    if (validNamePattern.test(name)){
        return true;
    }
    return false; 
 }

  export default {
      name: 'TeamCreate',
      data() {
          return {
              v$: useValidate(),
              data: [],
              submitting: false,
              FormData: {
                 title: "",
                 odd_number: "",
                 construction_date: new Date().toISOString().slice(0,10),
                 weather: "",
                 air_temperature: "",
                 production_status: "",
                 tech_quality_safety: "",
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
      validations(){
        return {
            FormData : {
                air_temperature: {
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
            if (this.v$.$error){
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
                 api: '/constructionmanagement/construction_log',
                 data: this.FormData 
             });
             if(response.status == 201){     
                const id = response.data.log_id; 
                 let imgformData = new FormData();
                 imgformData.append('log_id',id);
                 this.pictureImages.forEach((value) => {                     
                     imgformData.append('picture', value.url);  
                 });
                 this.appendixImages.forEach((value) => {
                     imgformData.append('appendix', value.url);  
                 });       
                 let imgResponse = await authApi({
                 method: 'POST',
                 api: '/constructionmanagement/construction_log_datafiles',       
                 data: imgformData
                 });
                 if(imgResponse.status == 200){
                     e.target.reset();
                     toast.success("Construction Log Insert successful !", {
                     position: toast.POSITION.TOP_RIGHT,
                     autoClose: 3000,
                     });
                     this.submitting= false;      
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