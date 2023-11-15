<template>  
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <Revenue /> 
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import Revenue from '@/components/RevenueContract/Revenue.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'BudgetView',
 components: {
   TopBar,
   Revenue, 
   Sidebar
 }
}
</script>
<style>

</style>


