<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <SpendingVisaShow />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import SpendingVisaShow from '@/components/SpendingContractVisa/SpendingVisaShow.vue'
  
  export default {
   name: 'SpendingVisaShowView',
   components: {
     TopBar,
     SpendingVisaShow,
     Sidebar,
   }
  }
  </script>
  
