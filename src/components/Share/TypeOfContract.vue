<template>    
    <div class="form-group mb-3">
            <label for="type_of_contract">
                <span class="text-danger">*</span> <small><b>{{ $t('type_of_contract') }}</b></small> 
            </label>
            <div class="row">
                <div class="col-md-11">
                    <el-select  style="width: 100%;" class="" v-model="contract_type_id" @change="selectContractType()">
                        <el-option value="">{{ $t('please_choose') }}</el-option>
                        <el-option v-for="obj of contractType" :key="obj.contract_type_id" :label="obj.contract_type_name" :value="obj.contract_type_id">
                            {{ obj.contract_type_name }}</el-option>                           
                    </el-select>                    
                </div>
                <div class="col-md-1">
                    <el-button type="button" class="btn btn-sm btn-secondary" @click="AddModalBox()">                     
                            <font-awesome-icon icon="fa-solid fa-plus" /> <span class="ml-1">{{ $t('add') }}</span>                                            
                    </el-button>
                </div>
            </div>
            <el-dialog v-model="typeOfModalDialog" title="Insert Type of section" width="30%" draggable>    
            <form @submit.prevent="createData">                   
                <div class="container-fluid">                                  
                    <div class="row">
                        <div class="col-12">
                            <div class="form-group">
                            <label for="section_name"> Section Name</label>
                            <el-input type="text" v-model="FormData.contract_type_name" :placeholder="$t('please_enter')" 
                            clearable />                                          
                            <span v-if="FormData.contract_type_name == ''" class="text-danger">
                                <span>
                                    {{ $t('is_required', {'name': $t('types_of_section')}) }} 
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
            </div>
</template>

<script>

import {authApi} from '@/http/authApi';
import { toast } from 'vue3-toastify';
export default ({
   
    data(){
        return {
           
            typeOfModalDialog: false,
            submitting: false,
            contract_type_id: "",
            contractType: [],
            FormData: { 
                contract_type_name: "",                
            },
           
        }
    },
    
    props: ['oldContractId'],
    emits :{
        ContractData: null,
    },
    
    created() {
        this.getTypeOfContract();
    },  
    methods: {
        AddModalBox(){
            this.typeOfModalDialog = true;
        },
        async getTypeOfContract(){
            let response = await authApi({
                methods: 'GET',
                api: '/contractmanagement/revenue_contract_type',
                params: {
                    name: ""
                }
            });
            if (response.status == 200){
                //console.log('list'+ JSON.stringify(response.data))
                this.contractType = response.data;
                if(this.oldContractId != null){
                    this.contract_type_id = this.oldContractId;
                }
              
            }
        },
        selectContractType(){
           
            this.$emit("ContractData",this.contract_type_id);
        },
        async createData(){
            this.submitting = true;           
            if(this.FormData.contract_type_name == ""){
                this.submitting = false;
                return;
            }
            
            let response = await authApi({
                method: 'POST',
                api:  '/contractmanagement/revenue_contract_type',
                data: this.FormData
            });
            if(response.status == 201){
                toast.success("Type of contract insert successfully!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                this.typeOfModalDialog = false;
                this.submitting = false;
                this.getTypeOfContract(); 
            }
        }
    }
})

</script>