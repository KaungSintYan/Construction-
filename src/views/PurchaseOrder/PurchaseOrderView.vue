<template>  
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <PurchaseOrder /> 
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import PurchaseOrder from '@/components/PurchaseOrder/PurchaseOrder.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'BudgetView',
 components: {
   TopBar,
   PurchaseOrder, 
   Sidebar
 }
}
</script>
<style>

</style>


