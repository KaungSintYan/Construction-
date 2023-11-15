<template>
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <MaterialInventoryEdit />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import MaterialInventoryEdit from '@/components/BasicInformationMaterialInventory/MaterialInventoryEdit.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'MaterialInventoryEditView',
 components: {
   TopBar,
   MaterialInventoryEdit, 
   Sidebar
 }
}
</script>
<style scoped>

</style>


