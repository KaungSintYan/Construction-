<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <SpendingEdit />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import SpendingEdit from '@/components/SpendingContract/SpendingEdit.vue'
  
  export default {
   name: 'SpendingEditView',
   components: {
     TopBar,
     SpendingEdit,
     Sidebar,
   }
  }
  </script>
  
