<template> 
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <ExecutionSpendingCreate />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import ExecutionSpendingCreate from '@/components/ExecutionSpending/ExecutionSpendingCreate.vue'

export default {
 name: 'ExecutionSpendingCreateView',
 components: {
   TopBar,
   ExecutionSpendingCreate, 
   Sidebar
 }
}
</script>
<style scoped>

</style>