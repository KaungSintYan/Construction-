<template>  
  <Sidebar />
   <div id="content-wrapper">     
     <TopBar />
     <section id="content">
      <Approver /> 
      </section>
   </div>  
</template>
<script>
// @ is an alias to /src
import Approver from '@/components/SalaryPaymentApprover/Approver.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'SalaryPaymentApproverView',
 components: {
   TopBar,
   Approver, 
   Sidebar
 }
}
</script>
<style>

</style>


