<template>
    <div v-loading="loading" class="loading__div" v-if="loading"></div> 
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading">   
    <form  @submit.prevent="updateSave">
        <div class="row">
            <div class="col-md-12">            
                        <div class="form-group">
                            <label for="project_name">
                                <span class="text-danger">*</span> <small><b>  {{ $t('client_name') }} </b></small>
                            </label>
                            <el-input type="text" :placeholder="$t('please_enter')" id="project_name"
                             v-model="FormData.client_name" clearable />
                        </div>
                        
                        <div class="form-group">
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
                        <div class="form-group">
                            <label for="item_number">
                                <small> <b> {{ $t('contact_person') }} </b> </small>
                            </label>
                            <el-input type="text" :placeholder="$t('please_enter')" v-model="FormData.contact_person" clearable />
                        </div>
                        <div class="form-group">
                            <label for="contact_number">
                                <small> <b> {{ $t('contact_number') }} </b> </small>
                            </label>
                            <el-input type="tel" :placeholder="$t('please_enter')" v-model="FormData.contact_number" clearable />
                        </div>
                        <div class="form-group">
                            <label for="office_address">
                                <small> <b> {{ $t('office_address') }} </b> </small>
                            </label>
                            <el-input type="tel" :placeholder="$t('please_enter')" v-model="FormData.office_addr" clearable />
                        </div>
                        <div class="form-group mt-5">
                            <h4> <b>{{ $t('invoice_information') }}</b> </h4>
                            <hr>
                        </div>
                        <!-- <div class="form-group">
                            <label for="invoice">
                                {{ $t('invoice') }}
                            </label>
                            <input type="text" :placeholder="$t('please_enter')" class="form-control" v-model="FormData.invoiceid">
                        </div>
                        <div class="form-group">
                            <label for="tax_number">
                                {{ $t('tax_number') }}
                            </label>
                            <input type="text" :placeholder="$t('please_enter')" class="form-control" v-model="FormData.taxid">
                        </div> -->
                        <div class="form-group">
                            <label for="address">
                                <small> <b> {{ $t('address') }} </b> </small>
                            </label>
                            <el-input type="text" :placeholder="$t('please_enter')"  v-model="FormData.address" clearable />
                        </div>
                        <div class="form-group">
                            <label for="telephone">
                                <small> <b> {{ $t('telephone') }} </b> </small>
                            </label>
                            <el-input type="text" :placeholder="$t('please_enter')" v-model="FormData.telephone" clearable />
                        </div>
                        <div class="form-group">
                            <label for="bank">
                                <small> <b> {{ $t('bank') }} </b> </small>
                            </label>
                            <el-input type="text" :placeholder="$t('please_enter')" v-model="FormData.bank" clearable />
                        </div>
                        <div class="form-group">
                            <label for="bank_card_number">
                                <small> <b> {{ $t('bank_card_number') }} </b> </small>
                            </label>
                            <el-input type="text" :placeholder="$t('please_enter')" v-model="FormData.bank_card" clearable />
                        </div>
                        <div class="form-group">
                            <label for="remark">
                                <small> <b> {{ $t('remark') }} </b> </small>
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
    name: 'ClientEdit',
  
    data() {
        return {  
            loading: false,        
            data: [],   
            FormData: { },  
            classification: [],
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
        this.getClassification();       
    },
    methods:{
        getPicture(data){
         this.pictureImages = data;
        },
        getDocument(data){
            this.appendixImages = data;          
        },
        
        async getClassification(){
        let response = await authApi({
                method: 'GET',
                api: '/clientclassification',
                params: {                       
                      name: ""
                }   
        });
        this.classification = response.data;       
       },
      async getData(){
        this.loading= true;
       // this.FormData.clientid = this.$route.params.id;
        let response = await authApi({
                method: 'POST',
                api: '/getclient',
                params: {
                       id: this.$route.params.id,
                       keyword: '',
                       status: '',                       
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
                api: '/client',                 
                data: this.FormData
        });       
        if(response.status == 200){              
              //console.log(response.data.revenue_contract_id);
              const id = this.$route.params.id;
                const formData = new FormData();
                formData.append('clientid',id);                
                 
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
                api:  '/client_datafiles',           
                data: formData
                });
                if(imgResponse.status == 200){
                    toast.success("client update successful !", {
                     position: toast.POSITION.TOP_RIGHT,
                     autoClose: 3000,
                     });
                     this.getData();
                }
        }    
       }
    }
    
}
</script>