<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <PaymentRequestEdit /> 
       </section>
     </div>  
</template>

  <script>     
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import PaymentRequestEdit from '@/components/PaymentRequest/PaymentRequestEdit.vue';

  export default {
   name: 'PaymentRequestEditView',
   components: {
    TopBar,
    Sidebar,
    PaymentRequestEdit
}
  }
  </script>

  <style>
  
  </style>