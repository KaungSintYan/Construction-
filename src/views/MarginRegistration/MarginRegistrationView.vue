<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <MarginRegistration /> 
       </section>
     </div>  
</template>

  <script>         
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import MarginRegistration from '@/components/MarginRegistration/MarginRegistration.vue';

  export default {
   name: 'MarginRegistrationView',
   components: {
    TopBar,
    Sidebar,
    MarginRegistration
}
  }
  </script>

  <style>
  
  </style>