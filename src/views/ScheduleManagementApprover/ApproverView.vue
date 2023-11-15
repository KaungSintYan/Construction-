<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
        <Approver /> 
        </section>
     </div>  
  </template>
  <script>
  // @ is an alias to /src
  import Approver from '@/components/ScheduleManagementApprover/Approver.vue'
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  
  export default {
   name: 'ScheduleManagementApproverView',
   components: {
     TopBar, 
     Sidebar,
     Approver
   }
  }
  </script>
  <style>
  
  </style>
  
  
  