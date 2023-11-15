<template>
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <BasicProjectStatus />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import BasicProjectStatus from '@/components/BasicInformation/BasicProjectStatus.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'BasicProjectStatusView',
 components: {
   TopBar,
   BasicProjectStatus, 
   Sidebar
 }
}
</script>
<style scoped>

</style>


