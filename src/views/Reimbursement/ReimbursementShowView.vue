<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <ReimbursementShow /> 
       </section>
     </div>  
</template>

  <script>   
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import ReimbursementShow from '@/components/Reimbursement/ReimbursementShow.vue';
  
  export default {
   name: 'ReimbursementShowView',
   components: {
    TopBar,
    Sidebar,
    ReimbursementShow
}
  }
  </script>

  <style>
  
  </style>