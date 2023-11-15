<template>  
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <Apply /> 
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import Apply from '@/components/ProjectApply/Apply.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'ApplyView',
 components: {
   TopBar,
   Apply, 
   Sidebar
 }
}
</script>
<style>

</style>


