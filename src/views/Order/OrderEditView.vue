<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <OrderEdit /> 
       </section>
     </div>  
</template>

  <script>      
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import OrderEdit from '@/components/Order/OrderEdit.vue';

  export default {
   name: 'OrderEditView',
   components: {
    TopBar,
    Sidebar,
    OrderEdit
}
  }
  </script>

  <style>
  
  </style>