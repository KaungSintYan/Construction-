<template>
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <MaterialInventory />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import MaterialInventory from '@/components/BasicInformationMaterialInventory/MaterialInventory.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'MaterialInventoryView',
 components: {
   TopBar,
   MaterialInventory, 
   Sidebar
 }
}
</script>
<style scoped>

</style>


