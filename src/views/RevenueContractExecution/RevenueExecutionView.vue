<template>  
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <RevenueExecution /> 
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import RevenueExecution from '@/components/RevenueContractExecution/RevenueExecution.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'RevenueExecutionView',
 components: {
   TopBar,
   RevenueExecution, 
   Sidebar
 }
}
</script>
<style>

</style>


