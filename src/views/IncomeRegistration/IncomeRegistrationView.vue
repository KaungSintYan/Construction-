<template>
    <Sidebar />
    <div id="content-wrapper">
        <TopBar />
        <section id="content">
            <IncomeRegistration /> 
        </section>
    </div>
</template>

<script>

import TopBar from '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import IncomeRegistration from '@/components/IncomeRegistration/IncomeRegistration.vue'

export default ({
   name: 'IncomeRegistrationView',
   components: {
    TopBar,
    Sidebar,
    IncomeRegistration
   }
})
</script>
