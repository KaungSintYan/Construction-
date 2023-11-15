<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <Outcome /> 
       </section>
     </div>  
</template>

  <script>     
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import Outcome from '@/components/Outcome/Outcome.vue';

  export default {
   name: 'OutcomeView',
   components: {
    TopBar,
    Sidebar,
    Outcome
}
  }
  </script>

  <style>
  
  </style>