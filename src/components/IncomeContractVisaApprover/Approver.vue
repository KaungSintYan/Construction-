<template>  
    <div class="container-fluid"  @click="$store.commit('setActive', false)">
        <div class="row mb-3">
            <div class="col-sm-8"></div>
            <div class="col-sm-4 d-flex justify-content-end">
                <el-select id="approval_status" v-model="approval_status" :placeholder="$t('please_choose')"  style="width: 100%" @change="getData">
                    <el-option label="Approver"  value="Approver" />  
                    <el-option  label="CC"  value="CC" />  
                </el-select>      
            </div> 
        </div>
        <div class="row mx-2">  
            <el-table :data="data" border style="width: 100%">
                <el-table-column  fixed type="index" width="55" />          
                <el-table-column prop="approve_status" :label="$t('approval_status')" width="200" />
                <el-table-column prop="project_id" :label="$t('project')" width="200" sortable />
                <el-table-column prop="visa_name" :label="$t('visa_name')" width="200" sortable />
                <el-table-column prop="visa_number" :label="$t('odd_number')" width="200" sortable />
                <el-table-column prop="amount_with_tax" :label="$t('amount_including_tax')" width="220" sortable />
                <el-table-column prop="tax_rate" :label="$t('tax_rate')" width="200" sortable />
                <el-table-column prop="tax" :label="$t('tax')" width="200" sortable />
                <el-table-column prop="amount_without_tax" :label="$t('excluding_tax_amount')" width="220" sortable />         
                <el-table-column prop="created_by_user" :label="$t('founder')" width="200" sortable />
                <el-table-column prop="creation_time" :label="$t('creation_time')" width="200" />     
                <el-table-column label="Approver" width="200">
                    <template #default="scope">
                        <el-tag v-for="approver of scope.row.approver"  :key="approver"   type="success" class="mx-1" effect="light" round > 
                            {{ approver }}
                        </el-tag>                       
                    </template>
                </el-table-column>   
                <el-table-column label="CC" width="200">
                    <template #default="scope">
                        <el-tag v-for="cc of scope.row.cc"  :key="cc"   type="success" class="mx-1" effect="light" round > 
                            {{ cc }}
                        </el-tag>                       
                    </template>
                </el-table-column>          
                <el-table-column fixed="right" :label="$t('operate')"  width="160" v-if="showApprover">
                <template #default="scope">
                 <div class="action__btn d-flex">                                
                                <el-tooltip
                                class="box-item"
                                effect="dark"
                                :content="$t('edit')"
                                placement="top"
                                >                             
                                <button class="btn-warning circle__btn"  @click="getEdit(scope.row)">
                                    <font-awesome-icon icon="fa-solid fa-pencil" class="icon"/>
                                </button>
                                </el-tooltip>
                 </div>
                </template>
                </el-table-column>
            </el-table>       
               
        </div>
     
    </div>
    <div class="footer__bar">
        <div class="container-fluid mt-3">           
            <div class="row">
                <div class="col-sm-6">                    
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
    <el-dialog
    v-model="editDialog"
    title="Edit approver"
    width="30%"
    align-center>
    <div class="container-fluid">      
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label for="remark"> <span class="text-danger">*</span>  {{ $t('remark') }}</label>
                    <el-input type="textarea" :placeholder="$t('please_enter')" id="remark"
                    v-model="FormData.remark" maxlength="500" show-word-limit  />                                          
                </div>
                <div class="form-group">
                    <label for="remark"> <span class="text-danger">*</span>  {{ $t('approval_status') }}</label>
                    <el-select v-model="FormData.approval_status" id="approval_status" :placeholder="$t('please_choose')"  style="width: 100%">
                        <el-option
                          v-for="item in approval"
                          :key="item.key"
                          :label="item.value"
                          :value="item.key"
                        />  
                    </el-select>                                    
                </div>
               </div> 
        </div>

    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editDialog = false">Cancel</el-button>
        <el-button type="primary" @click="updateData">
            {{ $t('sure') }}
        </el-button>
      </span>
    </template>
    </el-dialog>   
</template>
<script>
import {authApi} from '@/http/authApi'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
    name: 'Approver',
    data() {
        return { 
            data: [],             
            FormData: {
              application_id: "",
              remark: "",
              approval_status: ""
            },  
            approval: [
                {key: 'approval', value: 'Approval'},
                {key: 'approved', value: 'Approved'},
                {key: 'approval_rejected', value: 'Approval Rejected'},
                {key: 'revoked', value: 'Revoked'},
                {key: 'draft', value: 'Draft'},
            ],
            editDialog: false, 
            showApprover: true, 
            approval_status: "Approver",
            //pagination
            background: false,
            disabled: false,
            small: false,
            pageSize: 20,   
            currentPage: 1,  
            total: 0,        
        }
    },    
    created(){        
        this.getData();
    },
    methods:{ 
        async getData(val){            
            let type= "";
            let api= '/contractmanagement/rc_visa_approver_cc';            
            if(val == "CC"){               
                type = 0;
                this.showApprover = false;
            }
            else{
                this.showApprover = true;
                type = 1;
            }        
            let response = await authApi({
                method: 'GET',
                api: api,
                params: {                     
                       type: type,
                       page: this.currentPage,
                       limit: this.pageSize,
                }   
            });
            if(response.message){            
                const list= response.data.data;  
                this.data = list.map(v => ({...v, isSelected: false})); 
                this.total = response.data.total;
            }          
        }, 
     
        
        getEdit(data){
        this.FormData.visa_id= data.revenue_contract_visa_id;
        this.FormData.remark= data.remark;
        this.FormData.approval_status= data.approve_status;
        this.editDialog = true;  
        },

        async updateData() {
            let response = await authApi({
                method: 'POST',
                api: '/contractmanagement/rc_visa_approver_cc',
                params: {
                       id: '',
                       type: 1,
                },
                data: this.FormData
            });
            
            if(response.status == 200){
                this.editDialog = false;
                 toast.success("Approver Update successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                this.getData();               
            }
        },
        handleSizeChange(val){
           this.pageSize = val;
           this.getData();
        },
        handleCurrentChange(val){
           this.currentPage =val;
           this.getData();
        }, 
    
    }
    
}
</script>
