<template>
    <!-- <div class="form-group">
        <label for="type_of_section">
            <small> <b> {{ $t('classification') }} </b> </small>
        </label>   
        <div class="row">
            <div class="col-md-11">
                <el-select v-model="class_name" id="type_of_section" :placeholder="$t('please_choose')"  style="width: 100%" @change="selectClientClassification()">
                    <el-option
                        v-for="item in classification"
                        :key="item.class_name"
                        :label="item.class_name"
                        :value="item.class_id"
                    />  
                </el-select> 
            </div>
            <div class="col-md-1">
                <el-button type="button" class="btn btn-sm btn-secondary"  @click="AddModalForm()">                     
                    <font-awesome-icon icon="fa-solid fa-plus" /> <span class="ml-1">{{ $t('add') }}</span>                                            
                </el-button>
            </div>
        </div>                        
        
    </div> -->

    <div class="form-group mb-3">
        <label for="material_classification">
            <small> <b> {{ $t('material_classification') }} </b> </small>
        </label> 
        <div class="row">
            <div class="col-md-11">
                <el-select v-model="class_name"  :placeholder="$t('please_choose')"  style="width: 100%" @change="selectMaterialClassification()">
                    <el-option
                        v-for="item in classifications"
                        :key="item.class_name"
                        :label="item.class_name"
                        :value="item.class_id"
                    />  
                </el-select> 
            </div>
            <div class="col-md-1">
                <el-button type="button" class="btn btn-sm btn-secondary"  @click="AddModalForm()">                     
                    <font-awesome-icon icon="fa-solid fa-plus" /> <span class="ml-1">{{ $t('add') }}</span>                                            
                </el-button>
            </div>
        </div>                          
    </div>

    <el-dialog v-model="materialClassificationDialog" title="Insert Material Class" width="30%" draggable>    
            <form @submit.prevent="createData">                   
                <div class="container-fluid">                                  
                    <div class="row">
                        <div class="col-12">
                            <div class="form-group">
                            <label for="section_name"> Class Name</label>
                            <el-input type="text" v-model="FormData.class_name" :placeholder="$t('please_enter')" 
                            clearable />                                          
                            <span v-if="FormData.classifications == ''" class="text-danger">
                                <span>
                                    {{ $t('is_required', {'name': $t('classification')}) }} 
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

materialClassificationDialog: false,
submitting: false,            
class_name: "",
class_id: "", 
classifications: [], 
FormData: {
    classifications: "",
}
}
},
props: ['oldClassId'],
emits :{
    MaterialData: null, 
},

created() {
this.getClassification();      
},     
methods: {  

AddModalForm(){           
this.materialClassificationDialog = true;
},
async getClassification(){            
let response = await authApi({
method: 'GET',
api: '/materialclassification',
params: {                       
    name: ""
}  
});
if(response.status == 200){ 
this.classifications= response.data;  
if(this.oldClassId !=null){
    this.class_name = this.oldClassId;           
}                        
            
}          
}, 
selectMaterialClassification(){          
this.$emit("MaterialData", this.class_name);       
},
async createData(e){ 

let response = await authApi({
method: 'POST',
api: '/materialclassification',                
data: this.FormData
});
if(response.status == 201){  
toast.success("Material Classification insert successful !", {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    });                             
    this.materialClassificationDialog = false;
    this.submitting = false; 
    this.getClassification();

}
}            
}
}
</script>