<template>
    <div v-loading="loading" class="loading__div" v-if="loading"></div> 
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading">     
    <form  @submit.prevent="updateSave">
       <div class="row">
            <div class="col-md-12"> 
                        <div class="form-group mb-3">
                            <label for="material_classification">
                                <small> <b> {{ $t('material_classification') }} </b> </small>
                            </label>
                            <el-select v-model="FormData.classification" id="material_classification" :placeholder="$t('please_choose')"  style="width: 100%">
                                <el-option
                                  v-for="item in classification"
                                  :key="item.class_name"
                                  :label="item.class_name"
                                  :value="item.class_id"
                                />  
                            </el-select> 
                        </div>  
                        <div class="form-group mb-3">
                            <label for="material_name">
                                <small> <b> {{ $t('material_name') }} </b> </small>
                            </label>                          
                            <el-input type="text" :placeholder="$t('please_enter')" v-model="FormData.material_inventory_name" clearable />
                        </div>
                        <div class="form-group mb-3">
                            <label for="unit_of_measurement">
                                <small> <b> {{ $t('unit_of_measurement') }} </b> </small>
                            </label>
                            <el-input type="tel" :placeholder="$t('please_enter')" v-model="FormData.measure_unit" clearable />
                        </div>
                        <div class="form-group mb-3">
                            <label for="specification">
                                <small> <b> {{ $t('specification') }} </b> </small>
                            </label>
                            <el-input type="tel" :placeholder="$t('please_enter')" v-model="FormData.specification" clearable />
                        </div>
                       <div class="form-group mb-3">
                            <label for="brand">
                                <small> <b> {{ $t('brand') }} </b> </small>
                            </label>
                            <el-input type="textarea" :placeholder="$t('please_enter')"
                            v-model="FormData.brand" maxlength="1000" show-word-limit  />                          
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

export default {
  
    name: 'MaterialInventoryEdit',
  
    data() {
        return {
            submitting: false,
            loading: false,           
            data: [],   
            FormData: {}, 
            classification: []     
        }
    },

    
    created(){        
        this.getData();
        this.getClassification();  
    },
    methods:{   
        async getClassification(){
        let response = await authApi({
                method: 'GET',
                api: '/materialclassification',
                params: {                       
                      name: ""
                }   
        });
        this.classification = response.data;       
       },     
      async getData(submit){
        if(!submit){
            this.loading = true;
        }  
           
        let response = await authApi({
                method: 'POST',
                api: '/getinventory',
                params: {
                       id: this.$route.params.id,
                       keyword: '',
                       status: '',                       
                       page: '',
                       limit: ''
                }   
            });
            if(response.status == 200){
                this.FormData= response.data.data;
                this.loading = false;
                if(!submit){
                    this.loading = false;
                }
                if(submit){
                    this.submitting = !this.submitting;
                } 
            }
      },
      async updateSave(e){
        this.submitting = true;  
        let response = await authApi({
                method: 'PUT',
                api: '/materialinventory',                 
                data: this.FormData
        });
       // console.log("success update>>" + JSON.stringify(response))
        if(response.status == 200){           
            toast.success("Material Inventory updated successful !", {
               position: toast.POSITION.TOP_RIGHT,
               autoClose: 3000,
            });
            this.getData(this.submitting);
            this.$router.back();
        }

       }
    }
    
}
</script>