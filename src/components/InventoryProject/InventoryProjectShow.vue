<template>  
    <div v-loading="loading" class="loading__div" v-if="loading"></div>   
      <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading"> 
        <div class="row m-0 p-0">
            <div class="col-md-12 m-0 p-0">
                <div class="row my-1">
                    <div class="col-md-12 d-flex mr-3">
                        <el-radio-group v-model="activeTab" class="ml-4 row" @change="getData()">
                            <!-- <el-radio label="customer" size="large"> Customer </el-radio>
                            <el-radio label="supplier" size="large"> Supplier </el-radio> -->
                            <el-radio label="usedmaterials" size="large"> Used Materials </el-radio>
                            <el-radio label="inventory" size="large"> Inventory </el-radio>
                            <el-radio label="materialstatistics" size="large"> Material Statistics </el-radio>
                        </el-radio-group>    
                    </div>       
                </div> 
            </div>
            
        </div>

        <div class="row">
            <div class="col-md-11 row">
                <div class="col-md-4 mb-2 ml-2" v-if="activeTab == 'usedmaterials'">
                    <div class="row mx-1" >
                        <div class="mx-1" v-show="showClientTable">
                            <el-date-picker type="date" v-model="date" id="usedDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD" :placeholder="$t('pick_a_day')" size="default" style=" width:100%" @change="searching()"/>
                            <!-- <el-date-picker
                            v-model="date"
                            type="daterange"
                            range-separator="-"
                            :start-placeholder="$t('start_date')"
                            :end-placeholder="$t('end_date')"                        
                            size="large"
                        /> -->
                         </div> 
                    </div>
                </div>
                <!-- <div class="col-md-6" v-show="!showAdvanced">
                    <el-button @click="searching()">{{ $t('search') }}</el-button>
                </div> -->
            </div>
            <div class="col-md-1">
                <!-- <router-link :to="`${routeName}create`"> -->
                    <button type="button" class="btn btn-sm btn-success" v-if="activeTab == 'usedmaterials'" @click="AddModalInventory()">                     
                        <font-awesome-icon icon="fa-solid fa-plus" /> <span class="ml-1">{{ $t('add') }}</span>                                            
                    </button>
            <!-- </router-link> -->
            </div>
        </div>

         <!-- create model -->
         <el-dialog v-model="typeOfInventoryDialog" title="Insert Material" width="30%" draggable>    
        <form @submit.prevent="createData">                   
            <div class="container-fluid">                                  
                <div class="row">
                    <div class="col-12">
                        <div class="form-group">
                        <label for="material"> {{ $t('material_name') }} </label>

                        <!-- start  -->
                        <el-select  style="width: 100%;" class="" v-model="material_id" @change="selectMaterialData()">
                            <el-option value="">{{ $t('please_choose') }}</el-option>
                            <el-option v-for="obj of materialType" :key="obj.material_id" :label="obj.material_name" :value="obj.material_id">
                                {{ obj.material_name }}</el-option>                           
                        </el-select> 
                        <!-- end -->

                        <!-- <el-select style="width: 100%;" id="material_name" v-model="FormData.material_name">                          
                                <el-option value="">{{$t('please_choose')}}</el-option>
                                <el-option v-for="obj of materialName" :key="obj.material_id" :label="obj.material_name" :value="obj.material_id">{{ obj.material_name }}</el-option>                           
                        </el-select> -->
                        
                        <!-- <el-input type="text" v-model="FormData.name" :placeholder="$t('please_enter')" 
                        clearable />                                          
                        <span v-if="FormData.name == ''" class="text-danger">
                            <span>
                                {{ $t('is_required', {'name': $t('name')}) }} 
                            </span>                                                                                         
                        </span> -->
                        </div> 
                        <div class="form-group">
                            <label for=""> {{ $t('quantity') }} </label>
                            <el-input type="number" v-model="FormData.quantity" :placeholder="$t('please_enter')" clearable/>
                        </div>
                    </div>                                                                                                                      
                </div> 
                <div class="row">
                    <div class="col-12 d-flex justify-content-end">
                        <el-button type="primary" loading v-if="submitting">Submiting ...</el-button>     
                        <button type="submit" class="btn btn-primary btn-footer" v-if="!submitting"> {{ $t('submit') }} </button>
                    </div>                                     
                    
                </div>
                                                
            </div>
        </form>  
    </el-dialog>
        <!-- edit model -->

        <!-- <div class="col-md-4" v-show="budget" v-if="activeTab == 'usedmaterials'">
            <div class="row mx-1 pb-2">
                <small><b>{{ $t('creation_date') }}</b></small>
            </div>
            <div class="row mx-1">    
                <el-date-picker
                    v-model="budget_creation_date"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="Start date"
                    end-placeholder="End date"                          
                    size="large" @change="searching()"
                />
            </div>
        </div> -->
          
          <div class="row mx-2"> 
           <el-table :data="data" border style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column  fixed type="selection" width="55" />          
              <!-- <el-table-column prop="approve_status" :label="$t('approval_status')" width="200" /> -->
              <!-- <el-table-column prop="project_id" :label="$t('project')" width="200" sortable /> -->
              <el-table-column prop="material_id" :label="$t('material_name')" width="250" sortable v-if="activeTab == 'usedmaterials' || activeTab == 'inventory'"/>
              <el-table-column prop="material" :label="$t('material_name')" width="250" sortable v-if="activeTab == 'materialstatistics'"/>
              <el-table-column prop="classification" :label="$t('classification')" width="250" sortable />
              <el-table-column prop="brand" :label="$t('brand')" width="250" sortable />
              <el-table-column prop="specification" :label="$t('specification')" width="250" sortable />
              <el-table-column prop="measure_unit" :label="$t('measure_unit')" width="250" sortable />
              <el-table-column prop="quantity" :label="$t('quantity')" width="250" sortable v-if="activeTab == 'usedmaterials'" />
              <el-table-column prop="instock_amount" fixed="right" :label="$t('instock_amt')" width="250" sortable v-if="activeTab == 'inventory'"/>
              <el-table-column prop="total" fixed="right" :label="$t('total')" width="250" sortable v-if="activeTab == 'materialstatistics'"/>
              <el-table-column prop="used_date" fixed="right" :label="$t('date')" width="250" sortable v-if="activeTab == 'usedmaterials'" />
              <!-- <el-table-column :label="$t('approver')" width="200" sortable >
               <template #default="scope">
                <span v-for="(obj, index) in scope.row.approver" :key="index">
                              {{ obj }}
                          </span>
               </template>
              </el-table-column>                   -->
              <!-- <el-table-column fixed="right" :label="$t('operate')"  width="220" >
              <template #default="scope">
                  <div class="action__btn d-flex">
                      <router-link :to="`/material_plan/show/${scope.row.material_plan_id}`"
                              v-show="showBtn">
                                  <el-tooltip
                                      class="box-item"
                                      effect="dark"
                                      :content="$t('show')"
                                      placement="top"
                                  >
                                  <button class="btn-primary circle__btn">
                                      <font-awesome-icon icon="fa-solid fa-eye" class="icon"/>
                                  </button>
                                  </el-tooltip>                         
                              </router-link> 
                              <router-link :to="`/material_plan/edit/${scope.row.material_plan_id}`"
                              v-show="updateBtn && scope.row.approve_status != 'approved'  && scope.row.approve_status != 'approval_rejected' && scope.row.editable">
                                  <el-tooltip
                                      class="box-item"
                                      effect="dark"
                                      :content="$t('edit')"
                                      placement="top"
                                  >
                                  <button class="btn-primary circle__btn">
                                      <font-awesome-icon icon="fa-solid fa-pencil" class="icon"/>
                                  </button>
                                  </el-tooltip>                         
                              </router-link>    
                              <el-tooltip
                              class="box-item"
                              effect="dark"
                              :content="$t('delete')"
                              placement="top"
                              >
                              <button class="btn-danger circle__btn" @click="deleteAll(scope.row.material_plan_id)" v-show="deleteBtn && scope.row.editable">
                                  <font-awesome-icon icon="fa-solid fa-trash" class="icon"/>
                              </button>
                              </el-tooltip>  
                              <el-tooltip
                              class="box-item"
                              effect="dark"
                              :content="$t('approver')"
                              placement="top"
                              >
                              <button class="btn-warning circle__btn"  @click="showApprover(scope.row.material_plan_id)">
                                  <font-awesome-icon icon="fa-solid fa-check" class="icon"/>
                              </button>
                              </el-tooltip>
                  </div>
              </template>
              </el-table-column> -->
          </el-table>         
                     
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
      <div class="modal fade" id="approver__list__modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">         
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel"> <strong> {{ $t('approver_list') }}  </strong> </h5>
                  </div>               
                  <div class="modal-body row">
                      <div class="container">
                          <div class="row"> 
                          <div class="col-md-12">
                              <table class="table table-striped">
                                  <thead>
                                    <tr>
                                      <th scope="col">#</th>
                                      <th scope="col">{{ $t('name') }}</th>
                                      <th scope="col">{{ $t('user_role') }}</th>
                                      <th scope="col">{{ $t('status') }}</th>
                                      <th scope="col"> {{ $t('remark') }} </th>
                                    </tr>
                                  </thead>
                                  <tbody>                                 
                                    <tr v-for="(obj ,i) in ApproverFormData" :key="i">
                                      <th scope="row"> {{ i+1 }}</th>
                                      <td>{{ obj.userid }}</td>
                                      <td>{{ obj.user_role }}</td>
                                      <td>{{ obj.status }}</td>
                                      <td>{{ obj.remark }}</td>
                                    </tr>
                                  </tbody>
                                </table>
                          </div> 
                          </div>
                      </div>
                  </div>
                  <div class="modal-footer">                   
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t('cancel') }}</button>                  
                  </div>
                 
              </div>         
          </div>
      </div> 
  </template>
  <script>
  import {authApi} from '@/http/authApi'
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';
  import InventorySearching from '@/components/Share/InventorySearching.vue';
  import $ from 'jquery';
  export default {
      name: 'InventoryProjectShow',
      props: ['api', 'advanced','createBtn', 'routeName', 
    'showpurchase_requisition','showPurchaseOrder', 'showInboundOrder', 'showReturnForm', 'showOutboundOrder',
    'showTransfer','showProjectInventory','showClientTable'
    ],
      data() {
          return {    
              FormData: {
                name: "",
                material_name: "",
                quantity: "",
                used_date: "",
              },

              showAdvanced: false, 
              typeOfInventoryDialog: false,
               //searching
              apiName: "/materialmanagement/get_used_materials",
              advanced: true,            
              routeName: "/materialmanagement/",
              //endsearching
            //   showClientTable: true,
              materialName: "",
              //
              data: [], 
              loading: false,
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
              deleteBtn: false ,
              ApproverFormData: {},
              activeTab: "usedmaterials",
              showClientTable: true,  
            //   date: '',
              date: "", 
              
              material_id: "", //new one 
              materialType: [], //new one 
            
          }
      },    
      components: {
          InventorySearching,
      },
      computed: {
          selectedCount(){
              return this.selectedData.length;
          }
      },
    //   start 
      props: ['oldMaterialId'],
        emits :{
            MaterialData: null,
        },
    // end 
      created(){        
          this.getData();
          this.getMaterialName(); //new 
      },
      methods:{

        // start 
        async getMaterialName(){
            let response = await authApi({               
                method: "GET",
                api: '/materialmanagement/project_inventory',
                params: {
                         project_id: this.$route.params.id,                         
                         page: this.currentPage,
                         limit: this.pageSize,
                },
                
            });
            if (response.status == 200){
                console.log('used material'+ JSON.stringify(response.data))
                this.materialType = response.data.data;
                if(this.oldMaterialId != null){
                    this.material_id = this.oldMaterialId;
                }
              
            }
        },

       async createData(){
        // console.log( this.$route.params.id);
        // console.log(this.material_id);
        // console.log(this.FormData.quantity)
            let response = await authApi({               
                method: 'POST',
                api: '/materialmanagement/used_materials',                
                data: {
                    project_id: this.$route.params.id,          
                    material_id: this.material_id,
                    quantity: this.FormData.quantity,
                }                
            });
            if (response.status == 201){     
                this.typeOfInventoryDialog= false;          
                this.getData();                
                this.getMaterialName(); //new 
                //this.materialType = response.data.data;
                //console.log('used material'+ JSON.stringify(response.data))             
                // if(this.oldMaterialId != null){
                //     this.material_id = this.oldMaterialId;
                // }
              
            }

        },
        selectMaterialData(){
           
           this.$emit("MaterialData",this.material_id);
       },
    //    end 
        AddModalInventory(){
            this.typeOfInventoryDialog = true;
        },
        
        //   getSearchingData(data){
        //   this.data = [];
        //   this.data = data.data;
        //   this.total = data.total;
        //  },  
          async getData(){    
            this.data= [];   
              this.loading= true;  
            //   start

            if(this.activeTab == 'usedmaterials'){
                this.showClientTable = true;
            }
            
            if(this.activeTab != 'usedmaterials'){
                this.showClientTable = false;
            }

            let api="";
            let method= "";
            let data={};
            let params= {};
            
            ///console.log(this.activeTab)
            if(this.showClientTable && this.activeTab == 'usedmaterials'){
                api = '/materialmanagement/get_used_materials';
                method = "POST";
                params= {
                         project_id: '',                                
                         page: this.currentPage,
                         limit: this.pageSize,
                  },
                data={
                    project_id:  this.$route.params.id,
                    // date: new Date().toISOString().slice(0,10),
                    date: this.FormData.used_date
                }
                // console.log(data);
                //console.log("list"+ JSON.stringify(data))
                this.apiName = '/materialmanagement/get_used_materials'; 
            }
            else if(this.activeTab == 'inventory'){
                api = '/materialmanagement/project_inventory';
                method = "GET";
                 params= {
                         project_id: this.$route.params.id,                         
                         page: this.currentPage,
                         limit: this.pageSize,
                  },
                
                this.apiName = '/materialmanagement/project_inventory'; 
            }
            else{
                api = '/materialmanagement/materialstatistics';
                method = "GET";
                params= {
                         project_id: this.$route.params.id,                         
                         page: this.currentPage,
                         limit: this.pageSize,
                  },
                this.apiName = '/materialmanagement/materialstatistics'; 
            }

            // end
              
              let response = await authApi({
                  method: method,
                  api: api,
                  params: params,
                  data: data   
              });
              if(response.message){            
                  const list= response.data.data;
 
                 this.data= list; 
                  console.log('data'+ JSON.stringify(this.data));
                  this.total = response.data.total;
                  this.loading = false;
              }
            
          },
          async showApprover(id){ 
              let response = await authApi({
                  method: 'GET',
                  api: '/materialmanagement/get_materialplan_approve_cc',
                  params: {
                      material_plan_id: id,                  
                  }   
              });          
              if(response.status == 200){
                  console.log("appr"+ JSON.stringify(response))
                  this.ApproverFormData= response.data.data;
                  if(this.ApproverFormData.length >0){
                      $('#approver__list__modal').modal('show');
                  }
              }
             
          },

           async deleteAll(id = null){          
              
              let list=[];            
              if(id != null && id != ""){
                  list.push(id);             
              }
              else{
                  for(let i=0; i< this.selectedData.length; i++){
                        list.push(this.selectedData[i].material_plan_id);               
                  }
              } 
            
              if(list.length > 0){
                  let response = await authApi({
                  method: 'DELETE',
                  api: '/materialmanagement/material_plan',
                  params: {
                         project_id: '',
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
                      this.getData();
                      toast.success("Project Inventory Delete successful !", {
                      position: toast.POSITION.TOP_RIGHT,
                      autoClose: 3000,
                      });
                  }       

              }
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
            // let FormData = "";
            if(this.showClientTable){
                console.log(this.date)
                if(this.date != "" && this.date != null){
                    let date = this.convertDate(this.date); 
                    // console.log(this.date+"---@@");
                    this.FormData.used_date = date;
                    // console.log(this.FormData.used_date)
                }
                else{
                    this.FormData.used_date = ""; 
                }
                // console.log(this.FormData.used_date)
            }
            // let api="";
            // let data={}; 
            let response = await authApi({
                        method: "POST",
                        api: "/materialmanagement/get_used_materials",
                        params: {
                            project_id: '',                       
                            keyword: this.formSearching,                                             
                            page: this.currentPage,
                            limit: this.pageSize
                        }, 
                        data : {
                            project_id:  this.$route.params.id,
                            date:  this.FormData.used_date 
                        }
                        });
                        if(response.data){  
                            this.getData();                
                            this.getMaterialName(); 
                            console.log(response.data)
                            let data= response.data.data;
                            let total = response.data.total;
                            let searching = {data: data, total: total};
                            this.$emit("searchingData", searching);
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
  </style>