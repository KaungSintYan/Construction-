<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <SalesInvoiceCreate /> 
       </section>
     </div>  
</template>

  <script>     
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import SalesInvoiceCreate from '@/components/SalesInvoice/SalesInvoiceCreate.vue';

  export default {
   name: 'SalesInvoiceCreateView',
   components: {
    TopBar,
    Sidebar,
    SalesInvoiceCreate
}
  }
  </script>

  <style>
  
  </style>