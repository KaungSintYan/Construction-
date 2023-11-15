<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <PaymentRequestCreate /> 
       </section>
     </div>  
</template>

  <script>     
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import PaymentRequestCreate from '@/components/PaymentRequest/PaymentRequestCreate.vue';

  export default {
   name: 'PaymentRequestCreateView',
   components: {
    TopBar,
    Sidebar,
    PaymentRequestCreate
}
  }
  </script>

  <style>
  
  </style>