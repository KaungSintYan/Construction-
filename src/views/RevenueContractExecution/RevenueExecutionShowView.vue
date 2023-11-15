<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <RevenueExecutionShow />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import RevenueExecutionShow from '@/components/RevenueContractExecution/RevenueExecutionShow.vue'
  
  export default {
   name: 'RevenueExecutionShowView',
   components: {
     TopBar,
     RevenueExecutionShow,
     Sidebar,
   }
  }
  </script>
  
