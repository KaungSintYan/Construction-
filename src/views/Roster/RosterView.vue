<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <Roster />  
       </section>
     </div>  
</template>

  <script>             
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import Roster from '@/components/Roster/Roster.vue';
  
  export default {
   name: 'RosterView',
   components: {
    TopBar,
    Sidebar,
    Roster
}
  }
  </script>
  <style scoped>
  
  </style>