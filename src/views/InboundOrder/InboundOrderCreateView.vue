<template> 
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <InboundOrderCreate />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import InboundOrderCreate from '@/components/InboundOrder/InboundOrderCreate.vue'

export default {
 name: 'InboundOrderCreateView',
 components: {
   TopBar,
   InboundOrderCreate, 
   Sidebar
 }
}
</script>
<style scoped>

</style>