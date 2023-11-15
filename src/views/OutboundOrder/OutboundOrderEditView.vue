<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <OutboundOrderEdit />  
       </section>
     </div>  
</template>

<script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import OutboundOrderEdit from '@/components/OutboundOrder/OutboundOrderEdit.vue'
  
  export default {
   name: 'OutboundOrderEditView',
   components: {
     TopBar,
     OutboundOrderEdit,
     Sidebar,
   }
  }
</script>
  
