<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <ExpenditureSettlementShow />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import ExpenditureSettlementShow from '@/components/ExpenditureSettlement/ExpenditureSettlementShow.vue'
  
  export default {
   name: 'RevenueSettlementShowView',
   components: {
     TopBar,
     ExpenditureSettlementShow,
     Sidebar,
   }
  }
  </script>
  
