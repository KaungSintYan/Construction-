<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <ReturnFormEdit />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import ReturnFormEdit from '@/components/ReturnForm/ReturnFormEdit.vue'
  
  export default {
   name: 'ReturnFormEditView',
   components: {
     TopBar,
     ReturnFormEdit,
     Sidebar,
   }
  }
  </script>
  
