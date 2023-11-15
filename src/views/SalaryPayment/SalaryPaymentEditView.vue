<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <SalaryPaymentEdit /> 
       </section>
     </div>  
</template>

  <script>      
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import SalaryPaymentEdit from '@/components/SalaryPayment/SalaryPaymentEdit.vue';

  export default {
   name: 'SalaryPaymentEditView',
   components: {
    TopBar,
    Sidebar,
    SalaryPaymentEdit
}
  }
  </script>

  <style>
  
  </style>