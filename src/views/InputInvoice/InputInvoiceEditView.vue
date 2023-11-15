<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <InputInvoiceEdit /> 
       </section>
     </div>  
</template>

  <script>         
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import InputInvoiceEdit from '@/components/InputInvoice/InputInvoiceEdit.vue';

  export default {
   name: 'InputInvoiceEditView',
   components: {
    TopBar,
    Sidebar,
    InputInvoiceEdit
}
  }
  </script>

  <style>
  
  </style>