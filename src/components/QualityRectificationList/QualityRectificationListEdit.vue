<template>
    <div v-loading="loading" class="loading__div" v-if="loading"></div>   
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading">   
        <form  @submit.prevent="updateData" > 
           <pdf src="http://216.83.53.169:8081/media/hello_oAiEg7V.txt" />

            <div class="row">
            <div class="col-md-12">  
                        <ProjectName :oldProjectId="oldProjectId" @projectData="getProjectName($event)"  />
                        <div class="form-group mt-3">
                            <label for="title">
                                <span class="text-danger">*</span> <small> <b> {{ $t('title_bd') }} </b> </small>
                            </label>                          
                            <el-input type="text" id="title" :placeholder="$t('please_enter')" v-model="FormData.title" clearable />
                        </div>   
                        <div class="form-group">
                            <label for="description">
                                <small> <b> {{ $t('rectification_content') }} </b> </small>
                            </label>
                            <el-input v-model="FormData.description" maxlength="300" 
                            :placeholder="$t('please_enter')"  show-word-limit type="textarea" />  
                        </div> 
                        
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="issued_date"> 
                                        <span class="text-danger">*</span> <small> <b> {{ $t('rectification_issued_date') }} </b> </small>      
                                    </label>                      
                                    <el-date-picker v-model="FormData.issued_date"  id="issued_date" type="date" 
                                    format="YYYY-MM-DD" value-format="YYYY-MM-DD" placeholder="Pick a Date" size="default"  style="width: 100%;" editable clearable  />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="end_date"> 
                                        <span class="text-danger">*</span> <small> <b> {{ $t('required_completion_date') }} </b> </small>     
                                    </label>                      
                                    <el-date-picker v-model="FormData.end_date"  id="end_date" type="date" 
                                    format="YYYY-MM-DD" value-format="YYYY-MM-DD" placeholder="Pick a Date" size="default"  style="width: 100%;" editable clearable  />
                                </div>
                            </div>
                        </div>
                        <Picker :titleName="$t('rectifier')" :oldPickerId="oldPickerId" @pickerData="getPickerName($event)" />
                        <Picture :oldpictureImages="oldpictureImages" @picture="getPicture($event)" />
                        <Document :oldappendixImages="oldappendixImages" @appendix="getDocument($event)" /> 

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
  export default {
      name: 'TeamCreate',
      data() {
          return {
              loading: true,
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
              oldpictureImages: [],
              oldappendixImages: [],
              oldProjectId: "", 
              oldPickerId: "",
          }
      },     
      components: {        
        ProjectName,
        Picker,  
        Picture,
        Document,       
      },
      created(){  
        this.getData();     
       
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
         async getData(){
            let response = await authApi({
                 method: 'POST',
                 api: '/constructionmanagement/get_quality_rectification',               
                 params: {
                       id: this.$route.params.id,
                       keyword: '',             
                       page: '',
                       limit: ''
                },
                data: {
                    view: false,
                }     
             });
             if(response.status == 200){  
                this.FormData = response.data.data;                                          
                this.oldProjectId = this.FormData.project_id; 
                this.oldPickerId = this.FormData.rectifier;              
                if(response.data.data.picture != null){
                const list= response.data.data.picture.images;
                this.oldpictureImages = list.map(v => ({...v, isSelected: true}));
                }
                if(response.data.data.appendix !=null ){
                const list1= response.data.data.appendix.documents;
                this.oldappendixImages = list1.map(v => ({...v, isSelected: true}));
                }   
                this.loading = false;               
             }
         },
         async updateData(e){   
             this.submitting= true;             
             let response = await authApi({
                 method: 'PUT',
                 api: '/constructionmanagement/quality_rectification',
                 data: this.FormData 
             });
             if(response.status == 200){     
                const id = this.$route.params.id;
                const formData = new FormData();
                formData.append('quality_inspection_id',id);                             
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
                 api:  '/constructionmanagement/quality_rectification_datafiles',       
                 data: formData
                 });
                 if(imgResponse.status == 200){
                     e.target.reset();
                     toast.success("Quality rectification Insert successful !", {
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