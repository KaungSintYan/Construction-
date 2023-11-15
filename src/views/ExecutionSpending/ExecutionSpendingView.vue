<template>  
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <ExecutionSpending /> 
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import ExecutionSpending from '@/components/ExecutionSpending/ExecutionSpending.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'ExecutionSpendingView',
 components: {
   TopBar,
   ExecutionSpending, 
   Sidebar
 }
}
</script>
<style>

</style>


