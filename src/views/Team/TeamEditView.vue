<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <TeamEdit />  
       </section>
     </div>  
</template>

  <script>            
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import TeamEdit from '@/components/Team/TeamEdit.vue';
  
  export default {
   name: 'TeamEditView',
   components: {
    TopBar,
    Sidebar,
    TeamEdit
}
  }
  </script>
  <style scoped>
  
  </style>