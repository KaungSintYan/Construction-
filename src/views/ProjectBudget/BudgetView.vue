<template>  
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <Budget /> 
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import Budget from '@/components/ProjectBudget/Budget.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'BudgetView',
 components: {
   TopBar,
   Budget, 
   Sidebar
 }
}
</script>
<style>

</style>


