<template>
    
    <div class="form-group mb-3">
        <div class="form-group">
            <span class="text-danger">*</span> <small><b> {{ $t('category_of_expenditure') }} </b></small>
        </div>     
        <div class="row">
            <div class="col-md-11">
                <el-select v-model="expenditure_category_id" class="" :placeholder="$t('please_choose')"  style="width: 100%" @change="selectCategoryExpenditure()">
                    <el-option
                        v-for="item in expenditure_category"
                        :key="item.expenditure_category_id"
                        :label="item.name"
                        :value="item.expenditure_category_id"
                    />  
                </el-select> 
            </div>
            <div class="col-md-1">
                <el-button type="button" class="btn btn-sm btn-secondary"  @click="AddModalCategory()">                     
                    <font-awesome-icon icon="fa-solid fa-plus" /> <span class="ml-1">{{ $t('add') }}</span>                                            
                </el-button>
            </div>
        </div>                          
        
    </div>

    <el-dialog v-model="categoryExpenditureDialog" title="Insert Category of Expenditure" width="30%" draggable>    
            <form @submit.prevent="createData">                   
                <div class="container-fluid">                                  
                    <div class="row">
                        <div class="col-12">
                            <div class="form-group">
                            <label for="section_name"> Section Name</label>
                            <el-input type="text" v-model="FormData.payment.name" :placeholder="$t('please_enter')" 
                            clearable />                                          
                            <span v-if="FormData.payment.name == ''" class="text-danger">
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

categoryExpenditureDialog: false,
submitting: false,            
expenditure_category_id: "",
expenditure_category: [], 
FormData: {
    payment: {
        name: "",
    },
},
}
},
props: ['oldCategoryId'],
emits :{
CategoryData: null, 
},

created() {
this.getCategoryOfExpenditureData();      
},     
methods: {  

AddModalCategory(){           
this.categoryExpenditureDialog = true;
},
async getCategoryOfExpenditureData(){            
let response = await authApi({
method: 'GET',
api: '/costmanagement/expenditure_category',
params: {                       
    name: ""
}  
});
if(response.status == 200){ 
this.expenditure_category= response.data;  
if(this.oldCategoryId !=null){
    this.expenditure_category_id = this.oldCategoryId;           
}                        
            
}          
}, 
selectCategoryExpenditure(){          
this.$emit("CategoryData", this.expenditure_category_id);       
},
async createData(e){ 

let response = await authApi({
method: 'POST',
api: '/costmanagement/expenditure_category',                
data: this.FormData.payment
});
if(response.status == 201){  
toast.success("Category of Expenditure insert successful !", {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    });                             
    this.categoryExpenditureDialog = false;
    this.submitting = false; 
    this.getCategoryOfExpenditureData();

}
}            
}
}
</script>