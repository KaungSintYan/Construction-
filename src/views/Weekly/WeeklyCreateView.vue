<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <WeeklyCreate />  
       </section>
     </div>  
</template>

  <script>            
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import WeeklyCreate from '@/components/Weekly/WeeklyCreate.vue';
  
  export default {
   name: 'WeeklyCreateView',
   components: {
    TopBar,
    Sidebar,
    WeeklyCreate
}
  }
  </script>
  <style scoped>
  
  </style>