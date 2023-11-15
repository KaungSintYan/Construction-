<template>
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <SupplierCreate />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import SupplierCreate from '@/components/BasicInformationSupplier/SupplierCreate.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'SupplierCreateView',
 components: {
   TopBar,
   SupplierCreate, 
   Sidebar
 }
}
</script>
<style scoped>

</style>


