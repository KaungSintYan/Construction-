<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <ProjectEdit />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import ProjectEdit from '@/components/Project/ProjectEdit.vue'
  
  export default {
   name: 'ProjectEditView',
   components: {
     TopBar,
     ProjectEdit,
     Sidebar,
   }
  }
  </script>
  
