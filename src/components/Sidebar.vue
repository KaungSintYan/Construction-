<template>     
    <nav data-status="show"  @mouseenter="mouseenter" @mouseleave="mouseleave" :class="{'nav-tog': navTog}">
        <div class="collapse">
            <div class="coll-btn">
                <img src="../assets/images/right_arrow.svg" alt="">
            </div>
        </div>

        <div class="head">
            <div class="img-wrap">
                <img src="../assets/images/logo.svg" alt="" class="nav-logo">
            </div>
            <div class="nav-title">Asia Oracle</div>   
        </div>

        <div class="nav-list">
            <!-- start -->
            <div class="nav-item" v-for="navObj in navTextList" :key="navObj.id">
                <div class="nav-item-main" @click="showItems(navObj.id)">
                    <div class="img-wrap">                      
                        <img :src="getIconImgUrl(navObj.img)" :alt="navObj.img">
                    </div>
                    <a href="#" class="a-btn">
                        <div class="nav-item-txt"> {{ navObj.title }}</div>
                    </a>                                     
                    <img class="nav-item-more" src="../assets/images/right_arrow.svg" style="transform:rotate(90deg);width: 12px;margin-top: 3px;" alt="">
                </div>
                <div class="more-item" :class="{'nav-hide': navObj.isActive}"  v-for="(item, i) in navObj.moreItem" :key="i" @click="hideNavTog()">               
                    <router-link :to="item.link"  class="a-btn project-section" v-show="item.isShow">
                     <div class="more-each">{{ item.subdtitle }}</div></router-link>                
                </div>
            </div>
            <!-- end -->
        </div>   

        <!-- <div class="foot">
            <div class="img-wrap">
                <img src="../assets/images/setting.svg" alt="">
            </div>
            <div class="nav-foot-tit">Setting</div>   
        </div> -->
    </nav>
    
</template>
<script>
import {authApi} from '@/http/authApi';
export default {
  name: 'Sidebar',  
  data() {    
    return { 
         navTog: false,         
         navTextList: [
            {
                id: 0,img: "building.svg",title: "Project Management",isActive: false,category: "project_management",
                isShow: false,
                moreItem: [
                    {subdtitle: "Project",link: "/project", name: "project", isShow: false},
                    {subdtitle: "Beginning of the project",link: "/beginnigproject", name: "", isShow: true},
                    {subdtitle: "Project Budget",link: "/budget", name: "project_budget", isShow: false},
                    {subdtitle: "Apply with seal",link: "/sealapply", name: "application_for_print", isShow: false}
                ]
            },
            {
                id: 1,img: "contract.svg",title: "Contract Management",isActive: false,category: "contract_management",
                isShow: false,
                moreItem: [
                    {subdtitle: "Revenue Contract",link: "/revenue" ,name: "revenue_contract", isShow: false},
                    {subdtitle: "Revenue Contract Visa",link: "/incomeVisa",name: "revenue_contract_visa", isShow: false},
                    {subdtitle: "Revenue Contract Execute",link: "/revenueExecution",name: "revenue_contract_execution", isShow: false},
                    {subdtitle: "Revenue Contract Settlement",link: "/revenueSettlement",name: 'revenue_contract_settlement', isShow: false},
                    {subdtitle: "Spending Contract",link: "/spending", name: 'spending_contract', isShow: false},
                    {subdtitle: "Spending Contract Visa",link: "/spendingVisa", name: "spending_contract_visa", isShow: false},
                    {subdtitle: "Spending Contract Execution",link: "/executionSpending", name: "spending_contract_execution", isShow: false},
                    {subdtitle: "Spending Contract Settlement",link: "/expenditureSettlement", name: "spending_contract_settlement", isShow: false}
                ]
            },
            {
                id: 2,img: "material.svg",title: "Material Management",isActive: false,category: "material_management",
                isShow: false,
                moreItem: [
                    {subdtitle: "Material Plan",link: "/material_plan", name: "material_plan", isShow: false},
                    {subdtitle: "Purchase Requisition",link: "/purchase_requisition", name: "purchase_requisition", isShow: false},
                    // {subdtitle: "Purchase Order",link: "/purchase_order", name: "purchase_order", isShow: false},
                    {subdtitle: "Inbound Order",link: "/inbound_order", name: "inbound_order", isShow: false},
                    {subdtitle: "Project Inventory",link: "/project_inventory", name: "project_inventory", isShow: false},
                    {subdtitle: "Return Form",link: "/return_form", name: "return_order", isShow: false},
                    // {subdtitle: "bill of material",link: "", name: "", isShow: true},
                    {subdtitle: "Outbound Order",link: "/outbound_order", name: "outbound_order", isShow: false},
                    {subdtitle: "Transfer",link: "/transfer", name: "transfer_order", isShow: false}
                ]
            },
            {
                id: 3,img: "cost.svg",title: "Cost Management",isActive: false,category: "cost_management",
                isShow: false,
                moreItem: [
                    {subdtitle: "Reserve Fund",link: "/reserve_fund",name: "reserve_fund", isShow: false},
                    {subdtitle: "Debit Note",link: "/debit_note",name: "debit_note", isShow: false},
                    {subdtitle: "Repayment Note",link: "/repayment_note",name: "repayment_note", isShow: false},
                    {subdtitle: "Reimbursement",link: "/reimbursement",name: "reimbursement", isShow: false},                    
                ]
            },
            {
                id: 4,img: "financial.svg",title: "Financial Account",isActive: false, category: "financial_management",
                isShow: false,
                moreItem: [
                    // {subdtitle: "Collection Registration",link: "/registration_collection",name: "collection_registration", isShow: false},
                    {subdtitle: "Payment Request",link: "/payment_request", name: "payment_request",isShow: false},
                    {subdtitle: "Payment Registration",link: "/payment_registration", name: "payment_registration",isShow: false},
                    // {subdtitle: "Salary Payment",link: "/salary_payment", name: "salary_payment",isShow: false},  
                    // {subdtitle: "Other Expenses",link: "/other_expenses", name: "other_expense",isShow: false},
                    // {subdtitle: "Billing Application",link: "/billing_application", name: "billing_application",isShow: false},
                    {subdtitle: "Sales Invoice",link: "/sales_invoice", name: "sales_invoice", isShow: false},
                    {subdtitle: "Income Registration",link: "/income_registration", name: "income_registration",isShow: false},
                    // {subdtitle: "Input Invoice",link: "/input_invoice", name: "input_invoice", isShow: false},
                    {subdtitle: "Margin Registration",link: "/margin_registration", name: "margin_registration", isShow: false},                     
                    {subdtitle: "Security Deposit Refund",link: "/security_deposit_refund", name: "security_deposit_refund", isShow: false},
                ]
            },
            {
                id: 5,img: "construction.svg",title: "Construction Management",isActive: false,category: "construction_management",
                isShow: false,
                moreItem: [
                    {subdtitle: "Schedule Management",link: "/schedule",name: "schedule_plan",isShow: false},
                    {subdtitle: "Task Management",link: "/task",name: "task",isShow: false},
                    {subdtitle: "Team",link: "/team",name: "team",isShow: false},
                    {subdtitle: "Roster",link: "/roster",name: "roster",isShow: false},  
                    {subdtitle: "Project Roster",link: "/project_roster",name: "",isShow: false},
                    // {subdtitle: "Order",link: "/order",name: "work_order",isShow: true},
                    {subdtitle: "Quality Inspection",link: "/quality_inspection",name: "quality_check",isShow: false},
                    {subdtitle: "Quality Rectification List",link: "/quality_rectification_list",name: "quality_rectification",isShow: false},
                    {subdtitle: "Security Check",link: "/security_check",name: "security_check",isShow: false},                     
                    {subdtitle: "Safety Rectification List",link: "/safety_rectification_list",name: "security_rectification",isShow: false},
                    // {subdtitle: "Construction Log",link: "/construction_log",name: "construction_log",isShow: true},
                    {subdtitle: "Daily Report",link: "/daily",name: "daily_report",isShow: false},
                    {subdtitle: "Weekly Report",link: "/weekly",name: "weekly_report",isShow: false},                     
                    {subdtitle: "Monthly Report",link: "/monthly_report",name: "monthly_report",isShow: false},
                ]
            },
            // {
            //     id: 6,img: "document.svg",title: "Document Management",isActive: false,
            //     isShow: false,
            //     moreItem: [
            //         {subdtitle: "Company Documents",link: ""},
            //         {subdtitle: "Project Documentation",link: ""},                    
            //     ]
            // },
            {
                id: 7,img: "info.svg",title: "Basic Information",isActive: false,category: "basic_informations",
                isShow: false,
                moreItem: [
                    {subdtitle: "Basic Information",link: "/basic", name: "", isShow: true},
                    {subdtitle: "Client",link: "/client",name: "client", isShow: false},
                    {subdtitle: "Supplier",link: "/supplier", name: "supplier", isShow: false},
                    {subdtitle: "Internal Unit",link: "/internalunit", name: "internal_unit", isShow: false},
                    {subdtitle: "Material Inventory",link: "/materialinventory",name: "material_inventory", isShow: false},                   
                ]
            },
            {
                id: 8,img: "static.svg",title: "Statistical Analysis",isActive: false,category: "statical_analysis",
                isShow: false,
                moreItem: [
                        {subdtitle: "Profit",link: "/profit",name: "profit", isShow: true}, 
                        {subdtitle: "Income",link: "/income",name: "Income", isShow: true}, 
                        {subdtitle: "Outcome",link: "/outcome",name: "Outcome", isShow: true}, 
                    // {subdtitle: "Supplier Accounts",link: ""},
                    // {subdtitle: "Customer Account",link: ""},
                    // {subdtitle: "Project Management Analysis",link: ""},
                    // {subdtitle: "Statistics",link: ""},
                    // {subdtitle: "Salary Statistics",link: ""},
                    // {subdtitle: "Storage Schedule",link: ""},
                    // {subdtitle: "Outbound Schedule",link: ""},
                    // {subdtitle: "Inbound and Outbound Summary Table",link: ""},
                    // {subdtitle: "Order Execution Form",link: ""},
                    // {subdtitle: "Material Settlement Schedule",link: ""},
                    // {subdtitle: "Contract Execution Form",link: ""},
                    // {subdtitle: "Borrowing and Repayment Summary Table",link: ""},
                    // {subdtitle: "Loan Repayment Schedule<",link: ""},
                    // {subdtitle: "Receipt Schedule",link: ""},
                    // {subdtitle: "Material Plan Execution Table",link: ""},
                    // {subdtitle: "Payment Registration Details",link: ""},
                    // {subdtitle: "Summary of Fund Income and Expenditure",link: ""},
                    // {subdtitle: "Fund Income and Expenditure Schedule",link: ""},
                    // {subdtitle: "Reserve Fund Schedule",link: ""},
                ]
            },
            {
                id: 9, img:"users.png",title: "User Management",isActive: false,category: "user_management",
                isShow: false,
                moreItem: [
                    {subdtitle: "Users",link: "/users",name: "user", isShow: false}, 
                    {subdtitle: "Department",link: "/department", name: "departments", isShow: false}                      
                ]
            },          
            {
                id: 10, img:"users.png",title: "Approver & CC",isActive: false,category: "approver_cc",
                isShow: false,
                moreItem: [
                    // {subdtitle: "Project Budget",link: "/project_budget_app_cc",name: "", isShow: false}, 
                    {subdtitle: "Project Apply ",link: "/project_apply_app_cc", name: "", isShow: true},
                    {subdtitle: "Revenue Contract ",link: "/revenue_contract_app_cc", name: "", isShow: true},
                    {subdtitle: "Income Contract Visa",link: "/revenue_contract_visa_app_cc", name: "", isShow: true},
                    {subdtitle: "Revenue Execution",link: "/revenue_contract_exe_app_cc", name: "", isShow: true},
                    {subdtitle: "Revenue Settlement",link: "/revenue_contract_set_app_cc", name: "", isShow: true},
                    {subdtitle: "Spending Contract",link: "/spending_app_cc", name: "", isShow: true},
                    {subdtitle: "Spending Visa",link: "/spending_visa_app_cc", name: "", isShow: true},   
                    {subdtitle: "Execution Spending",link: "/executionSpending_app_cc", name: "", isShow: true},
                    {subdtitle: "Material Plan",link: "/material_plan_app_cc", name: "", isShow: true}, 
                    {subdtitle: "Purchase Requisition",link: "/purchase_requisition_app_cc", name: "", isShow: true}, 
                    {subdtitle: "Purchase Order",link: "/purchase_order_app_cc", name: "", isShow: true}, 
                    {subdtitle: "Inbound Order",link: "/inbound_order_app_cc", name: "", isShow: true}, 
                    {subdtitle: "Return Form",link: "/return_form_app_cc", name: "", isShow: true}, 
                    {subdtitle: "Outbound Order",link: "/outbound_order_app_cc", name: "", isShow: true}, 
                    {subdtitle: "Requisition",link: "/requisition_app_cc", name: "", isShow: true},
                    {subdtitle: "ReserveFund",link: "/reserve_fund_app_cc", name: "", isShow: true},
                    {subdtitle: "DebitNote",link: "/debit_note_app_cc", name: "", isShow: true},
                    {subdtitle: "RepaymentNote",link: "/repayment_note_app_cc", name: "", isShow: true},
                    {subdtitle: "Reimbursement",link: "/reimbursement_app_cc", name: "", isShow: true}, 
                    // {subdtitle: "Collection Registration",link: "/registration_collection_app_cc",name: "", isShow: true},
                    {subdtitle: "Payment Request",link: "/payment_request_app_cc", name: "",isShow: true},
                    {subdtitle: "Payment Registration",link: "/payment_registration_app_cc", name: "",isShow: true},
                    // {subdtitle: "Salary Payment",link: "/salary_payment_app_cc", name: "",isShow: true},  
                    // {subdtitle: "Other Expenses",link: "/other_expenses_app_cc", name: "",isShow: true},
                    // {subdtitle: "Billing Application",link: "/billing_application_app_cc", name: "",isShow: true},
                    {subdtitle: "Sales Invoice",link: "/sales_invoice_app_cc", name: "", isShow: true},
                    // {subdtitle: "Input Invoice",link: "/input_invoice_app_cc", name: "", isShow: true},
                    {subdtitle: "Margin Registration",link: "/margin_registration_app_cc", name: "", isShow: true},                     
                    {subdtitle: "Security Deposit Refund",link: "/security_deposit_refund_app_cc", name: "", isShow: true},
                    // {subdtitle: "Schedule Management",link:"/schedule_management_app_cc", name: "", isShow:true},
                                           
                ]
            }             
         ]
         }
  },
  created() { 
    this.getSideBar();
  },
  computed: { 
    mouseenter: function(){
      this.navTog= true;
      this.$store.commit('setNavTog', this.navTog);
    },
    mouseleave: function(){
      this.navTog = false;
      this.$store.commit('setNavTog', this.navTog);
      this.navHide = "";
      for(let i=0; i< this.navTextList.length; i++){
            this.navTextList[i].isActive = false;
        }
    }

  },
  methods: {
    hideNavTog(){
        this.navTog= false;
        this.$store.commit('setNavTog', this.navTog);
    },
    async getSideBar(){   
     let response = await authApi({
          method: 'GET',                    
          api: '/profile',           
      });
      if(response.message){
      let permissions = response.data.data.permissions.app_permissions.permissions;
      for(let i=0; i< permissions.length; i++){
        let application= permissions[i].application;
        let category= permissions[i].category;
        let moreItem = this.navTextList.find(x=> x.category == category).moreItem;
        for(let j=0; j< application.length; j++){  
            if(moreItem.find(x=> x.name == application[j].name)){
                moreItem.find(x=> x.name == application[j].name).isShow = true;
            }       
          
        }
      }
        //console.log('nav'+ JSON.stringify( this.navTextList))
      }
     
    },
    getIconImgUrl: function(img) {
        return require('../assets/images/'+img);
    },
    showItems: function(id) {        
        let result= this.navTextList.find((x)=> x.id === id).isActive;
        // console.log(result)       
        if(result){
            this.navTextList.find((x)=> x.id === id).isActive= false;
        }
        else{
            this.navTextList.find((x)=> x.id === id).isActive= true;
            for(let i=0; i< this.navTextList.length; i++){
                if(this.navTextList[i].id !== id){
                    this.navTextList[i].isActive = false;
                }
                else{
                    this.navTextList[i].isActive = true;
                }
            }
            this.navHide = "nav-hide";       
        }              
    },
  },  
}
</script>
<style lang="scss" scoped>
@import "../assets/css/_variable.scss";

/* nav */
nav{
    height: 100vh;
    width: 60px;
    background: var(--bgDark);
    color: var(--bgWhite);
    transition: .5s;
}

.nav-tog{
    width: 250px;
}
nav .head, nav .foot{
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    font-family: 'Montserrat-Medium';
    border-bottom: 1px solid var(--onBlack);
    /* transition: 1s; */
    overflow: hidden;
}
nav .foot{  
    border-bottom: none;
    border-top: 1px solid var(--onBlack);
    font-size: 15px;
    color: var(--bgWhite);
}

.nav-foot-tit{
    color: var(--bgWhite);
}
nav .foot:hover{
    background-color: var(--onBlack);
}
nav .head img, nav .foot img{
    width: 30px;
    height: 30px;
}
nav .foot img{
    width: 30px;
    height: 20px;
}
nav .foot .img-wrap{
    width: 60px !important;
    padding: 15px 17.5px !important;
}
nav .img-wrap{
    width: 60px;
    height: 100%;
    padding: 15px 15px;
    display: grid;
    place-items: center;
}

.nav-title{
    transition: .5s;
    white-space: nowrap;
    color: var(--bgWhite);
    margin-right: 30px;
}

.nav-list{
    /* display: flex;
    align-items: flex-start;
    flex-direction: column; */
    height: calc(100% - 115px);
    padding-top: 10px;
    overflow-y: scroll;
    padding: 15px 2px;
    scrollbar-width: thin;
    z-index: 10;
}
.nav-list::-webkit-scrollbar {   
    background: #eee;
    width: 6px; 
}
.nav-list::-webkit-scrollbar-thumb {
    background: #999;
    height: 20px;
    border-radius: 10px;
}

.nav-item{
    width: 100%;
    overflow: hidden;
    transition: .5s;
}
.nav-item-main{
    display: flex;
    align-items: center;    
    /* gap: 2px; */
    overflow: hidden;
    transition: .3s;
}
.nav-list .nav-item img{
    width: 20px;   
    opacity: .75;
}
.nav-list .nav-item-txt{
    color: var(--primaryLighter75);
    font-size: 14px;
    width: 130px;
    margin-right: 15px;
}
.nav-list .img-wrap{
    width: 60px;
    /* height: 50px; */
    display: flex;
    align-items: center ;
    justify-content: center;
}
.nav-item:hover img{
    opacity: 1;
}
.nav-item:hover .nav-item-txt{
    color: var(--primaryLighter);
}
.nav-item-main:hover{
    background-color: var(--onBlack);
}
.more-item{
    font-size: 12px;
    transition: 1s;
}
.more-each{
    white-space: nowrap;
    background-color: var(--black);
    transition: .5s;
    height: 0;
    opacity: 0;
    padding: 0 15px 0 60px;
    color: var(--primaryLighter75);
}
.more-each:hover{
    background-color: var(--onBlack);
    color: var(--primaryLighter);
}
/* .nav-hide{
    
} */
.nav-hide .more-each{
    /* position: absolute;
    top: -40px; */
    opacity: 1;
    height: auto;
    padding: 10px 15px 10px 60px;
    
}


.collapse{
    position: absolute;
    height: 100vh;
    display: grid;
    place-items: center;
    right: -18px;
}
.coll-btn{
    background-color: var(--onBlack);
    height: 50px;
    display: grid;
    place-items: center;
    border-radius: 0 5px 5px 0;
    transition: .5s;
    padding: 0 2px 0 1px;
    z-index: 1;
    opacity: .75;
}
.coll-btn img{
    width: 15px;
    height: 15px;
    transition: .5s;
}

.rotate180{
    transform: rotateY(180deg);
}


.topbar{    
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 20px 30px;
   
}
.top-title{
    display: flex;
    align-items: center;
    gap: 15px;
}
.top-subtitle {
    font-size: 14px;
}

.backBtn{
    border: 1px solid var(--primaryLight2);
    display: grid;
    place-items: center;
    padding: 3px 3px 3px 2px;
    border-radius: 5px;
}
.backBtn img{
    width: 15px;
    height: 15px;
}
.top-link{
    display: flex;
    align-items: center;
    font-size: 15px;
    gap: 7px;
}
.top-home-link{
    opacity: .5;
}



.a-btn{
    text-decoration: none !important;
}

.btn-pro{
    background-color: blanchedalmond;
}

.sm-pro{
    color: rgb(162, 105, 34) ;
    margin: 2px;
}

button{
    margin:4px;    
}
select {
    outline: 0;
    width:300px;
    padding: 4px;
    border:gray;
}
</style>