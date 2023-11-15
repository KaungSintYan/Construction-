<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <BasicBudgetType />  
       </section>
     </div>  
  </template>
  <script>
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import BasicBudgetType from '@/components/BasicInformation/BasicBudgetType.vue'
  
  export default {
   name: 'BasicBudgetTypeView',
   components: {
     TopBar,
     Sidebar,
     BasicBudgetType
   }
  }
  </script>
  <style scoped>
  
  </style>
  
  
  