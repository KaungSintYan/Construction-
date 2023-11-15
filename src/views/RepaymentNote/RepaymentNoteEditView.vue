<template>  
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <RepaymentNoteEdit /> 
       </section>
     </div>  
</template>

  <script>   
  // @ is an alias to /src
  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import RepaymentNoteEdit from '@/components/RepaymentNote/RepaymentNoteEdit.vue';
  
  export default {
   name: 'RepaymentNoteEditView',
   components: {
    TopBar,
    Sidebar,
    RepaymentNoteEdit
}
  }
  </script>

  <style>
  
  </style>