<template>  
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <BeginningProject /> 
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import BeginningProject from '@/components/BeginningProject/BeginningProject.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'ProjectView',
 components: {
   TopBar,
   BeginningProject, 
   Sidebar
 }
}
</script>
<style>

</style>


