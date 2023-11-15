<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <SafetyRectificationListCreate />  
       </section>
     </div>  
</template>

  <script>         
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import SafetyRectificationListCreate from '@/components/SafetyRectificationList/SafetyRectificationListCreate.vue';
  
  export default {
   name: 'SafetyRectificationListCreateView',
   components: {
    TopBar,
    Sidebar,
    SafetyRectificationListCreate
}
  }
  </script>
  <style scoped>
  
  </style>