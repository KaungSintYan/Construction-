<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <PaymentRegistrationCreate /> 
       </section>
     </div>  
</template>

  <script>    
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import PaymentRegistrationCreate from '@/components/PaymentRegistration/PaymentRegistrationCreate.vue';

  export default {
   name: 'PaymentRegistrationCreateView',
   components: {
    TopBar,
    Sidebar,
    PaymentRegistrationCreate
}
  }
  </script>

  <style>
  
  </style>