<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <QualityInspectionEdit />  
       </section>
     </div>  
</template>

  <script>       
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import QualityInspectionEdit from '@/components/QualityInspection/QualityInspectionEdit.vue';
  
  export default {
   name: 'QualityInspectionEditView',
   components: {
    TopBar,
    Sidebar,
    QualityInspectionEdit
}
  }
  </script>
  <style scoped>
  
  </style>