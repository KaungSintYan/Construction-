<template> 
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <RevenueSettlementCreate />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import RevenueSettlementCreate from '@/components/RevenueContractSettlement/RevenueSettlementCreate.vue'

export default {
 name: 'RevenueSettlementCreateView',
 components: {
   TopBar,
   RevenueSettlementCreate, 
   Sidebar
 }
}
</script>
<style scoped>

</style>