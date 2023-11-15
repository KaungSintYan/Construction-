<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <TaskCreate /> 
       </section>
     </div>  
  </template>
  <script>
  // @ is an alias to /src
  import TaskCreate from '@/components/TaskManagement/TaskCreate.vue'
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  
  export default {
   name: 'TaskCreateView',
   components: {
     TopBar,
     TaskCreate, 
     Sidebar
   }
  }
  </script>
  <style>
  
  </style>
  
  
  