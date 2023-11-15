<template> 
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <PurchaseOrderCreate />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import PurchaseOrderCreate from '@/components/PurchaseOrder/PurchaseOrderCreate.vue'

export default {
 name: 'PurchaseOrderCreateView',
 components: {
   TopBar,
   PurchaseOrderCreate, 
   Sidebar
 }
}
</script>
<style scoped>

</style>