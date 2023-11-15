<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <SalaryPayment /> 
       </section>
     </div>  
</template>

  <script>     
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import SalaryPayment from '@/components/SalaryPayment/SalaryPayment.vue';

  export default {
   name: 'SalaryPaymentView',
   components: {
    TopBar,
    Sidebar,
    SalaryPayment
}
  }
  </script>

  <style>
  
  </style>