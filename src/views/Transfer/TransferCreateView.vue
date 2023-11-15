<template> 
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <TransferCreate />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import TransferCreate from '@/components/Transfer/TransferCreate.vue'

export default {
 name: 'TransferCreateView',
 components: {
   TopBar,
   TransferCreate, 
   Sidebar
 }
}
</script>
<style scoped>

</style>