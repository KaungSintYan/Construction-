<template>
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <BasicRevenueCategory />  
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import BasicRevenueCategory from '@/components/BasicInformation/BasicRevenueCategory.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'BasicRevenueCategoryView',
 components: {
   TopBar,
   BasicRevenueCategory, 
   Sidebar
 }
}
</script>
<style scoped>

</style>


