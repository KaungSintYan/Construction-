<template> 
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <ApplyCreate />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import ApplyCreate from '@/components/ProjectApply/ApplyCreate.vue'

export default {
 name: 'ApplyCreateView',
 components: {
   TopBar,
   ApplyCreate, 
   Sidebar
 }
}
</script>
<style scoped>

</style>