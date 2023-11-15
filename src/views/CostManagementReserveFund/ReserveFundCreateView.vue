<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <ReserveFundCreate /> 
       </section>
     </div>  
</template>

  <script>  
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import ReserveFundCreate from '@/components/CostManagementReserveFund/ReserveFundCreate.vue';
  
  export default {
   name: 'ReserveFundCreateView',
   components: {
    TopBar,
    Sidebar,
    ReserveFundCreate
}
  }
  </script>

  <style>
  
  </style>