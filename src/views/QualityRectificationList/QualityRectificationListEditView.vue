<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <QualityRectificationListEdit />  
       </section>
     </div>  
</template>

  <script>       
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import QualityRectificationListEdit from '@/components/QualityRectificationList/QualityRectificationListEdit.vue';
  
  export default {
   name: 'QualityRectificationListEditView',
   components: {
    TopBar,
    Sidebar,
    QualityRectificationListEdit
}
  }
  </script>
  <style scoped>
  
  </style>