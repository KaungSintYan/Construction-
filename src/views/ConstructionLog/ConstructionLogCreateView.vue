<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <ConstructionLogCreate />  
       </section>
     </div>  
</template>

  <script>          
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import ConstructionLogCreate from '@/components/ConstructionLog/ConstructionLogCreate.vue';
  
  export default {
   name: 'ConstructionLogCreateView',
   components: {
    TopBar,
    Sidebar,
    ConstructionLogCreate
}
  }
  </script>
  <style scoped>
  
  </style>