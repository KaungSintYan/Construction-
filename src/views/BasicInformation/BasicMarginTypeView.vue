<template>
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <BasicMarginType />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import BasicMarginType from '@/components/BasicInformation/BasicMarginType.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'BasicMarginTypeView',
 components: {
   TopBar,
   BasicMarginType, 
   Sidebar
 }
}
</script>
<style scoped>

</style>


