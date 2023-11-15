<template>
    <div v-loading="loading" class="loading__div" v-if="loading"></div>   
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading">  
        <form  @submit.prevent="updateData" >  
        <div class="row">
            <div class="col-md-12">              
                <div class="block-title mt-2">
                    <strong> {{ $t('basic_info') }} </strong>
                    <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter"> <span><font-awesome-icon icon="fa-solid fa-file-import"/></span> Import</button>
                </div>
                <hr>
                        <ProjectName :oldProjectId="oldProjectId"  @projectData="getProjectName($event)"  />

                        <div class="form-group mb-3 mt-3">
                            <div class="form-group">
                                <label for="title">
                                    <span class="text-danger">*</span> <small> <b> {{ $t('title_bd') }} </b> </small> 
                                </label>
                            </div>                               
                            <el-input type="text" id="title" :placeholder="$t('please_enter')" v-model="FormData.title" clearable />
                        </div>                   
                        <div class="form-group mb-3">
                            <div class="form-group mb-3">
                                <label for="work_date"> 
                                    <span class="text-danger">*</span> <small> <b> {{ $t('work_date') }} </b> </small>     
                                </label>
                            </div>                        
                            <el-date-picker v-model="FormData.work_date"  id="work_date" type="date" 
                            format="YYYY-MM-DD" value-format="YYYY-MM-DD" placeholder="Pick a Date" size="default"  style="width: 100%;" editable clearable  />
                        </div>
                        <div class="form-group mb-3 mt-3">
                            <div class="form-group">
                                <label for="work_object">
                                    <span class="text-danger">*</span> <small> <b> {{ $t('work_object') }} </b> </small>
                                </label>
                            </div>                               
                            <el-input type="text" id="work_object" :placeholder="$t('please_enter')" v-model="FormData.work_object" clearable />
                        </div>   
                    
                        <div class="form-group mb-3">                      
                            <div class="form-group">
                                <label for="work_point">
                                    <span class="text-danger">*</span> <small> <b> {{ $t('point_of_work') }} </b> </small> 
                                </label>
                            </div>                               
                            <el-input type="text" id="work_point" :placeholder="$t('please_enter')" v-model="FormData.work_point" clearable />
                        </div>

                        <!-- <div class="form-group mb-3">
                            <label for="total_amount_work">
                                <span class="text-danger">*</span> The total amount of work (¥)
                            </label>
                            <input type="text" id="total_amount_work" class="form-control" placeholder="Summarized by order details" readonly>
                        </div> -->

                        <!-- <div class="form-group mb-3">
                            <label for="">
                                <span class="text-danger">*</span> Work Details 
                            </label>
                            <input type="button" class="form-control text-primary" value="+ Add Work Details">
                        </div> -->

                        <div class="form-group mb-3">
                            <label for="remark">
                                <small> <b> {{ $t('remark') }} </b> </small>
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
  export default {
      name: 'TeamCreate',
      data() {
          return {
              loading: true,
              submitting: false,
              FormData: {
                                      
              },                     
             pictureImages: [] ,
             appendixImages: [], 
             showapprover: [],
             showcc: [],
             oldApprover: [],  
             oldCc: [],
             oldpictureImages: [],
             oldappendixImages: [],
             oldProjectId: "", 
          }
      },     
      components: {        
        ProjectName,
        Picture,
        Document,
        Approver,
        Cc,
      },
      created(){        
        this.getData(); 
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
         async getData(){
            let response = await authApi({
                 method: 'POST',
                 api: '/constructionmanagement/get_work_order',               
                 params: {
                       id: this.$route.params.id,
                       keyword: '',             
                       page: '',
                       limit: ''
                }    
             });
             if(response.status == 200){  
                this.FormData = response.data.data;                                          
                this.oldProjectId = this.FormData.project_id;                 
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
                this.loading = false;
               
             }
         },
         async updateData(e){   
             this.submitting= true;
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
                 api: '/constructionmanagement/work_order',
                 data: this.FormData 
             });
             if(response.status == 200){     
                const id = this.$route.params.id;
                const formData = new FormData();
                formData.append('work_order_id',id);                
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
                 api:  '/constructionmanagement/work_order_datafiles',       
                 data: formData
                 });
                 if(imgResponse.status == 200){                   
                     toast.success("Order Insert successful !", {
                     position: toast.POSITION.TOP_RIGHT,
                     autoClose: 3000,
                     });
                     this.getData();
                     this.submitting= false;      
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