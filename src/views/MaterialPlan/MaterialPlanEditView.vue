<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <MaterialPlanEdit />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import MaterialPlanEdit from '@/components/MaterialPlan/MaterialPlanEdit.vue'
  
  export default {
   name: 'MaterialPlanEditView',
   components: {
     TopBar,
     MaterialPlanEdit,
     Sidebar,
   }
  }
  </script>
  
