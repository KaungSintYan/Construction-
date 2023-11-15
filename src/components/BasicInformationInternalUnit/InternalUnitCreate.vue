<template>
   <div class="container-fluid"  @click="$store.commit('setActive', false)">   
    <form  @submit.prevent="createData">
        <div class="row">
            <div class="col-md-12">            
                        <div class="form-group">
                            <label for="project_name">
                                <span class="text-danger">*</span> <small> <b> {{ $t('internal_unit_name') }} </b> </small>
                            </label>
                            <el-input type="text" :placeholder="$t('please_enter')" id="project_name" v-model="FormData.unitname" clearable />
                            <span v-if="v$.FormData.unitname.$error" class="text-danger">
                                <span v-if="v$.FormData.unitname.$errors[0].$message != ''">
                                    {{ $t('is_required',{'name': $t('internal_unit_name')}) }}
                                </span>
                            </span>
                        </div>  
                        <div class="form-group">
                            <label for="item_number">
                                <small> <b> {{ $t('contact_person') }} </b> </small>
                            </label>
                            <el-input type="text" :placeholder="$t('please_enter')" id="item_number" v-model="FormData.contact_person" clearable />
                            <span v-if="v$.FormData.contact_person.$error" class="text-danger">
                                <span v-if="v$.FormData.contact_person.$errors[0].$message != ''">
                                    {{ $t('is_required',{'name': $t('contact_person')}) }}
                                </span>
                            </span>
                        </div>
                        <div class="form-group">
                            <label for="contact_number">
                                <small> <b> {{ $t('contact_number') }} </b> </small>
                            </label>
                            <el-input type="tel" :placeholder="$t('please_enter')" id="item_number" v-model="FormData.contact_number" clearable />
                            <span v-if="v$.FormData.contact_number.$error" class="text-danger">
                                <span v-if="v$.FormData.contact_number.$errors[0].$message != ''">
                                    {{ $t('is_required',{'name': $t('contact_number')}) }}
                                </span>
                            </span>
                        </div>
                        <div class="form-group">
                            <label for="office_address">
                                <small> <b> {{ $t('office_address') }} </b> </small>
                            </label>
                            <el-input type="tel" :placeholder="$t('please_enter')" v-model="FormData.office_addr" clearable />
                            <span v-if="v$.FormData.office_addr.$error" class="text-danger">
                                <span v-if="v$.FormData.office_addr.$errors[0].$message != ''">
                                    {{ $t('is_required',{'name': $t('office_address')}) }}
                                </span>
                            </span>
                        </div>
                       
                        <div class="form-group">
                            <label for="remark">
                                <small> <b> {{ $t('remark') }} </b> </small>
                            </label>
                            <el-input type="textarea" :placeholder="$t('please_enter')" id="remark"
                            v-model="FormData.remark" maxlength="500" show-word-limit  />       
                        </div>
                        <Picture @picture="getPicture($event)" />
                        <Document @appendix="getDocument($event)" />        
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
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators';

export function validName(name){
    let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
    if(validNamePattern.test(name)){
        return true;
    }
    return false;
}

export default {
    name: 'InternalUnitCreate',
    data() {
        return {
            v$: useValidate(),
            submitting: false,
            data: [],   
            FormData: {   
                unitname: "",
                status: "",
                contact_person: "",
                contact_number: "",
                office_addr: "",                
                remark: "",
                picture: null,
                appendix: null,
                creation_time: "",
                classification: "",
                created_by_user: "",
                },                 
             pictureImages: [],
             appendixImages: [],
        }
    },
    components: {         
      Picture,
      Document,         
    }, 
    validations(){
        return {
            FormData : {
                contact_number : {
                    required,
                },
                contact_person : {
                    required,
                },
                office_addr : {
                    required,
                },
                unitname : {
                    required,
                },
            }
        }
    },
    created(){         
        
    },
    methods:{
        getPicture(data){
         this.pictureImages = data;
        },
        getDocument(data){
            this.appendixImages = data;          
        },
       
      async createData(e){  
        this.submitting = true;
        this.v$.$validate();
        if(this.v$.$error){
            this.submitting = false;
            return;
        }
        let response = await authApi({
                method: 'POST',
                api: '/internalunit',                 
                data: this.FormData
        });
        // console.log("success create>>" + JSON.stringify(response))
        if(response.status == 201){
          //console.log('success'+ JSON.stringify(response));  
                //console.log(response.data.unitid);           
                const id = response.data.unitid; 
                const imgformData = new FormData();
                imgformData.append('unitid',id);
                this.pictureImages.forEach((value) => {
                     imgformData.append('picture', value.url);   
                });
                this.appendixImages.forEach((value) => {
                    imgformData.append('appendix', value.url);  
                });    
                
                let imgResponse = await authApi({
                method: 'POST',
                api: '/unit_datafiles',               
                data: imgformData
                });
                if(imgResponse.status == 200){                   
                    toast.success("Supplier insert successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
                    this.$router.back();
                }

        }

       }
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
}
</style>