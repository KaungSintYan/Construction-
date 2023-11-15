<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <MarginRegistrationShow /> 
       </section>
     </div>  
</template>

  <script>         
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import MarginRegistrationShow from '@/components/MarginRegistration/MarginRegistrationShow.vue';

  export default {
   name: 'MarginRegistrationShowView',
   components: {
    TopBar,
    Sidebar,
    MarginRegistrationShow
}
  }
  </script>

  <style>
  
  </style>