<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <BudgetEdit />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import BudgetEdit from '@/components/ProjectBudget/BudgetEdit.vue'
  
  export default {
   name: 'BudgetEditView',
   components: {
     TopBar,
     BudgetEdit,
     Sidebar,
   }
  }
  </script>
  
