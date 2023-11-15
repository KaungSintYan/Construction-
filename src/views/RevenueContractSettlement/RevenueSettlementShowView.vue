<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <RevenueSettlementShow />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import RevenueSettlementShow from '@/components/RevenueContractSettlement/RevenueSettlementShow.vue'
  
  export default {
   name: 'RevenueSettlementShowView',
   components: {
     TopBar,
     RevenueSettlementShow,
     Sidebar,
   }
  }
  </script>
  
