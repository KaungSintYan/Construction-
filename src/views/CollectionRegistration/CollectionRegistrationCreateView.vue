<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <CollectionRegistrationCreate /> 
       </section>
     </div>  
</template>

  <script>   
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import CollectionRegistrationCreate from '@/components/CollectionRegistration/CollectionRegistrationCreate.vue';

  
  export default {
   name: 'CollectionRegistrationCreateView',
   components: {
    TopBar,
    Sidebar,
    CollectionRegistrationCreate
}
  }
  </script>

  <style>
  
  </style>