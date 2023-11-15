<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <TaskEdit /> 
       </section>
     </div>  
  </template>
  <script>
  // @ is an alias to /src
  import TaskEdit from '@/components/TaskManagement/TaskEdit.vue'
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  
  export default {
   name: 'TaskEditView',
   components: {
     TopBar,
     TaskEdit, 
     Sidebar
   }
  }
  </script>
  <style>
  
  </style>
  
  
  