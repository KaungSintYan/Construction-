<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <Profit /> 
       </section>
     </div>  
</template>

  <script>     
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import Profit from '@/components/Profit/Profit.vue';

  export default {
   name: 'ProfitView',
   components: {
    TopBar,
    Sidebar,
    Profit
}
  }
  </script>

  <style>
  
  </style>