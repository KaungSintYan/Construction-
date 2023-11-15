<template>  
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <BudgetApprover /> 
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import BudgetApprover from '@/components/ProjectBudgetApprover/BudgetApprover.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'ProjectBudgetApproverView',
 components: {
   TopBar,
   BudgetApprover, 
   Sidebar
 }
}
</script>
<style>

</style>


