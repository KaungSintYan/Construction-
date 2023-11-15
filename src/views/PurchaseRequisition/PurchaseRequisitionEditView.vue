<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <PurchaseRequisitionEdit />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import PurchaseRequisitionEdit from '@/components/PurchaseRequisition/PurchaseRequisitionEdit.vue'
  
  export default {
   name: 'PurchaseRequisitionEditView',
   components: {
     TopBar,
     PurchaseRequisitionEdit,
     Sidebar,
   }
  }
  </script>
  
