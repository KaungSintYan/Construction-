<template>  
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <InboundOrder /> 
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import InboundOrder from '@/components/InboundOrder/InboundOrder.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'BudgetView',
 components: {
   TopBar,
   InboundOrder, 
   Sidebar
 }
}
</script>
<style>

</style>


