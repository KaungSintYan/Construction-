<template>  
  <Sidebar />
  <div id="content-wrapper">     
    <TopBar />
    <section id="content">
      <Project />
    </section>
  </div>  
   
</template>
<script>
// @ is an alias to /src
import Project from '@/components/Project/Project.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'ProjectView',
 components: {
   TopBar,
   Project, 
   Sidebar
 }
}
</script>
<style>

</style>


