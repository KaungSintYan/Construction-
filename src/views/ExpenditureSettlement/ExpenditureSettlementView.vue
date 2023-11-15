<template>  
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <ExpenditureSettlement /> 
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import ExpenditureSettlement from '@/components/ExpenditureSettlement/ExpenditureSettlement.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'RevenueSettlementView',
 components: {
   TopBar,
   ExpenditureSettlement, 
   Sidebar
 }
}
</script>
<style>

</style>


