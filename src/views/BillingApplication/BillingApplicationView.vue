<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <BillingApplication /> 
       </section>
     </div>  
</template>

  <script>       
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import BillingApplication from '@/components/BillingApplication/BillingApplication.vue';

  export default {
   name: 'BillingApplicationView',
   components: {
    TopBar,
    Sidebar,
    BillingApplication
}
  }
  </script>

  <style>
  
  </style>