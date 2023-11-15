<template> 
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <RevenueCreate />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import RevenueCreate from '@/components/RevenueContract/RevenueCreate.vue'

export default {
 name: 'RevenueCreateView',
 components: {
   TopBar,
   RevenueCreate, 
   Sidebar
 }
}
</script>
<style scoped>

</style>