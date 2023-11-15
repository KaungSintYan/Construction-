<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <ProfitEdit />  
       </section>
     </div>  
</template>

  <script>           
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import ProfitEdit from '@/components/Profit/ProfitEdit.vue';
  
  export default {
   name: 'ProfitEditView',
   components: {
    TopBar,
    Sidebar,
    ProfitEdit
}
  }
  </script>
  <style scoped>
  
  </style>