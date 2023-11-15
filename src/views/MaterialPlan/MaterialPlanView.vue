<template>  
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <MaterialPlan /> 
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import MaterialPlan from '@/components/MaterialPlan/MaterialPlan.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'BudgetView',
 components: {
   TopBar,
   MaterialPlan, 
   Sidebar
 }
}
</script>
<style>

</style>


