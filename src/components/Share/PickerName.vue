<template>
    <div class="form-group">
        <label for="state">
            <small><b>{{ titleHeader }}</b></small>
        </label>
        <!-- <div class="form-group">
            <el-input type="text" :placeholder="$t('please_choose')" class="" id="picker_name" 
            v-model="showusername" @click="dialogVisible = true" clearable/>
        </div>        -->
        <div class="row"> 
            <div v-show="showPicker.roster_id != null">
                <div class="j-box">
                    <img src="../../assets/images/employee.png" alt="" class="img-employee ml-4">
                </div>  
                <p class="text-center mt-1" style="font-size: 12px;" >
                    {{ showPicker.name }}
                </p>                
            </div>                             
           
            <div class="circle-box ml-3" @click="dialogVisible = true" >
                <font-awesome-icon icon="fa-solid fa-plus" class="text-primary"/>
            </div>
        </div>   
    </div>
    <el-dialog v-model="dialogVisible" :title="titleHeader" width="60%" draggable>
        <!-- <div class="container-fluid">
            <div class="row mx-2 mb-4">
                <el-table :data="pickerData" border style="width: 100%;"  @row-click="handleSelectionChange">
                    <el-table-column fixed label="" width="60" >
                        <template #default="scope">
                            <el-radio-group v-model="selected_id" class="ml-4">
                                <el-radio :label="scope.row.roster_id" size="large">{{ selected_name }}</el-radio>                                  
                              </el-radio-group>                              
                        </template>
                    </el-table-column>
                    
                    <el-table-column :label="$t('name')" width="800px;"> 
                        <template #default="scope">
                            {{scope.row.username}}
                        </template>
                    </el-table-column>

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
        </div> -->

        <div class="container-fluid">
        <div class="row mx-2 mb-4">

            <el-select v-model="FormData.work_type" class="mb-2" :placeholder="$t('please_choose')" @change="getPickerData()" style="width: 100%">
                <el-option
                    v-for="item in work_type"
                    :key="item.work_type_id"
                    :label="item.work_type_name"
                    :value="item.work_type_id"
                > 
                <div class="type_work__div">
                    <!-- <el-avatar class="bg-success"> {{ item.work_type_name  }} </el-avatar>  -->
                    <p>{{ item.work_type_name }}</p>
                </div>   
                </el-option>
            </el-select>

            <el-table :data="data" border style="width: 100%;" @row-click="handleSelectionChange">

                <!-- <el-table-column  fixed type="selection" width="55" />     
                    <el-table-column prop="name" sortable  :label="$t('name')" width="250px" />
                    <el-table-column prop="id_number" :label="$t('id_num')" sortable width="150px"/>
                    <el-table-column prop="phone_number" :label="$t('ph_no')" width="150px" sortable/>
                    <el-table-column prop="gender" :label="$t('gender')" width="250px" sortable/>
                    <el-table-column prop="bank" :label="$t('bank')" width="250px" sortable/>
                    <el-table-column prop="card_no" :label="$t('bank_card_number')" width="250px" sortable/>
                    <el-table-column prop="wages" :label="$t('wages')" width="250px" sortable/>
                    <el-table-column prop="team" :label="$t('team')" width="250px" sortable/>
                    <el-table-column prop="work_type" :label="$t('type_of_work')" width="250px" sortable/>
                    <el-table-column prop="salary_type" :label="$t('salary_type')" width="250px" sortable/>
                    <el-table-column prop="created_by_user" :label="$t('created_by_user')"  width="250px"  sortable/>       -->

                <el-table-column fixed label="" width="60" >
                    <template #default="scope">
                        <el-radio-group v-model="selected_id" class="ml-4">
                            <el-radio  :label="scope.row.roster_id" size="large">{{ selected_name }}</el-radio>                                  
                        </el-radio-group>                              
                    </template>
                </el-table-column>
                
                <el-table-column :label="$t('name')" width="250px"> 
                    <template #default="scope">
                        {{scope.row.name}}
                    </template>
                </el-table-column>
                <el-table-column :label="$t('id_num')" width="250px"> 
                    <template #default="scope">
                        {{scope.row.id_number}}
                    </template>
                </el-table-column>
                <el-table-column :label="$t('ph_no')" width="250px"> 
                    <template #default="scope">
                        {{scope.row.phone_number}}
                    </template>
                </el-table-column>
                <el-table-column :label="$t('gender')" width="250px"> 
                    <template #default="scope">
                        {{scope.row.gender}}
                    </template>
                </el-table-column>
                <el-table-column :label="$t('bank')" width="250px"> 
                    <template #default="scope">
                        {{scope.row.bank}}
                    </template>
                </el-table-column>
                <el-table-column :label="$t('bank_card_number')" width="250px"> 
                    <template #default="scope">
                        {{scope.row.card_no}}
                    </template>
                </el-table-column>
                <el-table-column :label="$t('wages')" width="250px"> 
                    <template #default="scope">
                        {{scope.row.wages}}
                    </template>
                </el-table-column>
                <el-table-column :label="$t('team')" width="250px"> 
                    <template #default="scope">
                        {{scope.row.team}}
                    </template>
                </el-table-column>
                <el-table-column :label="$t('type_of_work')" width="250px"> 
                    <template #default="scope">
                        {{scope.row.work_type}}
                    </template>
                </el-table-column>
                <el-table-column :label="$t('salary_type')" width="250px"> 
                    <template #default="scope">
                        {{scope.row.salary_type}}
                    </template>
                </el-table-column>
                <el-table-column :label="$t('created_by_user')" width="250px"> 
                    <template #default="scope">
                        {{scope.row.created_by_user}}
                    </template>
                </el-table-column>
                
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
      data() {
        return {
                       
             showPicker: {},
            
             showusername: "", 

             selected_id: "", 
             roster_id: "",
             selected_name: "", 
             dialogVisible: false,
             background: false,
             disabled: false,
             small: false,
             pageSize: 20,   
             currentPage: 1,  
             total: 0, 
             FormData: {
                work_type: "",
                work_type_name: "",
                
             },
             work_type: [],
             data: [],
  
        }
      },
     props: ['oldPickerId', 'titleHeader'],
     emits :{
        work_type: null, 
    },
     created(){ 
        //   this.getPickerData();
          this.getWorkType();
     },
    methods: {       
        async getPickerData(){         
            let response = await authApi({
                method: 'GET',
                api: '/get_worker',  
                params: {
                    work_type: this.FormData.work_type, 
                } 
            });
            if(response.message){   
                this.data = response.data.data;                
                // const list= response.data.data;
                // this.pickerData = list;
                // console.log('work_type'+ JSON.stringify(this.work_type));

                this.total = response.data.total;   
                if(this.oldPickerId !=null && this.oldPickerId != undefined){
                    this.work_type.forEach((value)=> {
                        if(value.roster_id == this.oldPickerId){  
                            this.showusername=  value.username;                  
                            this.selected_id = value.roster_id;  
                            this.showPicker = value;                   
                        }                   
                    })  
                }                                          
              
            }          
        }, 

        // start 

        async getWorkType(){         
            let response = await authApi({
                method: 'GET',
                api: '/worktypes',
                params: {
                       status: '',
                       name: '',
                       page: '',
                       limit: ''
                }   
            });
            if(response.status == 200){
                this.work_type = response.data.data;   
                this.FormData.work_type = this.work_type[0].roster_id;  
                this.getPickerData();          
                //console.log('worktype'+ JSON.stringify(this.work_type));
            }
        },

        // end 

        selectProjectName(){         
            if(this.selected_id != null && this.selected_id != undefined && this.selected_id != ""){    
                this.name = this.data.find(x=> x.roster_id == this.selected_id).name;                   
                this.$emit("pickerData", this.selected_id);
                this.showPicker = this.data.find(x=> x.roster_id == this.selected_id); 
               // console.log('user'+ JSON.stringify(this.showPicker));
                this.dialogVisible = false;
            }                      
        },
        handleSelectionChange(val){          
           this.selected_id = val.roster_id;
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
