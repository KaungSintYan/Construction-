<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <PaymentRequestShow /> 
       </section>
     </div>  
</template>

  <script>     
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import PaymentRequestShow from '@/components/PaymentRequest/PaymentRequestShow.vue';

  export default {
   name: 'PaymentRequestShowView',
   components: {
    TopBar,
    Sidebar,
    PaymentRequestShow,
}
  }
  </script>

  <style>
  
  </style>