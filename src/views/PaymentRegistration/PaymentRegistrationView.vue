<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <PaymentRegistration /> 
       </section>
     </div>  
</template>

  <script>    
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import PaymentRegistration from '@/components/PaymentRegistration/PaymentRegistration.vue';

  export default {
   name: 'PaymentRegistrationView',
   components: {
    TopBar,
    Sidebar,
    PaymentRegistration
}
  }
  </script>

  <style>
  
  </style>