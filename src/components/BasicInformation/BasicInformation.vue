<template>
   <div class="container-fluid"  @click="$store.commit('setActive', false)">   
    <div class="row">
        <div class="col-md-12">          
            <router-link to="/basic/worktype">
                <div class="box1"><img src="../../assets/images/basic-information/work1.png" alt=""><span>{{ $t('type_of_work') }}</span></div>
            </router-link>
            <router-link to="/basic/dynamiclabel">
                <div class="box1"><img src="../../assets/images/basic-information/work2.png" alt=""><span>{{ $t('dynamic_label') }}</span></div>
            </router-link>
            <router-link to="/basic/revenuecategory">
                <div class="box1"><img src="../../assets/images/basic-information/work3.png" alt=""><span>{{ $t('revenue_category') }}</span></div>
            </router-link>
            <router-link to="/basic/projectstatus">
                <div class="box1"><img src="../../assets/images/basic-information/work4.png" alt=""><span>{{ $t('project_status') }}</span></div>
            </router-link>
            <router-link to="/basic/sealtype">
                <div class="box1"><img src="../../assets/images/basic-information/work5.png" alt=""><span>{{ $t('sealtype') }}</span></div>
            </router-link>
            <router-link to="/basic/margintype">
                <div class="box1"><img src="../../assets/images/basic-information/work6.png" alt=""><span>{{ $t('margin_type') }}</span></div>
            </router-link>
            <router-link to="/basic/tasklabel">
                <div class="box1"><img src="../../assets/images/basic-information/work7.png" alt=""><span>{{ $t('task_label') }}</span></div>
            </router-link>
            <router-link to="/basic/typeofsection">
                <div class="box1"><img src="../../assets/images/basic-information/work7.png" alt=""><span>{{ $t('type_of_section') }}</span></div>
            </router-link>
            <router-link to="/basic/typeofcontract">
                <div class="box1"><img src="../../assets/images/basic-information/work7.png" alt=""><span>{{ $t('type_of_contract') }}</span></div>
            </router-link>
            <router-link to="/basic/categoryofexpenditure">
                <div class="box1"><img src="../../assets/images/basic-information/work7.png" alt=""><span>{{ $t('category_of_expenditure') }}</span></div>
            </router-link>
            <router-link to="/basic/salarytype">
                <div class="box1"><img src="../../assets/images/basic-information/work7.png" alt=""><span>{{ $t('salary_type') }}</span></div>
            </router-link>
            <router-link to="/basic/paymentsource">
                <div class="box1"><img src="../../assets/images/basic-information/work7.png" alt=""><span>{{ $t('payment_source') }}</span></div>
            </router-link>
            <!-- <router-link to="/basic/budgettype">
                <div class="box1"><img src="../../assets/images/basic-information/work7.png" alt=""><span>{{ $t('budget_type') }}</span></div>
            </router-link> -->
            <router-link to="/basic/clientclassification">
                <div class="box1"><img src="../../assets/images/basic-information/work7.png" alt=""><span>{{ $t('client_classification') }}</span></div>
            </router-link>
            <router-link to="/basic/supplierclassification">
                <div class="box1"><img src="../../assets/images/basic-information/work7.png" alt=""><span>{{ $t('supplier_classification') }}</span></div>
            </router-link>
            <router-link to="/basic/materialclassification">
                <div class="box1"><img src="../../assets/images/basic-information/work7.png" alt=""><span>{{ $t('material_classification') }}</span></div>
            </router-link>
        </div>
    </div>
   </div> 
</template>
<script>
export default {
    name: 'BasicInformation',
    data() {
        return {
            data: [],           
        }
    },
    created(){        
        //this.getData()
    },
    methods:{
        // getData(){
        //     console.log(this.$store.state.api+ 'products')
        //     let api= this.$store.state.api+ 'products';
        //     axios.get(api).then((res)=> {
        //         console.log('resutlt'+ JSON.stringify(res.data))
        //         this.data= res.data.products;
        //     })
        // }
    }
    
}
</script>
<style lang="scss" scoped>
#content {
    background-color: red !important;
}
.box1{
    margin: 10px 0px;
    background: rgb(244, 247, 255);
    padding: 10px;   
    img {
        width: 40px;
        height: 40px;
    }
    span {
        margin-left: 10px;
        font-size: 16px;
        font-weight: 600;
        
    }
}
a{
    text-decoration: none;
}
</style>