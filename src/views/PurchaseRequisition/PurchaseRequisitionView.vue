<template>  
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <PurchaseRequisition /> 
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import PurchaseRequisition from '@/components/PurchaseRequisition/PurchaseRequisition.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'BudgetView',
 components: {
   TopBar,
   PurchaseRequisition, 
   Sidebar
 }
}
</script>
<style>

</style>


