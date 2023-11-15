<template>   
    <div class="form-group mb-3">        
            <label for="project_name" v-show="titleName != 'project_from' ">
                <span class="text-danger">*</span> <small><b>{{ $t('project') }} </b></small>
            </label>
            <label for="project_name_from"  v-if="titleName == 'project_from'">
                <span class="text-danger">*</span><small><b>{{ $t('project_from_name') }}</b></small> 
            </label>           
            <el-input type="text" :placeholder="$t('please_choose')"
            v-model="project_name" @click="dialogVisible = true" clearable  />
            <!-- :disabled="projectDisabled" -->
            <!-- <span v-if="v$.project_name.$error" class="text-danger">
                {{ v$.project_name.$errors[1].$message }}
            </span> -->
    </div> 

    <el-dialog v-model="dialogVisible" :title="titleHeader" width="60%" draggable>
        <div class="container-fluid">
            <div class="row mx-2 mb-4">

                <div class="row">
                    <div class="form-group"> 
                          
                        <label for="project_status">
                            <b>{{ $t('project_status') }}</b>
                        </label>

                        <!-- <div class="d-flex align-items-center"> -->
                        <div class="form-group">
                            <!-- <el-select style="width: 100%" id="project_status" v-model="selectedProjectStatus"  @change="updateTableRow" v-on:change="getProjectData()"> -->
                            <el-select style="width: 100%" id="project_status" v-model="project_status" v-on:change="getProjectData()">
                                <el-option label="Pending" value="pending">Pending</el-option>
                                <el-option label="On Going" value="on_going">On Going</el-option>
                                <el-option label="Overdue" value="overdue">Overdue</el-option>
                                <el-option label="Completed" value="completed">Completed</el-option>
                            </el-select> 

                            <!-- <el-select class="" style="width: 100%;" id="project_status" v-model="FormData.project_status">                          
                                    <el-option value="">{{$t('please_choose')}}</el-option>
                                    <el-option v-for="obj of projectStatus" :key="obj.project_status_id" :value="obj.project_status_id">{{ obj.project_status_name }}</el-option>                           
                            </el-select> --> 

                            <!-- <button class="btn btn-primary btn-sm ml-2" @click="searching()">{{ $t('search') }}</button> -->
                        </div>
                        
                    </div> 
                </div> 

                

                <el-table :data="projectData" border style="width: 100%;"  @row-click="handleSelectionChange">
                    <el-table-column fixed label="" width="60" >
                        <template #default="scope">
                            <el-radio-group v-model="selected_id" class="ml-4">
                                <el-radio :label="scope.row.project_id" size="large">{{ selected_name }}</el-radio>                                  
                            </el-radio-group>                              
                        </template>
                    </el-table-column>
                    
                    <el-table-column :label="$t('project_name')" width="200px" > 
                        <template #default="scope">
                            {{ scope.row.project_name }}                           
                        </template>
                    </el-table-column>

                    <!-- <el-table-column :label="$t('participation_status')" width="180px"> 
                        <template #default="scope">
                            {{ scope.row.archive_status }}                               
                        </template>
                    </el-table-column> -->

                    <!-- <el-table-column :label="$t('archive_status')" width="180px"> 
                        <template #default="scope">
                            {{ scope.row.archive_status }}                              
                        </template>
                    </el-table-column> -->

                    <!-- <el-table-column :label="$t('item_number')" width="180px"> 
                        <template #default="scope">
                            {{ scope.row.archive_status }}                             
                        </template>
                    </el-table-column> -->

                    <el-table-column :label="$t('project_status')" width="200px"> 
                        <template #default="scope">
                            {{ scope.row.project_status }}                              
                        </template>
                    </el-table-column>

                    <!-- <el-table-column :label="$t('types_of_section')" width="180px"> 
                        <template #default="scope">
                            {{ scope.row.archive_status }}                             
                        </template>
                    </el-table-column> -->

                    <!-- <el-table-column :label="$t('project_manager')" width="180px"> 
                        <template #default="scope">
                            {{ scope.row.archive_status }}                              
                        </template>
                    </el-table-column> -->

                    <el-table-column :label="$t('start_date')" width="200px"> 
                        <template #default="scope">
                            {{ scope.row.start_date }}                               
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('completion_date')" width="200px"> 
                        <template #default="scope">
                            {{ scope.row.completion_date }}                              
                        </template>
                    </el-table-column>

                    <!-- <el-table-column :label="$t('party_a_unit')" width="180px"> 
                        <template #default="scope">
                            {{ scope.row.archive_status }}                               
                        </template>
                    </el-table-column> -->

                    <!-- <el-table-column :label="$t('construction_unit')" width="180px"> 
                        <template #default="scope">
                       ``     {{ scope.row.archive_status }}                                
                        </template>
                    </el-table-column> -->

                    <!-- <el-table-column :label="$t('construction_address')" width="180px"> 
                        <template #default="scope">
                            {{ scope.row.archive_status }}                           
                        </template>
                    </el-table-column>     -->
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
            <el-button type="primary" @click="selectProjectName" >{{ $t('sure') }}</el-button>           
          </span>
        </template>
    </el-dialog>

</template>
<script>
import {authApi} from '@/http/authApi'
export default {  
    
      props: ['oldProjectId', 'titleName', 'projectDisabled', 'titleHeader'],
      data() {
        return {
            selectedProjectStatus:'',

             dialogVisible: false,
             loading: true,
             selected_id: "", 
             selected_name: "",           
             project_id: "",
             project_name: "",
             projectData: [],
            // project_status: "", 
            projectStatus: "",
            background: false,
            disabled: false,
            small: false,
            pageSize: 20,   
            currentPage: 1,  
            total: 0, 
            showError: false, 
             project_status: "",
            //  project_status: [
            //     {key: 'pending', value: 'Pending'},
            //     {key: 'on_going', value: 'On Going'},
            //     {key: 'overdue', value: 'Overdue'},
            //     {key: 'completed', value: 'Completed'}
            //  ],
            //  project: [                
            //     {key: 'unpaid', value: 'Upaid'},
            //     {key: 'partially_payment', value: 'Partially Payment'},
            // ],   
        }
      },
     emits :{
        projectData: null, 
    },
    created() {
      this.getProjectData();  
    //   this.getProjectStatusData(); 
    // this.getProjectstatus();   
    },     
    methods: { 
        // start
        showModel(){
            if(this.projectId != null && this.projectId != undefined && this.projectId != ""){
               this.dialogVisible = true; 
               this.getProjectData();
               this.showError = false;               
            }
            else{
                this.showError = true;
            }            
        }, 
        // end  
        async getProjectData(){            
            let response = await authApi({
                method: 'POST',
                api: '/projectmanagement/getproject',
                params: {
                       id: '',
                       keyword: '',                                         
                    //    page: '',
                    //    limit: ''
                       page: this.currentPage,
                       limit: this.pageSize,
                },
                data: {
                    project_id: this.projectId,
                    // approve_status: "approved",
                    project_status: this.project_status, 
                }   
            });
            if(response.status == 200){            
                const list= response.data.data;                
                this.projectData= list; 
                this.total = response.data.total;                
                this.projectData.forEach((value)=> {
                    if(value.project_id == this.oldProjectId){
                        this.selected_id = value.project_id;
                        this.project_name = value.project_name;
                    }
                })                         
                this.loading = false;              
            }          
        }, 

    //     async getProjectstatus(){        
    //     let response = await authApi({
    //             method: 'GET',
    //             api: '/projectstatus',
    //             params: {                       
    //                   name: ""
    //             }   
    //     });
    //     this.projectStatus = response.data.data;      
       
    //    },

    //    reset(){
    //         this.FormData.project_status="";      
    //         this.searching();      
    //     },

        // start 
        // async getProjectStatusData(){                    
        //     let response = await authApi({
        //         method: 'POST',
        //         api: '/financialmanagement/get_payment_request',
        //         params: {
        //                id: '',
        //                keyword: '',                                       
        //                page: this.currentPage,
        //                limit: this.pageSize,
        //         },
        //         data: {
        //             project_id: this.projectId,
        //             approve_status: "approved",
        //             payment_status: this.payment_status,
        //         }   
        //     });
        //     if(response.status == 200){      
        //         this.paymentRequestData = response.data.data;
        //         this.total = response.data.total; 
        //         if(this.paymentRequestData != null){
        //             this.paymentRequestData.forEach((value)=> {
        //                 if(value.payment_request_id == this.oldPaymentRequestId){
        //                     this.title = value.title;
        //                 }
        //             });
        //         }                    
        //         this.loading = false;              
        //     }          
        // }, 
        // end 

        selectProjectName(){
            if(this.selected_id != null && this.selected_id != undefined && this.selected_id != ""){    
                this.project_name = this.projectData.find(x=> x.project_id == this.selected_id).project_name;         
                this.$emit("projectData", this.selected_id);
                this.dialogVisible = false;
            }                
        },

        handleSelectionChange(val){          
           this.selected_id = val.project_id;
        },
        handleSizeChange(val){
           this.pageSize = val;
        //    this.getData();
            this.getProjectData(); 
        },
        handleCurrentChange(val){
           this.currentPage =val;
        //    this.getData();
            this.getProjectData(); 
        }        
    }
}
</script>