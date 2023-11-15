<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <MonthlyReportCreate />  
       </section>
     </div>  
</template>

  <script>             
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import MonthlyReportCreate from '@/components/MonthlyReport/MonthlyReportCreate.vue';
  
  export default {
   name: 'MonthlyReportCreateView',
   components: {
    TopBar,
    Sidebar,
    MonthlyReportCreate
}
  }
  </script>
  <style scoped>
  
  </style>