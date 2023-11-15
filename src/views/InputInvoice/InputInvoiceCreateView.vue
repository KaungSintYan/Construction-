<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <InputInvoiceCreate /> 
       </section>
     </div>  
</template>

  <script>         
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import InputInvoiceCreate from '@/components/InputInvoice/InputInvoiceCreate.vue';

  export default {
   name: 'InputInvoiceCreateView',
   components: {
    TopBar,
    Sidebar,
    InputInvoiceCreate
}
  }
  </script>

  <style>
  
  </style>