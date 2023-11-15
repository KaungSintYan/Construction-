<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <RevenueSettlementEdit />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import RevenueSettlementEdit from '@/components/RevenueContractSettlement/RevenueSettlementEdit.vue'
  
  export default {
   name: 'RevenueSettlementEditView',
   components: {
     TopBar,
     RevenueSettlementEdit,
     Sidebar,
   }
  }
  </script>
  
