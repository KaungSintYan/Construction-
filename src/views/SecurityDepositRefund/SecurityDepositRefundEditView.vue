<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <SecurityDepositRefundEdit /> 
       </section>
     </div>  
</template>

  <script>      
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import SecurityDepositRefundEdit from '@/components/SecurityDepositRefund/SecurityDepositRefundEdit.vue';

  export default {
   name: 'SecurityDepositRefundEditView',
   components: {
    TopBar,
    Sidebar,
    SecurityDepositRefundEdit
}
  }
  </script>

  <style>
  
  </style>