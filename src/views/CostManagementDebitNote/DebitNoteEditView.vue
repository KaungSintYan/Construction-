<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <DebitNoteEdit /> 
       </section>
     </div>  
</template> 

  <script>  
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import DebitNoteEdit from '@/components/CostManagementDebitNote/DebitNoteEdit.vue';
  
  export default {
   name: 'DebitNoteEditView',
   components: {
    TopBar,
    Sidebar,
    DebitNoteEdit
}
  }
  </script>

  <style>
  
  </style>