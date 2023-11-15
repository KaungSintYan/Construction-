<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <SafetyRectificationListEdit />  
       </section>
     </div>  
</template>

  <script>         
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import SafetyRectificationListEdit from '@/components/SafetyRectificationList/SafetyRectificationListEdit.vue';
  
  export default {
   name: 'SafetyRectificationListEditView',
   components: {
    TopBar,
    Sidebar,
    SafetyRectificationListEdit
}
  }
  </script>
  <style scoped>
  
  </style>