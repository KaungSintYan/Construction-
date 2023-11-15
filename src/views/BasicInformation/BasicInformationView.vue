<template>
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <BasicInformation />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import BasicInformation from '@/components/BasicInformation/BasicInformation.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'BasicInformationView',
 components: {
   TopBar,
   BasicInformation, 
   Sidebar
 }
}
</script>
<style scoped>

</style>


