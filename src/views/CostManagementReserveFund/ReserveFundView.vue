<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <ReserveFund /> 
       </section>
     </div>  
</template>
  <script> 
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import ReserveFund from '@/components/CostManagementReserveFund/ReserveFund.vue';
  
  export default {
   name: 'ReserveFundView',
   components: {
    TopBar,
    Sidebar,
    ReserveFund
}
  }
  </script>
  <style>
  
  </style>