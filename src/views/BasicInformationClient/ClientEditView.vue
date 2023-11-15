<template>
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <ClientEdit />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import ClientEdit from '@/components/BasicInformationClient/ClientEdit.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'ClientEditView',
 components: {
   TopBar,
   ClientEdit, 
   Sidebar
 }
}
</script>
<style scoped>

</style>


