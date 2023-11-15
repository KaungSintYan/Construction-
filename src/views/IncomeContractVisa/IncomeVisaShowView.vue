<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <IncomeVisaShow />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import IncomeVisaShow from '@/components/IncomeContractVisa/IncomeVisaShow.vue'
  
  export default {
   name: 'IncomeVisaShowView',
   components: {
     TopBar,
     IncomeVisaShow,
     Sidebar,
   }
  }
  </script>
  
