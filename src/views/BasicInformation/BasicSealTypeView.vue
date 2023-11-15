<template>
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <BasicSealType />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import BasicSealType from '@/components/BasicInformation/BasicSealType.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'BasicSealTypeView',
 components: {
   TopBar,
   BasicSealType, 
   Sidebar
 }
}
</script>
<style scoped>

</style>


