<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <ApplyShow />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import ApplyShow from '@/components/ProjectApply/ApplyShow.vue'
  
  export default {
   name: 'ApplyShowView',
   components: {
     TopBar,
     ApplyShow,
     Sidebar,
   }
  }
  </script>
  
