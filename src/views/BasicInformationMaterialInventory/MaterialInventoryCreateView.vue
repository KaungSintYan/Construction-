<template>
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <MaterialInventoryCreate />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import MaterialInventoryCreate from '@/components/BasicInformationMaterialInventory/MaterialInventoryCreate.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'MaterialInventoryCreateView',
 components: {
   TopBar,
   MaterialInventoryCreate, 
   Sidebar
 }
}
</script>
<style scoped>

</style>


