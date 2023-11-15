<template>  
    <div class="container-fluid"  @click="$store.commit('setActive', false)">
        <form @submit.prevent="createUser"> 
           <div v-if="!userInfo">
            <div class="row" >          
                <div class="col-md-12">            
                    <div class="form-group row">
                        <label for="inputUsername" class="col-sm-2 col-form-label">Username</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputUsername" placeholder="Enter your name" v-model="UserForm.username">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="inputPassword" placeholder="Password" v-model="UserForm.password">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputConfirmedPassword" class="col-sm-2 col-form-label">Confirm Password</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="inputConfirmedPassword" placeholder="Password" v-model="UserForm.password2">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                            <input type="email" class="form-control" id="inputEmail" placeholder="Enter your email address" v-model="UserForm.email">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPhoneNo" class="col-sm-2 col-form-label">Phone</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputPhoneNo" placeholder="Enter your phone" v-model="UserForm.phone_number">
                        </div>
                    </div>
                </div> 
            </div>
            <div class="footer-main pt-2 pl-3" >        
                <button class="btn btn-primary btn-footer" type="button" @click="userInfo=!userInfo"> Next </button>
            </div> 
            </div> 
            <div v-if="userInfo">
                <div class="row" >
                    <div class="col-md-12">            
                        <div class="form-group">
                            <label for="inputEmployeeNo">Employee No</label>
                              <el-input type="text"  id="inputEmployeeNo" placeholder="Enter employee no" v-model="CMSUserForm.employee_no" clearable />
                        </div>                       
                        <UserRole @userroleData="getUserRoleName($event)"  />
                         <div class="form-group">
                            <label for="inputUserStatus">User Status</label>                         
                            <el-select v-model="CMSUserForm.user_status" id="type_of_section" :placeholder="$t('please_choose')"  style="width: 100%">
                                <el-option
                                  v-for="item in userStatus"
                                  :key="item.status_name"
                                  :label="item.status_name"
                                  :value="item.status_id"
                                />  
                            </el-select>
                        </div>
                        <Office :titleOffice="titleOffice" @officeData="getOfficetName($event)"  /> 
                        <div class="form-group">
                            <label for="inputUserStatus">Department</label>                         
                            <el-select v-model="CMSUserForm.department" :placeholder="$t('please_choose')"  style="width: 100%">
                                <el-option
                                  v-for="item in departments"
                                  :key="item.department_name"
                                  :label="item.department_name"
                                  :value="item.departmentid"
                                />  
                            </el-select>
                        </div>
                        <!-- <Department :titledepartment="titledepartment" :officeId="CMSUserForm.office_id" @departmentData="getDepartmentName($event)"  />  -->
                    </div> 
                </div>          
                
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
                <div class="row pt-3"></div>
                    <div class="footer-main pt-2 pl-3">        
                        <el-button type="primary" loading v-if="submitting">Submiting ...</el-button>     
                        <button type="submit" class="btn btn-primary btn-footer" v-if="!submitting"> {{ $t('submit') }} </button>
                    </div> 
                </div> 
        </form>       
    </div>    
</template>
<script>
import {authApi} from '@/http/authApi'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Department from '@/components/Share/Department.vue';
import Office from '@/components/Share/Office.vue';
import UserRole from '@/components/Share/UserRole.vue';
export default {
    name: 'UserCreate',
    data() {
        return { 
            submitting: false,  
            checkAll: false,
            isIndeterminate: false,
            checkedPermissions: [],
            permissionList: [],   
            //
            titledepartment: "Department",
            titleOffice: "Office",                                            
            userInfo: false,     
            UserForm: {
                username: "",         
                password: "",
                password2: "", 
                email: "",
                phone_number: ""            
            },
           CMSUserForm: {
                userid: "",
                employee_no: "",
                user_status: "", 
                user_role: "", 
                office_id: "",
                department: "", 
                picture: ""
           }, 
           FormData: {
            userid: "",
            permissions: [],
           },         
           permissionData: [], 
           userStatus: [],
           departments: [],
        }
    }, 
    components: {
        Department,
        Office,
        UserRole,  
    },   
    created(){  
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
                } 
        },
        getDepartmentName(data) {   
         this.CMSUserForm.department = data;             
        },
        getOfficetName(data){
            this.CMSUserForm.office_id= data;  
            this.getDepartment();         
        },
        getUserRoleName(data) {
            this.CMSUserForm.user_role = data; 
            this.getUserStatus();       
        },
        async getUserStatus(){
            this.userStatus= [];
            let response = await authApi({
                            method: 'GET',
                            api: '/user_status',                 
                            params: {
                                role_id: this.CMSUserForm.user_role,
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
                                office_id: this.CMSUserForm.office_id,
                                keyword: '',                       
                                page: '',
                                limit: ''
                            }
            });   
            if(response.status == 200){      
                console.log('dep'+ JSON.stringify(response.data.data));     
                this.departments= response.data.data; 
            }   
        },
        async createUser(){          
                 
            this.submitting = true;
            this.getUserStatus();    
            let response = await authApi({
                            method: 'POST',
                            api: '/createuser',                 
                            data: this.UserForm
                    });                   
                    if(response.status == 200){
                        this.CMSUserForm.userid = response.data.userid; 
                        let cmsresponse = await authApi({
                                method: 'POST',
                                api: '/cmsuser',                 
                                data: this.CMSUserForm
                        });

                        if(cmsresponse.status == 201){                           
                            this.FormData.userid= this.CMSUserForm.userid;
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
                            let cmsresponse = await authApi({
                                method: 'POST',
                                api: '/user_permissions',                 
                                params: {
                                    userid: this.CMSUserForm.userid 
                                },
                                data: this.FormData
                            }); 

                            if(cmsresponse.status === 201){
                                console.log(cmsresponse.status.data + "UUII"); 
                                toast.success("User Create Insert Successfully!", {
                                    position: toast.POSITION.TOP_RIGHT,
                                    autoClose: 3000, 
                                });
                            }else{
                                toast.error(response.message,{
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 3000, 
                        });
                            }

                            this.$router.back(); 

                        }else{
                            toast.error(response.message,{
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 3000, 
                        });
                        }      
                    }else{
                        toast.error(response.message,{
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 3000, 
                        });
                    }   
                    
                    // this.$router.back();
        },
    }
       
}
</script>
<style lang="scss" scoped>

.permission__list {
    margin: 0px 20px;
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
        
    }
}
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
</style>