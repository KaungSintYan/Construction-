<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <UserCreate /> 
       </section>
     </div>  
  </template>
  <script>
  // @ is an alias to /src
  import UserCreate from '@/components/Users/UserCreate.vue'
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  
  export default {
   name: 'UsersView',
   components: {
     TopBar,
     UserCreate, 
     Sidebar
   }
  }
  </script>
  <style>
  
  </style>
  
  
  