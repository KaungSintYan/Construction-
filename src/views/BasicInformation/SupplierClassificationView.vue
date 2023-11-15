<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <SupplierClassification />  
       </section>
     </div>  
  </template>
  <script>
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import SupplierClassification from '@/components/BasicInformation/SupplierClassification.vue'
  
  export default {
   name: 'SupplierClassificationView',
   components: {
     TopBar,
     Sidebar,
     SupplierClassification
   }
  }
  </script>
  <style scoped>
  
  </style>
  
  
  