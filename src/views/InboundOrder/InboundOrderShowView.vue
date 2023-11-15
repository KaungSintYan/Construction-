<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <InboundOrderShow />  
       </section>
     </div>  
</template>
<script>

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import InboundOrderShow from '@/components/InboundOrder/InboundOrderShow.vue'
  
  export default {
   name: 'InboundOrderShowView',
   components: {
     TopBar,
     InboundOrderShow,
     Sidebar,
   }
  }
  </script>
  
