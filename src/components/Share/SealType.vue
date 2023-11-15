<template>
    <!-- <div class="form-group">
        <label for="invoice_type"> 
            <small><b> {{ $t('invoice_type') }} </b></small> 
        </label>
        <div class="row">
            <div class="col-md-11">
                <el-select v-model="invoice_type_id" class="invoice_type" :placeholder="$t('please_choose')"  style="width: 100%" @change="selectInvoiceType()">
                    <el-option
                        v-for="type of invoiceType"
                        :key="type.invoice_type_id"
                        :label="type.name"
                        :value="type.invoice_type_id"> {{ type.name }} </el-option>
                </el-select>  
            </div>  
            <div class="col-md-1">
                <el-button type="button" class="btn btn-sm btn-secondary"  @click="AddModalInvoice()">                     
                        <font-awesome-icon icon="fa-solid fa-plus" /> <span class="ml-1">{{ $t('add') }}</span>                                            
                </el-button>
            </div>                          
        </div>
    </div> -->

    <div class="form-group mb-3">
        <label for="seal_type">
            <span class="text-danger">*</span> <small><b>{{ $t('seal_type') }}</b></small>
        </label>
        <div class="row">
            <div class="col-md-11">
                <el-select class="" style="width: 100%;" id="seal_type" v-model="seal_type_id" @change="selectInvoiceType()"> <!-- FormData.seal_type -->
                    <el-option v-for="obj of seal_type" 
                               :key="obj.seal_type_id" 
                               :label="obj.seal_type_name" 
                               :value="obj.seal_type_id"> 
                               <!-- {{ obj.seal_type_name }}  -->
                    </el-option>         
                </el-select>
            </div>
            <div class="col-md-1">
                <el-button type="button" class="btn btn-sm btn-secondary"  @click="AddModalInvoice()">                     
                    <font-awesome-icon icon="fa-solid fa-plus" /> <span class="ml-1">{{ $t('add') }}</span>                                            
                </el-button>
            </div>
        </div>
        
        <!-- <span v-if="v$.FormData.seal_type.$error" class="text-danger">
            <span v-if="v$.FormData.seal_type.$errors[0].$message != ''">
                {{ $t('is_required', {'name': $t('seal_type')}) }}
            </span>
        </span> -->

    </div>

    <el-dialog v-model="typeOfSealDialog" title="Insert Type of Seal" width="30%" draggable>    
        <form @submit.prevent="createData">                   
            <div class="container-fluid">                                  
                <div class="row">
                    <div class="col-12">
                        <div class="form-group">
                        <label for="seal_name"> {{ $t('seal_type') }} </label>
                        <el-input type="text" v-model="FormData.seal_type_name" :placeholder="$t('please_enter')" 
                        clearable />                                          
                        <span v-if="FormData.seal_type == ''" class="text-danger">
                            <span>
                                {{ $t('is_required', {'name': $t('seal_type_name')}) }} 
                            </span>                                                                                         
                        </span>
                        </div> 
                    </div>                                                                                                                      
                </div> 
                <div class="row">
                    <div class="col-12 d-flex justify-content-end">
                        <el-button type="primary" loading v-if="submitting">Submiting ...</el-button>     
                        <button type="submit" class="btn btn-primary btn-footer" v-if="!submitting"> {{ $t('submit') }} </button>
                    </div>                                     
                    
                </div>
                                                
            </div>
        </form>  
    </el-dialog>

</template>

<script>
import {authApi} from '@/http/authApi';
import { toast } from 'vue3-toastify';

export default {      
 
  data() {
    return {
         
        typeOfSealDialog: false,
         submitting: false,            
         seal_type_id: "",
         seal_type_name: "",
         seal_type: [], 
         FormData: {
            // name: "",
            seal_type_name: "",
            seal_type: ""
         }
    }
  },
  props: ['oldSealId'],
  emits :{
    SealData: null, 
    },

created() {
  this.getSealType();      
},     
methods: {  
    
    AddModalInvoice(){           
        this.typeOfSealDialog = true;
    },
    async getSealType(){            
        let response = await authApi({
            method: 'GET',
            api: '/sealtype',
            params: {                       
                name: ""
            }  
        });
        if(response.status == 200){ 
            this.seal_type = response.data.data;  
            if(this.oldSealId !=null){
                this.seal_type_id = this.oldSealId;           
            }                        
                        
        }          
    }, 
    selectInvoiceType(){          
        this.$emit("SealData", this.seal_type_id);       
    },

    async createData(e){ 
              
        let response = await authApi({
            method: 'POST',
            api: '/sealtype',                
            data: this.FormData
        });
        if(response.status == 201){  
            toast.success("Seal Type insert successful!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                });                             
                this.typeOfSealDialog = false;
                this.submitting = false; 
                this.getSealType();            
        }
   }            
}
}
</script>