<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <TransferShow /> 
       </section>
     </div>  
  </template>
  <script>
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import TransferShow from '@/components/Transfer/TransferShow.vue'
  
  export default {
   name: 'TransferShowView',
   components: {
     TopBar,
     Sidebar,
     TransferShow
   }
  }
  </script>
  <style>
  
  </style>
  
  
  