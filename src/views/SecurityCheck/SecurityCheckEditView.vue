<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <SecurityCheckEdit />  
       </section>
     </div>  
</template>

  <script>        
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import SecurityCheckEdit from '@/components/SecurityCheck/SecurityCheckEdit.vue';
  
  export default {
   name: 'SecurityCheckEditView',
   components: {
    TopBar,
    Sidebar,
    SecurityCheckEdit
}
  }
  </script>
  <style scoped>
  
  </style>