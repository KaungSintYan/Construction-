<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <InputInvoice /> 
       </section>
     </div>  
</template>

  <script>        
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import InputInvoice from '@/components/InputInvoice/InputInvoice.vue';

  export default {
   name: 'InputInvoiceView',
   components: {
    TopBar,
    Sidebar,
    InputInvoice
}
  }
  </script>

  <style>
  
  </style>