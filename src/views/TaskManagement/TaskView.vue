<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <Task /> 
       </section>
     </div>  
  </template>
  <script>
  // @ is an alias to /src
  import Task from '@/components/TaskManagement/Task.vue'
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  
  export default {
   name: 'TaskView',
   components: {
     TopBar,
     Task, 
     Sidebar
   }
  }
  </script>
  <style>
  
  </style>
  
  
  