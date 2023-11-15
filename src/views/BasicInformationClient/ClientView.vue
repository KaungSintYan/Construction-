<template>
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <Client />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import Client from '@/components/BasicInformationClient/Client.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'ClientView',
 components: {
   TopBar,
   Client, 
   Sidebar
 }
}
</script>
<style scoped>

</style>


