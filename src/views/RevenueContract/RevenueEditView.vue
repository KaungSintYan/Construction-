<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <RevenueEdit />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import RevenueEdit from '@/components/RevenueContract/RevenueEdit.vue'
  
  export default {
   name: 'RevenueEditView',
   components: {
     TopBar,
     RevenueEdit,
     Sidebar,
   }
  }
  </script>
  
