<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <ConstructionLog />  
       </section>
     </div>  
</template>

  <script>          
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import ConstructionLog from '@/components/ConstructionLog/ConstructionLog.vue';
  
  export default {
   name: 'ConstructionLogView',
   components: {
    TopBar,
    Sidebar,
    ConstructionLog
}
  }
  </script>
  <style scoped>
  
  </style>