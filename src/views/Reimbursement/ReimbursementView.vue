<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <Reimbursement /> 
       </section>
     </div>  
</template>

  <script>   
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import Reimbursement from '@/components/Reimbursement/Reimbursement.vue';
  
  export default {
   name: 'ReimbursementView',
   components: {
    TopBar,
    Sidebar,
    Reimbursement
}
  }
  </script>

  <style>
  
  </style>