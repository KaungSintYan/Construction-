<template>
    <div class="container-fluid"  @click="$store.commit('setActive', false)">   
      <form  @submit.prevent="createData"> 
        <div class="row">
            <div class="col-md-12"> 
    
                        <div class="form-group mb-3">
                            <label for="team_name">
                                <span class="text-danger">*</span> <small><b> {{ $t('team_name') }} </b></small>
                            </label>
                            <el-input type="text" :placeholder="$t('please_enter')" id="team_name" v-model="FormData.team_name" clearable />
                        </div>

                        <Picker @pickerData="getPickerName($event)"  />
                        <span v-if="v$.FormData.team_leader.$error" class="text-danger">
                            <span v-if="v$.FormData.team_leader.$errors[0].$message != ''">
                                {{$t('is_required',{'name': $t('team_leader')})}}
                            </span>
                        </span>
                        <div class="form-group mb-3">
                            <label for="phone_number_of_person_in_charge">
                                <small><b> {{ $t('ph_no_of_person') }} </b></small>  
                            </label>
                            <el-input type="number" :placeholder="$t('please_enter')"  id="phone_number_of_person_in_charge" v-model="FormData.phone_number" clearable />
                            <span v-if="v$.FormData.phone_number.$error" class="text-danger">
                                <span v-if="v$.FormData.phone_number.$errors[0].$message != ''">
                                    {{ $t('is_required',{'name': $t('ph_no_of_person')}) }}
                                </span>
                            </span>
                        </div>

                        <TeamMember :titleName="$t('team_member')" @teamMember="getTeamMember($event)" />
                        
                        <!-- <div class="form-group mb-3">
                            <label for="team_members">
                                Team Members   s
                            </label>
                            <input type="button" class="form-control text-primary" id="team_members" value="+ Add team members" data-toggle="collapse" href="#team_member" role="button" aria-expanded="false" aria-controls="collapseExample">

                           
                            <div class="collapse mt-2" id="team_member">
                            <div class="card card-header">
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" :placeholder="$t('please_choose')" aria-label="Recipient's username" aria-describedby="basic-addon2">
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" type="button">
                                            <font-awesome-icon icon="fa-solid fa-search"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="card card-body">

                                <div class="list-group">
                                    <a href="#" class="list-group-item list-group-item-action">
                                        <div class="row">
                                            <div class="blue-box ml-2">painte</div>
                                            <p class="mt-2 ml-2"> Painter a </p>
                                        </div>
                                    </a>
                                    <a href="#" class="list-group-item list-group-item-action">
                                        <div class="row">
                                            <div class="blue-box ml-2">crane</div>
                                            <p class="mt-2 ml-2"> Crane div </p>
                                        </div>
                                    </a>
                                    <a href="#" class="list-group-item list-group-item-action">
                                        <div class="row">
                                            <div class="blue-box ml-2">roster</div>
                                            <p class="mt-2 ml-2"> roster KK </p>
                                        </div>
                                    </a>
                                    <a href="#" class="list-group-item list-group-item-action">
                                        <div class="row">
                                            <div class="blue-box ml-2">vlytcc</div>
                                            <p class="mt-2 ml-2"> Vlytcc </p>
                                        </div>
                                    </a>
                                </div>

                                
                            </div>
                        </div> 
                        </div>
                         -->
                            <div class="form-group mb-3">
                                <label for="remark">
                                    <small><b> {{ $t('remark') }} </b></small>
                                </label>
                                <el-input v-model="FormData.remark" maxlength="100" 
                                :placeholder="$t('please_enter')"  show-word-limit type="textarea" />  
                            </div>
                            <div class="row mt-5"></div>
    
            </div>
        </div>     
        <div class="footer-main pt-2 pl-3">
            <el-button type="primary" loading v-if="submitting">Submiting ...</el-button>     
            <button type="submit" class="btn btn-primary btn-footer" v-if="!submitting"> {{ $t('submit') }} </button>
        </div>
      </form> 
    </div>

 </template>

 <script>    
import {authApi} from '@/http/authApi'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'; 
import Picker from '@/components/Share/Picker.vue';   
import TeamMember from '@/components/Share/TeamMember.vue'
import useValidate from '@vuelidate/core'
import {required} from '@vuelidate/validators'

export function validName(name){
    let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
    if(validNamePattern.test(name)){
        return true;
    }
    return false;
}

 export default {
     name: 'TeamCreate',
     data() {
         return {
            v$: useValidate(),
             submitting: false,
             data: [],
             FormData: {
                team_name: "",
                team_leader: "",
                phone_number: "",
                team_member: [],
                remark: "",
                creation_time: "",                
             },   
            //  team_member: [],                  
             showapprover: [],              
         }
     },
     
     components: {
        Picker,
        TeamMember
     },
     validations(){
        return {
            FormData : {
                phone_number: {
                    required,
                },
                team_leader: {
                    required,
                }
            }   
        }
     },
     created(){ 
        // this.getTeamMember(); 
     },
     methods:{
        getPickerName(data){
            this.FormData.team_leader = data;   
        },
        getTeamMember(data){
          console.log('List>>'+ JSON.stringify(data));       
          this.showapprover = data;
        },
       
        async createData(e){   
            this.submitting= true;   
            this.v$.$validate();
            if(this.v$.$error){
                this.submitting = false;
                return;
            }               
            this.showapprover.forEach((value) => {
                this.FormData.team_member.push(value.roster_id);                
            });     
           // console.log('list>>'+JSON.stringify(this.FormData.team_member))       
            let response = await authApi({
                method: 'POST',
                api: '/constructionmanagement/team',
                data: this.FormData 
            });
            if(response.status == 201){   
                    toast.success("Team Insert successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
                    // this.submitting= false; 
                   this.$router.back();  
            }
        },
     }
     
 }
 </script>

 <style lang="scss" scoped>
 #content {
     background-color: red !important;
 }
 .box1{
     margin: 10px;
     background: rgb(244, 247, 255);
     padding: 10px;   
     img {
         width: 40px;
         height: 40px;
     }
     span {
         margin-left: 10px;
         font-size: 16px;
         font-weight: 600;
         
     }
 }
 a{
     text-decoration: none;
 }
 .date-input{
     width: 200px;
 }
 .designer_upload-image-list-container{
     display: flex;
     flex-wrap: wrap;
     vertical-align: baseline;
 }
 ._designer-upload-btn{
     margin-bottom: 8px;
     display: flex;
     align-items: center;
     -webkit-box-align: center;
     -webkit-box-pack: center;
     justify-content: center;
     width: 80px;
     height: 80px;
     border-radius: 4px;
     border: 1px dashed #c0ccda;
     background-color: #fbfdff;
     cursor: pointer;
     transition: all .15s;
 }
 .iconfont{
     font-family: "iconfont";
     font-size: 16px;
     font-style: normal;
     cursor: pointer;
 }
 .icontext{
     font-size: 14px;
     cursor: pointer;
 }
 .designer-upload-images-input{
     display: none;
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
     padding: 5px 46px;
     font-size: 13px;
 }
 .img-employee{
    width: 35px;
    height: 35px;
 }
 .j-box{
    position: relative;
    width: 100px;
    // height: 150px;
 }
 .xmark{
    top: 0;
    right: 0;
    cursor: pointer;
 }
 .circle-box{
    border: 1px dashed #6D92FB;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    text-align: center;
    padding: 7px;
    cursor: pointer;
 }
 .model-input{
    width: 50%;
 
 }
 .table-box{
        box-sizing: border-box;
        border: 1px solid #ebeef5;
        border-right: none;
        border-bottom: none;
        vertical-align: inherit;
        font-size: 14px;
    }
    thead{
        background-color:#F6F7FB;
    }
    tfoot{
        background-color:#F6F7FB;
    }
    .table_main_box{
        width: 100%;
        border-left: 1px solid gainsboro;
        border-right: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
    }
    .footer-input{
        width: 40px;
    }
    .block-title{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: space-between;
    flex-direction: row;
  }
  .block-title strong{
    flex-grow: 1;
  }
  .budget-box{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: space-around;
  }
  .b-box{
    background-color: #F9F9FA;
    padding: 10px;
  }
  .box-footer{
    border: 1px solid #d5def0;
    border-radius: 5px;
    width: 100%;
    padding: 7px;
    text-align: center;
    cursor: pointer;
  }
  .box-footer:hover{
    background-color: #EDF3FE;
  }
  .first-box{
    border: 1px solid #D0D4D8;
    width: 100%;
    height: 100px;
    border-radius: 3px;
  }
  .second-box{
    border: 1px solid #D0D4D8;
    width: 49%;
    height: 400px;
    border-radius: 3px;
  }
  .third-box{
    border: 1px solid #D0D4D8;
    width: 49%;
    height: 400px;
    border-radius: 3px;
  }
  .input-inner{
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
        background-color: white;
        background-image: url('../../assets/images/searchicon.png');
        background-size: 14px;
        background-position: 10px 10px;
        background-repeat: no-repeat;
        padding: 12px 20px 12px 40px;
        /* transition: width 0.4s ease-in-out; */
        transition: border-color .2s cubic-bezier(cubic-bezier(0.645, 0.045, 0.355, 1));
        height: 35px;
    }
    .box-circle{
        position: relative;
        width: 60px;
        height: 20px;
        margin-bottom: 70px;
        padding: 10px;
        box-sizing: border-box;
    }
    .li{
        position: absolute;
        background-color: #6D92FB;
        color: white;
        border-radius: 100%;
        padding: 10px;
        width: 50px;
        height: 50px;
        text-align: center;
    }
    .icon-font{
        position: absolute;
        top: 1;
        right: 0;
        cursor: pointer;
    }
    .status{
        position: absolute;
        top: 70px;

    }
    #complilation_date{
        width: 200px;
    }
    #program_start_date{
        width: 200px;
    }
    .left-side{
        border-right: 1px solid black;
    }
    .select-box{
        margin: auto;
        padding-right: 300px;
    }
    .operation{
        float: right;
        box-sizing: border-box;
        margin-right: 20px;
    }
    .operator{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        align-content: space-between;
        flex-direction: row;
    }
    .operator p{
        flex-grow: 1;
    }
    .caret-wrapper{
        display: inline-flex;
        flex-direction: column;
        vertical-align: middle;
        cursor: pointer;
        font-size: 10px;
    }
    .payment_complete{
        color:rgb(40, 31, 31);
    }
    .payment_complete:hover{
        color: #6D92FB;
        text-decoration: underline;
    }
    .blue-box{
        width: 50px;
        height: 50px;
        padding-top: 11px;
        // padding: 10px;
        border-radius: 100%;
        background-color: #6D92FB;
        text-align: center;
        color: white;
    }
 </style>