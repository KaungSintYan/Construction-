<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <CollectionRegistrationEdit /> 
       </section>
     </div>  
</template>

  <script>   
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import CollectionRegistrationEdit from '@/components/CollectionRegistration/CollectionRegistrationEdit.vue';

  
  export default {
   name: 'CollectionRegistrationEditView',
   components: {
    TopBar,
    Sidebar,
    CollectionRegistrationEdit
}
  }
  </script>

  <style>
  
  </style>