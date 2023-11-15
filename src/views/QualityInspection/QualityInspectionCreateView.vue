<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <QualityInspectionCreate />  
       </section>
     </div>  
</template>

  <script>       
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import QualityInspectionCreate from '@/components/QualityInspection/QualityInspectionCreate.vue';
  
  export default {
   name: 'QualityInspectionCreateView',
   components: {
    TopBar,
    Sidebar,
    QualityInspectionCreate
}
  }
  </script>
  <style scoped>
  
  </style>