<template>
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <InternalUnit />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import InternalUnit from '@/components/BasicInformationInternalUnit/InternalUnit.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'InternalUnitView',
 components: {
   TopBar,
   InternalUnit, 
   Sidebar
 }
}
</script>
<style scoped>

</style>


