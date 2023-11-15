<template>
    <div class="container-fluid"  @click="$store.commit('setActive', false)">  
           <form  @submit.prevent="createData"> 
                <div class="row">     
                    <div class="col-md-12">              
                        <div class="block-title mt-2">
                            <strong> {{ $t('basic_info') }} </strong>
                            <!-- <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter"> <span><font-awesome-icon icon="fa-solid fa-file-import"/></span> import </button> -->
                        </div>            
                        <hr>    
                                <ProjectName :titleHeader="titleHeader"  @projectData="getProjectName($event)"  />    
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
                                    <label for="budget_details">
                                        <span class="text-danger">*</span> <small><b>{{ $t('budget_details') }}</b></small>
                                    </label>
                                    <div class="row mx-2 mb-4">
                                        <el-table :data="FormData.budget_detail" border style="width: 100%;">
                                            <el-table-column  fixed type="index" width="55" />
                                            <el-table-column :label="$t('budget_name')" width="300px"> 
                                                <template #default="scope">
                                                <el-input type="text" :placeholder="$t('please_enter')" class="" v-model="scope.row.budget_name" clearable/>
                                                </template>
                                            </el-table-column>

                                            <el-table-column :label="$t('budget_type')" width="300px"> 
                                                <template #default="scope">
                                                    <el-select class="" style="width: 100%;" v-model="scope.row.budgettype" >                          
                                                            <el-option value="">{{ $t('please_choose') }}</el-option>
                                                            <el-option v-for="obj of budgetType" :key="obj.type_id" :label="obj.typename" :value="obj.type_id">{{ obj.typename }}</el-option>                          
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
                                    </div>
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
                                    <el-input id="remark" v-model="FormData.budget.remark" :placeholder="$t('please_enter')" maxlength="100" show-word-limit type="textarea" />
                                </div>

                                <Picture @picture="getPicture($event)" />
                                <Document @appendix="getDocument($event)" /> 
                                <!-- <el-timeline>
                                    <el-timeline-item>
                                    <Approver @approverUser="getApproverUser($event)" />
                                    </el-timeline-item>
                                    <el-timeline-item>
                                        <Cc @ccUser="getCcUser($event)" />
                                    </el-timeline-item>
                                </el-timeline>                    -->
                    
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
import ProjectName from '@/components/Share/ProjectName.vue';
import Picture from '@/components/Share/Picture.vue';
import Document from '@/components/Share/Document.vue';
import Approver from '@/components/Share/ApproverUser.vue';
import Cc from '@/components/Share/CcUser.vue';
export default {
    name: 'BudgetCreate',
    data() {
        return {
             submitting: false,
             data: [],
             budgetDetailCount: 1,
             project_name: "",
             FormData: {
                budget:{
                    remark: "",
                    picture: null,
                    appendix: null,
                    approver: [],
                    cc: [],
                    revision_status: "",
                    budget_version: "",
                    creation_time: "",
                    project_id: "",
                    project_name: "", 
                    created_by_user: "",
                    type_name: "",
                },
                project_id: "",
                budget_detail:[
                    {
                        id: 1,
                        project_budget: "",
                        budgettype: "",
                        budget_name: "",
                        budget_amount: "",
                        remark: ""
                    }
                ]               
            },           
            
            //
            pageCount: 1,
            pageCountActive: 1,
            selectedCount: 0,
            formSearching: "",
            budgetType: "",
            pictureImages: [] ,
            appendixImages: [],  
            showapprover: [],
            showcc: [],
            titleHeader: "Project Name",
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
          this.getCmsUser();
    },
    methods:{ 
        getProjectName(data) {   
         this.FormData.budget.project_id = data;        
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
        
        async getCmsUser(){            
            let response = await authApi({
                method: 'GET',
                api: '/cmsuser',                
            });
            if(response.status == 200){              
                const list= response.data.data;
                this.approver = list.map(v => ({...v, isSelected: false}));    
                this.cc = list.map(v => ({...v, isSelected: false}));  
            }
        }, 
        copyBudgetDetail(index) {
            this.budgetDetailCount = this.budgetDetailCount +1;
            let id= this.budgetDetailCount;
            let detail= {
                        id: id,
                        project_budget: this.FormData.budget_detail.find(x=>x.id == index).project_budget,
                        budgettype: this.FormData.budget_detail.find(x=>x.id == index).budgettype,
                        budget_name: this.FormData.budget_detail.find(x=>x.id == index).budget_name,
                        budget_amount: this.FormData.budget_detail.find(x=>x.id == index).budget_amount,
                        remark: this.FormData.budget_detail.find(x=>x.id == index).remark,
            }          
            this.FormData.budget_detail.splice(index, 0, detail); 
            //console.log(JSON.stringify(this.FormData.budget_detail))
        },
        addBudgetDetail() {
            this.budgetDetailCount = this.budgetDetailCount +1;
            let id= this.budgetDetailCount;
            let detail= {
                        id: id,
                        project_budget: "",
                        budgettype: "",
                        budget_name: "",
                        budget_amount: "",
                        remark: ""
                    }
            this.FormData.budget_detail.push(detail);
            //console.log(JSON.stringify(this.FormData.budget_detail))
        },
        deleteBudgetDetail(id){
          this.FormData.budget_detail =this.FormData.budget_detail.filter(x=> x.id != id);
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

        async createData(e){           
            this.submitting= true; 
            this.showapprover.forEach((value) => {
                this.FormData.budget.approver.push(value.userid);                
            }); 
            this.showcc.forEach((value) => {
                this.FormData.budget.cc.push(value.userid); 
            }); 
            
            let response = await authApi({
                method: 'POST',
                api: '/projectmanagement/projectbudget',
                data: this.FormData 
            });
            if(response.status == 201){                
                //console.log(response.data.project_budget_id);
                const id = response.data.project_budget_id; 
                const imgformData = new FormData();
                imgformData.append('project_budget_id',id);
                this.pictureImages.forEach((value) => {
                     imgformData.append('picture', value.url);   
                });
                this.appendixImages.forEach((value) => {
                    imgformData.append('appendix', value.url);  
                });                 
                let imgResponse = await authApi({
                method: 'POST',
                api: '/projectmanagement/budget_datafiles',               
                data: imgformData
                });
                if(imgResponse.status == 200){
                    this.submitting = false;
                    e.target.reset();
                    toast.success("Budget insert successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
                    this.$router.back();              

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
 .date-input{
     width: 200px;
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