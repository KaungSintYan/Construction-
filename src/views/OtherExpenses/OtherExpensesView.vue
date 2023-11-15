<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <OtherExpenses /> 
       </section>
     </div>  
</template>

  <script>      
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import OtherExpenses from '@/components/OtherExpenses/OtherExpenses.vue';

  export default {
   name: 'OtherExpensesView',
   components: {
    TopBar,
    Sidebar,
    OtherExpenses
}
  }
  </script>

  <style>
  
  </style>