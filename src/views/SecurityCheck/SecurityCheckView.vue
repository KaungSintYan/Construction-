<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <SecurityCheck />  
       </section>
     </div>  
</template>

  <script>        
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import SecurityCheck from '@/components/SecurityCheck/SecurityCheck.vue';
  
  export default {
   name: 'SecurityCheckView',
   components: {
    TopBar,
    Sidebar,
    SecurityCheck
}
  }
  </script>
  <style scoped>
  
  </style>