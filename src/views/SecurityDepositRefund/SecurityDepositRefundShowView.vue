<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <SecurityDepositRefundShow /> 
       </section>
     </div>  
</template>

  <script>      
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import SecurityDepositRefundShow from '@/components/SecurityDepositRefund/SecurityDepositRefundShow.vue';

  export default {
   name: 'SecurityDepositRefundShowView',
   components: {
    TopBar,
    Sidebar,
    SecurityDepositRefundShow
}
  }
  </script>

  <style>
  
  </style>