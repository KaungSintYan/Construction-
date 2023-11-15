<template> 
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <BudgetCreate />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import BudgetCreate from '@/components/ProjectBudget/BudgetCreate.vue'

export default {
 name: 'ProjectCreateView',
 components: {
   TopBar,
   BudgetCreate, 
   Sidebar
 }
}
</script>
<style scoped>

</style>