<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <SecurityDepositRefundCreate /> 
       </section>
     </div>  
</template>

  <script>     
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import SecurityDepositRefundCreate from '@/components/SecurityDepositRefund/SecurityDepositRefundCreate.vue';

  export default {
   name: 'SecurityDepositRefundCreateView',
   components: {
    TopBar,
    Sidebar,
    SecurityDepositRefundCreate
}
  }
  </script>

  <style>
  
  </style>