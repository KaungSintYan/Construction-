<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <ProjectDetail /> 
       </section>
     </div>  
</template>

  <script>     
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import ProjectDetail from '@/components/ScheduleManagement/ProjectDetail.vue';

  export default {
   name: 'ProjectDetailView',
   components: {
    TopBar,
    Sidebar,
    ProjectDetail
}
  }
  </script>

  <style>
  
  </style>