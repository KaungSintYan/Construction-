<template>
    <div class="container-fluid"  @click="$store.commit('setActive', false)"> 
        <form  @submit.prevent="updateCreate">    
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
                                    <span class="text-danger">*</span> {{ $t('name') }}
                                </label>
                                <input type="text" id="department_name" class="form-control" :placeholder="$t('please_enter')"
                                 v-model="FormData.department_name">
                            </div>                        
                </div>
            </div>
            <div class="footer-main pt-2 pl-3">        
                <button type="submit" class="btn btn-primary btn-footer"> {{ $t('submit') }} </button>
            </div>
        </form>
    </div>
 </template>

<script>
import {authApi} from '@/http/authApi'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    name: 'UserRoleEdit',
    data() {
        return {
            FormData: {               
               
            },
            officeData: [],                   
        }
    },
    
    created(){ 
        this.getOffice();    
        this.getData();   
               
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
        async getData(){         
            let response = await authApi({
                method: 'GET',
                api: '/department',
                params: {
                       id: this.$route.params.id,                                   
                       page: '',
                       limit: ''
                }   
            });
            if(response.message){            
                this.FormData = response.data.data;                                          
               // console.log('department>>'+ JSON.stringify(this.FormData))
            }
          
        },      
       async updateCreate(e){ 
            let response = await authApi({
                method: 'PUT',
                api: '/department',
                data: this.FormData 
            });
            if(response.status == 200){              
                toast.success("Department Update successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                this.$router.back();
            }
        },
    }
}
</script>

<style lang="scss" scoped>
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
     font-size: 13px;
 }

</style>