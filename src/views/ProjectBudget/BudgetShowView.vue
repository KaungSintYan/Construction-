<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <BudgetShow />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import BudgetShow from '@/components/ProjectBudget/BudgetShow.vue'
  
  export default {
   name: 'BudgetShowView',
   components: {
     TopBar,
     BudgetShow,
     Sidebar,
   }
  }
  </script>
  
