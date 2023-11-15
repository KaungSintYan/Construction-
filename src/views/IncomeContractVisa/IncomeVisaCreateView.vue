<template> 
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <IncomeVisaCreate />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import IncomeVisaCreate from '@/components/IncomeContractVisa/IncomeVisaCreate.vue'

export default {
 name: 'IncomeVisaCreateView',
 components: {
   TopBar,
   IncomeVisaCreate, 
   Sidebar
 }
}
</script>
<style scoped>

</style>