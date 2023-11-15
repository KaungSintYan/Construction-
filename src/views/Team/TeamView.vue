<template>  
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <Team /> 
     </section>
   </div>  
</template>

<script>     
// @ is an alias to /src
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import Team from '@/components/Team/Team.vue';

export default {
 name: 'TeamView',
 components: {
  TopBar,
  Sidebar,
  Team
}
}
</script>

<style>

</style>