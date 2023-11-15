<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <DebitNote /> 
       </section>
     </div>  
</template>

  <script>  
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import DebitNote from '@/components/CostManagementDebitNote/DebitNote.vue';
  
  export default {
   name: 'DebitNoteView',
   components: {
    TopBar,
    Sidebar,
    DebitNote
}
  }
  </script>

  <style>
  
  </style>