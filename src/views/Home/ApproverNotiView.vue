<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBarDashboard />
       <section id="content">
         <ApproverNoti />  
       </section>
     </div>  
</template>

  <script>           
  // @ is an alias to /src

  import TopBarDashboard from  '@/components/TopBarDashboard.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import ApproverNoti from '@/components/Home/ApproverNoti.vue';
  
  export default {
   name: 'ApproverNotiView',
   components: {
    TopBarDashboard,
    Sidebar,
    ApproverNoti
}
  }
  </script>
  <style scoped>
  
  </style>