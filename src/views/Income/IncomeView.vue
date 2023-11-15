<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <Income /> 
       </section>
     </div>  
</template>

  <script>     
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import Income from '@/components/Income/Income.vue';

  export default {
   name: 'IncomeView',
   components: {
    TopBar,
    Sidebar,
    Income
}
  }
  </script>

  <style>
  
  </style>