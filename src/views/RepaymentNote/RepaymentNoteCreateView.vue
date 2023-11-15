<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <RepaymentNoteCreate /> 
       </section>
     </div>  
</template>

  <script>   
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import RepaymentNoteCreate from '@/components/RepaymentNote/RepaymentNoteCreate.vue';
  
  export default {
   name: 'RepaymentNoteCreateView',
   components: {
    TopBar,
    Sidebar,
    RepaymentNoteCreate
}
  }
  </script>

  <style>
  
  </style>