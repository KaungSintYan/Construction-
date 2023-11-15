<template> 
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <RevenueExecutionCreate />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import RevenueExecutionCreate from '@/components/RevenueContractExecution/RevenueExecutionCreate.vue'

export default {
 name: 'RevenueExecutionCreateView',
 components: {
   TopBar,
   RevenueExecutionCreate, 
   Sidebar
 }
}
</script>
<style scoped>

</style>