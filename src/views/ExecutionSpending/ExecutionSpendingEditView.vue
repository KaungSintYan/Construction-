<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <ExecutionSpendingEdit />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import ExecutionSpendingEdit from '@/components/ExecutionSpending/ExecutionSpendingEdit.vue'
  
  export default {
   name: 'ExecutionSpendingEditView',
   components: {
     TopBar,
     ExecutionSpendingEdit,
     Sidebar,
   }
  }
  </script>
  
