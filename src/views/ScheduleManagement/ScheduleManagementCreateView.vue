<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <ScheduleManagementCreate />  
       </section>
     </div>  
</template>

  <script>           
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import ScheduleManagementCreate from '@/components/ScheduleManagement/ScheduleManagementCreate.vue';
  
  export default {
   name: 'ScheduleManagementCreateView',
   components: {
    TopBar,
    Sidebar,
    ScheduleManagementCreate
}
  }
  </script>
  <style scoped>
  
  </style>