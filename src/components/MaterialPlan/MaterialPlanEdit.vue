<template>
    <div v-loading="loading" class="loading__div" v-if="loading"></div> 
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading">  
    <form  @submit.prevent="updateData">     
        <div class="row">
            <div class="col-md-12">                 
                <div class="block-title mt-2">
                    <strong> {{ $t('basic_info') }} </strong>
                    <button class="btn btn-primary"> <span><font-awesome-icon icon="fa-solid fa-file-import"/></span> Import</button>
                </div>
                <hr>
                <ProjectName :oldProjectId="oldProjectId" @projectData="getProjectName($event)"  />
                        <div class="form-group mb-2 mt-3">
                            <label for="title">
                                <small><b>{{ $t('title_bd') }}</b></small>
                            </label>
                            <el-input type="text" class="" id="title" :placeholder="$t('please_enter')" v-model="FormData.title" clearable/>
                        </div> 

                        <div class="col-md-3 m-0 p-0">
                            <div class="form-group mb-3">
                                <label for="complilation_date"> 
                                    <span class="text-danger">*</span><small><b>{{ $t('complilation_date') }}</b></small>     
                                </label>
                                <el-date-picker :placeholder="$t('pick_a_day')" type="date" class="" id="complilation_date" style="width: 100%;" v-model="FormData.application_date" clearable/>
                            </div>
                        </div>
                        
                        <div class="form-group mb-3">
                            <label for="">
                                <small><b>{{ $t('plan_details') }}</b></small>
                            </label>
                            <div class="row mx-2 mb-4">
                                <el-table :data="detail" border style="width: 100%;">
                                    <el-table-column  fixed type="index" width="55" />
                                    <el-table-column :label="$t('material_name')"> 
                                        <template #default="scope">
                                            <el-input type="text" :placeholder="$t('please_enter')" class="" v-model="scope.row.material_name" clearable/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('classification')"> 
                                        <template #default="scope">
                                            <el-input type="text" :placeholder="$t('please_enter')" class="" v-model="scope.row.material_classification" clearable/> 
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('num_of_plants')"> 
                                        <template #default="scope">
                                            <el-input type="number" :placeholder="$t('please_enter')" class="" v-model="scope.row.quantity" clearable/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('unit')"> 
                                        <template #default="scope">
                                            <el-input type="text" :placeholder="$t('please_enter')" class="" v-model="scope.row.material_unit" clearable/> 
                                        </template>
                                    </el-table-column>

                                    <!-- <el-table-column :label="$t('plan_unit_price')"> 
                                        <template #default="scope">
                                            <el-input type="number" :placeholder="$t('please_enter')" class="" v-model="scope.row.price_per_unit" clearable/> 
                                        </template>
                                    </el-table-column> -->

                                    <el-table-column :label="$t('remark')" width="200px"> 
                                        <template #default="scope">
                                            <el-input type="textarea" :placeholder="$t('please_enter')" id="remark"
                                             v-model="scope.row.remark" maxlength="500" autosize show-word-limit  /> 
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('operate')">

                                        <template #default="scope">
                                            <small class="text-danger" @click="deleteMaterial(scope.row.material_id)"> {{ $t('delete') }} </small> 
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

                                <div class="box-footer" @click="dialogVisible = true" >
                                    <font-awesome-icon icon="fa-solid fa-circle-plus" style="color:cornflowerblue;" />
                                     <span class="text-primary"> {{ $t('select_material') }} </span>
                                </div>                               
                        </div>

                        <div class="form-group mb-3">
                            <label for="remark">
                                <small><b>{{ $t('remark') }}</b></small>
                            </label>
                            <el-input type="textarea" :placeholder="$t('please_enter')" id="remark" v-model="FormData.remark" maxlength="100" show-word-limit/>

                        </div>

                            <Picture :oldpictureImages="oldpictureImages" @picture="getPicture($event)" />
                            <Document :oldappendixImages="oldappendixImages" @appendix="getDocument($event)" /> 
                            <el-timeline>
                                <el-timeline-item>
                                    <Approver :oldapprover="oldApprover"  @approverUser="getApproverUser($event)" />
                                </el-timeline-item>
                                <el-timeline-item>
                                    <Cc :oldcc="oldCc" @ccUser="getCcUser($event)" />
                                </el-timeline-item>
                            </el-timeline>
    
            </div>
        </div>
        <div class="footer-main pt-2 pl-3">
            <el-button type="primary" loading v-if="submitting">Submiting ...</el-button>     
            <button type="submit" class="btn btn-primary btn-footer" v-if="!submitting"> {{ $t('submit') }} </button>
        </div>  
    </form>
    </div>
 
    <el-dialog v-model="dialogVisible" :title="titleHeader" width="60%" draggable>
        <div class="container-fluid">
            <div class="row mx-2 mb-4">
                <el-table ref="multipleTableRef" :data="material" border style="width: 100%;"  @selection-change="handleSelectionChange">
                    <el-table-column  fixed type="selection" width="55" />     
                    <el-table-column prop="material_inventory_name" sortable  :label="$t('material_name')" width="200" />
                    <el-table-column prop="specification" :label="$t('specification')" sortable width="160"/>
                    <el-table-column prop="brand" :label="$t('brand')" width="100" sortable/>
                    <el-table-column prop="classification" :label="$t('material_classification')" width="200" sortable/>
                    <el-table-column prop="measure_unit" :label="$t('unit_of_measurement')" width="200" sortable/>
                    <el-table-column prop="otherproperty" :label="$t('other_prices')"  width="200"  sortable/>      
                </el-table>
            </div>
            <div class="row">                    
                <div class="col-sm-12 d-flex justify-content-end">
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
        <template #footer>
          <span class="dialog-footer">            
            <el-button @click="dialogVisible = false">{{ $t('cancel') }}</el-button>
            <el-button type="primary" @click="addMaterial" >{{ $t('sure') }}</el-button>           
          </span>
        </template>
    </el-dialog>  
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
    name: 'MaterialPlanEdit',
    data() {
        return {
             submitting: false,
             loading: true,
             FormData: {},
             oldProjectId: "",
             pictureImages: [] ,
             appendixImages: [], 
             showapprover: [],
             showcc: [],
             oldApprover: [],  
             oldCc: [],
             oldpictureImages: [],
             oldappendixImages: [],
             detailCount: 1,
             detail: [],
             material: [],             
            FormPlanDetail: {
                material_plan_id: "",
                current_list: [],
                add_list: []
            },

            selectedMaterial: [],
            dialogVisible: false,
            //pagination
            background: false,
            disabled: false,
            small: false,
            pageSize: 20,   
            currentPage: 1,  
            total: 0,       
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
       
        this.getData();   
        this.getDetail(); 
        this.getMaterial();     
    },
    methods: {
        handleSelectionChange(val){     
          
            this.selectedMaterial = val;
        },
        handleSizeChange(val){
           this.pageSize = val;
           this.getMaterial();
        },
        handleCurrentChange(val){
           this.currentPage =val;
           this.getMaterial();
        },  
        getProjectName(data) {   
         this.FormData.plan.project_id = data;        
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
        async getDetail(){
            let response = await authApi({
                method: 'GET',
                api: '/materialmanagement/material_plandetail',
                params: {
                    material_plan_id: this.$route.params.id,   
                    view: 0,                    
                }   
            });
            if(response.status == 200){                 
                const list1= response.data.data;
                this.detail= list1.map((v,index) =>( 
                    {...v,
                        material_name: "",
                        material_classification: "",
                        material_unit: ""
                    }
                ));
            }
        },
        async getData(){         
            let response = await authApi({
                method: 'POST',
                api: '/materialmanagement/get_material_plan',
                params: {
                       id: this.$route.params.id,
                       keyword: '',             
                       page: '',
                       limit: ''
                },
                data: {
                    view: false,
                }
            });
            if(response.status == 200){            
                this.FormData = response.data.data;                                      
                this.oldProjectId = this.FormData.project_id;    
                this.oldApprover = this.FormData.approver;  
                this.oldCc = this.FormData.cc; 
                if(response.data.data.picture != null && response.data.data.picture != undefined){
                    const list= response.data.data.picture.images;
                    this.oldpictureImages = list.map(v => ({...v, isSelected: true}));
                }
                if(response.data.data.appendix !=null && response.data.data.appendix != undefined){
                    const list1= response.data.data.appendix.documents;
                    this.oldappendixImages = list1.map(v => ({...v, isSelected: true}));
                } 
            }
          
        },
        async getMaterial(){
        let response = await authApi({
                method: 'POST',
                api: '/getinventory',
                params: {
                       id: '',
                       keyword: '',             
                       page: '',
                       limit: ''
                }  
        });       
        this.material = response.data.data;
        this.total = response.data.total;    
        for(let i=0; i<this.material.length; i++){
            let detail= this.detail.find(x=>x.material_id == this.material[i].inventoryid)
            if(detail){
                detail.material_name= this.material[i].material_inventory_name;
                detail.material_classification = this.material[i].classification;
                detail.material_unit= this.material[i].measure_unit;
            }
        }
        this.loading = false;      
       },
      
       addMaterial() { 
     
            this.selectedMaterial.forEach((val, index)=>{
                    let detail= {  
                        plan_detail_id: null,                    
                        quantity: "",
                        price_per_unit: "",
                        plan_amount: "",
                        remark: "",
                        otherproperties: "",
                        material_plan_id: "",
                        material_id: val.inventoryid,
                        material_name: val.material_inventory_name,
                        material_classification: val.classification,
                        material_unit: val.measure_unit
                    }   
                    let material = this.detail.find((x=> x.material_id == val.inventoryid));
                    if(material == undefined){
                        this.detail.push(detail);  
                    }  
            });        
           this.dialogVisible = false;  
          
        },
        deleteMaterial(id){
            this.detail=this.detail.filter(x=> x.material_id != id);  
            this.selectedMaterial.forEach((row) => { 
                if(row.inventoryid == id){
                    this.$refs.multipleTableRef.toggleRowSelection(row, undefined);                
                }
            });   
        },

        async updateData(e){   
            this.submitting = true;
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
                api: '/materialmanagement/material_plan',
                data: this.FormData 
            });
            if(response.status == 200){ 
                const id = this.$route.params.id;
                const formData = new FormData();
                formData.append('material_plan_id',id);
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
                api:  '/materialmanagement/material_plan_datafiles',           
                data: formData
                });
                if(imgResponse.status == 200){
                            this.FormPlanDetail.material_plan_id= this.$route.params.id;
                            this.detail.forEach((value)=>{
                            if(value.plan_detail_id == null){
                                let newdata={
                                    quantity: value.quantity,
                                    price_per_unit: value.price_per_unit,
                                    plan_amount: value.plan_amount,
                                    remark: value.remark,
                                    otherproperties: value.otherproperties,
                                    material_plan_id: this.$route.params.id,
                                    material_id: value.material_id,
                                    }
                                  this.FormPlanDetail.add_list.push(newdata);
                            }
                            else{
                                this.FormPlanDetail.current_list.push(value);
                            }
                         }); 
                        
                            let detailResponse = await authApi({
                            method: 'PUT',
                            api: '/materialmanagement/material_plandetail',              
                            data: this.FormPlanDetail
                            });
                            if(detailResponse.status == 200){  
                                this.submitting = false;                         
                                toast.success("Spending Update successful !", {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 3000,
                                });
                                this.getData();
                            }
                }
            }
        },
    }
  
}
</script>

<style lang="scss">
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
</style>
