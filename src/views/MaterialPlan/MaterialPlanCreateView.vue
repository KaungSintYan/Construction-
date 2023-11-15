<template> 
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <MaterialPlanCreate />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import MaterialPlanCreate from '@/components/MaterialPlan/MaterialPlanCreate.vue'

export default {
 name: 'MaterialPlanCreateView',
 components: {
   TopBar,
   MaterialPlanCreate, 
   Sidebar
 }
}
</script>
<style scoped>

</style>