<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <ProfitCreate />  
       </section>
     </div>  
</template>

  <script>           
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import ProfitCreate from '@/components/Profit/ProfitCreate.vue';
  
  export default {
   name: 'ProfitCreateView',
   components: {
    TopBar,
    Sidebar,
    ProfitCreate
}
  }
  </script>
  <style scoped>
  
  </style>