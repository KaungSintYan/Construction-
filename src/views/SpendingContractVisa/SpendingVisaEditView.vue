<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <SpendingVisaEdit />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import SpendingVisaEdit from '@/components/SpendingContractVisa/SpendingVisaEdit.vue'
  
  export default {
   name: 'SpendingVisaEditView',
   components: {
     TopBar,
     SpendingVisaEdit,
     Sidebar,
   }
  }
  </script>
  
