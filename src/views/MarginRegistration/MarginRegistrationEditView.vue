<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <MarginRegistrationEdit /> 
       </section>
     </div>  
</template>

  <script>         
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import MarginRegistrationEdit from '@/components/MarginRegistration/MarginRegistrationEdit.vue';

  export default {
   name: 'MarginRegistrationEditView',
   components: {
    TopBar,
    Sidebar,
    MarginRegistrationEdit
}
  }
  </script>

  <style>
  
  </style>