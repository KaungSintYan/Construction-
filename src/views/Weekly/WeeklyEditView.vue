<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <WeeklyEdit />  
       </section>
     </div>  
</template>

  <script>            
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import WeeklyEdit from '@/components/Weekly/WeeklyEdit.vue';
  
  export default {
   name: 'WeeklyEditView',
   components: {
    TopBar,
    Sidebar,
    WeeklyEdit
}
  }
  </script>
  <style scoped>
  
  </style>