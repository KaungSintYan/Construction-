<template> 
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <PurchaseRequisitionCreate />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import PurchaseRequisitionCreate from '@/components/PurchaseRequisition/PurchaseRequisitionCreate.vue'

export default {
 name: 'PurchaseRequisitionCreateView',
 components: {
   TopBar,
   PurchaseRequisitionCreate, 
   Sidebar
 }
}
</script>
<style scoped>

</style>