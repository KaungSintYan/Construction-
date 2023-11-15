<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <DailyEdit />  
       </section>
     </div>  
</template>

  <script>           
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import DailyEdit from '@/components/Daily/DailyEdit.vue';
  
  export default {
   name: 'DailyEditView',
   components: {
    TopBar,
    Sidebar,
    DailyEdit
}
  }
  </script>
  <style scoped>
  
  </style>