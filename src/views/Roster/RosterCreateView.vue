<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <RosterCreate />  
       </section>
     </div>  
</template>

  <script>             
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import RosterCreate from '@/components/Roster/RosterCreate.vue';
  
  export default {
   name: 'RosterCreateView',
   components: {
    TopBar,
    Sidebar,
    RosterCreate
}
  }
  </script>
  <style scoped>
  
  </style>