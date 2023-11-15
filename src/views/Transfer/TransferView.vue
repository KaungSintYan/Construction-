<template>  
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <Transfer /> 
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import Transfer from '@/components/Transfer/Transfer.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'TransferView',
 components: {
   TopBar,
   Transfer,
   Sidebar
 }
}
</script>
<style>

</style>


