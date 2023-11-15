<template>
    <div class="form-group">
                       <div class="row">
                          
                           <p v-if="titleName != null"> <small><b> {{ titleName }} </b></small>  <br> <small class="text-secondary">  {{ titleName }} </small> </p>
                           <p  v-if="titleName == null"> <small><b> {{ $t('approver') }} </b></small>  <br> <small class="text-secondary"> 0 {{ $t('approval') }} </small> </p>
                           <div class="d-flex" v-for="show of showapprover" :key="show.userid">
                               <div class="j-box">
                                   <img src="../../assets/images/employee.png" alt="" class="img-employee ml-4"> 
                                   <font-awesome-icon icon="fa-solid fa-circle-xmark" class="xmark ml-1" @click="RemoveShowApprover(show.userid)" /><br>
                                   <small class="text-secondary ml-3 mt-1">{{show.username}}</small>
                               </div>                              
                           </div>
                           <div class="circle-box ml-3" data-toggle="modal" data-target="#approver__modal">
                               <font-awesome-icon icon="fa-solid fa-plus" class="text-primary"/>
                           </div>                           
                       </div>                        
                    </div>

<div class="modal fade" id="approver__modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
</div>
</template>
<script>
import {authApi} from '@/http/authApi'
import $ from 'jquery';
export default {
   data() {
       return {
           approver: [],
           showapprover: [],
           department: [],
           // approverList: [],   
           isIndeterminate: false,
           checkAll: false,
           checkedUsers: [],
           office: [],
       }
   },
   props: {    
       oldapprover: Number,
       titleName: {
           type: String,
           default: null
       }
   },
   // props: ['oldapprover', 'titleName'==null],
   created(){        
      this.getDepartment();
       if(this.oldapprover !=null){
           this.getOldApprover();
       }
   },
   emits :{
       approverUser: null, 
   },
   methods: {
       RemoveShowApprover(userid){          
           this.showapprover = this.showapprover.filter(x=> x.userid != userid); 
           this.checkedUsers = this.checkedUsers.filter(x=> x.userid != userid);      
           //this.handleCheckedUsersChange(this.checkedUsers);
           this.$emit("approverUser", this.showapprover );

       },
       RemoveCheckedUsers(userid){
           this.checkedUsers = this.checkedUsers.filter(x=> x.userid != userid);            
           this.handleCheckedUsersChange(this.checkedUsers);
       },
       handleCheckAllChange(val){
           this.checkedUsers = val ? this.approver : [];
           this.isIndeterminate = false;
       },
      handleCheckedUsersChange(value){        
       const checkedCount = value.length;
       this.checkAll = checkedCount === this.approver.length;
       this.isIndeterminate = checkedCount > 0 && checkedCount < this.approver.length;
      
       },
       async getOffice(){
            let response = await authApi({
               method: 'GET',
               api: '/office',
               params: {
                      id: '',
                      keyword: '',                       
                      page: '',
                      limit: ''
               }   
           });
           if(response.status == 200){
               this.office = response.data.message;
               this.getDepartment()
           }
       },
       async getDepartment(id){         
           let response = await authApi({
               method: 'GET',
               api: '/departmentsforappcc',
               params: {
                      id: '',                       
                      keyword: '',             
                      page: '',
                      limit: ''
               }   
           });
           if(response.message){            
               const list= response.data.data;
               this.department = list.map(v => ({...v, isSelected: false}));
              // console.log('dep'+ JSON.stringify(response.data.data));
               this.getCmsUser(this.department[0].departments[0].departmentid);                          
              
           }
         
       },
       async getCmsUser(id){ 
           this.approver=[];           
           let response = await authApi({
               method: 'GET',
               api: '/user_list',  
               params: {
                   department_id: id,
                   type: 1
               }              
           });
           if(response.status == 200){ 
               this.approver = response.data.data;
               this.handleCheckedUsersChange(this.checkedUsers);
           }
       },  
       async getOldApprover(){             
           this.approver=[];           
           let response = await authApi({
               method: 'GET',
               api: '/user_list',  
               params: {
                   department_id: "",
                   type: 1
               }              
           });
           if(response.status == 200){ 
               const approver= response.data.data;  
               if(this.oldapprover !=null && this.oldapprover != undefined){              
               approver.forEach((value) => {                   
                   if(this.oldapprover.find(x=>x == value.userid)){  
                       this.showapprover.push(value);
                   }
                });
               }
               this.checkedUsers = this.showapprover;
               this.$emit("approverUser", this.showapprover );  
           }
       },  
      
       removeshowapprover(id){ 
           this.showapprover =  this.showapprover.filter(x=> x.userid != id);
           this.approverList = this.showapprover;     
           this.$emit("approverUser", this.showapprover);
       },
       getapprover(){          
           this.showapprover= this.checkedUsers;           
           $('#approver__modal').modal('hide');
           this.$emit("approverUser", this.showapprover );
       },

       
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