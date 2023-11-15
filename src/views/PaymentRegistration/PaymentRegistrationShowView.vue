<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <PaymentRegistrationShow/> 
       </section>
     </div>  
</template>

  <script>    
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import PaymentRegistrationShow from '@/components/PaymentRegistration/PaymentRegistrationShow.vue'

  export default {
   name: 'PaymentRegistrationShowView',
   components: {
    TopBar,
    Sidebar,
    PaymentRegistrationShow
}
  }
  </script>

  <style>
  
  </style>