<template> 
  <div class="wrapper" :class="{'nav__wrapper': this.$store.state.showNavTog}">
    <router-view/>
    
  </div>    
</template>
<script>

import Sidebar from '@/components/Sidebar.vue'
export default {
  name: 'App',
  components: {    
    Sidebar
  }
}
</script>
<style lang="scss">
@import "./assets/css/variable";
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Montserrat-Regular", sans-serif;   
}
.wrapper {
  display: flex;
  max-width: 100vw;
  overflow: hidden;
}
#content-wrapper {
  width: 100%;  
  max-width: calc(100% - 60px);
}
#content {
    width: auto;
    height: 90vh;   
    overflow: scroll;  
    scrollbar-width: thin;  
   
}
.nav__wrapper #content-wrapper{
  max-width: calc(100% - 250px);
}
#content::-webkit-scrollbar {   
    background: #eee;
    width: 6px; 
}
#content::-webkit-scrollbar-thumb {
    background: #999;
    height: 20px;
    border-radius: 10px;
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
   z-index: 11;
}
.nav__wrapper {
  .footer-main  {
      width: calc(100% - 250px);
  }
}

//button
.circle__btn {
  width: 36px;
  height: 36px;
  border-radius: 100px;
  margin: 0px 5px;
  .icon {
    font-size: 14px;
    color: #fff;
  }
}

//loading
.loading__div {
  min-height: 100%;  
}
.sub_loading__div {
  margin: 60px;
  min-height: 100%;  
}

//approver & cc
.el-timeline-item__wrapper {   
  top: -12px !important;
  margin-left: 10px;
} 

.footer__bar {
  position: fixed;
  border-top: 2px solid #eee;
  background: #fff;
  bottom: 0;
  width: 100%;
  height: 65px;

  .footer__btn {
      padding: 6px 15px;
      font-size: 12px;
      border-radius: 3px;
      border: 1px solid #ddd;
  }
}
.pagination {
  .active {
      background: blue;
      color: #fff;
  }
}

.box-footer{
  border: 1px solid #d5def0;
  border-radius: 5px;
  width: 100%;
  padding: 7px;
  text-align: center;
  cursor: pointer;
  &:hover{
      background-color: #EDF3FE;
  }
}
.footer-input{
  width: 40px !important;
}

.btn-footer {
  padding: 5px 70px 5px 70px !important;
  font-size: 13px !important;
}

//min_amount and max_amount
.min_amount, .max_amount {
  .el-input__wrapper {
    box-shadow: none !important;
    &:hover {
      box-shadow: none !important;
    }
  }
}

</style>
