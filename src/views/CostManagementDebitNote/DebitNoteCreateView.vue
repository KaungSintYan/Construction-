<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <DebitNoteCreate /> 
       </section>
     </div>  
</template>

  <script>   
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import DebitNoteCreate from '@/components/CostManagementDebitNote/DebitNoteCreate.vue';
  
  export default {
   name: 'DebitNoteCreateView',
   components: {
    TopBar,
    Sidebar,
    DebitNoteCreate
}
  }
  </script>

  <style>
  
  </style>