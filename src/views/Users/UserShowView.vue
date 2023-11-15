<template>
    <Sidebar />
     <div id="content-wrapper">     
       <TopBar />
       <section id="content">
         <UserShow />  
       </section>
     </div>  
</template>

  <script>
  // @ is an alias to /src

  import TopBar from  '@/components/TopBar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import UserShow from '@/components/Users/UserShow.vue'
  
  export default {
   name: 'UserShowView',
   components: {
     TopBar,
     UserShow,
     Sidebar,
   }
  }
  </script>
  
