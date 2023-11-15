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
                                <!-- <span v-if="v$.FormData.title.$error" class="text-danger">
                                    <span v-if="v$.FormData.title.$errors[0].$message != ''">
                                        {{ $t('is_required', {'name': $t('title_bd')}) }}
                                    </span>
                                </span> -->
                            </div>
                            <div class="form-group mb-3">
                                <label for="description">
                                    <small> <b> {{ $t('rectification_content') }} </b> </small>
                                </label>
                                <el-input v-model="FormData.description" maxlength="300" 
                                :placeholder="$t('please_enter')"  show-word-limit type="textarea" />  
                            </div> 
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <div class="form-group mb-3">
                                            <label for="issued_date"> 
                                                <span class="text-danger">*</span> <small> <b> {{ $t('rectification_issued_date') }} </b> </small>    
                                            </label>
                                        </div>                        
                                        <el-date-picker v-model="FormData.issued_date"  id="issued_date" type="date" 
                                        format="YYYY-MM-DD" value-format="YYYY-MM-DD" placeholder="Pick a Date" size="default"  style="width: 100%;" editable clearable  />
                                        <span v-if="v$.FormData.issued_date.$error" class="text-danger">
                                            <span v-if="v$.FormData.issued_date.$errors[0].$message != ''">
                                                {{ $t('is_required', {'name': $t('rectification_issued_date')}) }}
                                            </span>
                                        </span>
                                    </div>
        
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <div class="form-group mb-3">
                                            <label for="end_date"> 
                                                <span class="text-danger">*</span> <small> <b> {{ $t('required_completion_date') }} </b> </small>
                                            </label>
                                        </div>                        
                                        <el-date-picker v-model="FormData.end_date"  id="end_date" type="date" 
                                        format="YYYY-MM-DD" value-format="YYYY-MM-DD" placeholder="Pick a Date" size="default"  style="width: 100%;" editable clearable  />
                                        <span v-if="v$.FormData.end_date.$error" class="text-danger">
                                            <span v-if="v$.FormData.end_date.$errors[0].$message != ''">
                                                {{ $t('is_required', {'name': $t('required_completion_date')}) }}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>                           

                            <Picker :titleName="$t('rectifier')" @pickerData="getPickerName($event)" />
                            <span v-if="v$.FormData.rectifier.$error" class="text-danger">
                                <span v-if="v$.FormData.rectifier.$errors[0].$message != ''">
                                    {{ $t('is_required', {'name': $t('team_leader')}) }}
                                </span>
                            </span>

                            <Picture @picture="getPicture($event)" />
                            <Document @appendix="getDocument($event)" /> 

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
                 description: "",
                 issued_date: "",
                 end_date: "",
                 rectifier: "",
                 picture: null,
                 appendix: null,                         
                 creation_time: "",
                 project_id: "", 
                 created_by_user: ""                         
              },                     
              pictureImages: [] ,
              appendixImages: [],
          }
      },     
      components: {        
        ProjectName,
        Picker,  
        Picture,
        Document,       
      },
      validations(){
        return {
            FormData : {
                end_date: {
                    required,
                },
                issued_date: {
                    required,
                },
                project_id: {
                    required,
                },
                rectifier: {
                    required,
                },
                // title: {
                //     required,
                // },
            },
        }
      },
      created(){        
       
      },
      methods:{       
         getProjectName(data) {   
          this.FormData.project_id = data;        
         },  
         getPickerName(data){
            this.FormData.rectifier = data;   
        },        
         getPicture(data){
          this.pictureImages = data;
         },
         getDocument(data){
             this.appendixImages = data;          
         },         
         async createData(e){   
             this.submitting= true;  
             this.v$.$validate();
             if (this.v$.$error){
                this.submitting = false;
                return;
             }           
             let response = await authApi({
                 method: 'POST',
                 api: '/constructionmanagement/security_rectification',
                 data: this.FormData 
             });
             if(response.status == 201){     
                const id = response.data.security_inspection_id; 
                 let imgformData = new FormData();
                 imgformData.append('security_inspection_id',id);
                 this.pictureImages.forEach((value) => {                     
                     imgformData.append('picture', value.url);  
                 });
                 this.appendixImages.forEach((value) => {
                     imgformData.append('appendix', value.url);  
                 });       
                 let imgResponse = await authApi({
                 method: 'POST',
                 api:  '/constructionmanagement/security_rectification_datafiles',       
                 data: imgformData
                 });
                 if(imgResponse.status == 200){
                     e.target.reset();
                     toast.success("Safety Rectification List Insert successful !", {
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