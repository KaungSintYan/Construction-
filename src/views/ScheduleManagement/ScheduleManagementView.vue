<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <ScheduleManagement /> 
       </section>
     </div>  
</template>

  <script>     
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import ScheduleManagement from '@/components/ScheduleManagement/ScheduleManagement.vue';

  export default {
   name: 'ScheduleManagementView',
   components: {
    TopBar,
    Sidebar,
    ScheduleManagement
}
  }
  </script>

  <style>
  
  </style>