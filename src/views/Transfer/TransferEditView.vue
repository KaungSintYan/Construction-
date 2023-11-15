<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <TransferEdit />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import TransferEdit from '@/components/Transfer/TransferEdit.vue'
  
  export default {
   name: 'TransferEditView',
   components: {
     TopBar,
     TransferEdit,
     Sidebar,
   }
  }
  </script>
  
