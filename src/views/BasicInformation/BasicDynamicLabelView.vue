<template>
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <BasicDynamicLabel />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import BasicDynamicLabel from '@/components/BasicInformation/BasicDynamicLabel.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'BasicDynamicLabelView',
 components: {
   TopBar,
   BasicDynamicLabel, 
   Sidebar
 }
}
</script>
<style scoped>

</style>


