<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <SalesInvoice /> 
       </section>
     </div>  
</template>

  <script>     
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import SalesInvoice from '@/components/SalesInvoice/SalesInvoice.vue';

  export default {
   name: 'SalesInvoiceView',
   components: {
    TopBar,
    Sidebar,
    SalesInvoice
}
  }
  </script>

  <style>
  
  </style>