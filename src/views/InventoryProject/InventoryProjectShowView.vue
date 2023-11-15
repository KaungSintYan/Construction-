<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <InventoryProjectShow /> 
       </section>
     </div>  
</template>

  <script>     
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import InventoryProjectShow from '@/components/InventoryProject/InventoryProjectShow.vue';

  export default {
   name: 'InventoryProjectShowView',
   components: {
    TopBar,
    Sidebar,
    InventoryProjectShow
}
  }
  </script>

  <style>
  
  </style>