<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <ExecutionSpendingShow />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import ExecutionSpendingShow from '@/components/ExecutionSpending/ExecutionSpendingShow.vue'
  
  export default {
   name: 'ExecutionSpendingShowView',
   components: {
     TopBar,
     ExecutionSpendingShow,
     Sidebar,
   }
  }
  </script>
  
