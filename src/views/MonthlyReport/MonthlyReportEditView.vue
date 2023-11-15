<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <MonthlyReportEdit />  
       </section>
     </div>  
</template>

  <script>             
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import MonthlyReportEdit from '@/components/MonthlyReport/MonthlyReportEdit.vue';
  
  export default {
   name: 'MonthlyReportEditView',
   components: {
    TopBar,
    Sidebar,
    MonthlyReportEdit
}
  }
  </script>
  <style scoped>
  
  </style>