<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <BillingApplicationEdit /> 
       </section>
     </div>  
</template>

  <script>        
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import BillingApplicationEdit from '@/components/BillingApplication/BillingApplicationEdit.vue';

  export default {
   name: 'BillingApplicationEditView',
   components: {
    TopBar,
    Sidebar,
    BillingApplicationEdit
}
  }
  </script>

  <style>
  
  </style>