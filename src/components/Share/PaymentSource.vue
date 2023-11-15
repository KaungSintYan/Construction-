<template>

    <!-- <div class="form-group mb-3">
        <label for="type_of_section">
            <small><b>{{ $t('types_of_section') }}</b></small>
        </label>
        <div class="row">
            <div class="col-md-11">
                <el-select id="type_of_section" v-model="section_type_id" style="width: 100%;" @change="selectSectionType()">                          
                        <el-option value="">{{ $t('please_choose') }}</el-option>
                        <el-option v-for="obj of sectiontype" :key="obj.section_type_id" :label="obj.section_name" :value="obj.section_type_id">{{ obj.section_name }}</el-option>                           
                </el-select>                               
            </div>
            <div class="col-md-1">
                <el-button type="button" class="btn btn-sm btn-secondary"  @click="AddModalForm()">                     
                        <font-awesome-icon icon="fa-solid fa-plus" /> <span class="ml-1">{{ $t('add') }}</span>                                            
                </el-button>
            </div>                          
          
        </div>
    </div> -->

    <div class="form-group">
        <label for="payment_source"> <small><b> {{ $t('payment_source') }} </b></small></label>   
        <div class="row">
            <div class="col-md-11">
                <el-select id="payment_source" v-model="source_id" class="" :placeholder="$t('please_choose')"  style="width: 100%" @change="selectSourceType()">
                    <el-option
                        v-for="item in paymentSource"
                        :key="item.source_id"
                        :label="item.source_name"
                        :value="item.source_id"
                    />  
                </el-select>
            </div>
            <div class="col-md-1">
                <el-button type="button" class="btn btn-sm btn-secondary"  @click="AddSourceForm()">                     
                        <font-awesome-icon icon="fa-solid fa-plus" /> <span class="ml-1">{{ $t('add') }}</span>                                            
                </el-button>
            </div>
        </div>                         
         
    </div> 

    <el-dialog v-model="typeOfSourceDialog" title="Insert Payment Source" width="30%" draggable>    
            <form @submit.prevent="createData">                   
                <div class="container-fluid">                                  
                    <div class="row">
                        <div class="col-12">
                            <div class="form-group">
                            <label for="source_name"> Source Name</label>
                            <el-input type="text" v-model="FormData.payment.source_name" :placeholder="$t('please_enter')" 
                            clearable />                                          
                            <span v-if="FormData.payment.source_name == ''" class="text-danger">
                                <span>
                                    {{ $t('is_required', {'name': $t('source_name')}) }} 
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

typeOfSourceDialog: false,
submitting: false,            
source_id: "",
paymentSource: [], 
FormData: {
    payment: {
        source_name: "",
    },
}
}
},
props: ['oldSourceId'],
emits :{
    SourceData: null, 
},

created() {
this.getPaymentSourceData();      
},     
methods: {  

AddSourceForm(){           
    this.typeOfSourceDialog = true;
},
async getPaymentSourceData(){            
let response = await authApi({
method: 'GET',
api: '/financialmanagement/payment_source',
params: {                       
    name: ""
}  
});
if(response.status == 200){ 
this.paymentSource= response.data.data;  
if(this.oldSourceId !=null){
    this.source_id = this.oldSourceId;           
}                        
            
}          
}, 
selectSourceType(){    
    this.$emit("SourceData", this.source_id);       
},
async createData(e){ 

let response = await authApi({
method: 'POST',
api: '/financialmanagement/payment_source',                
data: this.FormData.payment
});
if(response.status == 201){  
toast.success("Payment Source insert successful !", {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    });                             
    this.typeOfSourceDialog = false;
    this.submitting = false; 
    this.getPaymentSourceData();

}
}            
}
}
</script>