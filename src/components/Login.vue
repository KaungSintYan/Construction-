<template>
   <div class="login">
    <div class="container">
        <div class="row">
            <div class="col-md-12 d-flex justify-content-end">    
                <div class="card mt-3">  
                    <div class="card-header">
                        <div v-show="!showForgetPassword">
                            <img src="../assets/images/logo.svg" alt="" class="mb-1">
                            <span>{{ $t('head') }}</span>  
                        </div>
                        <div v-show="showForgetPassword">
                            <span @click="showForgetPassword = !showForgetPassword"><font-awesome-icon icon="fa-solid fa-angle-left" /> back login </span>
                        </div>
                       
                    </div> 
                    <div class="card-body" style="width: 600px;">
                        <div v-show="!showForgetPassword && !showNewPasswordForm">
                            <div class="tabbable-responsive">
                                <div class="tabbable">
                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                    <a class="nav-link active" id="first-tab" data-toggle="tab" href="#first" role="tab" aria-controls="first" aria-selected="true"> {{ $t('password_login') }}
                                     <div class="nav_underline"></div>
                                    </a>                                                              
                                    </li>
                                    <!-- <li class="nav-item">
                                    <a class="nav-link" id="second-tab" data-toggle="tab" href="#second" role="tab" aria-controls="second" aria-selected="false"> {{ $t('verification_code') }}  
                                        <div class="nav_underline"></div>
                                    </a>                               
                                       
                                    </li> -->
                                </ul>
                                </div>
                            </div>
                            <div class="tab-content">
                                <div class="tab-pane fade show active" id="first" role="tabpanel" aria-labelledby="first-tab">
                                    <div class="container mt-3">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <form v-on:submit="login">
                                                    <div class="form-group">
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <div class="input-group-text">+95</div>
                                                            </div>
                                                            <input type="tel" class="form-control" name="phone" id="phone" v-model="formData.phone_number" placeholder="Please enter the phone number">
                                                        </div>
                                                    </div>
                                                    <div class="form-group">                                                   
                                                        <input type="password" class="form-control" id="password" v-model="formData.password" placeholder="Please enter password">
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <div class="form-check">
                                                                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                                                <label class="form-check-label" for="exampleCheck1">{{ $t('remember_password') }}</label>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                           <span @click="showForgetPassword = !showForgetPassword">{{ $t('forget_password') }}</span>
                                                        </div>
                                                    </div>                                               
                                                    <button type="submit" class="mt-2 mb-2 btn btn-primary btn-block">{{ $t('login_immediately') }}</button>
    
                                                   <p class="m-auto text-center"><span>Logging in means agreeing to <a href="https://www.asiaoracle.com/"> Asia Oracle </a></span></p> 
                                                </form>                                            
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               
                            </div>   
                        </div>
                        <div v-show="showForgetPassword && !showNewPasswordForm">
                            <div class="container-fluid">
                                <div class="row justify-content-center">
                                    <h5>retrieve password</h5>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <el-input type="number"  size="large" v-model="phone_number" style="width: 100%;" placeholder="Please enter the phone number">
                                                <template #prepend>+95</template>
                                            </el-input>
                                        </div>
                                        <div class="form-group">
                                            <el-input type="number" size="large" v-model="otp_code" style="width: 100%;" placeholder="please enter verification code">                                              
                                            </el-input>
                                            <el-button type="primary" style="position: absolute;right: 0;padding: 10px; margin: 4px 20px 0px;"
                                            @click="getVerificationCode()">
                                                get verification code</el-button>
                                        </div>
                                        <div class="form-group">
                                            <el-button type="primary" :disabled="getOtpBtn" @click="checkOTP()">Next step</el-button>
                                        </div>
                                    </div>  
                                </div>
                            </div>
                        </div> 
                        <div v-show="showNewPasswordForm">
                            <div class="container-fluid">
                                <div class="row justify-content-center">
                                    <h5>Change Password</h5>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-group">                                            
                                            <el-input type="password" size="large" v-model="resetFormData.password" 
                                            style="width: 100%;" @keyup="validatePassword(resetFormData.password)"
                                             placeholder="please enter password" clearable />                                              
                                           
                                            <el-alert title="please enter Password" type="error" v-if="error_password" />
                                        </div>
                                        <div class="form-group">
                                            <el-input type="password"  size="large" v-model="resetFormData.confirmpassword" 
                                            style="width: 100%;" @keyup="validateConfirmPassword(resetFormData.confirmpassword)"
                                            placeholder="please enter confirm password" clearable />                                              
                                          
                                            <el-alert title="please enter confirmpassword" type="error" v-if="error_confirm_password"  />
                                        </div>                                       
                                        <div class="form-group">
                                            <el-button type="primary" :disabled="checkConfrimPassword_btn" @click="resetPassword()">change password</el-button>
                                        </div>
                                    </div>  
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </div>
   </div>
</template>
<script>
import {api} from '@/http/api';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
    name: 'Login',    
    data(){
        return{
            user: [],
            formData: {
                phone_number:"",
                username:"",
                email:"",
                password:""
            },
            resetFormData: {
                phone_number: "",
                password: "",
                confirmpassword: "",
            },
            showForgetPassword: false,       
            otp_code: "",
            phone_number: "",
            getOtpBtn: true,
            showNewPasswordForm: false,
            checkConfrimPassword_btn: true,
            error_password: false,
            error_confirm_password: false,
        }
    },
    created(){
     
    },
    methods: {    
        async login(e){
            e.preventDefault()            
            if(this.formData.username == ""  && this.formData.password ==""){   
                alert('username and password is required');             
                return;
            }
            else{
                let response = await api({
                method: 'POST',
                api: '',
                data: {    
                        phone_number: this.formData.phone_number,
                        username: this.formData.username,
                        email: this.formData.email,
                        password: this.formData.password                    
                    },                     
            });
          
            if(response.status == 200){
                localStorage.setItem('token', response.data.authentication.token);      
                this.$router.push('/dashboard');         
            } 
            if(response.status == 400){
                console.log('data>>'+ JSON.stringify(response.message))
                toast.error(response.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
            }  
            }           
        },
        async getVerificationCode(){            
            if(this.phone_number == "" || this.phone_number == null || this.phone_number == undefined){            

                toast.error("please enter a valid phone number", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1000,
                    });
					return
            }
            if (!this.phone_number.match(/^(09|\+?950?9|\+?95950?9)\d{7,9}$/)) {					
                    toast.error("please enter a valid phone number", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1000,
                    });
					return
			}
            else{                
                let response = await api({
                method: 'POST',
                api: '/getotp',
                data: {    
                        phone_number: this.phone_number,                                      
                    },                     
               });
                if(response.status == 200){
                   console.log('otp' + JSON.stringify(response));
                
                } 
                this.getOtpBtn = false; 
            }           
            
        },
        async checkOTP(){           
            if(this.otp_code == "" || this.otp_code == null || this.otp_code == undefined){
                toast.error("please enter OTP Code", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1000,
                    });
					return;
            }            
            else{
                let response = await api({
                method: 'POST',
                api: '/confirm_otp',
                data: {    
                        phone_number: this.phone_number, 
                        otp: this.otp_code,                                    
                    },                     
               }); 
                if(response.status == 200){                   
                    this.showNewPasswordForm= true;                 
                } 
            }
        },
        validatePassword(val){
            if(val == ""){
                this.error_password = true; 
            } 
            if(val != ""){
                this.error_password = false;
            }
            if(val != this.resetFormData.confirmpassword){
                this.checkConfrimPassword_btn = true;                
            }
            else{
                this.checkConfrimPassword_btn = false;       
            }
        },
        validateConfirmPassword(val){  
            if(val == ""){
                this.error_confirm_password = true; 
            }             
            if(val == ""){
                this.error_confirm_password = false;                
            }
            if(val != this.resetFormData.password){
                this.checkConfrimPassword_btn = true;                
            }
            else{
                this.checkConfrimPassword_btn = false;       
            }
        },
        async resetPassword() {          
            this.resetFormData.phone_number = this.phone_number;
            let response = await api({
                method: 'POST',
                api: '/reset_password',
                data: this.resetFormData,                  
               });               
                if(response.status == 200){            
                    this.showForgetPassword= false;
                    this.showNewPasswordForm = false;                  
                } 
        }
    }        
    
}
</script>

<style lang="scss" scoped>
@import "../assets/css/_variable.scss";

.login {  
  display: block;
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #eee;
  background-image: url('../assets/images/login/login.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
}
.nav-tabs, .nav-tabs:hover {
    border-bottom: 1px solid transparent !important;
}
.nav-tabs {
    .nav-link.active {
        border: 0px;
        border-color: transparent !important;
        color: #000;
        opacity: 1;
        .nav_underline {
            border: 2px solid blue;
            margin: 0px 35%;
            display: block;
        } 
    }
    .nav-link{
        border-color: transparent !important;
        color: #000;
        opacity: 0.5;
        .nav_underline {
            display: none;
        }
    }
}
.driver {
    text-align: center;
    font-size: 12px;
    color: #b5b5b5;
    position: relative;
}
.driver> span:before {
    content: "";
    width: 120px;
    height: 1px;
    background: #d8d8d8;
    position: absolute;
    left: 0;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
}
.driver > span:after {
    content: "";
    width: 120px;
    height: 1px;
    background: #d8d8d8;
    position: absolute;
    top: 50%;
    right: 0;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
}
.locale-changers{
    width: 200px;
}

</style>