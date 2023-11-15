<template>
   <div class="container-fluid"  @click="$store.commit('setActive', false)">   
    <form  @submit.prevent="clientCreate">
        <div class="row">
            <div class="col-md-12"> 
                        <!-- <div class="form-group mb-3">
                            <label for="material_classification">
                                <small> <b> {{ $t('material_classification') }} </b> </small>
                            </label>                           
                            <el-select v-model="FormData.classification"  :placeholder="$t('please_choose')"  style="width: 100%">
                                <el-option
                                  v-for="item in classifications"
                                  :key="item.class_name"
                                  :label="item.class_name"
                                  :value="item.class_id"
                                />  
                            </el-select> 
                            <span v-if="v$.FormData.classification.$error" class="text-danger">
                                <span v-if="v$.FormData.classification.$errors[0].$message != ''" >
                                    {{ $t('is_required', {'name': $t('material_classification')}) }} 
                                </span> 
                            </span> 
                        </div> -->

                        <MaterialClassification @MaterialData="getMaterialData($event)" />

                        <div class="form-group mb-3">
                            <label for="material_name">
                                <small> <b> {{ $t('material_name') }} </b> </small>
                            </label>
                            <el-input type="text" :placeholder="$t('please_enter')"  v-model="FormData.material_inventory_name" clearable />
                            <span v-if="v$.FormData.material_inventory_name.$error" class="text-danger">
                                <span v-if="v$.FormData.material_inventory_name.$errors[0].$message != ''" >
                                    {{ $t('is_required', {'name': $t('material_name')}) }} 
                                </span> 
                            </span>                          
                        </div>
                        <div class="form-group mb-3">
                            <label for="unit_of_measurement">
                                <small> <b> {{ $t('unit_of_measurement') }} </b> </small>
                            </label>
                            <el-input type="tel" :placeholder="$t('please_enter')" v-model="FormData.measure_unit" clearable />
                            <span v-if="v$.FormData.measure_unit.$error" class="text-danger">
                                <span v-if="v$.FormData.measure_unit.$errors[0].$message != ''" >
                                    {{ $t('is_required', {'name': $t('unit_of_measurement')}) }} 
                                </span> 
                            </span>  
                        </div>
                        <div class="form-group mb-3">
                            <label for="specification">
                                <small> <b> {{ $t('specification') }} </b> </small>
                            </label>
                            <el-input type="tel" :placeholder="$t('please_enter')" v-model="FormData.specification" clearable />
                             <span v-if="v$.FormData.specification.$error" class="text-danger">
                                <span v-if="v$.FormData.specification.$errors[0].$message != ''" >
                                    {{ $t('is_required', {'name': $t('specification')}) }} 
                                </span> 
                            </span>  
                        </div>
                       <div class="form-group mb-3">
                            <label for="brand">
                                <small> <b> {{ $t('brand') }} </b> </small>
                            </label> 
                            <el-input type="textarea" :placeholder="$t('please_enter')"
                            v-model="FormData.brand" maxlength="1000" show-word-limit  />   
                            <span v-if="v$.FormData.brand.$error" class="text-danger">
                                <span v-if="v$.FormData.brand.$errors[0].$message != ''" >
                                    {{ $t('is_required', {'name': $t('brand')}) }} 
                                </span> 
                            </span>                       
                        </div>                        
                        <div class="form-group mb-3">
                            <label for="other_property">
                                <small> <b> {{ $t('other_property') }} </b> </small>
                            </label>                          
                            <el-input type="textarea" :placeholder="$t('please_enter')"
                            v-model="FormData.otherproperty" maxlength="1000" show-word-limit  />                  
                        </div>
                        <div class="form-group mb-5">
                            <label for="remark">
                                <small> <b> {{ $t('remark') }} </b> </small>
                            </label>
                            <el-input type="textarea" :placeholder="$t('please_enter')"
                            v-model="FormData.remark" maxlength="500" show-word-limit  /> 
                        </div>     
            </div>
        </div>  
        <div class="footer-main pt-2 pl-3">        
            <el-button type="primary" loading v-if="submitting">Submiting ...</el-button>     
            <button type="submit" class="btn btn-primary btn-footer" v-if="!submitting"> {{ $t('submit') }} </button>
        </div>  
    </form>
   </div>
  
</template>
<script>

import {authApi} from '@/http/authApi'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import MaterialClassification from '@/components/Share/MaterialClassification.vue'

export function validName(name) {
  let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
  if (validNamePattern.test(name)){
    return true;
  }
  return false;
}
export default {
    name: 'MaterialInventoryCreate',     
    data() {
        return {
            v$: useValidate(),
            submitting: false,
            data: [],   
            form: {
                email: '',               
            },
            FormData: {   
                material_inventory_name: "",
                status: false,
                measure_unit: "",
                specification: "",
                brand: "",                
                remark: "",               
                otherproperty: "",
                creation_time: "",              
                created_by_user: "",
                classification: "",
            },                   
                classifications: []     
        }
    },
    components: {
        MaterialClassification
    },
    validations() {
        return {
            FormData: {
                material_inventory_name: {
                    required ,        
                },
                brand: {
                    required ,
                },
                // classification: {
                //     required 
                // },
                measure_unit: {
                    required ,
                },
                specification: {
                    required ,
                }
            }
        }
    },
    created(){         
        this.getClassification();    
    },
    methods:{
       getMaterialData(data){
        this.FormData.classification = data; 
       },
       async getClassification(){
        let response = await authApi({
                method: 'GET',
                api: '/materialclassification',
                params: {                       
                      name: ""
                }   
        });      
        this.classifications = response.data;       
       },
      async clientCreate(e){ 
        this.submitting = true;
        this.v$.$validate() // checks all inputs
        if (this.v$.$error) {
           this.submitting = false;
           return;
        }    
        let response = await authApi({
                method: 'POST',
                api: '/materialinventory',                 
                data: this.FormData
        });
        // console.log("success create>>" + JSON.stringify(response))
        if(response.status == 201){          
            toast.success("Material Inventory insert successful !", {
               position: toast.POSITION.TOP_RIGHT,
               autoClose: 3000,
            });
            this.$router.back();
        }
        else{
            this.submitting = false;
        }

       }
    }
    
}
</script>