<template>
    <div class="container-fluid"  @click="$store.commit('setActive', false)"> 
        <form  @submit.prevent="createData">    
            <div class="row">
                <div class="col-md-12">
                        <div class="form-group"> 
                            <label for="department_name">
                                    <span class="text-danger">*</span> Office
                                </label>                                              
                            <el-select v-model="FormData.office_id" :placeholder="$t('please_choose')"  style="width: 100%" >
                                <el-option
                                  v-for="item in officeData"
                                  :key="item.office_name"
                                  :label="item.office_name"
                                  :value="item.office_id"
                                />  
                            </el-select>
                        </div>
                            <div class="form-group mb-3">
                                <label for="department_name">
                                    <span class="text-danger">*</span> {{ $t('department_name') }}
                                </label>
                                <el-input type="text" id="department_name" :placeholder="$t('please_enter')"
                                 v-model="FormData.department_name" clearable />
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
    name: 'DepartmentCreate',
    data() {
        return {
            submitting: false,
            FormData: {    
                office_id: "",           
                department_name: ""
            },
            officeData: [],                 
        }
    },
    
    created(){  
        this.getOffice();             
    },
    
    methods: {
        async getOffice(){         
            let response = await authApi({
                method: 'GET',
                api: '/office',
                params: {
                       id: '',
                       keyword: '',                       
                       page: '',
                       limit: ''
                }   
            });
            if(response.status == 200){ 
                console.log('list'+ JSON.stringify(response))                 
                this.officeData = response.data.message;
              
                          
            }          
        }, 
       async createData(e){ 
            this.submitting = true;
            let response = await authApi({
                method: 'POST',
                api: '/department',
                data: this.FormData 
            });
            if(response.status == 201){              
                toast.success("Department Insert successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                this.$router.back();
            }
        },
    }
}
</script>
