<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <InventoryProject /> 
       </section>
     </div>  
</template>

  <script>     
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import InventoryProject from '@/components/InventoryProject/InventoryProject.vue';

  export default {
   name: 'InventoryProjectView',
   components: {
    TopBar,
    Sidebar,
    InventoryProject
}
  }
  </script>

  <style>
  
  </style>