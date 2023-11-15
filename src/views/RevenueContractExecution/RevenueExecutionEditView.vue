<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <RevenueExecutionEdit />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import RevenueExecutionEdit from '@/components/RevenueContractExecution/RevenueExecutionEdit.vue'
  
  export default {
   name: 'RevenueExecutionEditView',
   components: {
     TopBar,
     RevenueExecutionEdit,
     Sidebar,
   }
  }
  </script>
  
