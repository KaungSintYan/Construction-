<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <RosterEdit />  
       </section>
     </div>  
</template>

  <script>             
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import RosterEdit from '@/components/Roster/RosterEdit.vue';
  
  export default {
   name: 'RosterEditView',
   components: {
    TopBar,
    Sidebar,
    RosterEdit
}
  }
  </script>
  <style scoped>
  
  </style>