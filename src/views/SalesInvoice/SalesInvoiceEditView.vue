<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <SalesInvoiceEdit /> 
       </section>
     </div>  
</template>

  <script>      
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import SalesInvoiceEdit from '@/components/SalesInvoice/SalesInvoiceEdit.vue';

  export default {
   name: 'SalesInvoiceEditView',
   components: {
    TopBar,
    Sidebar,
    SalesInvoiceEdit
}
  }
  </script>

  <style>
  
  </style>