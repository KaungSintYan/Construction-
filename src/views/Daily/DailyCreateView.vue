<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <DailyCreate />  
       </section>
     </div>  
</template>

  <script>           
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import DailyCreate from '@/components/Daily/DailyCreate.vue';
  
  export default {
   name: 'DailyCreateView',
   components: {
    TopBar,
    Sidebar,
    DailyCreate
}
  }
  </script>
  <style scoped>
  
  </style>