<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <SecurityCheckCreate />  
       </section>
     </div>  
</template>

  <script>        
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import SecurityCheckCreate from '@/components/SecurityCheck/SecurityCheckCreate.vue';
  
  export default {
   name: 'SecurityCheckCreateView',
   components: {
    TopBar,
    Sidebar,
    SecurityCheckCreate
}
  }
  </script>
  <style scoped>
  
  </style>