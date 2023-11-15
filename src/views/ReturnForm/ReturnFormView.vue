<template>  
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <ReturnForm /> 
     </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import ReturnForm from '@/components/ReturnForm/ReturnForm.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'ReturnFormView',
 components: {
   TopBar,
   ReturnForm, 
   Sidebar
 }
}
</script>
<style>

</style>


