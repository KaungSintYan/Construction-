<template>
   <div class="container-fluid"  @click="$store.commit('setActive', false)">   
    <form  @submit.prevent="createData">
        <div class="row">
            <div class="col-md-12">            
                        <div class="form-group">
                            <label for="project_name">
                                <span class="text-danger">*</span> <small> <b> {{ $t('supplier_name') }} </b> </small>
                            </label>
                            <el-input type="text" :placeholder="$t('please_enter')" id="project_name" v-model="FormData.supplierinfo.supplier_name" clearable />
                            <span v-if="v$.FormData.supplierinfo.supplier_name.$error" class="text-danger">
                                <span v-if="v$.FormData.supplierinfo.supplier_name.$errors[0].$message != ''">
                                    {{ $t('is_required', {'name': $t('supplier_name')}) }}
                                </span>
                            </span>
                        </div>

                        <SupplierClassification @SupplierData="getSupplierData($event)"/>
                        
                        <!-- <div class="form-group">
                            <label for="classification">
                                <small> <b> {{ $t('classification') }} </b> </small>
                            </label>
                           
                            <el-select v-model="FormData.supplierinfo.classification" id="type_of_section" :placeholder="$t('please_choose')"  style="width: 100%">
                                <el-option
                                  v-for="item in classification"
                                  :key="item.class_name"
                                  :label="item.class_name"
                                  :value="item.class_id"
                                />  
                            </el-select>    
                            <span v-if="v$.FormData.supplierinfo.classification.$error" class="text-danger">
                                <span v-if="v$.FormData.supplierinfo.classification.$errors[0].$message != ''">
                                    {{ $t('is_required', {'name': $t('classification')}) }}
                                </span>
                            </span>
                        </div> -->

                        <div class="form-group">
                            <label for="item_number">
                                <small> <b> {{ $t('contact_person') }} </b> </small>
                            </label>
                            <el-input type="text" :placeholder="$t('please_enter')" v-model="FormData.supplierinfo.contact_person" clearable />
                            <span v-if="v$.FormData.supplierinfo.contact_person.$error" class="text-danger">
                                <span v-if="v$.FormData.supplierinfo.contact_person.$errors[0].$message != ''">
                                    {{ $t('is_required', {'name': $t('contact_person')}) }}
                                </span>
                            </span>
                        </div>
                        <div class="form-group mb-3">
                            <label for="contact_number">
                                <small> <b> {{ $t('contact_number') }} </b> </small>
                            </label>
                            <el-input type="tel" :placeholder="$t('please_enter')"  v-model="FormData.supplierinfo.contact_number" clearable />
                            <span v-if="v$.FormData.supplierinfo.contact_number.$error" class="text-danger">
                                <span v-if="v$.FormData.supplierinfo.contact_number.$errors[0].$message != ''">
                                    {{ $t('is_required', {'name': $t('contact_number')}) }}
                                </span>
                            </span>
                        </div>
                        <div class="form-group mb-3">
                            <label for="office_address">
                                <small> <b> {{ $t('office_address') }} </b> </small>
                            </label>
                            <el-input type="tel" :placeholder="$t('please_enter')" v-model="FormData.supplierinfo.office_addr" clearable />
                            <span v-if="v$.FormData.supplierinfo.office_addr.$error" class="text-danger">
                                <span v-if="v$.FormData.supplierinfo.office_addr.$errors[0].$message != ''">
                                    {{ $t('is_required', {'name': $t('office_address')}) }}
                                </span>
                            </span>
                        </div>
                        <div class="form-group mb-3">
                            <label for="bank_information">
                                <span class="text-danger">*</span> <small> <b> {{ $t('bank_information') }} </b> </small>
                            </label>
                            <el-table :data="FormData.bankinfo" border style="width: 100%;">
                                        <el-table-column  fixed type="index" width="55" />
                                        <el-table-column :label="$t('account_name')" width="400px">
                                            <template #default="scope">
                                                <el-input type="text" :placeholder="$t('please_enter')" class="" v-model="scope.row.accname" clearable/> 
                                            </template>
                                        </el-table-column>
                                        <el-table-column :label="$t('bank')" width="400px">
                                            <template #default="scope">
                                                <el-input type="text" :placeholder="$t('please_enter')" class="" v-model="scope.row.bank" clearable/> 
                                            </template>
                                        </el-table-column>
                                        <el-table-column :label="$t('bank_card_number')" width="400px">
                                            <template #default="scope">
                                                <el-input type="text" :placeholder="$t('please_enter')" class="" v-model="scope.row.cardno" clearable/> 
                                            </template>
                                        </el-table-column>

                                        <el-table-column fixed="right"  :label="$t('operate')" width="200px">
                                            <template #default="scope">
                                                <small class="mr-2" @click="copyBankInfo(scope.row.id)">{{ $t('copy') }}</small> 
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
                        <div class="form-group mb-3">
                            <label for="remark">
                                <small><b>{{ $t('remark') }}</b></small> 
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
import SupplierClassification from '@/components/Share/SupplierClassification'

export function validName(name){
    let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
    if(validNamePattern.test(name)){
        return true;
    }
    return false;
}

export default {
    name: 'SupplierCreate',
    data() {
        return {
            loading: true, 
            v$: useValidate(),
            submitting: false,
            data: [],   
            FormData: { 
                supplierinfo: {
                    supplier_name: "",                    
                    contact_person: "",
                    contact_number: "",
                    office_addr: "",                
                    remark: "",
                    picture: null,
                    appendix: null,
                    creation_time: "",
                    classification: "",
                    created_by_user: "",
                } ,
                bankinfo: [
                    {
                        id: 1,
                        supplierid: "",
                        accname: "",
                        bank: "",
                        cardno: "",                       
                    }
                ]
                },  
               
            classification: [] ,
            pictureImages: [],
            appendixImages: [],
            bankinfoDetailCount: 1,        
        }
    },
    components: {     
      Picture,
      Document,
      SupplierClassification      
    }, 
    validations(){
        return {
            FormData : {
                supplierinfo : {
                    // classification: {
                    //     required,
                    // },
                    contact_number: {
                        required,
                    },
                    contact_person: {
                        required,
                    },
                    office_addr: {
                        required,
                    },
                    supplier_name: {
                        required,
                    },
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
        getSupplierData(data){
            this.FormData.supplierinfo.classification = data;
        },

        copyBankInfo(index) {
            this.bankinfoDetailCount = this.bankinfoDetailCount +1;
            let id= this.bankinfoDetailCount;
            let detail= {
                        id: id,
                        supplierid: "",
                        accname: this.FormData.bankinfo.find(x=>x.id == index).accname,
                        bank: this.FormData.bankinfo.find(x=>x.id == index).bank,
                        cardno: this.FormData.bankinfo.find(x=>x.id == index).cardno,                        
            }          
            this.FormData.bankinfo.splice(index, 0, detail); 
            //console.log(JSON.stringify(this.FormData.budget_detail))
        },
        addBankInfo() {
            this.bankinfoDetailCount = this.bankinfoDetailCount +1;
            let id= this.bankinfoDetailCount;
            let detail= {
                        id: id,
                        supplierid: "",
                        accname: "",
                        bank: "",
                        cardno: "",
                        
                    }
            this.FormData.bankinfo.push(detail);
            //console.log(JSON.stringify(this.FormData.budget_detail))
        },
        deleteBankInfo(id){

         this.FormData.bankinfo = this.FormData.bankinfo.filter(x=> x.id != id);
          
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
       
    //    async getClassification(){
    //     let response = await authApi({
    //             method: 'GET',
    //             api: '/supplierclassification',
    //             params: {                       
    //                   name: ""
    //             }   
    //     });
    //     this.classification = response.data;       
    //    },
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
      async createData(e){  
        this.submitting = true;
        this.v$.$validate();
        if(this.v$.$error){
            this.submitting = false;
            return;
        }
        let response = await authApi({
                method: 'POST',
                api: '/supplier',                 
                data: this.FormData
        });
        // console.log("success create>>" + JSON.stringify(response))
        if(response.status == 201){
            // console.log('success'+ JSON.stringify(response));  
                // console.log(response.data.supplierid);           
                const id = response.data.supplierid; 
                const imgformData = new FormData();
                imgformData.append('supplierid',id);
                this.pictureImages.forEach((value) => {
                     imgformData.append('picture', value.url);   
                });
                this.appendixImages.forEach((value) => {
                    imgformData.append('appendix', value.url);  
                });    
                
                let imgResponse = await authApi({
                method: 'POST',
                api: '/supplier_datafiles',               
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