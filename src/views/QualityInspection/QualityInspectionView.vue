<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <QualityInspection />  
       </section>
     </div>  
</template>

  <script>       
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import QualityInspection from '@/components/QualityInspection/QualityInspection.vue';
  
  export default {
   name: 'QualityInspectionView',
   components: {
    TopBar,
    Sidebar,
    QualityInspection
}
  }
  </script>
  <style scoped>
  
  </style>