<template>   
    <div class="form-group mb-3">        
          
            <label for="margin_type" >
                <span class="tmargin_type text-danger">*</span> <small><b> {{ $t('margin') }} </b></small> 
            </label>           
            <el-input type="text" id="margin_type" :placeholder="$t('please_enter')"
            v-model="margin_type_name" @click="dialogVisible = true" clearable />
    </div> 
    <el-dialog v-model="dialogVisible" :title="$t('margin')" width="60%" draggable>
        <div class="container-fluid">
            <div class="row mx-2 mb-4">
                <el-table :data="marginTypeData" border style="width: 100%;"  @row-click="handleSelectionChange">
                    <el-table-column fixed label="" width="60" >
                        <template #default="scope">
                            <el-radio-group v-model="selected_id" class="ml-4">
                                <el-radio :label="scope.row.margin_type_id" size="large">{{ selected_name }}</el-radio>                                  
                              </el-radio-group>                              
                        </template>
                    </el-table-column>
                    
                    <el-table-column :label="$t('margin')" width="800px" > 
                        <template #default="scope">
                            {{ scope.row.margin_type_name }}                           
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
      props: ['oldMarginTypeId'],
      data() {
        return {
             dialogVisible: false,
             loading: true,
             selected_id: "", 
             selected_name: "",  
             margin_type_id: "",
             margin_type_name: "",
             marginTypeData: [],
             background: false,
            disabled: false,
            small: false,
            pageSize: 20,   
            currentPage: 1,  
            total: 0,               
        }
      },
     emits :{
        marginTypeData: null, 
    },
    created() {
      this.getMarginTypeData();      
    },     
    methods: {
        
        
        async getMarginTypeData(){            
            let response = await authApi({
                method: 'GET',
                api: '/margintype',
                params: {
                       id: '',
                       keyword: '',
                       status: '',                       
                    //    page: '',
                    //    limit: ''
                       page: this.currentPage,
                       limit: this.pageSize,
                }   
            });
            if(response.status == 200){            
                const list= response.data.data;                
                this.marginTypeData = list;
                this.total = response.data.total;          
                //console.log('res'+ JSON.stringify(this.marginTypeData))
                this.marginTypeData.forEach((value)=> {
                    if(value.margin_type_id == this.oldMarginTypeId){
                        this.selected_id = value.margin_type_id;
                        this.margin_type_name = value.margin_type_name;
                    }
                })                         
                this.loading = false; 
              
            }          
        }, 
        selectProjectName(){
            if(this.selected_id != null && this.selected_id != undefined && this.selected_id != ""){    
                this.margin_type_name = this.marginTypeData.find(x=> x.margin_type_id == this.selected_id).margin_type_name;         
                this.$emit("marginTypeData", this.selected_id);
                this.dialogVisible = false;
            }                
        },
         
        handleSelectionChange(val){          
           this.selected_id = val.margin_type_id;
        },
        handleSizeChange(val){
           this.pageSize = val;
        //    this.getData();
           this.getMarginTypeData(); 
        },
        handleCurrentChange(val){
           this.currentPage =val;
        //    this.getData();
           this.getMarginTypeData(); 
        }    
       
    }
}
</script>
