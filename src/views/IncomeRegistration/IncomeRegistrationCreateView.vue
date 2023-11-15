<template>
    <Sidebar />
    <div id="content-wrapper">
        <TopBar />
        <section id="content">
            <IncomeRegistrationCreate /> 
        </section>
    </div>
</template>

<script>

import TopBar from '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import IncomeRegistrationCreate from '@/components/IncomeRegistration/IncomeRegistrationCreate.vue'

export default ({
   name: 'IncomeRegistrationCreateView',
   components: {
    TopBar,
    Sidebar,
    IncomeRegistrationCreate
   }
})
</script>