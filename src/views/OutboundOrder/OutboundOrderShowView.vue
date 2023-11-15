<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <OutboundOrderShow /> 
       </section>
     </div>  
  </template>

  <script>
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import OutboundOrderShow from '@/components/OutboundOrder/OutboundOrderShow.vue'
  
  export default {
   name: 'OutboundOrderShowView',
   components: {
     TopBar,
     Sidebar,
     OutboundOrderShow
   }
  }
  </script>
  <style>
  
  </style>
  
  
  