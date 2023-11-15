<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <IncomeVisaEdit />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import IncomeVisaEdit from '@/components/IncomeContractVisa/IncomeVisaEdit.vue'
  
  export default {
   name: 'IncomeVisaEditView',
   components: {
     TopBar,
     IncomeVisaEdit,
     Sidebar,
   }
  }
  </script>
  
