<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <ReturnFormShow />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import ReturnFormShow from '@/components/ReturnForm/ReturnFormShow.vue'
  
  export default {
   name: 'ReturnFormShowView',
   components: {
     TopBar,
     ReturnFormShow,
     Sidebar,
   }
  }
  </script>
  
