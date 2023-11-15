<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <RepaymentNoteShow /> 
       </section>
     </div>  
</template>

  <script>   
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import RepaymentNoteShow from '@/components/RepaymentNote/RepaymentNoteShow.vue';
  
  export default {
   name: 'RepaymentNoteShowView',
   components: {
    TopBar,
    Sidebar,
    RepaymentNoteShow
}
  }
  </script>

  <style>
  
  </style>