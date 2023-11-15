<template>
    <div class="container-fluid"  @click="$store.commit('setActive', false)">  
           <form  @submit.prevent="createData"> 
            <div class="row">
                <div class="col-md-12">
                            <ProjectName @projectData="getProjectName($event)"  /> 
                            <span v-if="v$.FormData.order.project_id.$error" class="text-danger">
                                <span v-if="v$.FormData.order.project_id.$errors[0].$message != ''" >
                                    {{ $t('is_required', {'name': $t('project')}) }} 
                                </span>                                                                                         
                            </span> 
                            <PurchaseRequisition :projectId="FormData.order.project_id" @purchaseRequisitoinData="getPurchaseName($event)" /> 
                            <span v-if="v$.FormData.order.purchase_requisition_id.$error" class="text-danger">
                                <span v-if="v$.FormData.order.purchase_requisition_id.$errors[0].$message != ''" >
                                    {{ $t('is_required', {'name': $t('purchase_requisition')}) }} 
                                </span>                                                                                         
                            </span> 
                            <div class="form-group mb-3">
                                <label for="title">
                                   <span class="text-danger">*</span><small><b>{{ $t('title_bd') }}</b></small> 
                                </label>
                                <el-input type="text" id="title" class="" :placeholder="$t('please_enter')" v-model="FormData.order.title" clearable/>
                                <!-- <span v-if="v$.FormData.order.title.$error" class="text-danger">
                                <span v-if="v$.FormData.order.title.$errors[0].$message != ''" >
                                    {{ $t('is_required', {'name': $t('title_bd')}) }} 
                                </span>                                                                                         
                            </span>  -->
                            </div>                           
                            <div class="col-md-3 m-0 p-0">
                                <div class="form-group mb-3">
                                    <label for="date_of_signing">
                                    <span class="text-danger">*</span><small><b>{{ $t('date_of_signing') }}</b></small> 
                                    </label>
                                    <el-date-picker :placeholder="$t('pick_a_day')" type="date" class="" id="date_of_signing" style="width: 100%;" 
                                    format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                                     v-model="FormData.order.application_date" clearable/>
                                </div>
                            </div>
       
                            <SpendingContract :projectId="FormData.order.project_id" @spendingData="getSpendingName($event)" /> 
                            <!-- <SpendingContract @spendingData="getSpendingName($event)" />  -->
                            <!-- <span v-if="v$.FormData.order.spending_contract_id.$error" class="text-danger">
                                <span v-if="v$.FormData.order.spending_contract_id.$errors[0].$message != ''" >
                                    {{ $t('is_required', {'name': $t('spending_contract')}) }} 
                                </span>                                                                                         
                            </span>  -->
                            <Supplier @supplierData="getSuppliperData($event)" /> 
                            <span v-if="v$.FormData.order.supplier.$error" class="text-danger">
                                <span v-if="v$.FormData.order.supplier.$errors[0].$message != ''" >
                                    {{ $t('is_required', {'name': $t('contract_party')}) }} 
                                </span>                                                                                         
                            </span> 

                            <!-- <PickerName :titleHeader="titleHeader" @pickerData="getPickerName($event)" />    -->
                            <!-- <span v-if="v$.FormData.order.warehouse_clerk.$error" class="text-danger">
                                <span v-if="v$.FormData.order.warehouse_clerk.$errors[0].$message != ''" >
                                    {{ $t('is_required', {'name': $t('warehose_clerk')}) }} 
                                </span>                                                                                         
                            </span> -->
                             
                           <div class="form-group mb-3">
                                <label for="">
                                    <span class="text-danger">*</span><small><b>{{ $t('material_details') }}</b></small>  
                                </label>
                            <div class="row mx-2 mb-4">
                                <el-table :data="FormData.details" border style="width: 100%;">
                                    <el-table-column  fixed type="index" width="55" />
                                    
                                    <el-table-column :label="$t('material_name')" width="170px"> 
                                        <template #default="scope">
                                            <el-input type="text" :placeholder="$t('please_enter')" class="" v-model="scope.row.material_name" disabled/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('specification')" width="170px"> 
                                        <template #default="scope">
                                            <el-input type="text" :placeholder="$t('please_enter')" class="" v-model="scope.row.material_specification" disabled/> 
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('brand')" width="170px"> 
                                        <template #default="scope">
                                            <el-input type="text" :placeholder="$t('please_enter')" class="" v-model="scope.row.material_brand" disabled />
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('material_classification')" width="200px"> 
                                        <template #default="scope">
                                            <el-input type="text" :placeholder="$t('please_enter')" class="" v-model="scope.row.material_classification" disabled/> 
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('num_of_plants')" width="170px"> 
                                        <template #default="scope">
                                            <el-input type="number" :placeholder="$t('please_enter')" class="" v-model="scope.row.quantity" clearable/> 
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('unit')" width="170px"> 
                                        <template #default="scope">
                                            <el-input type="text" :placeholder="$t('please_enter')" class="" v-model="scope.row.material_unit" disabled/> 
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('price_per_unit')" width="170px"> 
                                        <template #default="scope">
                                            <el-input type="number" :placeholder="$t('please_enter')" class="" v-model="scope.row.price_per_unit" clearable/> 
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('tax_rate')" width="170px"> 
                                        <template #default="scope">
                                            <el-input type="number" :placeholder="$t('please_enter')" class="" v-model="scope.row.tax_rate" clearable/> 
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('remark')" width="200px"> 
                                        <template #default="scope">
                                            <el-input type="textarea" :placeholder="$t('please_enter')" id="remark"
                                             v-model="scope.row.remark" maxlength="500" autosize show-word-limit  /> 
                                        </template>
                                    </el-table-column>

                                    <el-table-column fixed="right" :label="$t('operate')" width="120px">
                                        <template #default="scope">
                                            <small class="text-danger" @click="deleteMaterial(scope.row.material_id)"> {{ $t('delete') }} </small>
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
                                        <font-awesome-icon icon="fa-solid fa-circle-plus" style="color:cornflowerblue;" /> 
                                        <span class="text-primary"> {{ $t('add_to') }} </span>
                                    </div>                                          
                            </div> 
                            <div class="form-group mb-3">
                                <label for="remark">
                                    <small><b>{{ $t('remark') }}</b></small>
                                </label>
                               <el-input type="textarea" :placeholder="$t('please_enter')" id="remark" v-model="FormData.order.remark" maxlength="100" show-word-limit />
                            </div>
       
                            <Picture @picture="getPicture($event)" />
                            <Document @appendix="getDocument($event)" />
                            <el-timeline>
                                <el-timeline-item>
                                <Approver @approverUser="getApproverUser($event)" />
                                </el-timeline-item>
                                <el-timeline-item>
                                    <Cc @ccUser="getCcUser($event)" />
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
    <el-dialog v-model="dialogVisible" width="60%" draggable>
        <el-table-header>
            <label class=" text-dark ml-2"> <h4>{{ $t('material_details') }}</h4> </label>
        </el-table-header>
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
import PickerName from '@/components/Share/PickerName.vue';
import PurchaseRequisition from '@/components/Share/PurchaseRequisition.vue';
import SpendingContract from '@/components/Share/SpendingContract.vue';
import Supplier from '@/components/Share/Supplier.vue';
import Picture from '@/components/Share/Picture.vue';
import Document from '@/components/Share/Document.vue';
import Approver from '@/components/Share/ApproverUser.vue';
import Cc from '@/components/Share/CcUser.vue';
import useValidate from '@vuelidate/core'
import { required} from '@vuelidate/validators'

export function validName(name) {
  let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
  if (validNamePattern.test(name)){
    return true;
  }
  return false;
}
export default {
    name: 'PurchaseOrderCreate',
    data() {
        return {
            v$: useValidate(),
            titleHeader: "warehose clerk",
            FormData: {
                order:{                        
                        title: "",
                        odd_number: "",
                        application_date:  new Date().toISOString().slice(0,10),             
                        enter_warehouse: false,    
                        warehouse_clerk: "",
                        tax_rate: 0,
                        remark: "",                        
                        picture: null,
                        appendix: null,
                        approver:[],
                        cc: [],
                        creation_time: "",
                        project_id: "",  
                        purchase_requisition_id: "",
                        spending_contract_id: "",
                        supplier: "",
                        created_by_user: ""
                    },
                    details:[]               
            },
            detailCount: 1,
            pictureImages: [] ,
            appendixImages: [], 
            showapprover: [],
            showcc: [],
            material: [],

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
    validations() {
        return {
            FormData: {
                order:{
                    project_id: {
                        required,        
                    },
                    purchase_requisition_id: {
                        required,  
                    },
                    // spending_contract_id: {
                    //     required, 
                    // },
                    supplier: {
                        required, 
                    },
                    // warehouse_clerk: {
                    //     required,
                    // },
                    // title: {                      
                    //     required, name_validation: {
                    //         $validator: validName,                
                    //     },  
                    // },
                }
            }
        }
    },
    components: {
      ProjectName,
      PickerName,  
      PurchaseRequisition,
      SpendingContract,   
      Supplier, 
      Picture,
      Document,
      Approver,
      Cc    
    }, 
    created(){                
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
         this.FormData.order.project_id = data; 
        },
        // getPickerName(data){
        //     this.FormData.order.warehouse_clerk = data;   
        // },       
        getPurchaseName(data) {
            this.FormData.order.purchase_requisition_id= data;
        },
        getSpendingName(data){
            this.FormData.order.spending_contract_id= data;             
        },
        getSuppliperData(data){
          this.FormData.order.supplier= data;
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
       }, 
       addMaterial() { 
        this.selectedMaterial.forEach((val, index)=>{
                    let detail= {                      
                        quantity: "",
                        price_per_unit: "",
                        tax_rate: "",
                        tax: "",
                        amount: "",
                        remark: "",                        
                        otherproperties: "",
                        purchase_order_id: "",                 
                        material_id: val.inventoryid,
                        material_name: val.material_inventory_name,
                        material_specification: val.specification,
                        material_classification: val.classification,
                        material_brand: val.brand,
                        material_unit: val.measure_unit
                    }   
                    let material = this.FormData.details.find((x=> x.material_id == val.inventoryid));
                    if(material == undefined){
                        this.FormData.details.push(detail);  
                    } 
                  
        }); 
           this.dialogVisible = false;

        },
        deleteMaterial(id){
            this.FormData.details = this.FormData.details.filter(x=> x.material_id != id);  
            this.selectedMaterial.forEach((row) => { 
                if(row.inventoryid == id){
                    this.$refs.multipleTableRef.toggleRowSelection(row, undefined);                
                }
            }); 
        },

        async createData(e){ 
            this.submitting = true; 
            this.v$.$validate(); 
            if (this.v$.$error) {
                this.submitting = false;
                return;
            }
            this.showapprover.forEach((value) => {
                this.FormData.order.approver.push(value.userid);                
            }); 
            this.showcc.forEach((value) => {
                this.FormData.order.cc.push(value.userid); 
            }); 
            let response = await authApi({
                method: 'POST',
                api: '/materialmanagement/purchase_order',
                data: this.FormData
            });
            if(response.status == 201){              
              //console.log(response.data.revenue_contract_id);
                const id = response.data.purchase_order_id; 
                const imgformData = new FormData();
                imgformData.append('purchase_order_id',id);
                this.pictureImages.forEach((value) => {
                     imgformData.append('picture', value.url);   
                });
                this.appendixImages.forEach((value) => {
                    imgformData.append('appendix', value.url);  
                }); 
                let imgResponse = await authApi({
                method: 'POST',
                api:  '/materialmanagement/Purchase_order_datafiles',           
                data: imgformData
                });
                if(imgResponse.status == 200){                   
                    toast.success("Purchase Order Insert successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
                    this.submitting = false;
                    this.$router.back();
                }
            }
        },
    }
    
}
</script>
