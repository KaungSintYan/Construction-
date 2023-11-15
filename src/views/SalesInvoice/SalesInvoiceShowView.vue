<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <SalesInvoiceShow /> 
       </section>
     </div>  
</template>

  <script>     
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import SalesInvoiceShow from '@/components/SalesInvoice/SalesInvoiceShow.vue';

  export default {
   name: 'SalesInvoiceShowView',
   components: {
    TopBar,
    Sidebar,
    SalesInvoiceShow
}
  }
  </script>

  <style>
  
  </style>