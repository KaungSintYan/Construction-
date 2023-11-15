<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <QualityRectificationListCreate />  
       </section>
     </div>  
</template>

  <script>       
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import QualityRectificationListCreate from '@/components/QualityRectificationList/QualityRectificationListCreate.vue';
  
  export default {
   name: 'QualityRectificationListCreateView',
   components: {
    TopBar,
    Sidebar,
    QualityRectificationListCreate
}
  }
  </script>
  <style scoped>
  
  </style>