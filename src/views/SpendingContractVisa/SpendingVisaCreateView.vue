<template> 
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <SpendingVisaCreate />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import SpendingVisaCreate from '@/components/SpendingContractVisa/SpendingVisaCreate.vue'

export default {
 name: 'SpendingVisaCreateView',
 components: {
   TopBar,
   SpendingVisaCreate, 
   Sidebar
 }
}
</script>
<style scoped>

</style>