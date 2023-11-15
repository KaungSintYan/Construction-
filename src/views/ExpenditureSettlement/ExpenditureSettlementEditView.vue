<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <ExpenditureSettlementEdit />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import ExpenditureSettlementEdit from '@/components/ExpenditureSettlement/ExpenditureSettlementEdit.vue'
  
  export default {
   name: 'RevenueSettlementEditView',
   components: {
     TopBar,
     ExpenditureSettlementEdit,
     Sidebar,
   }
  }
  </script>
  
