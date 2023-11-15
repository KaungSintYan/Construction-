<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <Order /> 
       </section>
     </div>  
</template>

  <script>      
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import Order from '@/components/Order/Order.vue';

  export default {
   name: 'OrderView',
   components: {
    TopBar,
    Sidebar,
    Order
}
  }
  </script>

  <style>
  
  </style>