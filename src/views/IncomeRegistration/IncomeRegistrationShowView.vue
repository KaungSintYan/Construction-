<template>
    <Sidebar />
    <div id="content-wrapper">
        <TopBar />
        <section id="content">
            <IncomeRegistrationShow /> 
        </section>
    </div>
</template>

<script>

import TopBar from '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import IncomeRegistrationShow from '@/components/IncomeRegistration/IncomeRegistrationShow.vue'

export default ({
   name: 'IncomeRegistrationShowView',
   components: {
    TopBar,
    Sidebar,
    IncomeRegistrationShow
   }
})
</script>