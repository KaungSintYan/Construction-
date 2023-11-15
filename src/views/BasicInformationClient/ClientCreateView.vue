<template>
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <ClientCreate />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import ClientCreate from '@/components/BasicInformationClient/ClientCreate.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'ClientCreateView',
 components: {
   TopBar,
   ClientCreate, 
   Sidebar
 }
}
</script>
<style scoped>

</style>


