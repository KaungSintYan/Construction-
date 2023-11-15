<template>  
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <Spending /> 
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import Spending from '@/components/SpendingContract/Spending.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'SpendingView',
 components: {
   TopBar,
   Spending, 
   Sidebar
 }
}
</script>
<style>

</style>


