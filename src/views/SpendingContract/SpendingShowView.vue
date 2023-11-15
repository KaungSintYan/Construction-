<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <SpendingShow />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import SpendingShow from '@/components/SpendingContract/SpendingShow.vue'
  
  export default {
   name: 'SpendingShowView',
   components: {
     TopBar,
     SpendingShow,
     Sidebar,
   }
  }
  </script>
  
