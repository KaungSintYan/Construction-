<template>
<div class="container-fluid my-2">
    <form ref="searchingForm">
        <div class="row">
                    <div class="col-8 col-md-6">
                    <div class="container-fluid">
                    <div class="row">
                            <div class="col-md-12 d-flex">                       
                                <el-input type="text" class="mr-2" v-model="formSearching" 
                                    :placeholder="$t('enter_keyword')"  v-on:keyup.enter="searching()" clearable >
                                    <template #prefix>
                                        <el-icon class="el-input__icon"><font-awesome-icon icon="fa-solid fa-search" /></el-icon>
                                    </template>
                                </el-input>                         
                                <el-button @click="searching()" v-show="!showAdvanced">{{ $t('search') }}</el-button>     
                                <span class="advanced_btn" @click="showAdvanced= !showAdvanced" v-show="advanced" style="width: 100px;">{{ $t('advanced_search') }}</span>            
                            </div>                    
                    </div>
                    </div>                
                    </div>
                    <div class="col-4 col-md-6 mt-2" v-show="createBtn">
                        <div class="" style="float: right;">
                            <router-link :to="`${routeName}create`">
                            <button type="button" class="btn btn-sm btn-success">                     
                                    <font-awesome-icon icon="fa-solid fa-plus" /> <span class="ml-1">{{ $t('add') }}</span>                                            
                            </button>
                            </router-link>
                        </div>                
                    </div>
        </div>
        <div class="payment__box" v-show="showAdvanced">
            <div class="row mt-3 mb-3" v-show="showAdvanced">
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="state">
                            <small><b>{{ $t('approval_status') }}</b></small>
                        </label>
                        <div class="form-group">
                            <el-select class="" style="width: 100%;" v-model="approve_status" :placeholder="$t('please_choose')">                    
                                <el-option v-for="(app, i) in approval" :key="i" :value="app.key"> {{ app.value }}</el-option>                                      
                            </el-select>
                        </div>
                    
                    </div>
                </div>  
                <div class="col-md-4">
                    <ProjectName @projectData="getProjectName($event)"  />    
                </div>        
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="date">
                            <small><b>date</b></small>                  
                        </label>  
                        <el-date-picker style="width: 100%;"
                        v-model="date"
                        type="daterange"
                        range-separator="-"
                        :start-placeholder="$t('start_date')"
                        :end-placeholder="$t('end_date')"                       
                        size="default" />
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="whether_to_pay">
                            <small><b>Whether to pay</b></small>
                        </label>
                        <div class="form-group">
                            <el-select class="" style="width: 100%;" :placeholder="$t('please_choose')">                    
                                <el-option value=""> All </el-option>                                      
                            </el-select>
                        </div>
                    
                    </div>
                </div>  
                
            </div>
            <div class="row mx-2"  v-show="showAdvanced">
                <el-button type="primary" @click="searching()">
                    <el-icon class="el-icon--right mr-1"><font-awesome-icon icon="fa-solid fa-search" /></el-icon>{{ $t('search') }}
                </el-button>   
                <el-button class="px-4" @click="reset">{{ $t('reset') }}</el-button>   
            </div>
        </div>
        
    </form>
</div> 
</template>
<script>
import {authApi} from '@/http/authApi'
import ProjectName from '@/components/Share/ProjectName.vue';

export default {
    name: "Searching",
    props: ['api', 'advanced', 'classApi', 'createBtn', 'routeName',
],
    data() {
        return {
            loading: true,
            formSearching: "",
            showAdvanced: false, 
            approval: [
                {key: 'approval', value: 'Approval'},
                {key: 'approved', value: 'Approved'},
                {key: 'approval_rejected', value: 'Approval Rejected'},
                {key: 'revoked', value: 'Revoked'},
                {key: 'draft', value: 'Draft'},
            ],
            approve_status: "",
            date: "",            
           
            SalaryPaymentData: { 
                creation_date: {
                    min_date: "",
                    max_date: "",
                },               
                approve_status: "",
                project_id: "",               
            },             
        }
    },
    components: {
      ProjectName,       
    },  
    created(){  
       
    },
    methods:{        
        reset() {    
            this.approve_status = "";        
            this.project_id = "";
            this.$refs.searchingForm.reset();        
        },     
        getProjectName(data) {   
         this.project_id = data;                 
        }, 
    
        convertDate(value){
             const d = new Date(value);
             let date= d.getDate();
             let month = d.getUTCMonth()+1;
             let year = d.getFullYear();
             let format= year+ '-'+ month + '-'+ date;
             return format;             
        },
        async searching(){             
                    let FormData = "";
                    if(this.date != "" && this.date != null){
                    let start_min_date= this.convertDate(this.date[0]);
                    let start_max_date = this.convertDate(this.date[1]);
                    this.SalaryPaymentData.creation_date.min_date = start_min_date;
                    this.SalaryPaymentData.creation_date.max_date = start_max_date;
                    }
                    else{
                        this.SalaryPaymentData.creation_date.min_date = "";
                        this.SalaryPaymentData.creation_date.max_date = "";
                    }
                    this.SalaryPaymentData.approve_status = this.approve_status;
                    this.SalaryPaymentData.project_id = this.project_id;
                    FormData = this.SalaryPaymentData;
                    let response = await authApi({
                        method: "POST",
                        api: this.api,
                        params: {
                            id: '',                       
                            keyword: this.formSearching,                                             
                            page: '',
                            limit: ''
                        },
                        data: FormData
                        });
                        if(response.status == 200){                               
                            let data= response.data.data;
                            let total = response.data.total;
                            let searching = {data: data, total: total};
                            this.$emit("searchingData", searching);
                        }                  
        }, 
    },
}
</script>
<style lang="scss">
.payment__box {
    background: #eee;
    border-radius: 10px;
    padding: 12px 20px;
    margin-top: 5px;
}

.advanced_btn {
    font-size: 12px;
    margin-left: 5px;
    color: blue;
    width: 200px !important;
    padding-top: 5px;
}
</style>