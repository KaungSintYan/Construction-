<template>
    <div class="register">
     <div class="container-fluid">
         <div class="row">
            <div class="col-xs-12 col-md-6 d-flex justify-content-start">
                <img src="../assets/images/login/register.png" alt="">
            </div>
             <div class="col-xs-12 col-md-6 d-flex justify-content-end">               
                 <div class="card mt-3" style="height: 480px;">  
                     <div class="card-header">                        
                        <!-- <img src="../assets/images/login/free_right.png" alt=""> -->
                     </div> 
                     <div class="card-body">
                        <div class="container mt-3">
                                     <div class="row">
                                         <div class="col-md-12">
                                             <form>
                                                 <div class="form-group">
                                                     <div class="input-group">
                                                         <div class="input-group-prepend">
                                                         <div class="input-group-text">+95</div>
                                                         </div>
                                                         <input type="tel" class="form-control" name="phone" id="phone" placeholder="Please enter the phone number">
                                                         
                                                     </div>
                                                 </div>
                                                 <div class="form-group">                                                   
                                                     <input type="number" class="form-control" id="verification-code" placeholder="please enter verification code">
                                                     <button class="btn btn-primary verifi_code_btn"> {{ $t('get_verification_code') }} </button>
                                                 </div>   

                                                 <div class="row">
                                                    <div class="col-md-12">
                                                        {{ $t('already_have_acc') }} <a href="#"> {{ $t('login_immediately') }} </a>
                                                    </div>                                                   
                                                 </div>                                         
                                                 <button type="submit" class="mt-2 mb-5 btn btn-primary btn-block"> {{ $t('start_to_experience') }} </button>
 
                                                <span> {{ $t('loggingin_agree_to') }} <a href=""> the "Dougong Cloud User Agreement" </a></span> 
                                             </form>                                            
                                            
                                         </div>
                                     </div>
                                 </div>                      
                     </div>
                 </div>
             </div>
         </div>
     </div> 
     <div class="backtop" @click="scrollToTop()">
        <font-awesome-icon icon="fa-solid fa-arrow-up" class="backtop_icon"/>
     </div>   
    </div>
    

     
 </template>
 
 <script>
 export default {
    name: 'Register',
    data() {
        return {
            isTop: false
        }
    },
    mounted() {
        const that = this
        window.addEventListener('scroll', () => {
            let scrollPos = window.scrollY
            if(scrollPos >= 100){
                that.isTop = true
            } else {
                that.isTop = false
            }
        });
    },
    methods: {
        scrollToTop() {           
            window.scrollTo(0,0);
        }
    },
 }
 </script>
 <style lang="scss" scoped>
 @import "../assets/css/_variable.scss";
 
 .card-header {
    background-image: url('../assets/images/login/free_right.png');
    background-repeat: no-repeat;
    background-size: cover;
    height: 200px;
    width: 555px;
    top: -10px;
    border-radius: 10px;
 }
 .register {  
   display: block;
   display: flex;
   width: 100vw;
   height: 100vh;
   background-color: #eee;
   background-image: url('../assets/images/login/register_background.png');
   background-size: cover;
   background-repeat: no-repeat;
   background-position: 50%;
   overflow-y: scroll;
   scrollbar-width: thin;
 }
 .register::-webkit-scrollbar {   
    background: #eee;
    width: 6px; 
}
.register::-webkit-scrollbar-thumb {
    background: #999;
    height: 20px;
    border-radius: 10px;
}

.verifi_code_btn {
    position: absolute;
    top: 29%;
    right: 16px;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    z-index: 99;
    padding: 4px 0.75rem;
}
.backtop {
   
    bottom: 20px;
    right: 30px;
    position: fixed;
    background-color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #4885f9;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    font-size: 20px;
    -webkit-box-shadow: 0 0 6px rgb(0 0 0 / 12%);
    box-shadow: 0 0 6px rgb(0 0 0 / 12%);
    cursor: pointer;
    z-index: 5;
    .backtop_icon{
        color: red;
    }
}

 </style>