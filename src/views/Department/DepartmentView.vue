<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <Department /> 
       </section>
     </div>  
  </template>
  <script>
  // @ is an alias to /src
  import Department from '@/components/Department/Department.vue'
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  
  export default {
   name: 'DepartmentView',
   components: {
     TopBar,
     Department, 
     Sidebar
   }
  }
  </script>
  <style>
  
  </style>
  
  
  