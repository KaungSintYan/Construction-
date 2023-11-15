<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <PurchaseOrderEdit />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import PurchaseOrderEdit from '@/components/PurchaseOrder/PurchaseOrderEdit.vue'
  
  export default {
   name: 'PurchaseOrderEditView',
   components: {
     TopBar,
     PurchaseOrderEdit,
     Sidebar,
   }
  }
  </script>
  
