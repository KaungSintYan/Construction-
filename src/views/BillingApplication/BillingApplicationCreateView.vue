<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <BillingApplicationCreate /> 
       </section>
     </div>  
</template>

  <script>        
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import BillingApplicationCreate from '@/components/BillingApplication/BillingApplicationCreate.vue';

  export default {
   name: 'BillingApplicationCreateView',
   components: {
    TopBar,
    Sidebar,
    BillingApplicationCreate
}
  }
  </script>

  <style>
  
  </style>