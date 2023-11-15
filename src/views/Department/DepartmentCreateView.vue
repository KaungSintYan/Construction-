<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <DepartmentCreate /> 
       </section>
     </div>  
  </template>
  <script>
  // @ is an alias to /src
  import DepartmentCreate from '@/components/Department/DepartmentCreate.vue'
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  
  export default {
   name: 'DepartmentCreateView',
   components: {
     TopBar,
     DepartmentCreate, 
     Sidebar
   }
  }
  </script>
  <style>
  
  </style>
  
  
  