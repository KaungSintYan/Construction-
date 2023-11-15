<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <ApplyEdit />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import ApplyEdit from '@/components/ProjectApply/ApplyEdit.vue'
  
  export default {
   name: 'ApplyEditView',
   components: {
     TopBar,
     ApplyEdit,
     Sidebar,
   }
  }
  </script>
  
