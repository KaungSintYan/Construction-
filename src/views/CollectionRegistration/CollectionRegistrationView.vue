<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <CollectionRegistration /> 
       </section>
     </div>  
</template>

  <script>   
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import CollectionRegistration from '@/components/CollectionRegistration/CollectionRegistration.vue';

  
  export default {
   name: 'CollectionRegistrationView',
   components: {
    TopBar,
    Sidebar,
    CollectionRegistration
}
  }
  </script>

  <style>
  
  </style>