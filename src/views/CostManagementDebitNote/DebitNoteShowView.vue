<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <DebitNoteShow /> 
       </section>
     </div>  
</template> 

  <script>  
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import DebitNoteShow from '@/components/CostManagementDebitNote/DebitNoteShow.vue'
  
  export default {
   name: 'DebitNoteShowView',
   components: {
    TopBar,
    Sidebar,
    DebitNoteShow
}
  }
  </script>

  <style>
  
  </style>