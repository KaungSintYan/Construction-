<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <RevenueShow />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import RevenueShow from '@/components/RevenueContract/RevenueShow.vue'
  
  export default {
   name: 'RevenueShowView',
   components: {
     TopBar,
     RevenueShow,
     Sidebar,
   }
  }
  </script>
  
