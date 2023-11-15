<template>
    <div v-loading="loading" class="loading__div" v-if="loading"></div> 
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading">   
    <form  @submit.prevent="updateSave">
        <div class="row">
            <div class="col-md-12">            
                        <div class="form-group mb-3">
                            <label for="project_name">
                                <span class="text-danger">*</span> <small> <b> {{ $t('internal_unit_name') }} </b> </small>
                            </label>
                            <input type="text" :placeholder="$t('please_enter')" class="form-control" id="project_name"
                             v-model="FormData.unitname">
                        </div>                       
                        
                        <div class="form-group mb-3">
                            <label for="item_number">
                                <small> <b> {{ $t('contact_person') }} </b> </small>
                            </label>
                            <input type="text" :placeholder="$t('please_enter')" class="form-control" id="item_number" v-model="FormData.contact_person">
                        </div>
                        <div class="form-group mb-3">
                            <label for="contact_number">
                                <small> <b> {{ $t('contact_number') }} </b> </small>
                            </label>
                            <input type="tel" :placeholder="$t('please_enter')" class="form-control" id="item_number" v-model="FormData.contact_number">
                        </div>
                        <div class="form-group mb-3">
                            <label for="office_address">
                                <small> <b> {{ $t('office_address') }} </b> </small>
                            </label>
                            <input type="tel" :placeholder="$t('please_enter')" class="form-control" v-model="FormData.office_addr">
                        </div>
                       
                        <div class="form-group mb-3">
                            <label for="remark">
                                <small> <b> {{ $t('remark') }} </b> </small>
                            </label>
                            <textarea name="" id="" cols="3"  :placeholder="$t('please_enter')" class="form-control" v-model="FormData.remark"></textarea>                     
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
    name: 'InternalUnitEdit',
  
    data() {
        return {
             loading: false,
             data: [],   
             FormData: {},  
             pictureImages: [],
             appendixImages: [],
             oldpictureImages: [],
             oldappendixImages: [],               
        }
    },
    components: {       
      Picture,
      Document,         
    }, 
    created(){           
        this.getData();           
    },
    methods:{   
        getPicture(data){
         this.pictureImages = data;
        },
        getDocument(data){
            this.appendixImages = data;          
        },
      async getData(){
        this.loading = true;
        let response = await authApi({
                method: 'GET',
                api: '/internalunit',
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
      async updateSave(e){  
        let response = await authApi({
                method: 'PUT',
                api: '/internalunit',                 
                data: this.FormData
        });
        if(response.status == 200){    
                 const id = this.$route.params.id;
                 const imgformData = new FormData();
                 imgformData.append('unitid',id);  
                 this.oldpictureImages.forEach((value)=>{
                    if(value.isSelected){
                        imgformData.append('imglist',value.image_id);
                    }                    
                 });
                 this.oldappendixImages.forEach((value)=> {
                    if(value.isSelected){
                        imgformData.append('filelist',value.file_id);
                    }                    
                 });
                 this.pictureImages.forEach((value) => {
                     imgformData.append('addimglist', value.url);  
                 });
                 this.appendixImages.forEach((value) => {
                     imgformData.append('addfilelist', value.url);  
                 });  
                 let imgResponse = await authApi({
                 method: 'PUT',
                 api: '/unit_datafiles',               
                 data: imgformData
                 });    
                 if(imgResponse.status == 200){
                       toast.success("Internal Unit updated successful!", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                        });
                        this.getData();
                        this.$router.back();
                 }           
        }
       }
    }
    
}
</script>