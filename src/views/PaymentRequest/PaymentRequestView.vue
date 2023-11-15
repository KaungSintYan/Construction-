<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <PaymentRequest /> 
       </section>
     </div>  
</template>

  <script>    
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import PaymentRequest from '@/components/PaymentRequest/PaymentRequest.vue';

  export default {
   name: 'PaymentRequestView',
   components: {
    TopBar,
    Sidebar,
    PaymentRequest
}
  }
  </script>

  <style>
  
  </style>