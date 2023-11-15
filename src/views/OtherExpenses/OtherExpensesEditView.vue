<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <OtherExpensesEdit /> 
       </section>
     </div>  
</template>

  <script>      
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import OtherExpensesEdit from '@/components/OtherExpenses/OtherExpensesEdit.vue';

  export default {
   name: 'OtherExpensesEditView',
   components: {
    TopBar,
    Sidebar,
    OtherExpensesEdit
}
  }
  </script>

  <style>
  
  </style>