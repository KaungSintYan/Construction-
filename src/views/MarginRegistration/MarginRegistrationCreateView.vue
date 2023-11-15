<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <MarginRegistrationCreate /> 
       </section>
     </div>  
</template>

  <script>        
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import MarginRegistrationCreate from '@/components/MarginRegistration/MarginRegistrationCreate.vue';

  export default {
   name: 'MarginRegistrationCreateView',
   components: {
    TopBar,
    Sidebar,
    MarginRegistrationCreate
}
  }
  </script>

  <style>
  
  </style>