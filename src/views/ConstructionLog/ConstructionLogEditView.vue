<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <ConstructionLogEdit />  
       </section>
     </div>  
</template>

  <script>          
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import ConstructionLogEdit from '@/components/ConstructionLog/ConstructionLogEdit.vue';
  
  export default {
   name: 'ConstructionLogEditView',
   components: {
    TopBar,
    Sidebar,
    ConstructionLogEdit
}
  }
  </script>
  <style scoped>
  
  </style>