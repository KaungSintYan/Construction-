<template>
        <div class="form-group">
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
        </div>

        <el-dialog v-model="typeOfInvoiceDialog" title="Insert Type of invoice" width="30%" draggable>    
            <form @submit.prevent="createData">                   
                <div class="container-fluid">                                  
                    <div class="row">
                        <div class="col-12">
                            <div class="form-group">
                            <label for="section_name"> {{ $t('invoice_type') }} </label>
                            <el-input type="text" v-model="FormData.name" :placeholder="$t('please_enter')" 
                            clearable />                                          
                            <span v-if="FormData.name == ''" class="text-danger">
                                <span>
                                    {{ $t('is_required', {'name': $t('name')}) }} 
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
             
            typeOfInvoiceDialog: false,
             submitting: false,            
             invoice_type_id: "",
             invoiceType: [], 
             FormData: {
                name: "",
             }
        }
      },
      props: ['oldInvoiceId'], // new - invoiceType 
      emits :{
        InvoiceData: null, 
        },
  
    created() {
      this.getInvoiceType();      
    },     
    methods: {  

        // new
        // showModel(){
        //     if(this.invoiceType != null && this.invoiceType != undefined && this.invoiceType != ""){
        //        this.dialogVisible = true; 
        //        this.getInvoiceType();
        //        this.showError = false;               
        //     }
        //     else{
        //         this.showError = true;
        //     }            
        // },
        
        AddModalInvoice(){           
            this.typeOfInvoiceDialog = true;
        },
        async getInvoiceType(){            
            let response = await authApi({
                method: 'GET',
                api: '/financialmanagement/invoice_type',
                params: {                       
                    name: ""
                }, 
                // new
                // data: {
                //     invoice_type_id: this.invoiceType
                // } 
                // data: {
                //     invoice_type: this.invoiceType
                // }
            });
            if(response.status == 200){ 
                this.invoiceType= response.data.data;  
                if(this.oldInvoiceId !=null){
                    this.invoice_type_id = this.oldInvoiceId;           
                }                        
                            
            }          
        }, 
        selectInvoiceType(){          
            this.$emit("InvoiceData", this.invoice_type_id);       
        },

        async createData(e){ 
                  
            let response = await authApi({
                method: 'POST',
                api: '/financialmanagement/invoice_type',                
                data: this.FormData
            });
            if(response.status == 201){  
                toast.success("Invoice Type insert successful!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });                             
                    this.typeOfInvoiceDialog = false;
                    this.submitting = false; 
                    this.getInvoiceType();            
            }
       }            
    }
}
</script>