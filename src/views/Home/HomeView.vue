<template>
  <Sidebar />
   <div id="content-wrapper">     
     <DashboardTopBar />
     <section id="content">
       <Home />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import Home from '@/components/Home/Home.vue'
import DashboardTopBar from  '@/components/DashboardTopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'HomeView',
 components: {
   DashboardTopBar,
   Home, 
   Sidebar
 }
}
</script>
<style scoped>
#content {
 background-color: var(--background);  
}
</style>
