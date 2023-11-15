<template>  
     <div v-loading="loading" class="loading__div" v-if="loading"></div>   
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading"> 
        <div class="row">       
            <div class="col-md-8">
                <div class="row">
                        <div class="col-md-12 d-flex">                       
                            <el-input type="text" class="mr-2" v-model="formSearching" 
                                :placeholder="$t('enter_keyword')"  v-on:keyup.enter="searching()" clearable >
                                <template #prefix>
                                    <el-icon class="el-input__icon"><font-awesome-icon icon="fa-solid fa-search" /></el-icon>
                                </template>
                            </el-input>                         
                            <el-button @click="searching()" v-show="!showAdvanced" style="width: 200px;">{{ $t('search') }}</el-button>                                          
                        </div>                    
                </div>
            </div>
            <div class="col-md-4 mt-2">
            
                <div class=" mb-2" style="float: right;">
                    <router-link to="/team/create">
                    <button type="button" class="btn btn-sm btn-success">                     
                            <font-awesome-icon icon="fa-solid fa-plus" /> <span class="ml-1">{{ $t('add') }}</span>                                            
                    </button>
                    </router-link>
                </div>
                
            </div>
        </div>
        <div class="row mx-2">       
            <div class="card mb-2" v-for="items of data" :key="items.team_id" style="width: 100%;">               
                <div class="card-body team__card">
                 <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="team__name">
                                <el-avatar class="bg-success"> {{ items.team_name  }} </el-avatar> 
                                <h5>{{ items.team_name }}</h5>
                            </div>                           
                        </div>
                        <div class="col-md-6 d-flex justify-content-end">
                            <div class="team__right">
                                <h5>{{ items.team_member.length }} people </h5>
                                <span class="icon__ellipsis">
                                    <el-popover  popper-style="width: 100px !important;min-width: 100px !important;"
                                    placement="bottom">  
                                    <div class="container" >
                                        <div class="row mb-2" >
                                            <router-link :to="`/team/edit/${items.team_id}`">
                                            <font-awesome-icon icon="fa-solid fa-pencil" style=" margin-right: 5px !important; padding: 2px !important;color: #7d7d7d;" /> edit
                                            </router-link>    
                                        </div>
                                        <div class="row"  @click="deleteAll(items.team_id)" >
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
                 </div>
                </div>
            </div>
        </div> 
    </div>
    <div class="footer__bar">
        <div class="container-fluid mt-3">           
            <div class="row">
                <div class="col-sm-6">
                      <!-- <span>{{ $t('selected') }} {{ selectedCount }} {{ $t('strip') }}</span>
                      <button type="button" class="footer__btn ml-2 mr-2" @click="deleteAll()" :disabled="selectedCount == 0">{{ $t('delete') }}</button>                                        -->
                </div>
                <div class="col-sm-6">
                <el-pagination
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    :page-sizes="[20, 100, 200, 300]"
                    :small="small"
                    :disabled="disabled"
                    :background="background"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    />                    
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
    name: 'Team',
    data() {
        return {          
            formSearching: "" ,  
            data: [], 
            loading: false,
            selectedCount: 0,
            selectedData: [],
            //pagination
            background: false,
            disabled: false,
            small: false,
            pageSize: 20,   
            currentPage: 1,  
            total: 0,   
            //permission
            showBtn: false,
            createBtn: false,
            updateBtn: false,
            deleteBtn: false            
        }
    },   
    computed: {
        selectedCount(){
            return this.selectedData.length;
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
                api:  '/constructionmanagement/team',
                params: {
                       id: '',                       
                       keyword: this.formSearching,                                         
                       page: this.currentPage,
                       limit: this.pageSize,
                }   
                });
                if(response.message){   
                    this.data=[];            
                    this.data=  response.data.data;                 
                    this.total = response.data.total;
                    this.loading = false;
                }
            }
            else{               
                this.getData();
            }
        },      
       
        async getData(){ 
             this.data= [];   
                 
            let response = await authApi({
                method: 'GET',
                api: '/constructionmanagement/team',
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
               this.data= response.data.data;           
               // console.log('data'+ JSON.stringify(this.data));
                this.total = response.data.total;
            }
          
        },
         async deleteAll(id = null){         
            
            let list=[];            
            if(id != null && id != ""){
                list.push(id);             
            }          
          
            if(list.length > 0){
                let response = await authApi({
                method: 'DELETE',
                api: '/constructionmanagement/team',
                params: {
                       id: '',
                       keyword: '',                
                       page: "",
                       limit: ''
                                          
                },
                data: {
                    "id_list": list
                }    
                });
                if(response.message){                    
                    this.getData();
                    toast.success("Team Delete successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
                }                         
            }
        },
    }
    
}
</script>

<style lang="scss">

.team__card {
    padding: 0.25rem;
    .team__name {
        display: flex;
        h5 {
            font-size: 16px;
            margin-top: 10px;
            margin-left: 10px;
        }   
    }
    .team__right {
        display: flex;
        h5 {
            font-size: 14px;
            margin-top: 10px;
            margin-left: 10px;
        } 
        .icon__ellipsis {
            margin-top: 14px;
            margin-left: 10px;
           
            .ellipsis__icon:focus {
                outline: none;
            }
        }
        
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