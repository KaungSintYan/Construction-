<template>
    <div class="form-group">
                       <small><b> Participant </b></small>
                       <div class="row">                          
                           <div class="d-flex" v-for="show of showParticipant" :key="show.userid">
                               <div class="j-box">
                                   <img src="../../assets/images/employee.png" alt="" class="img-employee ml-4"> 
                                   <font-awesome-icon icon="fa-solid fa-circle-xmark" class="xmark ml-1" @click="RemoveShowParticipant(show.userid)" /><br>
                                   <small class="text-secondary ml-3 mt-1">{{show.username}}</small>
                               </div>                              
                           </div>
                           <div class="circle-box ml-3" data-toggle="modal" data-target="#participant__modal">
                               <font-awesome-icon icon="fa-solid fa-plus" class="text-primary"/>
                           </div>                          
                       </div>                       
                    </div>

                    <div class="modal fade" id="participant__modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                                           <span class="text" v-for="app of checkedPatiUsers" :key="app.userid" 
                                            @click="RemoveCheckedPartiUsers(app.userid)">{{ app.username }}
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
                                               <!-- <div class="row" v-for="dep of department" :key="dep.departmentid"  @click="getCmsUser(dep.departmentid)">
                                                   <span class="py-2">
                                                       {{ dep.department_name }}
                                                   </span>
                                               </div>                                                -->
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
                                               <el-checkbox-group v-model="checkedPatiUsers" @change="handleCheckedParticipantChange">
                                                   <el-checkbox v-for="item of participant" :key="item.userid" :label="item">{{ item.username }}</el-checkbox>
                                               </el-checkbox-group> 
                                           </div>                                                                                      
                                       </div>
                                   </div>
                               </div>                  
                                                
                           </div>
                           <div class="modal-footer">
                               <button type="button" class="btn btn-btn-light btn-sm " data-dismiss="modal" style="border: 1px solid #D0D4D8; border-radius: 5px;" >{{ $t('cancel') }}</button>
                               <button type="button" class="btn btn-primary btn-sm"  @click="getParticipant">{{ $t('sure') }}</button>
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
           participant: [],
           showParticipant: [],
           department: [],       
           isIndeterminate: false,
           checkAll: false,
           checkedPatiUsers: [],
       }
   },
   props: ['oldParticipant'],
   created(){ 
       this.getDepartment();
       if(this.oldParticipant !=null){
           this.getOldParticipant();
       }
   },
   emits :{
       participantUser: null, 
   },
   methods: {
       RemoveShowParticipant(userid){       
        
           this.showParticipant = this.showParticipant.filter(x=> x.userid != userid); 
           this.checkedPatiUsers = this.checkedPatiUsers.filter(x=> x.userid != userid);      
           this.$emit("participantUser", this.showParticipant );

       },
       RemoveCheckedPartiUsers(userid){
           this.checkedPatiUsers = this.checkedPatiUsers.filter(x=> x.userid != userid);            
           this.handleCheckedParticipantChange(this.checkedPatiUsers);
       },
       handleCheckAllChange(val){
           this.checkedPatiUsers = val ? this.participant : [];
           this.isIndeterminate = false;
       },   
      handleCheckedParticipantChange(value){        
       const checkedCount = value.length;
       this.checkAll = checkedCount === this.participant.length;
       this.isIndeterminate = checkedCount > 0 && checkedCount < this.participant.length;
      
       },
       async getDepartment(){         
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
               this.getCmsUser(this.department[0].departments[0].departmentid);   
           }
         
       },
       async getCmsUser(id){ 
           this.participant=[];           
           let response = await authApi({
               method: 'GET',
               api: '/user_list',  
               params: {
                   department_id: id,
                   type: 1
               }              
           });
           if(response.status == 200){ 
               this.participant = response.data.data;
               //console.log('list'+ JSON.stringify(this.participant));
               this.handleCheckedParticipantChange(this.checkedPatiUsers);
           }
       },  
       async getOldParticipant(){                 
           this.participant=[];           
           let response = await authApi({
               method: 'GET',
               api: '/user_list',  
               params: {
                   department_id: "",
                   type: 1
               }              
           });
           if(response.status == 200){ 
               const parti= response.data.data;  
               if(this.oldParticipant !=null && this.oldParticipant != undefined){              
                parti.forEach((value) => {                   
                   if(this.oldParticipant.find(x=>x == value.userid)){  
                       this.showParticipant.push(value);
                   }
                });
               }
               this.checkedPatiUsers = this.showParticipant;             
               this.$emit("participantUser", this.showParticipant);  
           }
       },  
     
       getParticipant(){          
           this.showParticipant = this.checkedPatiUsers;           
           $('#participant__modal').modal('hide');
          // console.log('user'+ JSON.stringify(this.showParticipant));
           this.$emit("participantUser", this.showParticipant);
       },

       
   }
}
</script>
<style lang="scss">
.border__box {   
    border: 1px solid #D0D4D8;
    height: 300px;
}
.box_left {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
}
.box_right {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
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
  .second-box, .third-box {   
    border: 1px solid #D0D4D8;
  }

</style>