<template>
    <div class="text-center" v-if="loading">
           <div class="spinner-border" role="status">
             <span class="sr-only">Loading...</span>
           </div>
       </div>
       <div class="container-fluid pt-5"  @click="$store.commit('setActive', false)" v-if="!loading">
        <form  @submit.prevent="updateData">       
           <div class="row">
            <div class="col-md-6 pt-5">
                <div class="card">
                    <!-- <img class="card-img-top" src="..." alt="Card image cap"> -->
                    <div class="card-body">
                        <div class="img__box">
                            <img :src="data.profile_picture.url" alt="">
                            <div class="overlay"><img :src="data.profile_picture.url" alt=""></div>
                        </div>                       
                        <div class="container">
                            <div>
                                <font-awesome-icon icon="fa-solid fa-user"/> {{ data.username }}
                             </div>
                             <div>
                                <font-awesome-icon icon="fa-solid fa-user"/> {{ data.employee_no }}
                             </div> 
                        </div>
                    </div>
                 </div>
                 <div class="card mt-5">
                    <div class="card-body">
                        <div class="container">
                            <div class="row" >
                                <div class="col-md-12"> 
                                    <!-- <div class="form-group">
                                        <label for="department">
                                            <small><b>User Status</b></small>
                                         </label>                                        
                                        <el-input type="text" id="inputUserStatus" 
                                        placeholder="Enter user status" v-model="UserFormData.user_status" clearable />
                                    </div> -->
                                    <UserRole :oldUserRoleId="oldUserRoleId" @userroleData="getUserRoleName($event)"  />
                                    <div class="form-group">
                                        <label for="inputUserStatus">User Status</label>                         
                                        <el-select v-model="UserFormData.user_status" id="type_of_section" :placeholder="$t('please_choose')"  style="width: 100%">
                                            <el-option
                                            v-for="item in userStatus"
                                            :key="item.status_name"
                                            :label="item.status_name"
                                            :value="item.status_id"
                                            />  
                                        </el-select>
                                    </div>
                                    <Office :titleOffice="titleOffice" :oldOfficeId="oldOfficeId" @officeData="getOfficetName($event)"  /> 
                                    <div class="form-group">
                                        <label for="inputUserStatus">Department</label>                         
                                        <el-select v-model="UserFormData.department" :placeholder="$t('please_choose')"  style="width: 100%">
                                            <el-option
                                            v-for="item in departments"
                                            :key="item.department_name"
                                            :label="item.department_name"
                                            :value="item.departmentid"
                                            />  
                                        </el-select>
                                    </div>
                                    <!-- <Department :titledepartment="titledepartment" :oldDepartmentId="oldDepartmentId" @departmentData="getDepartmentName($event)"  />  -->
                                </div> 
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
            <div class="col-md-6">
                <div class="row permission__list" v-for="(per, index) in permissionData" :key="index">
                    <div class="col-12">                      
                        <div class="row title">
                            <div class="col-6">{{ per.applicaton_category.value }}</div>  
                            <div class="col-6" v-show="index == 0">
                                <el-checkbox
                                v-model="checkAll"
                                :indeterminate="isIndeterminate"
                                @change="handleCheckAllChange"
                                >Check all</el-checkbox>
                            </div>                   
                        </div>   
                        <div class="row description">                       
                            <div class="container">
                                <div class="row"  v-for="(items, i) in per.applications" :key="i" >
                                    <div class="col-6"><h5>{{ items.name.value }}</h5></div>
                                    <div class="col-6">
                                            <el-checkbox-group
                                                v-model="checkedPermissions"
                                                @change="handleCheckedPermissionsChange"                                    >
                                                <el-checkbox v-for="per in items.list" :key="per.key" :label="per.key">{{ per.value }}</el-checkbox>
                                            </el-checkbox-group>                                   
                                        </div>
                                </div>
                            </div>                       
                        </div>  
                    </div>                         
                
                </div>
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
import Department from '@/components/Share/Department.vue';
import UserRole from '@/components/Share/UserRole.vue';
import Office from '@/components/Share/Office.vue';
   export default {
       name: 'UserShow',
       data() {
           return {  
               checkAll: false,
               isIndeterminate: false,
               checkedPermissions: [],
               permissionList: [],     
               submitting: false,  
               titledepartment: "Department",
               loading: true, 
               data: [],
               permissionData: [],       
               FormData: {
                    id: "",
                    userid: "",
                    permissions: [],
                }, 
                UserFormData: {

                },
                oldUserRoleId: "",
                oldDepartmentId: "",
                userStatus: [],
                departments: [],
                oldOfficeId: "",
                titleOffice: "Office",    
           }
       }, 
        components: {
        Department,
        UserRole, 
        Office, 
    },      
       created(){                
              this.getData(); 
              this.getPermission();  
                        
       },       
      methods: {
        handleCheckAllChange(val){
            this.checkedPermissions = val ? this.permissionList : [];
            this.isIndeterminate= false
        },
        handleCheckedPermissionsChange(value){
            const checkedCount = value.length
            this.checkAll= checkedCount === this.permissionList.length;
            this.isIndeterminate= checkedCount > 0 && checkedCount < this.permissionList.length;
        }, 
        getDepartmentName(data) {   
         this.UserFormData.department = data;        
        },
        getOfficetName(data){
            this.UserFormData.office_id= data;  
            this.getDepartment();         
        },
        getUserRoleName(data) {
            this.UserFormData.user_role = data;
            this.getUserStatus();               
        },
        async getUserStatus(){
            this.userStatus= [];
            let response = await authApi({
                            method: 'GET',
                            api: '/user_status',                 
                            params: {
                                role_id: this.UserFormData.user_role,
                            }
            });   
            if(response.status == 200){           
                this.userStatus= response.data.data; 
            }   
        },
        async getDepartment(){
            this.departments= [];
            let response = await authApi({
                            method: 'GET',
                            api: '/department',                 
                            params: {
                                id: '',
                                office_id: this.UserFormData.office_id,
                                keyword: '',                       
                                page: '',
                                limit: ''
                            }
            });   
            if(response.status == 200){      
                //console.log('dep'+ JSON.stringify(response.data.data));     
                this.departments= response.data.data; 
            }   
        },
        async getData(){         
            let response = await authApi({
                method: 'GET',
                api: '/cmsuser',
                params: {
                       userid: this.$route.params.id,
                       keyword: '',             
                       page: '',
                       limit: ''}   
            });
            if(response.message){            
                this.data = response.data.data[0];  
                this.oldUserRoleId=this.data.user_role;
                this.oldOfficeId= this.data.office_id;
                this.oldDepartmentId = this.data.department; 
                this.UserFormData.userid= this.$route.params.id;
                this.UserFormData.user_status= this.data.user_status;
                this.UserFormData.department= this.data.department;
                this.UserFormData.office_id =  this.data.office_id;
                this.getDepartment();
                this.UserFormData.user_role= this.data.user_role;   
                this.getUserStatus();          
                this.loading = false;                    
               // console.log('User Detail>>'+ JSON.stringify(this.oldUserRoleId))
            }
          
        },
        async getPermission(){            
            let response = await authApi({
                            method: 'GET',
                            api: '/app_permissions',
                    });
                    if(response.status == 200){ 
                        let data = response.data.data; 
                        for(let j=0; j< data.length; j++){
                            let newData= {
                                category: "",
                                application: [],
                            }
                            newData.category = data[j].applicaton_category.key;
                            let newList= data[j].applications;
                            for(let k=0; k< newList.length; k++){
                                let newsubData=  {
                                    name: "",
                                    method: [],
                                }
                                newsubData.name = newList[k].key;
                                newData.application.push(newsubData);
                            }
                            this.FormData.permissions.push(newData);                            
                        }                       
                        for(let i=0; i<data.length; i++){
                            const list= data[i].applications;
                            let app=[];                            
                            for(let j=0; j< list.length; j++){                               
                                let name= data[i].applicaton_category.key+"-"+list[j].key+"-";
                                let newper= [
                                        {key: name+"get",value: "Show"},
                                        {key: name+"post",value: "Create"},
                                        {key: name+"put",value: "Update"},
                                        {key: name+"delete",value: "Delete"}
                                        ];
                                        
                                app.push({
                                    name: list[j],
                                    list: newper,
                                });
                                this.permissionList.push(name+"get", name+"post",name+"put",name+"delete");                                        
                            }                           
                            data[i].applications= app;  
                        }
                        this.permissionData = data; 
                        this.userPermission();
                       
                } 
        },

        async userPermission(){
            let response = await authApi({
                            method: 'GET',
                            api: '/user_permissions',
                            params: {
                                userid: this.$route.params.id
                            }
            });
            if(response.status == 200){
                let permission = response.data.data.app_permissions.permissions;  
                //console.log('newpermission>>'+ JSON.stringify(permission))    
                for(let i=0; i< permission.length; i++){
                    let list= permission[i].application;
                    for(let j=0; j< list.length; j++){
                        let method = list[j].method;
                        for(let k=0; k< method.length; k++){
                            let name= permission[i].category+"-"+list[j].name+"-"+method[k];
                            this.checkedPermissions.push(name);
                        }                         
                    }
                }
                // console.log(JSON.stringify(this.checkedPermissions));
                // console.log(JSON.stringify(this.permissionList));
                let checkedCount = this.checkedPermissions.length;
                this.checkAll= checkedCount === this.permissionList.length;
                this.isIndeterminate= checkedCount > 0 && checkedCount < this.permissionList.length;                
            }                             
        },
        // getPermissionId(name, method){            
        //     for(let k=0; k< this.permissionData.length; k++){
        //       let permission= this.permissionData[k].applications.find(x=> x.name.key == name)
        //       if(permission !=null && permission !=undefined){                    
        //             if(method == 'get'){
        //                 if(permission.show == "") permission.show = method;   
        //                 else  permission.show = "";
        //             }
        //             if(method == 'post'){
        //                 if(permission.create == "") permission.create = method;   
        //                 else  permission.create = "";
        //             }
        //             if(method == 'put'){
        //                 if(permission.update == "") permission.update = method;   
        //                 else  permission.update = "";
        //             }
        //             if(method == 'delete'){
        //                 if(permission.delete == "") permission.delete = method;   
        //                 else permission.delete = "";
        //             }
        //             if(permission.show != "" || permission.create != "" || permission.update != "" || permission.delete != ""){                                
        //                     permission.isSelected= true; 
        //             }
        //             if(permission.show == "" && permission.create == "" && permission.update == "" && permission.delete == ""){                       
        //                     permission.isSelected= false; 
        //             } 
                   
        //             return;
        //       }             
        //     }          
        // },
        async updateData(){
            this.submitting = true;
            let cmsresponse = await authApi({
                                method: 'PUT',
                                api: '/cmsuser',                 
                                data: this.UserFormData
                        });
                        if(cmsresponse.status == 200){                           
                            this.FormData.userid= this.$route.params.id;
                            for(let i=0; i< this.checkedPermissions.length; i++){
                                let arr = this.checkedPermissions[i].split("-");
                                let getcategory= this.FormData.permissions.find(x=> x.category == arr[0]);
                                if(getcategory !=null && getcategory != undefined){
                                    let getname= getcategory.application.find(x=> x.name == arr[1]);
                                    if(getname != null && getname != undefined){
                                        getname.method.push(arr[2]);
                                    }
                                }             
                            }
                            // for(let i=0; i< this.permissionData.length;i++){    
                            //          let addData= {
                            //                 category: "",
                            //                 application:[]
                            //             }  
                            //     for(let j=0; j< this.permissionData[i].applications.length; j++){                                                      
                            //           if(this.permissionData[i].applications[j].isSelected){                                       
                            //             addData.category= this.permissionData[i].applicaton_category.key;
                            //             let newMethod=[];
                            //             if(this.permissionData[i].applications[j].show != ""){
                            //                 newMethod.push(this.permissionData[i].applications[j].show)
                            //             }
                            //             if(this.permissionData[i].applications[j].create != ""){
                            //                 newMethod.push(this.permissionData[i].applications[j].create)
                            //             }
                            //             if(this.permissionData[i].applications[j].update != ""){
                            //                 newMethod.push(this.permissionData[i].applications[j].update)
                            //             }
                            //             if(this.permissionData[i].applications[j].delete != ""){
                            //                 newMethod.push(this.permissionData[i].applications[j].delete)
                            //             }
                            //             addData.application.push({
                            //                     name: this.permissionData[i].applications[j].name.key,                                                
                            //                     method: newMethod
                            //             })                                      
                            //           }                           
                            //     }
                            //     if(addData.category != ""){
                            //             this.FormData.permissions.push(addData);           
                            //     } 
                            // }      
                            //console.log('permission data'+ JSON.stringify(this.FormData)) 
                            let cmsresponse = await authApi({
                                method: 'PUT',
                                api: '/user_permissions',                 
                                params: {
                                    userid: this.$route.params.id
                                },
                                data: this.FormData
                            }); 
                            if(cmsresponse.status == 200){
                                toast.success("User Permission Update successful !", {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 3000,
                                });
                                this.getData(); 
                                this.getPermission(); 
                                this.submitting = false;
                                this.$router.back(); 
                            } 
                        }        
        }
      }
       
   }
   </script>
   
   <style lang="scss" scoped >
   section#content {
    height: 85vh !important;
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
   .permission__list {
    //margin: 10px 20px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    .title {
        background: #eee;
        font-weight: 600;
        padding: 10px 20px;
        span {
            font-size: 12px;
            padding: 10px;
        }
    }
    .description {
        background: #fff;
        h5 {
            margin: 5px 0px;
            font-size: 14px;
        }
        span {            
            padding: 10px 20px;
        }
    }
}
   .card {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    background: #fff;
    .card-body {
        .container{
            padding-top: 30px;
        }
        .img__box {
            position: absolute;
            top: -50px;
            left: 0;
            right: 0;
            text-align: center;
            .overlay {
                position: absolute; 
                bottom: 0; 
                color: #f1f1f1; 
                width: 100%;
                transition: .5s ease;
                opacity:0;
                color: white;
                font-size: 20px;
                padding: 20px;
                text-align: center;
                
              }              
              img {
                width: 100px;
                height: 100px;
                border-radius: 100px;
              }
           }
         
          .img__box:hover .overlay {
            opacity: 1; 
            background: transparent; 
            bottom: -100px;            
            img {
               
                width: 200px;
                height: 200px;   
                border-radius: 100%;               
              }
          }
    }
    
   }
   
    </style>