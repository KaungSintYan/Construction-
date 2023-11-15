<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <Daily />  
       </section>
     </div>  
</template>

  <script>           
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import Daily from '@/components/Daily/Daily.vue';
  
  export default {
   name: 'DailyView',
   components: {
    TopBar,
    Sidebar,
    Daily
}
  }
  </script>
  <style scoped>
  
  </style>