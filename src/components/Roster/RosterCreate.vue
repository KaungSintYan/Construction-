<template>
    <div class="container-fluid"  @click="$store.commit('setActive', false)">   
        <form  @submit.prevent="createData" > 
            <div class="row">
                <div class="col-md-12">  
                
                            <div class="form-group mb-3">
                                <label for="name">
                                    <span class="text-danger">*</span> <small><b> {{ $t('name') }} </b></small> 
                                </label>
                                <el-input type="text" :placeholder="$t('please_enter')" id="name" v-model="FormData.name" clearable />
                                <span v-if="v$.FormData.name.$error" class="text-danger">
                                    <span v-if="v$.FormData.name.$errors[0].$message != ''">
                                        {{ $t('is_required',{'name': $t('name')}) }}
                                    </span>
                                </span>
                            </div>

                            <div class="form-group mb-3">
                                <label for="id_number">
                                    <span class="text-danger">*</span> <small><b> {{ $t('id_num') }} </b></small> 
                                </label>
                                <el-input type="number" :placeholder="$t('please_enter')" id="id_number" v-model="FormData.id_number" clearable />
                                <span v-if="v$.FormData.id_number.$error" class="text-danger">
                                    <span v-if="v$.FormData.id_number.$errors[0].$message != ''">
                                        {{ $t('is_required',{'name': $t('id_num')}) }}
                                    </span>
                                </span>
                            </div>

                            <div class="form-group mb-3">
                                <div class="form-group">
                                    <label for="gender"><small><b> {{ $t('gender') }} </b></small></label>
                                </div>                               
                                <el-radio-group v-model="FormData.gender" class="ml-4">
                                    <el-radio label="male" size="large"> {{ $t('male') }} </el-radio>
                                    <el-radio label="female" size="large"> {{ $t('female') }} </el-radio>
                                </el-radio-group>                                
                            </div>

                            <div class="form-group mb-3">
                                <label for="phone_number">
                                    <small><b> {{ $t('ph_no') }} </b></small>
                                </label>
                                <el-input type="number" :placeholder="$t('please_enter')" id="phone_number" v-model="FormData.phone_number" clearable />
                                <span v-if="v$.FormData.phone_number.$error" class="text-danger">
                                    <span v-if="v$.FormData.phone_number.$errors[0].$message != ''">
                                        {{ $t('is_required',{'name': $t('ph_no')}) }}
                                    </span>
                                </span>
                            </div>

                            <div class="form-group mb-3">
                                <label for="bank">
                                    <small><b> {{ $t('bank') }} </b></small>  
                                </label>
                                <el-input type="text" :placeholder="$t('please_enter')" v-model="FormData.bank" id="bank" clearable />
                                <span v-if="v$.FormData.bank.$error" class="text-danger">
                                    <span v-if="v$.FormData.bank.$errors[0].$message != ''">
                                        {{ $t('is_required',{'name': $t('bank')}) }}
                                    </span>
                                </span>
                            </div>

                            <div class="form-group mb-3">
                                <label for="bank_card_number">
                                    <small><b> {{ $t('bank_card_number') }} </b></small>
                                </label>
                                <el-input type="number" :placeholder="$t('please_enter')" v-model="FormData.card_no" id="bank_card_number" clearable />
                                <span v-if="v$.FormData.card_no.$error" class="text-danger">
                                    <span v-if="v$.FormData.card_no.$errors[0].$message != ''">
                                        {{ $t('is_required',{'name': $t('bank_card_number')}) }}
                                    </span>
                                </span>
                            </div>  

                            <!-- <div class="form-group mb-3">
                                <div class="form-group">
                                    <label for="team"><small><b> {{ $t('team') }} </b></small></label>
                                </div> 
                                <el-select v-model="FormData.team" class="" :placeholder="$t('please_choose')"  style="width: 100%">
                                    <el-option
                                      v-for="item in teams"
                                      :key="item.team_id"
                                      :label="item.team_name"
                                      :value="item.team_id"
                                    > 
                                    <div class="type_work__div">
                                        <el-avatar class="bg-success"> {{ item.team_name  }} </el-avatar> 
                                        <h5>{{ item.team_name }}</h5>
                                    </div>   
                                    </el-option>
                                </el-select>
                                <span v-if="v$.FormData.team.$error" class="text-danger">
                                    <span v-if="v$.FormData.team.$errors[0].$message != ''">
                                        {{ $t('is_required',{'name': $t('team')}) }}
                                    </span>
                                </span>
                            </div> -->

                            <div class="form-group mb-3">
                                <div class="form-group">
                                    <label for="type_of_work"><small><b> {{ $t('type_of_work') }} </b></small></label>
                                </div> 
                                <el-select v-model="FormData.work_type" class="" :placeholder="$t('please_choose')"  style="width: 100%">
                                    <el-option
                                      v-for="item in work_type"
                                      :key="item.work_type_id"
                                      :label="item.work_type_name"
                                      :value="item.work_type_id"
                                    > 
                                    <div class="type_work__div">
                                        <el-avatar class="bg-success"> {{ item.work_type_name  }} </el-avatar> 
                                        <h5>{{ item.work_type_name }}</h5>
                                    </div>   
                                    </el-option>
                                </el-select>
                                <span v-if="v$.FormData.work_type.$error" class="text-danger">
                                    <span v-if="v$.FormData.work_type.$errors[0].$message != ''">
                                        {{ $t('is_required',{'name': $t('type_of_work')}) }}
                                    </span>
                                </span>
                            </div> 

                            <SalaryType @SalaryData="getSalaryData($event)" />

                            <!-- <div class="form-group mb-3">
                                <div class="form-group">
                                    <label for="salary_type"><small><b> {{ $t('salary_type') }} </b></small></label>
                                </div> 
                                <el-select v-model="FormData.salary_type" class="" :placeholder="$t('please_choose')"  style="width: 100%">
                                    <el-option
                                      v-for="item in salary_type"
                                      :key="item.type_id"
                                      :label="item.name"
                                      :value="item.type_id"
                                    />  
                                </el-select>
                                <span v-if="v$.FormData.salary_type.$error" class="text-danger">
                                    <span v-if="v$.FormData.salary_type.$errors[0].$message != ''">
                                        {{ $t('is_required',{'name': $t('salary_type')}) }}
                                    </span>
                                </span>
                            </div> -->

                            <div class="form-group mb-3">
                                <div class="form-group">
                                    <label for="wages"><small><b> {{ $t('wages') }} </b></small></label>
                                </div>                              
                                <el-input type="number"  id="wages" :placeholder="$t('please_enter')" v-model="FormData.wages"
                                clearable />
                                <span v-if="v$.FormData.wages.$error" class="text-danger">
                                    <span v-if="v$.FormData.wages.$errors[0].$message != ''">
                                        {{ $t('is_required',{'name': $t('wages')}) }}
                                    </span>
                                </span>
                            </div>
                            <div class="form-group mb-3">
                                <label for="remark">
                                    <small><b> {{ $t('remark') }} </b></small>
                                </label>
                                <el-input v-model="FormData.remark" maxlength="100" 
                                :placeholder="$t('please_enter')"  show-word-limit type="textarea" />  
                            </div>
                            <Picture @picture="getPicture($event)" />
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
import Picture from '@/components/Share/Picture.vue';
import useValidate from '@vuelidate/core'
import {required} from '@vuelidate/validators'
import SalaryType from '@/components/Share/SalaryType.vue'

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
                name: "",
                id_number: "",
                gender: "male",
                phone_number: "",
                bank: "",
                card_no: "",
                wages: "",
                remark: "",
                picture: null,
                creation_time: "",
                // team: "",
                work_type: "" ,
                salary_type: "", 
                created_by_user: ""                         
             },                     
             pictureImages: [] ,
             salary_type: [],
             work_type: [],
             teams: [],
         }
     },
    
     components: {        
        Picture,
        SalaryType
     },
     validations(){
        return {
            FormData : {
                bank : {
                    required,
                },
                card_no : {
                    required,
                },
                id_number : {
                    required,
                },
                name : {
                    required,
                },
                phone_number : {
                    required,
                },
                salary_type : {
                    required,
                },
                // team : {
                //     required,
                // },
                wages : {
                    required,
                },
                work_type : {
                    required,
                },
            }
        }
     },
     created(){        
        this.getSalaryType();  
        this.getWorkType(); 
        // this.getTeam();    
       
     },
     methods:{       
        getPicture(data){
         this.pictureImages = data;
        },
        getSalaryData(data){
            this.FormData.salary_type = data;
        },
        // async getTeam(){            
        //      let response = await authApi({
        //          method: 'GET',
        //          api: '/constructionmanagement/team',     
        //          params: {
        //                id: '',
        //                keyword: '',             
        //                page: '',
        //                limit: ''
        //         }           
        //      });
        //      if(response.status == 200){ 
        //         this.teams = response.data.data;
        //         //console.log('team'+ JSON.stringify(this.teams));
        //      }
        // },
        
        async getSalaryType() {
            let response = await authApi({
                method: 'GET',
                api: '/constructionmanagement/salary_type',
                params: {
                    name: ""
                }
            });
            if(response.status == 200){ 
                this.salary_type = response.data.data;
                //console.log('salaryList'+ JSON.stringify(this.salary_type));
             }
        },
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
                //console.log('worktype'+ JSON.stringify(this.work_type));
            }
        },
        async createData(e){   
            this.submitting= true;
            this.v$.$validate();
            if(this.v$.$error){
                this.submitting = false;
                return;
            }
            let response = await authApi({
                method: 'POST',
                api: '/constructionmanagement/roster',
                data: this.FormData 
            });
            if(response.status == 201){     
                const id = response.data.roster_id; 
                const imgformData = new FormData();
                imgformData.append('roster_id',id);
                this.pictureImages.forEach((value) => {
                     imgformData.append('picture', value.url);   
                });
                          
                let imgResponse = await authApi({
                method: 'POST',
                api:  '/constructionmanagement/roster_datafiles',       
                data: imgformData
                });
                if(imgResponse.status == 200){
                   
                    toast.success("Roster Insert successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
                    this.$router.back();
                }
                        
            }
        },
     }
     
 }
 </script>

 <style lang="scss">
 .el-select-dropdown__item {
    height: 40px;
    line-height: 40px;
    margin: 5px 0px;
    .type_work__div {
        display: flex;
        h5 {
            font-size: 16px;
            margin-top: 10px;
            margin-left: 10px;
        }   
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
     padding: 5px 70px 5px 70px;
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