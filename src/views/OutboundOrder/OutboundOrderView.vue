<template>  
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <OutboundOrder /> 
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import OutboundOrder from '@/components/OutboundOrder/OutboundOrder.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'OutboundView',
 components: {
   TopBar,
   OutboundOrder, 
   Sidebar
 }
}
</script>
<style>

</style>


