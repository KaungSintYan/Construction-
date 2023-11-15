<template>  
    <div v-loading="loading" class="loading__div" v-if="loading"></div>   
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading"> 
        <div class="row">
         <Searching :api="apiName" :advanced="advanced" :createBtn="createBtn" :routeName="routeName" :classApi="classApi"
                @searchingData="getSearchingData($event)" />  
        </div>   
        <div class="row mx-2">           
            <el-table :data="data" border style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column  fixed type="selection" width="55" />          
                <el-table-column prop="client_name" :label="$t('client_name')" width="250" sortable />
                <el-table-column prop="classification" :label="$t('classification')" width="250" />         
                <el-table-column prop="contact_person" :label="$t('contact_person')" width="250" />         
                <el-table-column prop="contact_number" :label="$t('contact_number')" width="250" />         
                <el-table-column :label="$t('state')" width="500" > 
                    <template #default="scope">
                        <span v-if="scope.row.status">Archived</span>
                        <span v-if="!scope.row.status">Unarchived</span>
                    </template>
                </el-table-column>         
                <el-table-column fixed="right" :label="$t('operate')"  width="300" >
                    <template #default="scope">
                        <router-link :to="`/client/edit/${scope.row.clientid}`" v-show="updateBtn">
                            <el-button type="button" class="btn btn-sm btn-primary mr-2">
                            <font-awesome-icon icon="fa-solid fa-pencil-square" /> <span class="ml-2">{{ $t('edit') }}</span>
                            </el-button>
                        </router-link>                  
                        <el-button type="button" class="btn btn-sm btn-danger mr-2" @click="deleteAll(scope.row.clientid)" v-show="deleteBtn"> <!-- && scope.row.editable -->
                            <font-awesome-icon icon="fa-solid fa-trash" /> <span class="ml-2">{{ $t('delete') }}</span>
                        </el-button>
                        <el-button type="button" class="btn btn-sm btn-success " @click="archive(scope.row)" v-show="updateBtn">
                            <font-awesome-icon icon="fa-solid fa-file-archive" /> <span class="ml-2">{{ $t('archive') }}</span>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table> 

            <!-- end -->

        </div> 
    </div>
    <div class="footer__bar">
        <div class="container-fluid mt-3">           
            <div class="row">
                <div class="col-sm-6">
                      <span>{{ $t('selected') }} {{ selectedCount }} {{ $t('strip') }}</span>
                      <button type="button" class="footer__btn ml-2 mr-2" @click="deleteAll()" :disabled="selectedCount == 0">{{ $t('delete') }}</button>                                       
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
import Searching from '@/components/Share/Searching.vue';
export default {
    name: 'Client',
    data() {
        return {
            //searching
            apiName: "/getclient",
            advanced: true,            
            classApi: "/clientclassification",
            routeName: "/client/",
            //endsearching

            checkall: true,
            pageCount: 1,
            pageCountActive: 1,
            selectedCount: 0,
            loading: false,
            data: [],  
            formData: {
                name: ''
            },       
            errorMessage: false,
            formSearching: "" ,
            editFormData: "",

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
    components: {
        Searching,
    }, 
    computed: {
        selectedCount(){
            return this.selectedData.length;
        }
    },
    created(){        
        this.getData()
    },
    methods:{

        getSearchingData(data){
        this.data = [];
        this.data = data.data;
        this.pageCount = data.page;
       },     
        async archive(items){ 
            let archive="";
            archive = !items.status;       
            let response = await authApi({
                method: 'PUT',
                api: '/client',
                params: {
                       status: '',
                       name: '',
                       page: '',
                       limit: ''
                },
                data: {
                    clientid: items.clientid,                                   
                    status: archive
                }
            });
            if(response.status == 200){             
                toast.success("Archive successful!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
               this.getData();
            }
        }, 
        async searching(){ 
            if(this.formSearching != ""){
                let response = await authApi({
                method: 'GET',
                api: '/client',
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
        async deleteAll(id = null){         
            
            let list=[];            
            if(id != null && id != ""){
                list.push(id);             
            }
            else{
                for(let i=0; i< this.selectedData.length; i++){
                     list.push(this.selectedData[i].clientid); 
                }
            } 
          
            if(list.length > 0){
                let response = await authApi({
                method: 'DELETE',
                api: '/client',
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
                    this.getData();
                    toast.success("client Delete successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
                }                         
            }
        },
      
        async getData(){ 
            this.data= [];   
            this.loading= true;                 
            let response = await authApi({
                method: 'POST',
                api: '/getclient',
                params: {
                       id: '',
                       keyword: '',
                       page: this.currentPage,
                       limit: this.pageSize,
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
                this.data= list; 
                //console.log('data'+ JSON.stringify(this.data));
                this.total = response.data.total;
                this.loading = false;
            }
          
        },
        handleSelectionChange(val){
            this.selectedData = val;
        },
        handleSizeChange(val){
           this.pageSize = val;
           this.getData();
        },
        handleCurrentChange(val){
           this.currentPage =val;
           this.getData();
        }  
    }
    
}
</script>
<style lang="scss">
section#content {
    height: 82vh !important;
}
.search_btn {
    padding: 10px 15px;
    font-size: 12px;
    border-radius: 3px;
    border: 1px solid #ddd;
}
</style>