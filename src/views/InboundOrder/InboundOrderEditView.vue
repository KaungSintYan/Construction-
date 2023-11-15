<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <InboundOrderEdit />  
       </section>
     </div>  
</template>
<script>

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import InboundOrderEdit from '@/components/InboundOrder/InboundOrderEdit.vue'
  
  export default {
   name: 'InboundOrderEditView',
   components: {
     TopBar,
     InboundOrderEdit,
     Sidebar,
   }
  }
  </script>
  
