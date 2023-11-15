<template>
    <div v-loading="loading" class="loading__div" v-if="loading"></div> 
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading">  
           <form  @submit.prevent="updateData"> 
            <div class="row">
                <div class="col-md-12">         
                            <ProjectName :oldProjectId="oldProjectId" @projectData="getProjectName($event)"  />
                            <Supplier :oldSupplierId="oldSupplierId" @supplierData="getSuppliperData($event)" />       
                            <div class="form-group mb-3">
                                <label for="title">
                                    <span class="text-danger">*</span><small><b>{{ $t('title') }}</b></small> 
                                </label>
                                <el-input type="text" id="title" :placeholder="$t('please_enter')" class="" v-model="FormData.title" clearable/>
                            </div>
       
                            <div class="col-md-3 m-0 p-0">
                                <div class="form-group mb-3">
                                    <label for="date_of_signing">
                                        <span class="text-danger">*</span>{{ $t('date_of_signing') }}
                                    </label>
                                    <el-date-picker :placeholder="$t('pick_a_day')" type="date" class=""  format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                                     id="date_of_signing" style="width: 100%;"  v-model="FormData.application_date" clearable/>
                                </div>
                            </div>
       
                            <div class="form-group mb-3">
                                <label for="return_reason">
                                    <small><b>{{ $t('return_reason') }}</b></small>
                                </label>
                               <el-input type="textarea" :placeholder="$t('please_enter')" id="return_reason" v-model="FormData.return_reason" maxlength="100" show-word-limit  />
                            </div>
                            <div class="row mx-2 mb-4">
                                <el-table :data="planDetail" border style="width: 100%;">
                                    <el-table-column  fixed type="index" width="55" />                                    
                                    <el-table-column :label="$t('title_bd')" width="200px"> 
                                        <template #default="scope">
                                            <el-input type="text" :placeholder="$t('please_enter')" class="" v-model="scope.row.title" disabled/>
                                        </template>
                                    </el-table-column> 
                                    <el-table-column label="Material" width="300px"> 
                                        <template #default="scope">                                           
                                            <el-select v-model="scope.row.material_id" :placeholder="$t('please_choose')"  style="width: 100%">
                                                <el-option
                                                v-for="item in material"
                                                :key="item.material_inventory_name"
                                                :label="item.material_inventory_name"
                                                :value="item.inventoryid"
                                                />  
                                            </el-select> 
                                        </template>
                                    </el-table-column> 
                                    <el-table-column :label="$t('num_of_plants')" width="170px"> 
                                        <template #default="scope">
                                            <el-input type="number" :placeholder="$t('please_enter')" class="" v-model="scope.row.quantity" clearable/> 
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('remark')" width="300px"> 
                                        <template #default="scope">
                                            <el-input type="textarea" :placeholder="$t('please_enter')" id="remark"
                                             v-model="scope.row.remark" maxlength="500" autosize show-word-limit  /> 
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="otherproperties" width="300px"> 
                                        <template #default="scope">
                                            <el-input type="textarea" :placeholder="$t('please_enter')" id="otherproperties"
                                             v-model="scope.row.otherproperties" maxlength="500" autosize show-word-limit  /> 
                                        </template>
                                    </el-table-column>

                                    <el-table-column fixed="right" :label="$t('operate')" width="120px">
                                        <template #default="scope">
                                            <small class="text-danger"  @click="deleteInbound(scope.row.inbound_order_id)"> {{ $t('delete') }} </small>
                                        </template>                                        
                                    </el-table-column>
                                </el-table>
                            </div>

                                    <!-- end -->

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

                                    <div class="box-footer"  @click="dialogVisible = true" >
                                        <font-awesome-icon icon="fa-solid fa-circle-plus" style="color:cornflowerblue;" /> <span class="text-primary"> {{ $t('add_to') }} </span>
                                    </div>                                 
       
                            <div class="form-group mb-3">
                                <label for="remark">
                                    <small><b>{{ $t('remark') }}</b></small>
                                </label>
                               <el-input type="textarea" :placeholder="$t('please_enter')" id="remark" v-model="FormData.remark" maxlength="100" show-word-limit  />
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
                            <div class="form-group mb-5"></div> 
        
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
                <el-table ref="multipleTableRef" :data="inbound" border style="width: 100%;"  @selection-change="handleSelectionChange">
                    <el-table-column  fixed type="selection" width="55" />     
                    <el-table-column prop="title" sortable  :label="$t('title_bd')" width="200" />
                    <el-table-column prop="project_id" :label="$t('project')" width="200" sortable />
                    <el-table-column prop="supplier" :label="$t('supplier')" width="200" sortable />                  
                    <el-table-column prop="odd_number" :label="$t('odd_number')" width="300" sortable />
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
            <el-button type="primary" @click="addInbound" >{{ $t('sure') }}</el-button>           
          </span>
        </template>
    </el-dialog>
</template>

<script>
import {authApi} from '@/http/authApi'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import ProjectName from '@/components/Share/ProjectName.vue';
import Supplier from '@/components/Share/Supplier.vue';
import Picture from '@/components/Share/Picture.vue';
import Document from '@/components/Share/Document.vue';
import Approver from '@/components/Share/ApproverUser.vue';
import Cc from '@/components/Share/CcUser.vue';
export default {
    name: 'ReturnFormEdit',
    data() {
        return {
            loading: true,
            submitting: false,
            FormData: {
                           
            },
             oldProjectId: "",
             pictureImages: [] ,
             appendixImages: [], 
             showapprover: [],
             showcc: [],
             oldApprover: [],  
             oldCc: [],
             oldpictureImages: [],
             oldappendixImages: [],            
             oldSupplierId: "",
             planDetail: [],
             FormPlanDetail: {
                order_id: "",
                current_list: [],
                add_list: []
            },
            selectedInbound: [],
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
      Supplier,
      Picture,
      Document,
      Approver,
      Cc    
    }, 
    created(){  
        this.getData();
        this.getInboundOrder(); 
        this.getPlanDetail();  
        this.getMaterial();  
    },
    methods: {
        async getPlanDetail(){
            let response = await authApi({
                method: 'GET',
                api: '/materialmanagement/return_order_detail',
                params: {
                    return_form_id: this.$route.params.id,                       
                }   
            });
            if(response.status == 200){ 
               console.log('de'+ JSON.stringify(response.data.data))
                const list1= response.data.data;
                 this.planDetail= list1.map((v,index) => (
                     {...v, title: "",
                     }
                    ));
             
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
       },      
        handleSelectionChange(val){               
            this.selectedInbound = val;
        },
        handleSizeChange(val){
           this.pageSize = val;
           this.getInboundOrder();
        },
        handleCurrentChange(val){
           this.currentPage =val;
           this.getInboundOrder();
        }, 
        getProjectName(data) {   
         this.FormData.project_id = data;        
        },      
        getSuppliperData(data){
          this.FormData.supplier= data;
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
        async getInboundOrder(){
        let response = await authApi({
            method: 'POST',
                api: '/materialmanagement/get_inbound_order',
                params: {
                       id: '',
                       keyword: '',             
                       page: '',
                       limit: ''
                }  
        });
        if(response.status == 200){
            //console.log('list' + JSON.stringify(response.data.data));
            this.inbound = response.data.data;
            this.total = response.data.total;    
            for(let i=0; i<this.inbound.length; i++){
            let detail= this.planDetail.find(x=>x.inbound_order_id == this.inbound[i].inbound_order_id)
            if(detail){
                detail.title= this.inbound[i].title;               
            }
        }
        this.loading = false;        
        }
        
       },      
       addInbound() { 
        this.selectedInbound.forEach((val, index)=>{
                    let detail= {  
                        return_form_detail_id: null,
                        return_form_id: "",
                        material_id: "",
                        inbound_order_id: val.inbound_order_id,
                        title: val.title,
                        quantity: "",
                        remark: "",
                        otherproperties: "",
                    }   
                    let inbound = this.planDetail.find((x=> x.inbound_order_id == val.inbound_order_id));
                    if(inbound == undefined){
                        this.planDetail.push(detail);  
                    } 
                  
        }); 
           this.dialogVisible = false; 
        },
        deleteInbound(id){
            this.planDetail = this.planDetail.filter(x=> x.inbound_order_id != id);  
            this.selectedInbound.forEach((row) => { 
                if(row.inbound_order_id == id){
                    this.$refs.multipleTableRef.toggleRowSelection(row, undefined);                
                }
            });   
          
        },
        async getData(){    
          this.loading = true;
          let response = await authApi({
              method: 'POST',
              api: '/materialmanagement/get_return_order',
              params: {
                     id: this.$route.params.id,
                     keyword: '',             
                     page: '',
                     limit: ''
              }   
          });
          if(response.message){            
                this.FormData = response.data.data;   
                //console.log('retur'+ JSON.stringify(this.FormData));         
                this.oldProjectId = this.FormData.project_id;      
                this.oldSupplierId= this.FormData.supplier;                          
                this.oldApprover = this.FormData.approver.approvers;  
                this.oldCc = this.FormData.cc.cc;  
                if(response.data.data.picture != null){
                const list= response.data.data.picture.images;
                this.oldpictureImages = list.map(v => ({...v, isSelected: true}));
                }
                if(response.data.data.appendix !=null ){
                const list1= response.data.data.appendix.documents;
                this.oldappendixImages = list1.map(v => ({...v, isSelected: true}));
                }                
                this.loading = false;
          }       
      },        
        async updateData(e){ 
            this.submitting = true;  
            if(this.showapprover.length > 0){
            this.FormData.approver= [];
            this.showapprover.forEach((value) => {
                if(value.isSelected){
                    this.FormData.approver.push(value.id); 
                }                 
            }); 
            }
            if(this.showcc.length > 0){
            this.FormData.cc= [];
            this.showcc.forEach((value) => {
                if(value.isSelected){
                    this.FormData.cc.push(value.id); 
                }  
            }); 
            }
            else{
            let approver= this.FormData.approver.approvers;
            this.FormData.approver= approver;
            let cc= this.FormData.cc.cc;
            this.FormData.cc= cc;
            } 
            let response = await authApi({
                method: 'PUT',
                api: '/materialmanagement/return_order',
                data: this.FormData 
            });
            if(response.status == 200){
                const id = this.$route.params.id; 
                const imgformData = new FormData();
                imgformData.append('return_form_id',id);
                this.oldpictureImages.forEach((value)=>{
                   if(value.isSelected){
                    imgformData.append('imglist',value.image_id);
                   }
                   
                });
                this.oldappendixImages.forEach((value)=> {
                   if(value.isSelected){
                    imgformData.append('filelist',value.file_id);
                   }
                   
                });
                this.pictureImages.forEach((value) => {
                    imgformData.append('addimglist', value);  
                });
                this.appendixImages.forEach((value) => {
                    imgformData.append('addfilelist', value);  
                }); 
                let imgResponse = await authApi({
                method: 'PUT',
                api:  '/materialmanagement/return_order_datafiles',           
                data: imgformData
                });
                if(imgResponse.status == 200){
                            this.FormPlanDetail.order_id= this.$route.params.id;
                            this.planDetail.forEach((value)=>{
                            if(value.return_form_detail_id == null){
                                let newdata={                                   
                                    return_form_id: this.$route.params.id,
                                    material_id: value.material_id,
                                    inbound_order_id: val.inbound_order_id,                                   
                                    quantity: val.quantity,
                                    remark: val.remark,
                                    otherproperties: val.otherproperties,
                                }
                                this.FormPlanDetail.add_list.push(newdata);
                            }
                            else{
                                this.FormPlanDetail.current_list.push(value);
                            }
                         }); 
                            let detailResponse = await authApi({
                            method: 'PUT',
                            api: '/materialmanagement/return_order_detail', 
                            data: this.FormPlanDetail
                            });
                            if(detailResponse.status == 200){                           
                                toast.success("Return Form Update successful!", {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 3000,
                                });
                                this.getData();
                                this.getInboundOrder(); 
                                this.getPlanDetail();  
                                this.getMaterial();  
                                this.submitting = false;
                            }
                }
            }
        },
    }    
}
</script>
<style lang="scss" scoped>

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
 input#date_of_signing{
   width: 200px;
 }
</style>