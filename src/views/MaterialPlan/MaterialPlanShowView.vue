<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <MaterialPlanShow />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import MaterialPlanShow from '@/components/MaterialPlan/MaterialPlanShow.vue'
  
  export default {
   name: 'MaterialPlanShowView',
   components: {
     TopBar,
     MaterialPlanShow,
     Sidebar,
   }
  }
  </script>
  
