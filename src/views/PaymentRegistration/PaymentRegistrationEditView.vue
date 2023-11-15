<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <PaymentRegistrationEdit /> 
       </section>
     </div>  
</template>

  <script>    
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import PaymentRegistrationEdit from '@/components/PaymentRegistration/PaymentRegistrationEdit.vue';

  export default {
   name: 'PaymentRegistrationEditView',
   components: {
    TopBar,
    Sidebar,
    PaymentRegistrationEdit
}
  }
  </script>

  <style>
  
  </style>