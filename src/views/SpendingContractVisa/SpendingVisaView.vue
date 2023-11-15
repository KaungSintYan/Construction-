<template>  
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <SpendingVisa /> 
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import SpendingVisa from '@/components/SpendingContractVisa/SpendingVisa.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'SpendingVisaView',
 components: {
   TopBar,
   SpendingVisa, 
   Sidebar
 }
}
</script>
<style>

</style>


