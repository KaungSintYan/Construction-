<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <MaterialClassification />  
       </section>
     </div>  
  </template>
  <script>
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import MaterialClassification from '@/components/BasicInformation/MaterialClassification.vue'
  
  export default {
   name: 'MaterialClassificationView',
   components: {
     TopBar,
     Sidebar,
     MaterialClassification
   }
  }
  </script>
  <style scoped>
  
  </style>
  
  
  