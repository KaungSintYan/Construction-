<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <SafetyRectificationList />  
       </section>
     </div>  
</template>

  <script>         
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import SafetyRectificationList from '@/components/SafetyRectificationList/SafetyRectificationList.vue';
  
  export default {
   name: 'SafetyRectificationListView',
   components: {
    TopBar,
    Sidebar,
    SafetyRectificationList
}
  }
  </script>
  <style scoped>
  
  </style>