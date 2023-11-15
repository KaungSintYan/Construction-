<template>
    
    <div class="form-group mb-3">
        <div class="form-group">
            <label for="salary_type"><small><b> {{ $t('salary_type') }} </b></small></label>
        </div> 
        <div class="row">
            <div class="col-md-11">
                <el-select v-model="type_id" @change="selectInvoiceType()" class="" :placeholder="$t('please_choose')"  style="width: 100%">
                    <el-option
                        v-for="item in salary_type"
                        :key="item.type_id"
                        :label="item.name"
                        :value="item.type_id"
                    />  
                </el-select>
            </div>
            <div class="col-md-1">
                <el-button type="button" class="btn btn-sm btn-secondary"  @click="AddModalSalary()">                     
                    <font-awesome-icon icon="fa-solid fa-plus" /> <span class="ml-1">{{ $t('add') }}</span>                                            
                </el-button>
            </div>
        </div>
        
    </div>

    <el-dialog v-model="typeOfSalaryDialog" title="Insert Type of salary" width="30%" draggable>    
        <form @submit.prevent="createData">                   
            <div class="container-fluid">                                  
                <div class="row">
                    <div class="col-12">
                        <div class="form-group">
                        <label for="section_name"> {{ $t('salary_type') }} </label>
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
         
         typeOfSalaryDialog: false,
         submitting: false,            
         type_id: "",
         salary_type: [], 
         FormData: {
            name: "",
         }
    }
  },
  props: ['oldSalaryId'],
  emits :{
    SalaryData: null, 
    },

created() {
  this.getSalaryType();      
},     
methods: {  
    
    AddModalSalary(){           
        this.typeOfSalaryDialog = true;
    },
    async getSalaryType(){            
        let response = await authApi({
            method: 'GET',
            api: '/constructionmanagement/salary_type',
            params: {                       
                name: ""
            }  
        });
        if(response.status == 200){ 
            this.salary_type= response.data.data;  
            if(this.oldSalaryId !=null){
                this.type_id = this.oldSalaryId;           
            }                        
                        
        }          
    }, 
    selectInvoiceType(){          
        this.$emit("SalaryData", this.type_id);       
    },

    async createData(e){ 
              
        let response = await authApi({
            method: 'POST',
            api: '/constructionmanagement/salary_type',                
            data: this.FormData
        });
        if(response.status == 201){  
            toast.success("Salary Type insert successful!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                });                             
                this.typeOfSalaryDialog = false;
                this.submitting = false; 
                this.getSalaryType();            
        }
   }            
}
}
</script>