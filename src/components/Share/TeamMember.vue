<template>
    <div class="form-group ml-3">
                       <div class="row">
                          
                           <p v-if="titleName != null"> <small><b> {{ titleName }} </b></small>  <br> <small class="text-secondary"> 0 {{ titleName }} </small> </p>
                           <p  v-if="titleName == null"> <small><b> {{ $t('approver') }} </b></small>  <br> <small class="text-secondary"> 0 {{ $t('approval') }} </small> </p>
                           <div class="d-flex" v-for="show of showapprover" :key="show.roster_id">
                               <div class="j-box">
                                   <img src="../../assets/images/employee.png" alt="" class="img-employee ml-4"> 
                                   <font-awesome-icon icon="fa-solid fa-circle-xmark" class="xmark ml-1" @click="RemoveShowApprover(show.roster_id)" /><br>
                                   <small class="text-secondary ml-3 mt-1">{{show.name}}</small>
                               </div>                              
                           </div>

                           <!-- <div class="circle-box ml-3" data-toggle="modal" data-target="#approver__modal">
                               <font-awesome-icon icon="fa-solid fa-plus" class="text-primary"/>
                           </div>      -->

                           <div class="row ml-2"> 
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
                    </div>

                    <!-- start  -->

                    <el-dialog v-model="dialogVisible" :title="titleHeader" width="60%" draggable>

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

                                <el-table :data="data" border style="width: 100%;"  @selection-change="handleSelectionChange">

                                <el-table-column fixed type="selection" width="55" />          
                                <el-table-column prop="name" :label="$t('name')" width="250" sortable />
                                <el-table-column prop="id_number" :label="$t('id_num')" width="250" sortable/>
                                <el-table-column prop="phone_number" :label="$t('ph_no')" width="250" sortable />
                                <el-table-column prop="gender" :label="$t('gender')" width="250" sortable />
                                <el-table-column prop="bank" :label="$t('bank')" width="250" sortable />
                                <el-table-column prop="card_no" :label="$t('bank_card_number')" width="250" sortable />
                                <el-table-column prop="wages" :label="$t('wages')" width="250" sortable  />
                                <el-table-column prop="team" :label="$t('team')" width="250" sortable />
                                <el-table-column prop="work_type" :label="$t('type_of_work')" width="250" sortable />
                                <el-table-column prop="salary_type" :label="$t('salary_type')" width="250" sortable />
                                <el-table-column prop="created_by_user" fixed="right" :label="$t('created_by_user')" width="250" sortable />

                                <!-- <el-table-column fixed :label="item.selected_name" :key="item.selected_id" :indeterminate="isIndeterminate" @change="handleCheckAllChange" width="60">
                                    <template #default="scope">
                                            <el-checkbox :checked="scope.row.selected_name.includes(scope.row.selected_id)" />
                                    </template>
                                </el-table-column> -->
                                    

                                    <!-- <el-table-column fixed label="" width="60" >
                                        <template #default="scope">
                                            <el-radio-group v-model="selected_id" class="ml-4">
                                                <el-radio :label="scope.row.roster_id" size="large">{{ selected_name }}</el-radio>                                  
                                            </el-radio-group>   
                                        </template>

                                        
                                    </el-table-column> -->

                                    <!-- <el-table-column>
                                        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">Check all</el-checkbox>
                                            <el-checkbox-group v-model="checkedUsers" @change="handleCheckedUsersChange">
                                                <el-checkbox v-for="item of approver" :key="item.userid" :label="item">{{ item.username }}</el-checkbox>
                                            </el-checkbox-group> 
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
                                    </el-table-column> -->                                    
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

                    <!-- end  -->

<!-- <div class="modal fade" id="approver__modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                       <div class="modal-dialog modal-dialog-centered" role="document">
                           <div class="modal-content" style="width: 100%;">
                           <div class="modal-header">
                               <h5 class="modal-title" id="exampleModalLongTitle"> <small> <small><b>{{ $t('personal_list') }}</b></small> </small> </h5>
                               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                               <span aria-hidden="true">&times;</span>
                               </button>
                           </div>
                           <div class="modal-body">  
                               <div class="container">
                                   <div class="row">
                                       <div class="first-box">
                                           <span class="text" v-for="app of checkedUsers" :key="app.userid"  @click="RemoveCheckedUsers(app.userid)">{{ app.username }}
                                            <span class="close__btn">X</span></span>
                                       </div>
                                   </div>
                                   <div class="row mt-2">
                                       <div class="col-md-6 border__box box_left">
                                           <div class="container-fluid mt-2">                                            
                                               <div class="row">
                                                   <el-input type="text" :placeholder="$t('enter_keyword')" clearable >
                                                       <template #suffix>
                                                           <el-icon class="el-input__icon"> <font-awesome-icon icon="fa-solid fa-search" /> </el-icon>
                                                         </template>                                                  
                                                   </el-input>
                                               </div>                                               
                                               <div class="row" v-for="off of department" :key="off.office_name" >
                                                   <span class="py-2">
                                                       {{ off.office_name }}
                                                   </span>
                                                   <div class="row ml-2" v-for="dep of off.departments" :key="dep.departmentid"  @click="getCmsUser(dep.departmentid)">
                                                       <span class="py-2" style="font-size: 12px !important;">
                                                           {{ dep.department_name }}
                                                       </span>
                                                   </div>
                                               </div>                                               
                                           </div>  
                                       </div>
                                       <div class="col-md-6 border__box box_right">
                                           <div class="form-group mt-2">
                                               <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">Check all</el-checkbox>
                                               <el-checkbox-group v-model="checkedUsers" @change="handleCheckedUsersChange">
                                                   <el-checkbox v-for="item of approver" :key="item.userid" :label="item">{{ item.username }}</el-checkbox>
                                               </el-checkbox-group> 
                                           </div>                                                                                      
                                       </div>
                                   </div>
                               </div> 
                           </div>
                           <div class="modal-footer">
                               <button type="button" class="btn btn-btn-light btn-sm " data-dismiss="modal" style="border: 1px solid #D0D4D8; border-radius: 5px;" >{{ $t('cancel') }}</button>
                               <button type="button" class="btn btn-primary btn-sm"  @click="getapprover">{{ $t('sure') }}</button>
                           </div>
                           </div>
                       </div>
</div> -->

</template>
<script>
import {authApi} from '@/http/authApi'
import $ from 'jquery';
export default {
   data() {
       return {
           name: "",
           showPicker: {},
           selected_id: "", 
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
            team_member:"12"
           },
           work_type: [],
           data: [],
           approver: [],
           showapprover: [],
           department: [],
           // approverList: [],   
           isIndeterminate: false,
           checkAll: false,
           checkedUsers: [],
           office: [],
           selectedData: [],
       }
   },
//    props: ['oldPickerId', 'oldWorkTypeId'],
//    props: {    
//      oldteamMember: Number,
//        titleName: {
//            type: String,
//            default: null
//        }
//    },
   props: ['oldteamMember', 'titleName'],
   created(){        
       this.getWorkType();
       console.log(JSON.stringify(this.oldteamMember))
       if(this.oldteamMember !=null){
           this.getOldPickerData();
       }

       //this.getWorkType();
   },
   emits :{
       teamMember: null, 
   },
   methods: {

      handleCheckAllChange(val){
           this.checkedPatiUsers = val ? this.participant : [];
           this.isIndeterminate = false;
       },   
      handleCheckedParticipantChange(value){        
       const checkedCount = value.roster_id;
       this.checkAll = checkedCount === this.participant.roster_id;
       this.isIndeterminate = checkedCount > 0 && checkedCount < this.participant.roster_id;
      
       },

        // start 
        async getWorkType(){
            let response = await authApi({
                method: 'GET',
                api: '/worktypes',
                params: {
                    status: '',
                    usernam: '',
                    // page: '',
                    // limit: ''
                    page: this.currentPage,
                    limit: this.pageSize,
                }
            });
            if(response.status == 200){
                this.work_type = response.data.data;
                if(this.oldWorkTypeId != null && this.oldWorkTypeId != undefined){
                    this.FormData.work_type = this.oldWorkTypeId;
                }
                else{
                    this.FormData.work_type = this.work_type[0].work_type_id;
                }
                this.getPickerData(); 
            }
        },  

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
                this.total = response.data.total;
                // if(this.oldteamMember !=null && this.oldteamMember != undefined){
                //     this.data.forEach((value)=> {
                //         if(value.roster_id == this.oldteamMember){
                //         this.name= value.name;
                //         this.selected_id = value.roster_id;  
                //         this.showPicker = value;
                //         }                   
                //     })  
                // }
            }
        },
        async getOldPickerData(){
            for(let i=0; i< this.oldteamMember.length; i++){
                let response = await authApi({
                method: 'GET',
                api: '/get_worker',
                params: {
                    work_type: this.oldteamMember[i].work_type,                   
                }
            });
            if(response.message){
                let data = response.data.data;
               // console.log(JSON.stringify(data))
                for(let j=0; j<this.oldteamMember[i].members.length; j++){                   
                    let  member= data.find(x=>x.roster_id == this.oldteamMember[i].members[j]);
                    if(member){
                        this.showapprover.push(member);
                    }
                }
               
            }
            }
            
        },
        
        selectProjectName(){ 
            // console.log(JSON.stringify(this.selectedData)) 
            for(let i=0; i< this.selectedData.length; i++){
                // console.log(this.selectedData[i].roster_id)      
                let id = this.showapprover.find(x=> x.roster_id == this.selectedData[i].roster_id);                 
                if(!id || id == undefined){
                    this.showapprover.push(this.selectedData[i]);    
                }               
            }
            this.$emit("teamMember",this.showapprover);
            this.dialogVisible = false;
            // if(this.selected_id != null && this.selected_id != undefined && this.selected_id != ""){    
            //     this.name = this.data.find(x=> x.roster_id == this.selected_id).name;                   
            //     this.$emit("pickerData", this.selected_id);
            //     this.showPicker = this.data.find(x=> x.roster_id == this.selected_id); 
            //    // console.log('user'+ JSON.stringify(this.showPicker));
            //     this.dialogVisible = false; 
            // }                      
        },

        handleSelectionChange(val){  
            this.selectedData = val; 
        },
        handleSizeChange(val){
           this.pageSize = val;
        //    this.getData();
           this.getWorkType(); 
        },
        handleCurrentChange(val){
           this.currentPage =val;
        //    this.getData();
           this.getWorkType(); 
        },

        // end 

       RemoveShowApprover(id){          
           this.showapprover = this.showapprover.filter(x=> x.roster_id != id); 
           //this.checkedUsers = this.checkedUsers.filter(x=> x.roster_id != id);      
           //this.handleCheckedUsersChange(this.checkedUsers);
           this.$emit("teamMember", this.showapprover );
       },
       
    //    RemoveCheckedUsers(userid){
    //        this.checkedUsers = this.checkedUsers.filter(x=> x.userid != userid);            
    //        this.handleCheckedUsersChange(this.checkedUsers);
    //    },
    //    handleCheckAllChange(val){
    //        this.checkedUsers = val ? this.approver : [];
    //        this.isIndeterminate = false;
    //    },
    //   handleCheckedUsersChange(value){        
    //    const checkedCount = value.length;
    //    this.checkAll = checkedCount === this.approver.length;
    //    this.isIndeterminate = checkedCount > 0 && checkedCount < this.approver.length;
      
    //    },
    //    async getOffice(){
    //         let response = await authApi({
    //            method: 'GET',
    //            api: '/office',
    //            params: {
    //                   id: '',
    //                   keyword: '',                       
    //                   page: '',
    //                   limit: ''
    //            }   
    //        });
    //        if(response.status == 200){
    //            this.office = response.data.message;
    //            this.getDepartment()
    //        }
    //    },
    //    async getDepartment(id){         
    //        let response = await authApi({
    //            method: 'GET',
    //            api: '/departmentsforappcc',
    //            params: {
    //                   id: '',                       
    //                   keyword: '',             
    //                   page: '',
    //                   limit: ''
    //            }   
    //        });
    //        if(response.message){            
    //            const list= response.data.data;
    //            this.department = list.map(v => ({...v, isSelected: false}));
    //           // console.log('dep'+ JSON.stringify(response.data.data));
    //            this.getCmsUser(this.department[0].departments[0].departmentid);                          
              
    //        }
         
    //    },
    //    async getCmsUser(id){ 
    //        this.approver=[];           
    //        let response = await authApi({
    //            method: 'GET',
    //            api: '/user_list',  
    //            params: {
    //                department_id: id,
    //                type: 1
    //            }              
    //        });
    //        if(response.status == 200){ 
    //            this.approver = response.data.data;
    //            this.handleCheckedUsersChange(this.checkedUsers);
    //        }
    //    },  
    //    async getOldApprover(){             
    //        this.approver=[];           
    //        let response = await authApi({
    //            method: 'GET',
    //            api: '/user_list',  
    //            params: {
    //                department_id: "",
    //                type: 1
    //            }              
    //        });
    //        if(response.status == 200){ 
    //            const approver= response.data.data;  
    //            if(this.oldapprover !=null && this.oldapprover != undefined){              
    //            approver.forEach((value) => {                   
    //                if(this.oldapprover.find(x=>x == value.userid)){  
    //                    this.showapprover.push(value);
    //                }
    //             });
    //            }
    //            this.checkedUsers = this.showapprover;
    //            this.$emit("teamMember", this.showapprover );  
    //        }
    //    },  
      
    //    removeshowapprover(id){ 
    //        this.showapprover =  this.showapprover.filter(x=> x.userid != id);
    //        this.approverList = this.showapprover;     
    //        this.$emit("teamMember", this.showapprover);
    //    },
    //    getapprover(){          
    //        this.showapprover= this.checkedUsers;           
    //        $('#approver__modal').modal('hide');
    //        this.$emit("teamMember", this.showapprover );
    //    },

       
   }
}
</script>
<style lang="scss">
.border__box {   
   border: 1px solid #D0D4D8;
   height: 300px;
   overflow: scroll;
}
.box_left {
   border-top-left-radius: 3px;
   border-bottom-left-radius: 3px;
}
.box_right {
   border-top-right-radius: 3px;
   border-bottom-right-radius: 3px;
}
.el-checkbox { 
   display: inherit !important;
}
.circle-box{
   border: 1px dashed #6D92FB;
   border-radius: 50%;
   width: 40px;
   height: 40px;
   text-align: center;
   cursor: pointer;
   padding: 10px;
}
.j-box{
   position: relative;
   width: 100px;
   // height: 150px;
   .img-employee{
   width: 35px;
   height: 35px;
   }
   .file_icon {
      width: 35px;
      height: 35px;
      color: lightseagreen;
   }
   .xmark{
       top: 0;
       right: 0;
       cursor: pointer;
     
    }
}
.first-box{
   border: 1px solid #D0D4D8;
   width: 100%;
   height: 100px;
   border-radius: 3px;
   padding: 10px;
    span.text {
        background: #ddd;
        padding: 5px;
        margin: 2px;
        color: #000;
        .close__btn {
            color: #999
        }
    }
 }
 
</style>