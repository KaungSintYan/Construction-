<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <ReserveFundEdit /> 
       </section>
     </div>  
</template> 

  <script> 
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import ReserveFundEdit from '@/components/CostManagementReserveFund/ReserveFundEdit.vue';
  
  export default {
   name: 'ReserveFundEditView',
   components: {
    TopBar,
    Sidebar,
    ReserveFundEdit
}
  }
  </script>

  <style>
  
  </style>