<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <ProjectShow />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import ProjectShow from '@/components/Project/ProjectShow.vue'
  
  export default {
   name: 'ProjectShowView',
   components: {
     TopBar,
     ProjectShow,
     Sidebar,
   }
  }
  </script>
  
