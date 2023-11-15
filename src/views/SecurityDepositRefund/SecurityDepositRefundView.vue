<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <SecurityDepositRefund /> 
       </section>
     </div>  
</template>

  <script>     
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import SecurityDepositRefund from '@/components/SecurityDepositRefund/SecurityDepositRefund.vue';

  export default {
   name: 'SecurityDepositRefundView',
   components: {
    TopBar,
    Sidebar,
    SecurityDepositRefund
}
  }
  </script>

  <style>
  
  </style>