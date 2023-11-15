<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <DepartmentEdit /> 
       </section>
     </div>  
  </template>
  <script>
  // @ is an alias to /src
  import DepartmentEdit from '@/components/Department/DepartmentEdit.vue'
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  
  export default {
   name: 'DepartmentEditView',
   components: {
     TopBar,
     DepartmentEdit, 
     Sidebar
   }
  }
  </script>
  <style>
  
  </style>
  
  
  