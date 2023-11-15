<template>
     <div class="topbar" >
                <div class="container-fluid">
                    <div class="row mx-2">
                        <div class="col-10 d-flex justify-content-start">
                          <div class="row">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">  
                                    <!-- <li class="breadcrumb-item"><span class="back__icon" @click="goBack()"><font-awesome-icon icon="fa-solid fa-angle-left" /></span><router-link to="/dashboard">Home</router-link></li> -->
                                    <li class="breadcrumb-item" v-for="(item, index) in items" :key="index" :to="item.path" :class="{ active : index == items.length -1, noshow : item.meta.title == null}" >
                                        <span class="back__icon" @click="goBack()" v-show="index ==0 "><font-awesome-icon icon="fa-solid fa-angle-left" /></span> <router-link :to="item.path">{{ item.meta.title }}</router-link></li>                                    
                                </ol>
                            </nav>
                          </div>
                        </div>
                        <div class="col-2 d-flex justify-content-end"  @click="$store.commit('setActive', !$store.state.active)" >
                            <div class="row">
                                <div class="top-profile">                                   
                                <img :src="$store.state.userImg" alt="" class="top-pic"/>
                                <p class="top-name pt-3">{{$store.state.userInfo.username}}</p>                               
                                <font-awesome-icon icon="fa-solid fa-caret-down" style="color: #B3B8C2;"/>
                                </div>
                            </div>                          
                        </div>
                    </div>
                </div>        
     </div>
    <!-- My Profile Modal -->
     <div id="myProfile" v-show="$store.state.active">
       <div class="container" v-if="!basicInfo">
        <div class="row header">
            <div class="col-12">            
                <div class="row pt-3">
                    <div class="col-6">
                    <div class="avator">
                        <img :src="$store.state.userImg" alt="" width="30"> <span>{{ $store.state.userInfo.username }}</span>
                    </div>
                    </div>
                    <div class="col-6 d-flex justify-content-end" @click="basicInfo = !basicInfo">
                        <span style="cursor: pointer;">More</span>
                    </div>
                </div>                
            </div>
        </div>
        <div class="row">
            <div class="language_box">
                <ul>
                    <li v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`"  v-on:click="changeLanguage(locale)">
                       <span v-if="locale == 'en' " style="display: flex;"><img src="../assets/lang/en.png" alt="" width="30"><span class="lang_text">{{ $t('english') }}</span></span>
                       <span v-if="locale == 'my' " style="display: flex;" ><img src="../assets/lang/my.png" alt="" width="30"><span class="lang_text">{{ $t('myanmar') }}</span></span>
                       <span v-if="locale == 'cn' " style="display: flex;"><img src="../assets/lang/cn.png" alt="" width="30"><span class="lang_text">{{ $t('chinese') }}</span></span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="row" style="border-top: 1px solid #eee">
            <div class="button-box">                    
                    <div class="list-group">
                        <div >
                            <a href="#" class="list-group list-group-item-action a-text d-inline-block">
                                <font-awesome-icon icon="fa-solid fa-folder-plus" /><span class="d-inline-block">{{ $t('create_a_new_business') }}</span></a>
                        </div>
                        
                        <div>
                            <a href="#" class="list-group list-group-item-action a-text d-inline-block" data-toggle="modal" data-target=".change_password">
                                <font-awesome-icon icon="fa-solid fa-lock" /> <span class="d-inline-block">{{ $t('change_password') }}</span></a>
                        </div>
                        <div>
                            <a  class="list-group list-group-item-action a-text d-inline-block" @click="dialogMobileVisible = true"> 
                                <font-awesome-icon icon="fa-solid fa-mobile" /><span class="d-inline-block">{{ $t('modify_mobile_number') }}</span>
                            </a>
                        </div> 
                                 
                      </div>
            </div>
        </div>
        <div class="row" style="border-top: 1px solid #eee">
            <div class="button-box">                    
                    <div class="list-group">                       
                        <div class="list-group list-group-item-action a-text d-inline-block" @click="logout()">                         
                                <font-awesome-icon icon="fa-solid fa-right-from-bracket" /> <span class="d-inline-block">sign out</span>
                        </div>                        
                      </div>
            </div>
        </div>
           
       </div>
       <div class="container basic-info" v-if="basicInfo">
        <div class="row pt-3 mb-2">
            <div class="col-md-6"> <div class="back_btn" @click="basicInfo = !basicInfo"><font-awesome-icon icon="fa-solid fa-angle-left" /> <span>return</span></div></div>
            <div class="col-md-6 d-flex justify-content-end" data-toggle="modal" data-target=".edit-box"> <font-awesome-icon icon="fa-solid fa-pen-to-square fa-sm" class="mr-1 mt-1
                "/>  <span style="cursor: pointer;">edit</span></div>
        </div>
        <div class="row py-2" style="border-bottom: 1px solid #eee;">
            <img src="../assets/logo.png" alt="" width="30" style="margin-left: 12px;"> Crypto Ltd
        </div>
        <div class="mt-3 mx-2">
            <h1 style="font-size: 18px;">{{ $t('basic_info') }}</h1>          

            <div class="containerII mt-2 mb-2">
                <img :src="$store.state.userImg" alt="" class="image-box mt-2"/>
                <!-- <img src="../assets/putin.jpg" alt="" class="image-boxe mt-2"/> -->


                <div class="bottom-right">
                    <label for="icon-file" data-toggle="modal" data-target=".photo-box">
                        <font-awesome-icon icon="fa-solid fa-pen-to-square" class="icon-pen"/>
                    </label>
                </div>
                <!-- <input type="file" id="icon-file" accept="images/*" multiple="multiple" class=" d-none"> -->
            </div>

            <div class="row mt-3">
                <div class="col-md-6">{{ $t('username') }}</div>
                <div class="col-md-6">{{ $store.state.userInfo.username }}</div>
            </div>
            <div class="row mt-3">
                <div class="col-md-6">{{ $t('ph_number') }}</div>
                <div class="col-md-6">{{ $store.state.userInfo.phone_number }}</div>
            </div>
            <div class="row mt-3">
                <div class="col-md-6">{{ $t('email') }}</div>
                <div class="col-md-6">{{ $store.state.userInfo.email }}</div>
            </div>
            <div class="row mt-3">
                <div class="col-md-6">{{ $t('employee_no') }}</div>
                <div class="col-md-6">{{ $store.state.userInfo.employee_no }}</div>
            </div>
            <div class="row mt-3">
                <div class="col-md-6">{{ $t('department') }}</div>
                <div class="col-md-6">{{ $store.state.userInfo.department }}</div>
            </div>
            <div class="row mt-3">
                <div class="col-md-6">{{ $t('position') }}</div>
                <div class="col-md-6">{{ $store.state.userInfo.status }}</div>
            </div>
        </div>
       </div>
     </div>

     <!-- start change password modal box -->
    <div class="modal fade change_password" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" >
        <div class="modal-dialog modal-lg">
            <div class="modal-content" style="width: 900px;">
                <form @submit.prevent="changePassword">
                <div class="modal-header">
                    <div class="m-auto">
                        <h5><strong>{{ $t('change_password') }}</strong></h5>
                    </div>
                </div>
                <div class="modal-body p-5">
                    
                        <div class="form-group row">
                            <label for="current_password" class="col-sm-3 col-form-label">{{ $t('current_password') }}</label>
                            <div class="col-sm-9">
                                <input type="password" class="form-control" placeholder="Password" v-model="Form.old_password" autocomplete="on">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="new_password" class="col-sm-3 col-form-label">{{ $t('new_password') }}</label>
                            <div class="col-sm-9">
                                <input type="password" class="form-control"  placeholder="New Password" v-model="Form.new_password1" autocomplete="on">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="confirm_password" class="col-sm-3 col-form-label">{{ $t('confirm_new_password') }}</label>
                            <div class="col-sm-9">
                                <input type="password" class="form-control"  placeholder="New Confirm Password" v-model="Form.new_password2" autocomplete="on">
                            </div>
                        </div>
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t('cancel') }}</button>
                    <button type="submit" class="btn btn-primary">{{ $t('change_password') }}</button>
                </div>
                </form>
            </div>
        </div>
    </div>
     <!-- end change password modal box -->
     <!-- start edit modal box  -->
    <div class="modal fade edit-box" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" >
        <div class="modal-dialog modal-lg">
            <div class="modal-content" style="width: 700px;">
                 <form @submit.prevent="updateProfile">
                    <div class="modal-header">
                        <div class=""> 
                            <h5 class="text-primary"> <strong>{{ $t('basic_info_edit_form') }}</strong> </h5>
                        </div>
                    </div>
                    <div class="modal-body p-5">
                    
                            <div class="form-group row">
                                <label for="username" class="col-sm-3 col-form-label">{{ $t('username') }}</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" id="username" v-model="$store.state.EditForm.username">
                                </div>
                            </div>
                            
                            <div class="form-group row">
                                <label for="email" class="col-sm-3 col-form-label">{{ $t('email') }}</label>
                                <div class="col-sm-9">
                                    <input type="email" class="form-control" id="email" v-model="$store.state.EditForm.email">
                                </div>
                            </div>                        
                    
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t('cancel') }}</button>
                        <button type="submit" class="btn btn-primary">{{ $t('sure') }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
     <!-- end edit modal box  -->

     <!-- start photo edit modal box  -->
     <div class="modal fade photo-box" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" >
        <div class="modal-dialog modal-lg">
            <div class="modal-content" style="width: 500px;">
                <form @submit.prevent="uploadProfile()" enctype="multipart/form-data">
                <!-- <div class="modal-header">
                    <div class=""> 
                        <h5 class="text-primary"> <strong>photo</strong> </h5>
                    </div>
                </div> -->
                <div class="modal-body m-0 p-0">
                        <h5 class="text-center mt-4"><strong>{{ $store.state.userInfo.username }}</strong></h5>
                        <p class="text-secondary text-center mb-3"><small>{{ $store.state.userInfo.status }}</small></p>

                        <div class="containerIe mt-2 mb-2">
                            <img :src="$store.state.userImg" alt="" class="image-box mt-2"/>                        
                            <!-- <div class="top-right">
                                <label for="icon-file">
                                    <font-awesome-icon icon="fa-solid fa-circle-xmark" class="icon-pen"/>
                                </label>
                            </div> -->
                        </div>                        

                        <div clas="file_input_wrap">
                            <input type="file" name="imageUpload" id="imageUpload" class="btn-hide" v-on:change="upload"  />
                            <label for="imageUpload" class="btn btn-large bton-box mt-3 mb-3">{{ $t('update_new_profile') }}</label>
                        </div>

                        <div class="passage-box m-auto">
                            <p>{{ $t('upload_new_avatar') }} </p><br>
                            <p>{{ $t('maximum_upload_size') }}</p>
                        </div>
                        <p class="text-center mt-3 mb-5"></p>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t('cancel') }}</button>
                    <button type="submit" class="btn btn-primary">{{ $t('sure') }}</button>
                </div>
                </form>
            </div>
        </div>
    </div>
     <!-- end photo edit modal box  -->
    <!-- change phone number -->
    <el-dialog v-model="dialogMobileVisible" title="Change mobile number" width="30%" draggable>
    <div class="container">    
        <div class="row">
            <div class="form-group">
                            <label for="mobile_number">
                                Old Phone Number
                            </label>                           
                            <el-input type="tel" :placeholder="$t('please_enter')"  v-model="$store.state.old_phone_number" readonly  />
                         
            </div>
            <div class="form-group">
                            <label for="mobile_number">
                                New Phone Number
                            </label>                           
                            <el-input type="number" :placeholder="$t('please_enter')"  v-model="$store.state.userInfo.phone_number" clearable />
                            <!-- <span v-if="v$.FormData.material_inventory_name.$error" class="text-danger">
                                {{ v$.FormData.material_inventory_name.$errors[1].$message }}
                            </span>                           -->
            </div>
        </div>
    </div>    
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogMobileVisible = false">{{ $t('cancel') }}</el-button>
        <el-button type="primary" @click="changeMobileNumber">
          {{ $t('sure') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
      
</template>

<script>
import {authApi} from '@/http/authApi';
import $ from 'jquery';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    name: "TopBar",
    data(){
        return {
           basicInfo: false,
           userInfo: false,
           items: [],
           Form: {
            old_password: '',
            new_password1: '',
            new_password2: ''
           },
           //EditForm: {},   
           imageUrl: null,  
           dialogMobileVisible: false,  
           PhoneForm: {            
            phone_number: "",
           }          
        }
    },
   
    watch() {
        this.getRoute();      
    },    
    created() {       
        this.getRoute();
        this.$store.dispatch('getUserInformation');
        //this.editProfile();
       
    },
    methods: { 
        //update mobile number
        async changeMobileNumber(){
             this.PhoneForm.phone_number= this.$store.state.userInfo.phone_number;         
             let response = await authApi({
                            method: 'PUT',
                            api: '/userdetail',                 
                            data: this.PhoneForm,
                    });
                    if(response.status == 200){   
                        this.dialogMobileVisible = false;
                        this.$store.dispatch('getUserInformation');
                        toast.success("update mobile number successful!", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                        });
                    }     
                    else{
                        toast.error("unsuccessful!", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                        });
                    }          

        },
        changeLanguage(lang){      
            this.$i18n.locale = lang;
        }, 
        upload(e){           
            this.imageUrl = e.target.files[0];  
        },
        async uploadProfile(){
       
            let formData= new FormData();
            formData.append('image', this.imageUrl);
            formData.append('image_id', this.$store.state.userInfo.profile_picture.image_id);
             let response = await authApi({
                            method: 'PUT',
                            api: '/images',                 
                            data: formData
                    });
                    if(response.status == 200){   
                        $('.photo-box').modal('hide');   
                        this.$store.dispatch('getUserInformation');       
                     //00 console.log('result>>'+ JSON.stringify(response)) 
                    }     

        },
        // async editProfile(){          
        //     let response = await authApi({
        //                     method: 'GET',
        //                     api: '/profile',                
                            
        //     });
        //     if(response.status == 200){
        //         this.EditForm= response.data.data
        //     }     
        // },
                
         async updateProfile(){           
            let response = await authApi({
                            method: 'PUT',
                            api: '/profile',                 
                            data:{
                                username: this.$store.state.EditForm.username,
                                email: this.$store.state.EditForm.email,                             
                            }
                    });
                    if(response.status == 200){
                        $('.edit-box').modal('hide');
                        this.$store.dispatch('getUserInformation');
                      // console.log('result>>'+ JSON.stringify(response)) 
                    }     
        },
        async changePassword(){     
        let response = await authApi({
                method: 'POST',
                api: '/changepassword',                 
                data:{
                    old_password: this.Form.old_password,
                    new_password1: this.Form.new_password1,
                    new_password2: this.Form.new_password2
                }
        });
        if(response.status == 200){
             $('.change_password').modal('hide');
             this.$router.push('/');     
             localStorage.removeItem('token');    
        }       
        },
        goBack(){           
            this.$router.go(-1);
        },   
        getRoute(){
            this.items = this.$route.matched;     
            //console.log('route>>'+ JSON.stringify( this.items[1]));      
        },
        async logout(){
            let response = await authApi({
                method: 'POST',
                api: '/logout',
            });
            if(response.status == 204){
                this.$router.push('/');     
                localStorage.removeItem('token');    
            }           
        }
    }
    
}
</script>
<style lang="scss" scoped>
.topbar{
    height: 10vh;
    background: #fff;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    //padding: 10px;
}
.top-profile{
    display: flex;
    align-items: center;
    font-size: 15px;
    gap: 10px;
}


.top-profile img{
    width: 36px;
    height: 36px;
    background-color: var(--bgDark);
    border-radius: 50%;
}

#myProfile {
    background: #ffff;
    width: 360px;
    height: 100%;
    position: fixed;
    z-index: 222;
    right: 0;
    -webkit-box-shadow: 0 8px 10px -5px rgb(0 0 0 / 20%), 0 16px 24px 2px rgb(0 0 0 / 14%), 0 6px 30px 5px rgb(0 0 0 / 12%);
    box-shadow: 0 8px 10px -5px rgb(0 0 0 / 20%), 0 16px 24px 2px rgb(0 0 0 / 14%), 0 6px 30px 5px rgb(0 0 0 / 12%);
    animation: slide-in 500ms;
    animation-fill-mode: forwards;
    .header {
        background-image: url('../assets/images/myprofile/my-info.png');
        background-repeat: no-repeat;
        background-size: cover;
        height: 160px;
        border-radius: none;
        .member-information {
            background-image: linear-gradient(134deg,#59b6f8,#3497ee);
            -webkit-box-shadow: 0rpx 2px 15px 10px rgba(197,202,213,.15);
            box-shadow: 0rpx 2px 15px 10px rgba(197,202,213,.15);
            border-radius: 4px;            
            margin: 0px 10px;
            color: #fff;
            padding: 10px;
            position: relative;
            width: 100%;
            .info-text {               
                font-size: 14px;
                img {
                    margin-right: 5px;
                }
            }
            .info-text-one {
                margin-left: 20px;
                font-size: 14px;
            }
            .buy-service {
                position: absolute;
                padding: 5px 20px;
                background: #fff;
                color: blue;
                border-radius: 100px;
                font-size: 12px;
                right: 0;
                top: 20px;
                margin-right: 10px;
            }
        }
    }
}

@keyframes slide-in {
    from {
      transform: translateX(100%);
      opacity: 0.25;
    }
    to {
      transform: translateX(0%);
      opacity: 1;
    }
  }
.button-box{
    background-color: #FFFFFF;   
    padding: 10px;
    .a-text {
    margin-bottom: 5px;
    padding: 10px; 
        span {
            margin-left: 10px;
        }
   }
}
.language_box{
   ul {
    display: flex;
    width: 100%;
    position: relative;
    list-style-type: none;
    li {    
    margin-top: 10px;
    margin-left: 10px;
    .lang_text {
        padding-top: 5px;
        padding-left: 5px;
    }
   }
  }
}
.basic-info {
    .back_btn {
        background: #eeee;
        width: 80px;
        padding: 2px 10px;
        color: #999;
    }
}
.breadcrumb {
    background: transparent;
    padding-left: 0px;
    .back__icon {
    border: 1px solid #ddd;
    color: blue;
    padding: 2px 6px;
    border-radius: 3px;
    margin-right: 5px;
  }
}
a {
    text-decoration: none;
}
.breadcrumb-item.active > a {
    color: #999;
}
.noshow {
    display: none;
}
.profile-box{
    border: 1px solid #999;
    border-radius: 100%;
    width: 90px;
    height: 90px;
    // text-align: center;
    padding: 10px;
    // left: 50px;
    position: relative;
}
.image-box{
    width: 80px;
    height: 80px;
    position: absolute;
    border-radius: 100%;
}
.image-boxe{
    width: 80px;
    height: 80px;
    position: absolute;
    border-radius: 100%;
}
.icon-pen{
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: pointer;
}
.containerII{
    position: relative;
    width: 100px;
    height: 100px;
    padding: 11px;
    // text-align: center;
    // border: 1px solid #e5dcdc;
    // border-radius: 100%;
    // margin: auto;
}
.containerIe{
    position: relative;
    width: 100px;
    height: 100px;
    padding: 11px;
    margin: auto;

}
.bottom-right{
    position: absolute;
    bottom: 0;
    right: 0;
}
.top-right{
    position: absolute;
    top: 12px;
    right: 7px;
}
.upper-box{
    background-color: #3497ee;
    // border: 1px solid black;
    width: 100%;
    height: 150px;
    margin-bottom: 100px;
    position: relative;
}
.image-boxII{
    position: absolute;
    top: 120px;
    left: 290px;
    width: 120px;
    height: 120px;
    border: 1px solid #6c6767;
    border-radius: 100%;
    padding: 11px;
}
.image-logo{
    width: 100px;
}
.passage-box{
    width: 300px;
    height: 200px;
    background-color: #F1F4FD;
    color: black;
    padding: 15px;
    text-align: center;
    border-radius: 10px;
}


.btn-hide {
  display: none;
}

.bton-box {
  display: inline-block;
  padding: 4px 12px;
  margin-left: 150px;
  font-size: 14px;
  line-height: 20px;
  background-color: rgb(161, 35, 35);
  color: white;
//   color: #333333;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid #ddd;
  box-shadow: 2px 2px 10px #eee;
  border-radius: 4px;
}

.btn-large {
  padding: 11px 19px;
  font-size: 17.5px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}
</style>