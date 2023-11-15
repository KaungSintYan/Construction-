<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <QualityRectificationList />  
       </section>
     </div>  
</template>

  <script>       
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import QualityRectificationList from '@/components/QualityRectificationList/QualityRectificationList.vue';
  
  export default {
   name: 'QualityRectificationListView',
   components: {
    TopBar,
    Sidebar,
    QualityRectificationList
}
  }
  </script>
  <style scoped>
  
  </style>