<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <User /> 
       </section>
     </div>  
  </template>
  <script>
  // @ is an alias to /src
  import User from '@/components/Users/User.vue'
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  
  export default {
   name: 'UsersView',
   components: {
     TopBar,
     User, 
     Sidebar
   }
  }
  </script>
  <style>
  
  </style>
  
  
  