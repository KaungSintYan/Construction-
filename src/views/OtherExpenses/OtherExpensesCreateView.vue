<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <OtherExpensesCreate /> 
       </section>
     </div>  
</template>

  <script>      
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import OtherExpensesCreate from '@/components/OtherExpenses/OtherExpensesCreate.vue';

  export default {
   name: 'OtherExpensesCreateView',
   components: {
    TopBar,
    Sidebar,
    OtherExpensesCreate
}
  }
  </script>

  <style>
  
  </style>