<template> 
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <ExpenditureSettlementCreate />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import ExpenditureSettlementCreate from '@/components/ExpenditureSettlement/ExpenditureSettlementCreate.vue'

export default {
 name: 'ExpenditureSettlementCreateView',
 components: {
   TopBar,
   ExpenditureSettlementCreate, 
   Sidebar
 }
}
</script>
<style scoped>

</style>