<template>
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <Supplier />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import Supplier from '@/components/BasicInformationSupplier/Supplier.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'SupplierView',
 components: {
   TopBar,
   Supplier, 
   Sidebar
 }
}
</script>
<style scoped>

</style>


