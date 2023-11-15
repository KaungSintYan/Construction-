<template> 
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <OutboundOrderCreate />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import OutboundOrderCreate from '@/components/OutboundOrder/OutboundOrderCreate.vue'

export default {
 name: 'OutboundOrderCreateView',
 components: {
   TopBar,
   OutboundOrderCreate, 
   Sidebar
 }
}
</script>
<style scoped>

</style>