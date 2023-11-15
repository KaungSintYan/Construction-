<template>
    <Sidebar />
    <div id="content-wrapper">
        <TopBar />
        <section id="content">
            <IncomeRegistrationEdit /> 
        </section>
    </div>
</template>

<script>

import TopBar from '@/components/TopBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import IncomeRegistrationEdit from '@/components/IncomeRegistration/IncomeRegistrationEdit.vue'

export default ({
   name: 'IncomeRegistrationEditView',
   components: {
    TopBar,
    Sidebar,
    IncomeRegistrationEdit
   }
})
</script>