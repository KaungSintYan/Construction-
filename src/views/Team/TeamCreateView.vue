<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <TeamCreate />  
       </section>
     </div>  
</template>

  <script>            
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import TeamCreate from '@/components/Team/TeamCreate.vue';
  
  export default {
   name: 'TeamCreateView',
   components: {
    TopBar,
    Sidebar,
    TeamCreate
}
  }
  </script>
  <style scoped>
  
  </style>