<template>  
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <RevenueSettlement /> 
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import RevenueSettlement from '@/components/RevenueContractSettlement/RevenueSettlement.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'RevenueSettlementView',
 components: {
   TopBar,
   RevenueSettlement, 
   Sidebar
 }
}
</script>
<style>

</style>


