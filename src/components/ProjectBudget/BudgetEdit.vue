<template>
    <div v-loading="loading" class="loading__div" v-if="loading"></div> 
    <div class="container-fluid" @click="$store.commit('setActive', false)" v-if="!loading">  
           <form  @submit.prevent="updateData"> 
     <div class="row">
     
         <div class="col-md-12">              
            <div class="block-title mt-2">
                <strong> {{ $t('basic_info') }} </strong>
                <!-- <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter"> <span><font-awesome-icon icon="fa-solid fa-file-import"/></span> import</button> -->
            </div>            
            <hr>    
                     <!-- <ProjectName :oldProjectId="oldProjectId" @projectData="getProjectName($event)"  />  -->
                     <div class="form-group mb-3">
                         <label for="project_name">
                             <span class="text-danger">*</span> <small><b>{{ $t('project_name') }}</b></small> 
                         </label>
                         
                         <el-input type="text" :placeholder="$t('please_enter')" id="project_name" v-model="FormData.project_name" clearable/>
                     </div>
                     <div class="form-group mb-3">
                         <label for="odd_number">
                            <small><b>{{ $t('budget_subitem') }}</b></small>
                         </label>
                         <div class="budget-box">
                            <div class="b-box mr-2">
                                <p class="text-secondary"> <b> {{ $t('total_labor_budget') }} </b></p>
                                <p> {{ $t ('summarized_budget_details') }} </p>
                            </div>
                            <div class="b-box mr-2">
                                <p class="text-secondary"> <b> {{ $t('total_material_budget') }} </b></p>
                                <p> {{ $t ('summarized_budget_details') }} </p>
                            </div>
                            <div class="b-box mr-2">
                                <p class="text-secondary"> <b> {{ $t('total_equipment_budget') }} </b></p>
                                <p> {{ $t ('summarized_budget_details') }} </p>
                            </div>
                            <div class="b-box mr-2">
                                <p class="text-secondary"> <b> {{ $t('total_cost_budget') }} </b></p>
                                <p> {{ $t ('summarized_budget_details') }} </p>
                            </div>
                            <div class="b-box mr-2">
                                <p class="text-secondary"> <b> {{ $t('subcontract_total_budget') }} </b></p>
                                <p> {{ $t ('summarized_budget_details') }} </p>
                            </div>
                            <div class="b-box mr-2 mt-2">
                                <p class="text-secondary"> <b> {{ $t('other_total_budget') }} </b></p>
                                <p> {{ $t ('summarized_budget_details') }} </p>
                            </div>
                         </div>
                     </div>

                     <div class="form-group mb-3">
                         <!-- <label for="budget_details">
                             <span class="text-danger">*</span> <small><b>{{ $t('budget_details') }}</b></small>
                         </label> -->
                         
                         <!-- <table class="table table-hover mt-3 table_main_box" cellspacing="0" cellpadding="0">
                            <thead>
                            <tr>
                                <th scope="col" rowspan="1" colspan="1" class="table-box"></th>
                                <th scope="col" rowspan="1" colspan="1" class="table-box"><span class="text-danger">*</span> {{ $t('budget_name') }} </th>
                                <th scope="col" rowspan="1" colspan="1" class="table-box"><span class="text-danger">*</span> {{ $t('budget_type') }} </th>
                                <th scope="col" rowspan="1" colspan="1" class="table-box"><span class="text-danger">*</span> {{ $t('budget_amount') }} </th>
                                <th scope="col" rowspan="1" colspan="1" class="table-box">{{ $t('remark') }}</th>
                                <th scope="col" rowspan="1" colspan="1" class="table-box">{{ $t('operate') }}</th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr v-for="(detail,index) in budgetDetail" :key=index>
                                <td>{{ index+1 }}</td>
                                <td>
                                    <el-input type="text" :placeholder="$t('please_enter')" class="" v-model="detail.budget_name" clearable/>
                                </td>
                                
                                <td>
                                    <el-select class="" v-model="detail.budgettype">                          
                                            <el-option value="">{{ $t('please_choose') }}</el-option>
                                            <el-option v-for="obj of budgetType" :key="obj.type_id" :value="obj.type_id">{{ obj.typename }}</el-option>                          
                                    </el-select>                   
                                </td>
                                <td><el-input type="text" :placeholder="$t('please_enter')" class="" v-model="detail.budget_amount" clearable/></td>
                                <td><el-input type="text" :placeholder="$t('please_enter')" class="" v-model="detail.remark" clearable/></td>
                                <td>
                                    <small class="mr-2 text-primary" @click="copyBudgetDetail(detail.id)">{{ $t('copy') }}</small> 
                                    <small class="text-danger" @click="deleteBudgetDetail(detail.id)">{{ $t('delete') }}</small> 
                                </td>
                            </tr>

                            </tbody>
                        </table> -->

                        <!-- start  -->

                        <!-- <div class="row mx-2 mb-4">
                            <el-table :data="budgetDetail" border style="width: 100%;">
                                <el-table-column fixed type="index" width="55" />

                                <el-table-column :label="$t('budget_name')" width="300px">
                                    <template #default="scope">
                                        <el-input type="text" :placeholder="$t('please_enter')" class="" v-model="scope.row.budget_name" clearable/>
                                    </template>
                                </el-table-column>

                                <el-table-column :label="$t('budget_type')" width="300px">
                                    <template #default="scope">
                                        <el-select style="width: 100%;" class="" v-model="scope.row.budgettype">                          
                                                <el-option value="">{{ $t('please_choose') }}</el-option>
                                                <el-option v-for="obj of budgetType" :key="obj.type_id" :value="obj.type_id">{{ obj.typename }}</el-option>                          
                                        </el-select>
                                    </template>
                                </el-table-column>

                                <el-table-column :label="$t('budget_amount')" width="300px">
                                    <template #default="scope">
                                        <el-input type="number" :placeholder="$t('please_enter')" class="" v-model="scope.row.budget_amount" clearable/>
                                    </template>
                                </el-table-column>

                                <el-table-column :label="$t('remark')" width="400px">
                                    <template #default="scope">
                                        <el-input type="textarea" :placeholder="$t('please_enter')" id="remark"
                                        v-model="scope.row.remark" maxlength="1024" autosize show-word-limit  /> 
                                    </template>
                                </el-table-column>

                                <el-table-column  fixed="right" :label="$t('operate')" width="100px">

                                    <template #default="scope">
                                        <small class="mr-2 text-primary" @click="copyBudgetDetail(scope.row.id)">{{ $t('copy') }}</small> 
                                        <small class="text-danger" @click="deleteBudgetDetail(scope.row.id)">{{ $t('delete') }}</small> 
                                    </template>

                                </el-table-column>
                            </el-table>
                        </div> -->

                        <div class="row mx-2">
                        <label for="budget_details">
                           <small><b>{{ $t('budget_details') }}</b></small>
                         </label>     
                            <el-table :data="budgetDetail" border>
                                <el-table-column fixed type="index" width="55" />
                                <el-table-column :label="$t('budget_name')" width="300px">
                                    <template #default="scope">
                                      <!-- {{ scope.row.budget_name }} -->
                                      <el-input type="text" :placeholder="$t('please_enter')" class="" v-model="scope.row.budget_name" clearable/>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('budget_type')" width="300px">
                                    <template #default="scope">
                                        <!-- <span>{{ scope.row.budgettype }}</span> -->
                                        <el-select style="width: 100%;" class="" v-model="scope.row.budgettype">                          
                                                <el-option value="">{{ $t('please_choose') }}</el-option>
                                                <el-option v-for="obj of budgetType" :key="obj.type_id" :value="obj.type_id">{{ obj.typename }}</el-option>                          
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('budget_amount')" width="300px">
                                    <template #default="scope">
                                        <!-- {{ scope.row.budget_amount }} -->
                                        <el-input type="number" :placeholder="$t('please_enter')" class="" v-model="scope.row.budget_amount" clearable/>

                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('remark')" width="400px">
                                    <template #default="scope">
                                      <!-- {{ scope.row.remark }} -->
                                      <el-input type="textarea" :placeholder="$t('please_enter')" id="remark"
                                        v-model="scope.row.remark" maxlength="1024" autosize show-word-limit  />
                                    </template>
                                </el-table-column>
                                <el-table-column  fixed="right" :label="$t('operate')" width="100px">
                                    <template #default="scope">
                                        <small class="mr-2 text-primary" @click="addBudgetDetail(scope.row.id)">{{ $t('copy') }}</small> 
                                        <small class="text-danger" @click="deleteBudgetDetail(scope.row.id)">{{ $t('delete') }}</small> 
                                    </template>
                                </el-table-column>
                            </el-table>
            </div> 

                        <!-- end  -->

                        <div class="row">
                                <small class="mt-2 ml-3 mr-3">{{ $t('total') }} 0</small>
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        <li class="page-item">
                                            <a class="page-link" href="#" aria-label="Previous">
                                                <span aria-hidden="true">&laquo;</span>
                                                <span class="sr-only">Previous</span>
                                            </a>
                                        </li>
                                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                                        <li class="page-item">
                                        <a class="page-link" href="#" aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                            <span class="sr-only">Next</span>
                                        </a>
                                        </li>
                                    </ul>
                                </nav>
                                <div class="mr-3 ml-2 row">
                                    <small class="pt-1 mr-2 mt-1">{{ $t('go_to') }}</small>
                                    <input type="text" class="form-control footer-input" value="1">
                                    <small class="pt-1 ml-2 mt-1">{{ $t('page') }}</small>
                                </div>
                        </div>
                        <div class="box-footer" @click="addBudgetDetail">
                            <font-awesome-icon icon="fa-solid fa-circle-plus" style="color:cornflowerblue;" /> <span class="text-primary">{{ $t('add_to') }}</span>
                        </div>
                     </div>
                     <div class="form-group mb-3">
                         <label for="remark">
                            <small><b>{{ $t('remark') }}</b></small>
                         </label>
                        <el-input id="remark" v-model="FormData.remark" maxlength="100" :placeholder="$t('please_enter')" show-word-limit type="textarea"/>
                     </div> 
                     
                     <!-- <div class="row"> 
                <label >
                        <small class="text-muted ml-2"><b>{{ $t('picture') }}</b></small>
                </label>                     
                <div class="col-12">                 
                    <span v-for="(items, i) in FormData.picture.images" :key="i"  class="mx-2">
                    <el-image
                    style="width: 80px; height: 80px; border-radius: 10px;"
                    :src="items.url"
                    :zoom-rate="1.2"
                    :preview-src-list="[items.url]"
                    :initial-index="4"
                    fit="cover"
                    />
                    </span>
                </div>  
            </div> -->

            <Picture :oldpictureImages="oldpictureImages" @picture="getPicture($event)" />
            <Document :oldappendixImages="oldappendixImages" @appendix="getDocument($event)" /> 
                     
                     <!-- <el-timeline>
                         <el-timeline-item>
                         <Approver :oldapprover="oldApprover"  @approverUser="getApproverUser($event)" />
                         </el-timeline-item>
                         <el-timeline-item>
                             <Cc  :oldcc="oldCc" @ccUser="getCcUser($event)" />
                         </el-timeline-item>
                     </el-timeline> -->

 
           
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
import $ from 'jquery';
import ProjectName from '@/components/Share/ProjectName.vue';
import Picture from '@/components/Share/Picture.vue';
import Document from '@/components/Share/Document.vue';
import Approver from '@/components/Share/ApproverUser.vue';
import Cc from '@/components/Share/CcUser.vue';
export default {
    name: 'BudgetEdit',
    data() {
        return {
             submitting: false,
             loading: false, // true 
             data: [],
             budgetDetailCount: 1,
            //  project_id: "",
             FormData: { },           
            // budgetDetail: [],           
            
            //
            pageCount: 1,
            pageCountActive: 1,
            selectedCount: 0,
            formSearching: "",
            budgetType: "",
            oldProjectId: "",      
            pictureImages: [] ,
            appendixImages: [],  
            showapprover: [],
            showcc: [],
            oldApprover: [],  
            oldCc: [],
            oldpictureImages: [],
            oldappendixImages: [],
            budgetDetail: [],   
            budgetDetailCount: 0,
            FormBudgetDetail: {
                project_budget_id: "",
                budget_list: [],
                addbudget_list: []
            }
        }
    },
    components: {
      ProjectName, 
      Picture,
      Document,
      Approver,
      Cc    
    },
    created(){ 
          this.getBudgetType();
          this.getData();
          this.getBugetDetail();  
    },
    methods:{ 
        getProjectName(data) {   
         this.FormData.project_id = data;        
        },        
        getPicture(data){
         this.pictureImages = data;
        },
        getDocument(data){
            this.appendixImages = data;          
        },
        getApproverUser(data){
          this.showapprover = data;
        },
        getCcUser(data){
          this.showcc = data;
        },  
        // getApproverUser(data){
        //   this.showapprover = data;
        // },
        // getCcUser(data){
        //   this.showcc = data;
        // },
        //  async getBugetDetail(){
        //     let response = await authApi({
        //         method: 'GET',
        //         api: '/projectmanagement/budgetdetail',
        //         params: {
        //                project_budget: this.$route.params.id,
                     
        //         }   
        //     });
        //     if(response.status == 200){
        //        // console.log('bankdd'+ JSON.stringify(response.data))
        //         const list1= response.data;
        //          this.budgetDetail= list1.map((v,index) => (
        //              {...v, id: index}
        //             ));
        //         this.budgetDetailCount = this.budgetDetailCount.length;
        //         this.loading= true; //false
   
        //     }
        // },

        

        // checkOne(id){             
        //     for(let i=0; i<this.projectData.length; i++){
        //         if(id == this.projectData[i].project_id){
        //             this.projectData[i].isSelected=true;
        //         }
        //         else{
        //             this.projectData[i].isSelected=false;
        //         }
        //     }        
          
        // },

        // async getData(){   
        //     this.loading= true;      
        //     let response = await authApi({
        //         method: 'POST',
        //         api: '/projectmanagement/getprojectbudget',
        //         params: {
        //                id: this.$route.params.id,
        //                keyword: '',
        //                status: '',                       
        //                page: '',
        //                limit: ''
        //         },
        //         data: {
        //             view: false,
        //         }   
        //     });
        //     if(response.message){            
        //         this.FormData = response.data.data; 
        //         //console.log('list'+ JSON.stringify(response.data.data));
        //         this.getBugetDetail();
                      
        //     }          
        // }, 
        
        async getData(){ 
            this.loading = true;          
            let response = await authApi({
                method: 'POST',
                api: '/projectmanagement/getprojectbudget',
                params: {
                       id: this.$route.params.id,
                       keyword: '',
                       status: '',                       
                       page: '',
                       limit: ''
                },
                data: {
                    view: false,
                }   
            });
            if(response.message){            
                this.FormData = response.data.data; 
                this.oldProjectId = this.FormData.project_id; 
                this.oldPickerId = this.FormData.picker;                 
                this.oldApprover = this.FormData.approver;  
                this.oldCc = this.FormData.cc;   
               
                if(response.data.data.picture != null){
                    const list= response.data.data.picture.images;
                    this.oldpictureImages = list.map(v => ({...v, isSelected: true}));
                }
                if(response.data.data.appendix != null){
                    const list1= response.data.data.appendix.documents;
                    this.oldappendixImages = list1.map(v => ({...v, isSelected: true}));    
                }
                this.loading =false;          
            }          
        },   
             // const list= response.data.data.picture.images;
                // this.oldpictureImages = list.map(v => ({...v, isSelected: true}));
                // const list1= response.data.data.appendix.documents;
                // this.oldappendixImages = list1.map(v => ({...v, isSelected: true}));           
        addBudgetDetail() {
            this.budgetDetailCount = this.budgetDetailCount +1;
            let id= this.budgetDetailCount;
            let detail= {
                        id: id,
                        budget_detail_id: null,
                        project_budget_id: this.$route.params.id, 
                        // project_budget: "",
                        budgettype: "",
                        budget_name: "",
                        budget_amount: "",
                        remark: ""
                    }
            this.budgetDetail.push(detail);           
            //console.log(JSON.stringify(this.FormData.budget_detail))
        },
        deleteBudgetDetail(id){
          this.budgetDetail =this.budgetDetail.filter(x=> x.id != id);
        },
        async getBudgetType(){
        let response = await authApi({
                method: 'GET',
                api: '/projectmanagement/budgettype',
                params: {                       
                      name: ""
                }   
        });
        this.budgetType = response.data;       
        },

        async getBugetDetail(){
            let response = await authApi({
                method: 'GET',
                api: '/projectmanagement/budgetdetail',
                params: {
                        // project_budget_id  
                    project_budget_id: this.$route.params.id,
                    view: 0,                 
                },
                data: {
                    
                }
                 
            });
            if(response.status == 200){
               //console.log('bankdd'+ JSON.stringify(response.data.data))               
                this.budgetDetail= response.data.data;
                this.loading= false;
   
            }
        },
        checkOne(id){             
            for(let i=0; i<this.projectData.length; i++){
                if(id == this.projectData[i].project_id){
                    this.projectData[i].isSelected=true;
                }
                else{
                    this.projectData[i].isSelected=false;
                }
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
        async updateData(e){ 
            this.submitting= true;    
             this.FormData.approver= []; 
                this.showapprover.forEach((value) => {
                this.FormData.approver.push(value.userid);                
                }); 
                this.FormData.cc= [];
                this.showcc.forEach((value) => {
                    this.FormData.cc.push(value.userid); 
                });
            let response = await authApi({
                method: 'PUT',
                api: '/projectmanagement/projectbudget',
                data: this.FormData 
            });
            if(response.status == 200){    
                const id = this.$route.params.id;
                 let formData = new FormData();
                 formData.append('project_budget_id',id);
                 this.pictureImages.forEach((value) => {
                    if(value.image_id != null){
                        formData.append('imglist',value.image_id);                        
                    }
                    else{
                        formData.append('addimglist', value.url);  
                    }                   
                });
                this.appendixImages.forEach((value) => {
                    if(value.file_id != null){
                        formData.append('filelist',value.file_id);
                    }
                    else{
                        formData.append('addfilelist', value.url);  
                    }                    
                }); 
                 let imgResponse = await authApi({
                 method: 'PUT',
                 api: '/projectmanagement/budget_datafiles',               
                 data: formData
                 });
                if(imgResponse.status == 200){
                    this.FormBudgetDetail.project_budget_id= this.$route.params.id;
                    
                         this.budgetDetail.forEach((value)=>{
                            if(value.budget_detail_id == null){
                                let newdata={
                                    budget_name: value.budget_name,
                                    budget_amount: value.budget_amount,
                                    remark: value.remark,
                                    project_budget_id:  this.$route.params.id,
                                    budgettype: value.budgettype,
                                    }
                                  this.FormBudgetDetail.addbudget_list.push(newdata);
                            }
                            else{
                                this.FormBudgetDetail.budget_list.push(value);
                            }
                         }); 
                        let detailResponse = await authApi({
                        method: 'POST',
                        api: '/projectmanagement/budgetdetail',               
                        data: this.FormBudgetDetail
                        });
                        if(detailResponse.status == 200){    
                            this.submitting = false;                       
                            toast.success("Budget Update successful !", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 3000,
                            });
                            this.getData();
                            this.$router.back(); 
                        }
                        
                }                
            }
        },
        
    }
    
}
</script>

 <style lang="scss" scoped>
.pagination {
    .active {
        background: blue;
        color: #fff;
    }
}
 a{
     text-decoration: none;
 }
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
 .table-box{
        box-sizing: border-box;
        border: 1px solid #ebeef5;
        border-right: none;
        border-bottom: none;
        vertical-align: inherit;
        font-size: 14px;
    }
    thead{
        background-color:#F6F7FB;
    }
    tfoot{
        background-color:#F6F7FB;
    }
    .table_main_box{
        width: 100%;
        border-left: 1px solid gainsboro;
        border-right: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
    }
    .footer-input{
        width: 40px;
    }
    .block-title{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: space-between;
    flex-direction: row;
  }
  .block-title strong{
    flex-grow: 1;
  }
  .budget-box{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: space-around;
  }
  .b-box{
    background-color: #F9F9FA;
    padding: 10px;
  }
  .box-footer{
    border: 1px solid #d5def0;
    border-radius: 5px;
    width: 100%;
    padding: 7px;
    text-align: center;
    cursor: pointer;
  }
  .box-footer:hover{
    background-color: #EDF3FE;
  }
 </style>