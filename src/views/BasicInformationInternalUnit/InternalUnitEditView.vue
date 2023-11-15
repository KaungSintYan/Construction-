<template>
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <InternalUnitEdit />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import InternalUnitEdit from '@/components/BasicInformationInternalUnit/InternalUnitEdit.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'InternalUnitEditView',
 components: {
   TopBar,
   InternalUnitEdit, 
   Sidebar
 }
}
</script>
<style scoped>

</style>


