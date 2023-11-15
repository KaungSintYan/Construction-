<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <SalaryPaymentCreate /> 
       </section>
     </div>  
</template>

  <script>      
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import SalaryPaymentCreate from '@/components/SalaryPayment/SalaryPaymentCreate.vue';

  export default {
   name: 'SalaryPaymentCreateView',
   components: {
    TopBar,
    Sidebar,
    SalaryPaymentCreate
}
  }
  </script>

  <style>
  
  </style>