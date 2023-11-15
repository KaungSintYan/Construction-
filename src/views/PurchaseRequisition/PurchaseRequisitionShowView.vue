<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <PurchaseRequisitionShow />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import PurchaseRequisitionShow from '@/components/PurchaseRequisition/PurchaseRequisitionShow.vue'
  
  export default {
   name: 'PurchaseRequisitionShowView',
   components: {
     TopBar,
     PurchaseRequisitionShow,
     Sidebar,
   }
  }
  </script>
  
