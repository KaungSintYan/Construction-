<template>
<div class="container-fluid my-2">
 <div class="row">
            <div class="col-md-8">
            <div class="container">
             <div class="row">
                    <div class="col-md-6">               
                        <div class="input-group">
                            <div class="input-group-prepend">
                            <div class="input-group-text"> 
                                <font-awesome-icon icon="fa-solid fa-search" /></div>
                            </div>
                            <input type="text" class="form-control" v-model="formSearching" id="inlineFormInputGroup" :placeholder="$t('enter_keyword')"  v-on:keyup.enter="searching()">
                        </div>                 
                    </div>
                    <div class="col-md-6"> 
                        <div style="margin-top: 5px;">                
                            <el-button v-show="!showAdvanced" @click="searching()">{{ $t('search') }}</el-button>
                            <span class="advanced_btn" @click="showAdvanced= !showAdvanced" v-show="advanced">{{ $t('advanced_search') }}</span>
                        </div>
                    </div> 
                </div>
            </div>                
            </div>
            <div class="col-md-4 mt-2" v-show="createBtn">
                <div class="" style="float: right;">
                    <router-link :to="`${routeName}create`">
                    <button type="button" class="btn btn-sm btn-success">                     
                            <font-awesome-icon icon="fa-solid fa-plus" /> <span class="ml-1">{{ $t('add') }}</span>                                            
                    </button>
                    </router-link>
                </div>                
            </div>
 </div>
 <div class="row" v-show="showAdvanced">
                <div class="col-md-6 mt-2">
                    <div class="form-group">
                        <label for="state">
                            <small><b>{{ $t('state') }}</b></small>
                        </label>
                        <select class="form-control" id="state" v-model="FormData.status" @change="searching()">                          
                            <option value="all">All</option>
                            <option value=False >Unarchived</option>            
                            <option value=True >Archived</option>                                            
                        </select>
                    </div>
                </div> 
                <div class="col-md-6 mt-2">
                    <div class="form-group">
                        <label for="class" >
                            <small><b>{{ $t('classification') }}</b></small>
                        </label>
                        <select class="form-control"  id="class" v-model="FormData.class" @change="searching()">                          
                            <option value="">All</option>
                            <option v-for="obj of classification" :key="obj.class_id" :value="obj.class_id">{{ obj.class_name }}</option>                           
                        </select>
                    </div>
                </div>           
 </div>


</div>

 
</template>
<script>
import {authApi} from '@/http/authApi'

export default {
    name: "Searching",
    props: ['api', 'advanced', 'classApi', 'createBtn', 'routeName'],
    data() {
        return {
            loading: true,
            formSearching: "",
            showAdvanced: false, 
            classification: [],
            FormData: {
                status: "all",
                class: ""
            },           

        }
    },
    // computed: {    
    //     StartDate: function () {
    //     const end = new Date()
    //     const start = new Date()
    //     start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
    //     return [start, end]
    //     },
    //     EndDate: function () {
    //     const end = new Date()
    //     const start = new Date()
    //     start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
    //     return [start, end]
    //     }
    // },

    created(){ 
        if(this.classApi != "" && this.classApi !=null && this.classApi !=undefined){
            this.getClassification();
        }     

    },
    methods:{        
        async getClassification(){
            let response = await authApi({
                method: 'GET',
                api: this.classApi,
                params: {                       
                      name: ""
                }   
            });
            this.classification = response.data;    
        },
        convertDate(value){
             const d = new Date(value);
             let date= d.getDate();
             let month = d.getMonth();
             let year = d.getFullYear();
             let format= year+ '-'+ month+ '-'+ date;
             return format;
             
        },
        async searching(){    
            
                let method="";
                if(this.api == "/internalunit"){
                    let response = await authApi({
                        method: "GET",
                        api: this.api,
                        params: {
                            id: '',                       
                            keyword: this.formSearching,                                             
                            page: '',
                            limit: ''
                        },                          
                        });
                        if(response.message){      
                            const list= response.data.data;                    
                            let data = list.map(v => ({...v, isSelected: false})); 
                            let pageCount = response.data.pagecount;
                            let searching = {data: data, page: pageCount};
                            this.$emit("searchingData", searching);
                        }  
                }
                else{
                    let response = await authApi({
                        method: "POST",
                        api: this.api,
                        params: {
                            id: '',                       
                            keyword: this.formSearching,                                             
                            page: '',
                            limit: ''
                        },
                        data: this.FormData       
                        });
                        if(response.message){      
                            const list= response.data.data;                    
                            let data = list.map(v => ({...v, isSelected: false})); 
                            let pageCount = response.data.pagecount;
                            let searching = {data: data, page: pageCount};
                            this.$emit("searchingData", searching);
                        }  
                }

                
        }, 
    },
}
</script>
<style>
.search_btn {
    padding: 10px 15px;
    font-size: 12px;
    border-radius: 3px;
    border: 1px solid #ddd;
}
.advanced_btn {
    font-size: 12px;
    margin-left: 5px;
    color: blue;
}
</style>