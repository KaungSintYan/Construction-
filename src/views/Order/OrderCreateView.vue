<template>  
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
       <OrderCreate /> 
     </section>
   </div>  
</template>

<script>      
// @ is an alias to /src
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import OrderCreate from '@/components/Order/OrderCreate.vue';

export default {
 name: 'OrderView',
 components: {
  TopBar,
  Sidebar,
  OrderCreate
}
}
</script>

<style>

</style>