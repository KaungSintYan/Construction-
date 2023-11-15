<template>
   <div class="container-fluid"  @click="$store.commit('setActive', false)">   
    <form  @submit.prevent="clientCreate">
        <div class="row">
            <div class="col-md-12">            
                        <div class="form-group">
                            <label for="project_name">
                                <span class="text-danger">*</span> <small> <b> {{ $t('client_name') }} </b> </small> 
                            </label>
                            <el-input type="text" :placeholder="$t('please_enter')" id="project_name" v-model="FormData.client_name" clearable="" />
                            <span v-if="v$.FormData.client_name.$error" class="text-danger">
                                <span v-if="v$.FormData.client_name.$errors[0].$message != ''">
                                    {{ $t('is_required', {'name': $t('client_name')}) }}
                                </span>
                            </span>
                        </div>

                        <ClientClassification @ClientData="getClientData($event)" />

                        <!-- <span v-if="v$.FormData.classification.$error" class="text-danger">
                            <span v-if="v$.FormData.classification.$errors[0].$message != ''">
                                {{ $t('is_required', {'name': $t('classification')}) }}
                            </span>
                        </span> -->
                        
                        <!-- <div class="form-group">
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
                            <span v-if="v$.FormData.classification.$error" class="text-danger">
                                <span v-if="v$.FormData.classification.$errors[0].$message != ''">
                                    {{ $t('is_required', {'name': $t('classification')}) }}
                                </span>
                            </span>
                        </div> -->

                        <div class="form-group">
                            <label for="item_number">
                                <small> <b> {{ $t('contact_person') }} </b> </small>
                            </label>
                            <el-input type="text" :placeholder="$t('please_enter')" id="item_number" v-model="FormData.contact_person" clearable />
                            <span v-if="v$.FormData.contact_person.$error" class="text-danger">
                                <span v-if="v$.FormData.contact_person.$errors[0].$message != ''">
                                    {{ $t('is_required', {'name': $t('contact_person')}) }}
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
                                    {{ $t('is_required', {'name': $t('contact_number')}) }}
                                </span>
                            </span>
                        </div>
                        <div class="form-group mb-3">
                            <label for="office_address">
                                <small> <b> {{ $t('office_address') }} </b> </small>
                            </label>
                            <el-input type="tel" :placeholder="$t('please_enter')" v-model="FormData.office_addr" clearable />
                            <span v-if="v$.FormData.office_addr.$error" class="text-danger">
                                <span v-if="v$.FormData.office_addr.$errors[0].$message != ''">
                                    {{ $t('is_required', {'name': $t('office_address')}) }}
                                </span>
                            </span>
                        </div>
                        <div class="form-group mt-5">
                            <h4> <b>{{ $t('invoice_information') }}</b> </h4>
                            <hr>
                        </div>
                        <!-- <div class="form-group mb-3">
                            <label for="invoice">
                                {{ $t('invoice') }}
                            </label>
                            <input type="text" :placeholder="$t('please_enter')" class="form-control" v-model="FormData.invoiceid">
                        </div>
                        <div class="form-group mb-3">
                            <label for="tax_number">
                                {{ $t('tax_number') }}
                            </label>
                            <input type="text" :placeholder="$t('please_enter')" class="form-control" v-model="FormData.taxid">
                        </div> -->
                        <div class="form-group mb-3">
                            <label for="address">
                                <small> <b> {{ $t('address') }} </b> </small>
                            </label>
                            <el-input type="text" :placeholder="$t('please_enter')" v-model="FormData.address" clearable />
                        </div>
                        <div class="form-group mb-3">
                            <label for="telephone">
                                <small> <b> {{ $t('telephone') }} </b> </small>
                            </label>
                            <el-input type="number" :placeholder="$t('please_enter')" v-model="FormData.telephone" clearable />
                        </div>
                        <div class="form-group mb-3">
                            <label for="bank">
                                <small> <b> {{ $t('bank') }} </b> </small>
                            </label>
                            <el-input type="text" :placeholder="$t('please_enter')" v-model="FormData.bank" clearable />
                            <span v-if="v$.FormData.bank.$error" class="text-danger">
                                <span v-if="v$.FormData.bank.$errors[0].$message != ''">
                                    {{ $t('is_required', {'name': $t('bank')}) }}
                                </span>
                            </span>
                        </div>
                        <div class="form-group mb-3">
                            <label for="bank_card_number">
                                <small> <b> {{ $t('bank_card_number') }} </b> </small>
                            </label>
                            <el-input type="number" :placeholder="$t('please_enter')" v-model="FormData.bank_card" clearable />
                        </div>
                        <div class="form-group mb-3">
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
import {required} from '@vuelidate/validators'
import ClientClassification from '@/components/Share/ClientClassification'

export function validName(name){
    let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
    if(validNamePattern.test(name)){
        return true;
    }
    return false;
}

export default {
    name: 'ClientCreate',
    data() {
        return {
            loading: true, 
            v$: useValidate(),
            submitting: false,
            data: [],   
            FormData: {                
                client_name: "",                
                contact_person: "",
                contact_number: "",
                office_addr: "",
                // invoiceid: "",
                // taxid: "",
                address: "",
                telephone: "",
                bank: "",
                bank_card: "",
                remark: "",
                picture: null,
                appendix: null,
                creation_time: "",
                classification: "",
                created_by_user: "",
                },  
                classification: [] ,
                pictureImages: [] ,
                appendixImages: [],      
        }
    },
    components: {         
      Picture,
      Document,  
      ClientClassification       
    }, 
    validations(){
        return {
            FormData : {
                bank : {
                    required,                    
                },
                classification : {
                    required,                    
                },
                client_name : {
                    required,                    
                },
                contact_number : {
                    required,                    
                },
                contact_person : {
                    required,                    
                },
                office_addr : {
                    required,                    
                },
            }
        }
    },
    created(){
        this.getClassification();    
    },
    methods:{
        getPicture(data){
         this.pictureImages = data;
        },
        getDocument(data){
            this.appendixImages = data;          
        },
        getClientData(data){
            this.FormData.classification = data; 
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
      async clientCreate(e){ 
        this.submitting = true;
        this.v$.$validate();
        if(this.v$.$error){
            this.submitting = false;
            return;
        } 
        let response = await authApi({
                method: 'POST',
                api: '/client',                 
                data: this.FormData
        });
        // console.log("success create>>" + JSON.stringify(response))
        if(response.status == 201){              
              //console.log(response.data.revenue_contract_id);
                const id = response.data.clientid; 
                const imgformData = new FormData();
                imgformData.append('clientid',id);
                this.pictureImages.forEach((value) => {
                     imgformData.append('picture', value.url);   
                });
                this.appendixImages.forEach((value) => {
                    imgformData.append('appendix', value.url);  
                });    
                
                let imgResponse = await authApi({
                method: 'POST',
                api:  '/client_datafiles',           
                data: imgformData
                });
                if(imgResponse.status == 200){                   
                    toast.success("client Insert successful !", {
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
// .box1{
//     margin: 10px;
//     background: rgb(244, 247, 255);
//     padding: 10px;   
//     img {
//         width: 40px;
//         height: 40px;
//     }
//     span {
//         margin-left: 10px;
//         font-size: 16px;
//         font-weight: 600;
        
//     }
// }
a{
    text-decoration: none;
}

// .date-input{
//     width: 200px;
// }

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