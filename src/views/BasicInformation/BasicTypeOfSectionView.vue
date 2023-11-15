<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <BasicTypeOfSection />  
       </section>
     </div>  
  </template>
  <script>
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import BasicTypeOfSection from '@/components/BasicInformation/BasicTypeOfSection.vue'
  
  export default {
   name: 'BasicTypeOfSectionView',
   components: {
     TopBar,
     Sidebar,
     BasicTypeOfSection
   }
  }
  </script>
  <style scoped>
  
  </style>
  
  
  