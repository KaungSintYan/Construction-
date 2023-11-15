<template>
                    <div class="form-group mb-3">
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
                    </div>

                    <el-dialog v-model="typeOfSectionDialog" title="Insert Type of section" width="30%" draggable>    
                            <form @submit.prevent="createData">                   
                                <div class="container-fluid">                                  
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form-group">
                                            <label for="section_name"> Section Name</label>
                                            <el-input type="text" v-model="FormData.section_name" :placeholder="$t('please_enter')" 
                                            clearable />                                          
                                            <span v-if="FormData.section_name == ''" class="text-danger">
                                                <span>
                                                    {{ $t('is_required', {'name': $t('section_name')}) }} 
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
             
             typeOfSectionDialog: false,
             submitting: false,            
             section_type_id: "",
             sectiontype: [], 
             FormData: {
                section_name: "",
             }
        }
      },
      props: ['oldSectionId'],
      emits :{
            SectionData: null, 
        },
  
    created() {
      this.getTypeOfSectionData();      
    },     
    methods: {  
        
        AddModalForm(){           
            this.typeOfSectionDialog = true;
        },
        async getTypeOfSectionData(){            
            let response = await authApi({
                method: 'GET',
                api: '/projectmanagement/sectiontype',
                params: {                       
                    name: ""
                }  
            });
            if(response.status == 200){ 
                this.sectiontype= response.data.data;  
                if(this.oldSectionId !=null){
                    this.section_type_id = this.oldSectionId;           
                }                        
                            
            }          
        }, 
        selectSectionType(){          
            this.$emit("SectionData", this.section_type_id);       
        },
        async createData(e){ 
           
            let response = await authApi({
                method: 'POST',
                api: '/projectmanagement/sectiontype',                
                data: this.FormData
            });
            if(response.status == 201){  
                toast.success("Type Of section insert successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });                             
                    this.typeOfSectionDialog = false;
                    this.submitting = false; 
                    this.getTypeOfSectionData();
            
            }
       }            
    }
}
</script>