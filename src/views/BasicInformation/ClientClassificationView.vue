<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <ClientClassification />  
       </section>
     </div>  
  </template>
  <script>
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import ClientClassification from '@/components/BasicInformation/ClientClassification.vue'
  
  export default {
   name: 'ClientClassificationView',
   components: {
     TopBar,
     Sidebar,
     ClientClassification
   }
  }
  </script>
  <style scoped>
  
  </style>
  
  
  