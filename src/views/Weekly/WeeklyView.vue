<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <Weekly />  
       </section>
     </div>  
</template>

  <script>            
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import Weekly from '@/components/Weekly/Weekly.vue';
  
  export default {
   name: 'WeeklyView',
   components: {
    TopBar,
    Sidebar,
    Weekly
}
  }
  </script>
  <style scoped>
  
  </style>