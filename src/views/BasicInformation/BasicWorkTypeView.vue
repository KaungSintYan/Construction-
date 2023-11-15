<template>
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <BasicWorkType />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import BasicWorkType from '@/components/BasicInformation/BasicWorkType.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'BasicWorkTypeView',
 components: {
   TopBar,
   BasicWorkType, 
   Sidebar
 }
}
</script>
<style scoped>

</style>


