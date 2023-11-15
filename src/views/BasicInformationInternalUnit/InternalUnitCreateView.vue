<template>
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <InternalUnitCreate />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import InternalUnitCreate from '@/components/BasicInformationInternalUnit/InternalUnitCreate.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'InternalUnitCreateView',
 components: {
   TopBar,
   InternalUnitCreate, 
   Sidebar
 }
}
</script>
<style scoped>

</style>


