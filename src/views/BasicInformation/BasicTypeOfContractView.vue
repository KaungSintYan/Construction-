<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <BasicTypeOfContract />  
       </section>
     </div>  
  </template>
  <script>
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import BasicTypeOfContract from '@/components/BasicInformation/BasicTypeOfContract.vue'
  
  export default {
   name: 'BasicTypeOfContractView',
   components: {
     TopBar,
     Sidebar,
     BasicTypeOfContract
   }
  }
  </script>
  <style scoped>
  
  </style>
  
  
  