<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <ReimbursementEdit /> 
       </section>
     </div>  
</template>

  <script>   
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import ReimbursementEdit from '@/components/Reimbursement/ReimbursementEdit.vue';

  
  export default {
   name: 'ReimbursementEditView',
   components: {
    TopBar,
    Sidebar,
    ReimbursementEdit
}
  }
  </script>

  <style>
  
  </style>