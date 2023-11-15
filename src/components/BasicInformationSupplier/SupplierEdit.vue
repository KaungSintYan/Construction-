<template>
    <div v-loading="loading" class="loading__div" v-if="loading"></div> 
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading">   
     <form  @submit.prevent="updateData">
         <div class="row">
             <div class="col-md-12">            
                         <div class="form-group ">
                             <label for="project_name">
                                 <span class="text-danger">*</span> <small> <b> {{ $t('supplier_name') }} </b> </small>
                             </label>
                             <el-input type="text" :placeholder="$t('please_enter')" id="project_name" v-model="FormData.supplier_name" clearable />
                         </div>
                         
                         <div class="form-group ">
                             <label for="type_of_section">
                                <small> <b> {{ $t('classification') }} </b> </small>
                             </label>                            
                             <el-select v-model="FormData.classification" id="type_of_section" :placeholder="$t('please_choose')"  style="width: 100%">
                                <el-option
                                  v-for="item in classification"
                                  :key="item.class_name"
                                  :label="item.class_name"
                                  :value="item.class_id"
                                />  
                            </el-select>  
                         </div>
                         <div class="form-group ">
                             <label for="item_number">
                                <small> <b> {{ $t('contact_person') }} </b> </small>
                             </label>
                             <el-input type="text" :placeholder="$t('please_enter')" v-model="FormData.contact_person" clearable />
                         </div>
                         <div class="form-group ">
                             <label for="contact_number">
                                <small> <b> {{ $t('contact_number') }} </b> </small>
                             </label>
                             <el-input type="tel" :placeholder="$t('please_enter')" v-model="FormData.contact_number" clearable />
                         </div>
                         <div class="form-group ">
                             <label for="office_address">
                                <small> <b> {{ $t('office_address') }} </b> </small>
                             </label>
                             <el-input type="tel" :placeholder="$t('please_enter')" v-model="FormData.office_addr" clearable />
                         </div>
                         <div class="form-group ">
                             <label for="bank_information">
                                 <span class="text-danger">*</span> <small> <b> {{ $t('bank_information') }} </b> </small>
                             </label>
                             <el-table :data="bankinfo" border style="width: 100%;">
                                        <el-table-column  fixed type="index" width="55" />
                                        <el-table-column :label="$t('account_name')" width="400px">
                                            <template #default="scope">
                                                <el-input type="text" :placeholder="$t('please_enter')" class="" v-model="scope.row.accname" :disabled='scope.row.infoid !=null' clearable/> 
                                            </template>
                                        </el-table-column>
                                        <el-table-column :label="$t('bank')" width="400px">
                                            <template #default="scope">
                                                <el-input type="text" :placeholder="$t('please_enter')" class="" v-model="scope.row.bank" :disabled='scope.row.infoid !=null' clearable/> 
                                            </template>
                                        </el-table-column>
                                        <el-table-column :label="$t('bank_card_number')" width="400px">
                                            <template #default="scope">
                                                <el-input type="text" :placeholder="$t('please_enter')" class="" v-model="scope.row.cardno" :disabled='scope.row.infoid !=null' clearable/> 
                                            </template>
                                        </el-table-column>

                                        <el-table-column fixed="right"  :label="$t('operate')" width="200px">
                                            <template #default="scope">                                             
                                                <small @click="deleteBankInfo(scope.row.id)">{{ $t('delete') }}</small> 
                                            
                                            </template>
                                        </el-table-column>
                            </el-table>
                        
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
                             <div class="box-footer" @click="addBankInfo">
                                 <font-awesome-icon icon="fa-solid fa-circle-plus" style="color:cornflowerblue;" /> <span class="text-primary">{{ $t('add_to') }}</span>
                             </div>
                         </div>
                         <div class="form-group ">
                             <label for="remark">
                                 {{ $t('remark') }}
                             </label>
                             <el-input type="textarea" :placeholder="$t('please_enter')" id="remark"
                            v-model="FormData.remark" maxlength="500" show-word-limit  />         
                         </div>
                         <Picture :oldpictureImages="oldpictureImages" @picture="getPicture($event)" />
                         <Document :oldappendixImages="oldappendixImages" @appendix="getDocument($event)" />      
             </div>
         </div>  
         <div class="footer-main pt-2 pl-3">
             <button class="btn btn-primary btn-footer">{{ $t('keep') }}</button>
         </div>   
     </form>
    </div>
   
 </template>
 <script>
 
 import {authApi} from '@/http/authApi'
 import { toast } from 'vue3-toastify';
 import 'vue3-toastify/dist/index.css';
 import Picture from '@/components/Share/Picture.vue';
import Document from '@/components/Share/Document.vue';
 export default {
     name: 'SupplierCreate',
     data() {
         return {
             loading: false,
             data: [],   
             FormData: {},                 
             classification: [] ,
             pictureImages: [],
             appendixImages: [],
             bankinfoDetailCount: 1,  
             oldpictureImages: [],
             oldappendixImages: [], 
             bankinfo: [],   
             bankinfocount: 0,
             FormBankInfo: {
                supplierid: "",
                banklist:[],
                addbanklist: []
             }
           
         }
     },
     components: {     
      Picture,
      Document,          
    }, 
     created(){
         this.getClassification();  
         this.getData();
         this.getBankInfo();  
     },
     methods:{
        getPicture(data){
         this.pictureImages = data;
        },
        getDocument(data){
            this.appendixImages = data;          
        },
        async getBankInfo(){
            let response = await authApi({
                method: 'GET',
                api: '/supplierbankinfo',
                params: {
                       supplierid: this.$route.params.id,
                     
                }   
            });
            if(response.status == 200){
                //console.log('bankdd'+ JSON.stringify(response.data.data))
                const list1= response.data.data;
                 this.bankinfo= list1.map((v,index) => (
                     {...v, id: index}
                    ));
                this.bankinfocount = this.bankinfo.length;
                this.loading= false;
            }
        },
        removeoldpictureImages(id, selected){
            this.oldpictureImages.find((x=> x.image_id == id)).isSelected = selected;
        },      
        removeoldappendixImages(id, selected){
            this.oldappendixImages.find((x=> x.file_id == id)).isSelected = selected;
        }, 
        async getData(){    
            this.loading = true;     
            let response = await authApi({
                method: 'POST',
                api: '/getsupplier',
                params: {
                       id: this.$route.params.id,
                       keyword: '',                                            
                       page: '',
                       limit: ''
                }   
            });
            if(response.message){            
                this.FormData= response.data.data;
                if(response.data.data.picture != null){
                    const list= response.data.data.picture.images;
                    this.oldpictureImages = list.map(v => ({...v, isSelected: true}));
                }
                if(response.data.data.appendix !=null ){
                    const list1= response.data.data.appendix.documents;
                    this.oldappendixImages = list1.map(v => ({...v, isSelected: true}));
                }               
                this.loading= false;
            }
          
        },        
         addBankInfo() {            
             let id= this.bankinfocount;
             let detail= {
                         id: id,
                         infoid: null,
                         accname: "",
                         bank: "",
                         cardno: "",
                                              
                     }
             this.bankinfo.push(detail);
             this.bankinfocount = this.bankinfocount +1;
             //console.log(JSON.stringify(this.FormData.budget_detail))
         },
         deleteBankInfo(id){ 
          this.bankinfo = this.bankinfo.filter(x=> x.id != id);
           
         },
         async getBudgetType(){
         let response = await authApi({
                 method: 'GET',
                 api: '/projectmanagement/budgettype',
                 params: {                       
                       name: ""
                 }   
         });
         this.budgetType = response.data;       
        },
         appendixUpload(){         
           let imgs = this.$refs.appendix.files;  
             for(let i=0; i< imgs.length; i++){
                 this.appendixImages.push(imgs[i]);
             }  
            
         },
         pictureUpload(){           
             let img = this.$refs.picture.files;  
             for(let i=0; i< img.length; i++){
                 this.pictureImages.push(img[i]);
             }                  
         },
        async getClassification(){
         let response = await authApi({
                 method: 'GET',
                 api: '/supplierclassification',
                 params: {                       
                       name: ""
                 }   
         });
         this.classification = response.data;       
        },
       async updateData(e){   
         let response = await authApi({
                 method: 'PUT',
                 api: '/supplier',                 
                 data: this.FormData
         });
         // console.log("success create>>" + JSON.stringify(response))
         if(response.status == 200){
            const id = this.$route.params.id;
                 let formData = new FormData();
                 formData.append('supplierid',id);
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
                 api: '/supplier_datafiles',               
                 data: formData
                 });
                 if(imgResponse.status == 200){
                         this.FormBankInfo.supplierid= this.$route.params.id;
                         this.bankinfo.forEach((value)=>{
                            if(value.infoid == null){
                                let newdata={
                                    supplierid:this.$route.params.id,
                                    accname:value.accname,
                                    bank: value.bank,
                                    cardno: value.cardno }
                                  this.FormBankInfo.addbanklist.push(newdata);
                            }
                            else{
                                this.FormBankInfo.banklist.push(value.infoid);
                            }
                         }); 
                        let bankResponse = await authApi({
                        method: 'PUT',
                        api: '/supplierbankinfo',               
                        data: this.FormBankInfo
                        });
                        if(bankResponse.status == 200){                           
                            toast.success("Supplier Update successful !", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 3000,
                            });
                            this.getData();
                            this.getBankInfo();  
                            this.$router.back();
                        }                    
                 }
         }
 
        }
     }
     
 }
 </script>
 <style lang="scss" scoped>
 .j-box{
    position: relative;
    width: 100px;
    // height: 150px;
    .img-employee{
    width: 35px;
    height: 35px;
    }
    .file_icon {
       width: 35px;
       height: 35px;
       color: lightseagreen;
    }
    .xmark{
        top: 0;
        right: 0;
        cursor: pointer;
     }
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
 .table_main_box{
     width: 100%;
     border-left: 1px solid gainsboro;
     border-right: 1px solid gainsboro;
     border-bottom: 1px solid gainsboro;
 }
 .footer-input{
     width: 40px;
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
 }
 </style>