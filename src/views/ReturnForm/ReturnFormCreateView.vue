<template> 
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <ReturnFormCreate />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import ReturnFormCreate from '@/components/ReturnForm/ReturnFormCreate.vue'

export default {
 name: 'ReturnFormCreateView',
 components: {
   TopBar,
   ReturnFormCreate, 
   Sidebar
 }
}
</script>
<style scoped>

</style>