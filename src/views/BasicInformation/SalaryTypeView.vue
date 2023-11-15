<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <SalaryType />  
       </section>
     </div>  
  </template>
  <script>
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import SalaryType from '@/components/BasicInformation/SalaryType.vue'
  
  export default {
   name: 'SalaryTypeView',
   components: {
     TopBar,
     Sidebar,
     SalaryType
   }
  }
  </script>
  <style scoped>
  
  </style>
  
  
  