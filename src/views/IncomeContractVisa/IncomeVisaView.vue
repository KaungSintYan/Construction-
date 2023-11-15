<template>  
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <IncomeVisa /> 
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import IncomeVisa from '@/components/IncomeContractVisa/IncomeVisa.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'IncomeVisaView',
 components: {
   TopBar,
   IncomeVisa, 
   Sidebar
 }
}
</script>
<style>

</style>


