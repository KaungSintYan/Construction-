<template>
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <SupplierEdit />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import SupplierEdit from '@/components/BasicInformationSupplier/SupplierEdit.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'ClientEditView',
 components: {
   TopBar,
   SupplierEdit, 
   Sidebar
 }
}
</script>
<style scoped>

</style>


