<template>  
    <div class="container-fluid"  @click="$store.commit('setActive', false)">
        <div class="row">
            <div class="col-md-8">
                <div class="row my-2">
                    <div class="col-md-6">               
                        <div class="input-group">
                            <div class="input-group-prepend">
                            <div class="input-group-text"> <font-awesome-icon icon="fa-solid fa-search" /></div>
                            </div>
                            <input type="text" class="form-control" v-model="formSearching" id="inlineFormInputGroup" :placeholder="$t('enter_keyword')"  v-on:keyup.enter="searching()">
                        </div>                 
                    </div>
                    <div class="col-md-6"> 
                        <div style="margin-top: 5px;">
                            <!-- <span class="search_btn" @click="searching()">{{ $t('search') }}</span> -->
                            <el-button @click="searching()" v-show="!showAdvanced">{{ $t('search') }}</el-button>
                        </div>
                    </div> 
                </div> 
            </div>
            <div class="col-md-4 mt-2">
                <div class="" style="float: right;">
                    <router-link to="/safety_rectification_list/create">
                    <button type="button" class="btn btn-sm btn-success">                     
                            <font-awesome-icon icon="fa-solid fa-plus" /> <span class="ml-1">{{ $t('add') }}</span>                                            
                    </button>
                    </router-link>
                </div>                
            </div>
        </div>
        <div class="row mt-4" v-for="items of data" :key="items.security_inspection_id">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-6 ">
                        <h4>{{ items.title }}</h4>                       
                        <p class="text-muted"> Order number: {{ items.odd_number }} </p>  
                        <p class="text-muted"> {{ items.rectifier }} </p>                          
                    </div>
                    <div class="col-md-6 d-flex justify-content-end">
                       <p class="text-muted"> {{ items.end_date }} </p>                       
                    </div>
                </div>
               
                <div class="row">
                    <div class="col-md-6">
                        <el-tag class="mx-1" effect="light">
                        {{ items.project_id }}
                        </el-tag>
                    </div>
                    <div class="col-md-6 d-flex justify-content-end">
                        <span class="icon__ellipsis">
                            <el-popover  popper-style="width: 100px !important;min-width: 100px !important;"
                            placement="bottom">  
                            <div class="container" >
                                <div class="row" >
                                    <router-link :to="`/safety_rectification_list/edit/${items.security_inspection_id}`">
                                    <font-awesome-icon icon="fa-solid fa-pencil" style=" margin-right: 5px !important; padding: 2px !important;color: #7d7d7d;" /> edit
                                    </router-link>    
                                </div>
                                <div class="row" @click="deleteAll(items.security_inspection_id)" >
                                    <font-awesome-icon icon="fa-solid fa-trash" style=" margin-right: 5px !important; padding: 2px !important;color: #7d7d7d;"  /> delete
                                </div>
                            </div> 
                       
                            <template #reference>
                                <font-awesome-icon icon="fa-solid fa-ellipsis-v" class="ellipsis__icon"/>
                            </template>
                        </el-popover>
                          
                        </span>
                    </div>
                </div>                
            </div>
            <el-divider />
        </div>
        
    </div>
    <div class="footer__bar">
        <div class="container-fluid mt-3">           
            <div class="row">
                <div class="col-md-6">
                      <span>{{ $t('selected') }} {{ selectedCount }} {{ $t('strip') }}</span>
                      <button type="button" class="footer__btn ml-2 mr-2" @click="deleteAll()">{{ $t('delete') }}</button>                                       
                </div>
                <div class="col-md-6">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item">
                            <button type="button" class="page-link"  @click="previous()" :disabled="pageCountActive == 1">                         
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                            </button>                           
                            </li>
                            <li v-for="(pageCount) of pageCount" :key="pageCount" @click="getWorkType(pageCount)">
                                <span class="page-link" :class="{ active : pageCountActive == pageCount}"> {{ pageCount }}</span>
                            </li>                            
                            <li class="page-item">
                            <button type="button" class="page-link" @click="next()" :disabled="pageCountActive == pageCount">                           
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                            </button>  
                            </li>
                        </ul>
                        </nav>
                </div>
            </div>
        </div>         
    </div>      
    
</template>

<script>    
import {authApi} from '@/http/authApi'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    name: 'ProjectRoster',
    data() {
        return {          
            checkall: true,
            pageCount: 1,
            pageCountActive: 1,
            selectedCount: 0,
            data: "",  
            formData: {
                name: ''
            },       
            errorMessage: false,
            formSearching: "" ,
            editFormData: "", 
            //permission
            showBtn: false,
            createBtn: false,
            updateBtn: false,
            deleteBtn: false            
        }
    },   
   
    created(){        
        this.getData();
    },
    methods:{     
        async searching(){ 
            if(this.formSearching != ""){
                let response = await authApi({
                method: 'GET',
                api: '/constructionmanagement/security_rectification',
                params: {
                       id: '',                       
                       keyword: this.formSearching,
                       status: '',                       
                       page: '',
                       limit: ''
                }   
                });
                if(response.message){   
                    this.data=[];            
                    const list= response.data.data;
                    this.data = list.map(v => ({...v, isSelected: false})); 
                    this.pageCount = response.data.pagecount;
                }
            }
            else{
                this.data=[];
                this.getData();
            }
        },      
        previous(){ 
            let page= this.pageCountActive - 1;
            if(page > 1){
                this.data=[];
                this.getWorkType(page)
            }           
        },
        next() {                  
            let page= this.pageCountActive +1;  
            this.data=[];         
            this.getWorkType(page)
        },
        checkAll() {  
            if(this.checkall){
                for(let i=0; i<this.data.length; i++){
                this.data[i].isSelected = true;
                this.selectedCount= this.selectedCount +1;
                }  
            } 
            else{
                for(let i=0; i<this.data.length; i++){
                this.data[i].isSelected = false;
                this.selectedCount= this.selectedCount - 1;
                }  
            }  
            this.checkall = !this.checkall;
        },
        checkOne(id, isSelected){         
            this.data.find(x => x.revenue_contract_visa_id === id).isSelected = isSelected;    
            if(isSelected){
                this.selectedCount= this.selectedCount +1;
            }      
            else{
                this.selectedCount= this.selectedCount -1;
            } 
        },
        async deleteAll(id = null){          
            
            let list=[];            
            if(id != null && id != ""){
                list.push(id);             
            }
            else{
                for(let i=0; i< this.data.length; i++){
                    if(this.data[i].isSelected){
                        list.push(this.data[i].security_inspection_id);                    
                    }
                }
            } 
          
            if(list.length > 0){
                let response = await authApi({
                method: 'DELETE',
                api: '/constructionmanagement/security_rectification',
                params: {
                       id: '',
                       keyword: '',
                       status: '',                       
                       page: this.pageCountActive,
                       limit: ''
                                          
                },
                data: {
                    "id_list": list
                }    
                });
                if(response.message){
                    this.selectedCount=0;
                    this.data=[];
                    this.getData();
                    toast.success("Safety Rectification List Delete successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
                }                         
            }
        },
        async getWorkType(page){            
            this.pageCountActive=page;
            let response = await authApi({
                method: 'GET',
                api: '/financialmanagement/payment_registration',
                params: {
                       id: '',
                       keyword: '',
                       status: '',                       
                       page: '',
                       limit: ''
                }              
                     
            });
            if(response.message){
                //this.data= response.data.data;
                const list= response.data.data;
                this.data = list.map(v => ({...v, isSelected: false}));  
                this.pageCount = response.data.pagecount;
            }
        },
        async getData(){         
            let response = await authApi({
                method: 'POST',
                api: '/constructionmanagement/get_security_rectification',
                params: {
                       id: '',
                       keyword: '',             
                       page: '',
                       limit: ''
                }   
            });
            if(response.message){            
                const list= response.data.data;               
                for(let i=0; i< response.data.method.length; i++){
                   
                   if(response.data.method[i] === 'get'){
                       this.showBtn = true;            
                   }
                   if(response.data.method[i] === 'post'){
                       this.createBtn = true;            
                   }
                   if(response.data.method[i] == 'put'){
                       this.updateBtn = true;            
                   }
                   if(response.data.method[i] == 'delete'){
                       this.deleteBtn = true;       
                   }                                       
               }  
                this.data = list.map(v => ({...v, isSelected: false}));                            
                console.log('security check>>'+ JSON.stringify(this.data))
                this.pageCount = response.data.pagecount;
            }
          
        }
    }
    
}
</script>

<style lang="scss">
.icon__ellipsis {
    margin-top: 14px;
    margin-left: 10px;
   
    .ellipsis__icon:focus {
        outline: none;
    }
}
.footer__bar {
    position: fixed;
    border-top: 2px solid #eee;
    background: #fff;
    bottom: 0;
    width: 100%;
    height: 65px;
    .footer__btn {
        padding: 6px 15px;
        font-size: 12px;
        border-radius: 3px;
        border: 1px solid #ddd;
    }
}


.search_btn {
    padding: 10px 15px;
    font-size: 12px;
    border-radius: 3px;
    border: 1px solid #ddd;

}

.unarchive_color {
    background: rgba(80,165,241,.12);
    color: #50a5f1;
}

.pagination {
    .active {
        background: blue;
        color: #fff;
    }
}
.error_border {
    border-color: red !important;
}

@media only screen and (min-width: 1024px) {
 #dynamicLabelCreate > .modal-dialog , #dynamicLabelEdit > .modal-dialog {
    max-width: 800px !important;
 }
}
</style>