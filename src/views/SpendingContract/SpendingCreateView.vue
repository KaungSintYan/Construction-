<template> 
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <SpendingCreate />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import SpendingCreate from '@/components/SpendingContract/SpendingCreate.vue'

export default {
 name: 'SpendingCreateView',
 components: {
   TopBar,
   SpendingCreate, 
   Sidebar
 }
}
</script>
<style scoped>

</style>