<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <MonthlyReport />  
       </section>
     </div>  
</template>

  <script>             
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import MonthlyReport from '@/components/MonthlyReport/MonthlyReport.vue';
  
  export default {
   name: 'MonthlyReportView',
   components: {
    TopBar,
    Sidebar,
    MonthlyReport
}
  }
  </script>
  <style scoped>
  
  </style>