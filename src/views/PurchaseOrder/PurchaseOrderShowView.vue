<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <PurchaseOrderShow />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import PurchaseOrderShow from '@/components/PurchaseOrder/PurchaseOrderShow.vue'
  
  export default {
   name: 'PurchaseOrderShowView',
   components: {
     TopBar,
     PurchaseOrderShow,
     Sidebar,
   }
  }
  </script>
  
