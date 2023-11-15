<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBarDashboard />
       <section id="content">
         <CcNoti />  
       </section>
     </div>  
</template>

  <script>           
  // @ is an alias to /src

  import TopBarDashboard from  '@/components/TopBarDashboard.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import CcNoti from '@/components/Home/CcNoti.vue';
  
  export default {
   name: 'CcNotiView',
   components: {
    TopBarDashboard,
    Sidebar,
    CcNoti
}
  }
  </script>
  <style scoped>
  
  </style>