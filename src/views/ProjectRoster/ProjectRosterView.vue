<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <ProjectRoster /> 
       </section>
     </div>  
  </template>
  <script>
  // @ is an alias to /src
  import ProjectRoster from '@/components/ProjectRoster/ProjectRoster.vue'
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  
  export default {
   name: 'BudgetView',
   components: {
     TopBar,
     ProjectRoster, 
     Sidebar
   }
  }
  </script>
  <style>
  
  </style>
  
  
  