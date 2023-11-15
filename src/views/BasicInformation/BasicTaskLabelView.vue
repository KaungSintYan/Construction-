<template>
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <BasicTaskLabel />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import BasicTaskLabel from '@/components/BasicInformation/BasicTaskLabel.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'BasicTaskLabelView',
 components: {
   TopBar,
   BasicTaskLabel, 
   Sidebar
 }
}
</script>
<style scoped>

</style>


