<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <ReimbursementCreate /> 
       </section>
     </div>  
</template>

  <script>   
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import ReimbursementCreate from '@/components/Reimbursement/ReimbursementCreate.vue';
  
  export default {
   name: 'ReimbursementCreateView',
   components: {
    TopBar,
    Sidebar,
    ReimbursementCreate
}
  }
  </script>

  <style>
  
  </style>