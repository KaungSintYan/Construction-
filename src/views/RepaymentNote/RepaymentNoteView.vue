<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <RepaymentNote /> 
       </section>
     </div>  
</template>

  <script>   
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import RepaymentNote from '@/components/RepaymentNote/RepaymentNote.vue';
  
  export default {
   name: 'RepaymentNoteView',
   components: {
    TopBar,
    Sidebar,
    RepaymentNote
}
  }
  </script>

  <style>
  
  </style>