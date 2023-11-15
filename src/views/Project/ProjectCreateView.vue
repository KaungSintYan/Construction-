<template> 
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <ProjectCreate />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import ProjectCreate from '@/components/Project/ProjectCreate.vue'

export default {
 name: 'ProjectCreateView',
 components: {
   TopBar,
   ProjectCreate, 
   Sidebar
 }
}
</script>
<style scoped>

</style>