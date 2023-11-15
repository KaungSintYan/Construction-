<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <ReserveFundShow /> 
       </section>
     </div>  
</template>
  <script> 
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import ReserveFundShow from '@/components/CostManagementReserveFund/ReserveFundShow.vue'
  
  export default {
   name: 'ReserveFundShowView',
   components: {
    TopBar,
    Sidebar,
    ReserveFundShow
}
  }
  </script>
  <style>
  
  </style>