<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <ScheduleManagementEdit />  
       </section>
     </div>  
</template>

  <script>           
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import ScheduleManagementEdit from '@/components/ScheduleManagement/ScheduleManagementEdit.vue';
  
  export default {
   name: 'ScheduleManagementEditView',
   components: {
    TopBar,
    Sidebar,
    ScheduleManagementEdit
}
  }
  </script>
  <style scoped>
  
  </style>