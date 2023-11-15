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
import Approver from '@/components/IncomeContractVisaApprover/Approver.vue'
import TopBar from  '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
 name: 'ProjectApplyApproverView',
 components: {
   TopBar,
   Approver, 
   Sidebar
 }
}
</script>
<style>

</style>


