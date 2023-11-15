import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Layout from '../layout/index.vue';
import Plan from '../layout/plan.vue';
import NotFound from '../views/NotFoundView.vue';
const ifAuthenticated = (to, from, next) => {
  let token = localStorage.getItem('token');
  // if ( token !=null || token != undefined) {
  //   next();
  //   return;
  // }
  // else{
  //   window.location.href = "/";
  // }
}



const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        title: "Login",
      },
    },
    // {
    //   path: '/dashboard',
    //   name: 'home',
    //   component: HomeView,  
    //   meta: {
    //     title: "Home",
    //   },  
    //  // beforeEnter: ifAuthenticated,  

    // },
    //Dashboard  
    {
      path: '/dashboard',
      name: 'home',
      component: Layout,
      meta: {
        title: "Home",
      },
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('../views/Home/HomeView.vue'),
        },
        {
          path: 'approver_noti',
          name: 'Approver Notification',
          component: () => import('../views/Home/ApproverNotiView.vue'),
          meta: {
            title: "Approver Notification",
          },
        },
        {
          path: 'cc_noti',
          name: 'CC Notification',
          component: () => import('../views/Home/CcNotiView.vue'),
          meta: {
            title: "CC Notification",
          },
        },

      ]

    },

    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/RegisterView.vue')
    },
    //project
    {
      path: '/project',
      name: 'Project',
      component: Layout,
      meta: {
        title: "Project",
      },
      children: [
        {
          path: '',
          name: 'Project',
          component: () => import('../views/Project/ProjectView.vue'),
        },
        {
          path: 'show/:id',
          name: 'ProjectShow',
          component: () => import('../views/Project/ProjectShowView.vue'),
          meta: {
            title: "ProjectShow",
          },
        },
        {
          path: 'create',
          name: 'ProjectCreate',
          component: () => import('../views/Project/ProjectCreateView.vue'),
          meta: {
            title: "ProjectCreate",
          },
        },
        {
          path: 'edit/:id',
          name: 'ProjectEdit',
          component: () => import('../views/Project/ProjectEditView.vue'),
          meta: {
            title: "ProjectEdit",
          },
        },
      ]

    },
    //Beginning Project
    {
      path: '/beginnigproject',
      name: 'Beginning Project',
      component: () => import('../views/BeginningProject/BeginningProjectView.vue'),
      meta: {
        title: "Beginning Project",
      },
    },
    //budget
    {
      path: '/budget',
      name: 'Budget',
      component: Layout,
      meta: {
        title: "ProjectBudget",
      },
      children: [
        {
          path: '',
          name: 'Budget',
          component: () => import('../views/ProjectBudget/BudgetView.vue'),
        },
        {
          path: 'show/:id',
          name: 'ProjectBudgetShow',
          component: () => import('../views/ProjectBudget/BudgetShowView.vue'),
          meta: {
            title: "ProjectBudgetShow",
          },
        },
        {
          path: 'create',
          name: 'ProjectBudgetCreate',
          component: () => import('../views/ProjectBudget/BudgetCreateView.vue'),
          meta: {
            title: "ProjectBudgetCreate",
          },
        },
        {
          path: 'edit/:id',
          name: 'ProjectBudgetEdit',
          component: () => import('../views/ProjectBudget/BudgetEditView.vue'),
          meta: {
            title: "ProjectBudgetEdit",
          },
        },
      ]

    },

    //Apply with seal
    {
      path: '/sealapply',
      name: 'Apply with seal',
      component: Layout,
      meta: {
        title: "Apply with seal",
      },
      children: [
        {
          path: '',
          name: 'Apply with seal',
          component: () => import('../views/ProjectApply/ApplyView.vue'),
        },
        {
          path: 'show/:id',
          name: 'Apply with seal Show',
          component: () => import('../views/ProjectApply/ApplyShowView.vue'),
          meta: {
            title: "Apply with seal Show",
          },
        },
        {
          path: 'create',
          name: 'Apply with seal Create',
          component: () => import('../views/ProjectApply/ApplyCreateView.vue'),
          meta: {
            title: "Apply with seal Create",
          },
        },
        {
          path: 'edit/:id',
          name: 'Apply with seal Edit',
          component: () => import('../views/ProjectApply/ApplyEditView.vue'),
          meta: {
            title: "Apply with seal Edit",
          },
        },
      ]

    },

    //Revenue
    {
      path: '/revenue',
      name: 'Revenue',
      component: Layout,
      meta: {
        title: "Revenue",
      },
      children: [
        {
          path: '',
          name: 'Revenue',
          component: () => import('../views/RevenueContract/RevenueView.vue'),
        },
        {
          path: 'show/:id',
          name: 'Revenue Show',
          component: () => import('../views/RevenueContract/RevenueShowView.vue'),
          meta: {
            title: "Revenue Show",
          },
        },
        {
          path: 'create',
          name: 'Revenue Create',
          component: () => import('../views/RevenueContract/RevenueCreateView.vue'),
          meta: {
            title: "Revenue Create",
          },
        },
        {
          path: 'edit/:id',
          name: 'Revenue Edit',
          component: () => import('../views/RevenueContract/RevenueEditView.vue'),
          meta: {
            title: "Revenue Edit",
          },
        },
      ]

    },

    // Project Inventory
    {
      path: '/project_inventory',
      name: 'InventoryProject',
      component: Layout,
      meta: {
        title: "InventoryProject",
      },
      children: [
        {
          path: '',
          name: 'InventoryProject',
          component: () => import('../views/InventoryProject/InventoryProjectView.vue'),
        },
        {
          path: 'show/:id',
          name: 'InventoryProject Show',
          component: () => import('../views/InventoryProject/InventoryProjectShowView.vue'),
          meta: {
            title: "InventoryProject Show",
          },
        },
      ]
    },

    //Material Plan
    {
      path: '/material_plan',
      name: 'MaterialPlan',
      component: Layout,
      meta: {
        title: "MaterialPlan",
      },
      children: [
        {
          path: '',
          name: 'MaterialPlan',
          component: () => import('../views/MaterialPlan/MaterialPlanView.vue'),
        },
        {
          path: 'show/:id',
          name: 'MaterialPlan Show',
          component: () => import('../views/MaterialPlan/MaterialPlanShowView.vue'),
          meta: {
            title: "MaterialPlan Show",
          },
        },
        {
          path: 'create',
          name: 'MaterialPlan Create',
          component: () => import('../views/MaterialPlan/MaterialPlanCreateView.vue'),
          meta: {
            title: "MaterialPlan Create",
          },
        },
        {
          path: 'edit/:id',
          name: 'MaterialPlan Edit',
          component: () => import('../views/MaterialPlan/MaterialPlanEditView.vue'),
          meta: {
            title: "MaterialPlan Edit",
          },
        },
      ]

    },


    //Purchase Requisition
    {
      path: '/purchase_requisition',
      name: 'PurchaseRequisition',
      component: Layout,
      meta: {
        title: "PurchaseRequisition",
      },
      children: [
        {
          path: '',
          name: 'PurchaseRequisition',
          component: () => import('../views/PurchaseRequisition/PurchaseRequisitionView.vue'),
        },
        {
          path: 'show/:id',
          name: 'PurchaseRequisition Show',
          component: () => import('../views/PurchaseRequisition/PurchaseRequisitionShowView.vue'),
          meta: {
            title: "PurchaseRequisition Show",
          },
        },
        {
          path: 'create',
          name: 'PurchaseRequisition Create',
          component: () => import('../views/PurchaseRequisition/PurchaseRequisitionCreateView.vue'),
          meta: {
            title: "PurchaseRequisition Create",
          },
        },
        {
          path: 'edit/:id',
          name: 'PurchaseRequisition Edit',
          component: () => import('../views/PurchaseRequisition/PurchaseRequisitionEditView.vue'),
          meta: {
            title: "PurchaseRequisition Edit",
          },
        },
      ]

    },

    //InboundOrder
    {
      path: '/inbound_order',
      name: 'InboundOrder',
      component: Layout,
      meta: {
        title: "InboundOrder",
      },
      children: [
        {
          path: '',
          name: 'InboundOrder',
          component: () => import('../views/InboundOrder/InboundOrderView.vue'),
        },
        {
          path: 'show/:id',
          name: 'InboundOrder Show',
          component: () => import('../views/InboundOrder/InboundOrderShowView.vue'),
          meta: {
            title: "InboundOrder Show",
          },
        },
        {
          path: 'create',
          name: 'InboundOrder Create',
          component: () => import('../views/InboundOrder/InboundOrderCreateView.vue'),
          meta: {
            title: "InboundOrder Create",
          },
        },
        {
          path: 'edit/:id',
          name: 'InboundOrder Edit',
          component: () => import('../views/InboundOrder/InboundOrderEditView.vue'),
          meta: {
            title: "InboundOrder Edit",
          },
        },
      ]

    },
    //Users
    {
      path: '/users',
      name: 'Users',
      component: Layout,
      meta: {
        title: "Users",
      },
      children: [
        {
          path: '',
          name: 'Users',
          component: () => import('../views/Users/UserView.vue'),
        },
        {
          path: 'create',
          name: 'Users Create',
          component: () => import('../views/Users/UserCreateView.vue'),
          meta: {
            title: "Users create",
          },
        },
        {
          path: 'show/:id',
          name: 'Users Show',
          component: () => import('../views/Users/UserShowView.vue'),
          meta: {
            title: "Users Show",
          },
        },
      ]

    },

    //Department
    {
      path: '/department',
      name: 'Department',
      component: Layout,
      meta: {
        title: "Department",
      },
      children: [
        {
          path: '',
          name: 'Department',
          component: () => import('../views/Department/DepartmentView.vue'),
        },
        {
          path: 'create',
          name: 'Department Create',
          component: () => import('../views/Department/DepartmentCreateView.vue'),
          meta: {
            title: "Department Create",
          },
        },
        {
          path: 'edit/:id',
          name: 'Department Edit',
          component: () => import('../views/Department/DepartmentEditView.vue'),
          meta: {
            title: "Department Edit",
          },
        },
      ]

    },

    //ReturnForm
    {
      path: '/return_form',
      name: 'ReturnForm',
      component: Layout,
      meta: {
        title: "ReturnForm",
      },
      children: [
        {
          path: '',
          name: 'ReturnForm',
          component: () => import('../views/ReturnForm/ReturnFormView.vue'),
        },
        {
          path: 'show/:id',
          name: 'ReturnForm Show',
          component: () => import('../views/ReturnForm/ReturnFormShowView.vue'),
          meta: {
            title: "ReturnForm Show",
          },
        },
        {
          path: 'create',
          name: 'ReturnForm Create',
          component: () => import('../views/ReturnForm/ReturnFormCreateView.vue'),
          meta: {
            title: "ReturnForm Create",
          },
        },
        {
          path: 'edit/:id',
          name: 'ReturnForm Edit',
          component: () => import('../views/ReturnForm/ReturnFormEditView.vue'),
          meta: {
            title: "ReturnForm Edit",
          },
        },
      ]

    },

    //PurchaseOrder
    {
      path: '/purchase_order',
      name: 'PurchaseOrder',
      component: Layout,
      meta: {
        title: "PurchaseOrder",
      },
      children: [
        {
          path: '',
          name: 'PurchaseOrder',
          component: () => import('../views/PurchaseOrder/PurchaseOrderView.vue'),
        },
        {
          path: 'show/:id',
          name: 'PurchaseOrder Show',
          component: () => import('../views/PurchaseOrder/PurchaseOrderShowView.vue'),
          meta: {
            title: "PurchaseOrder Show",
          },
        },
        {
          path: 'create',
          name: 'PurchaseOrder Create',
          component: () => import('../views/PurchaseOrder/PurchaseOrderCreateView.vue'),
          meta: {
            title: "PurchaseOrder Create",
          },
        },
        {
          path: 'edit/:id',
          name: 'PurchaseOrder Edit',
          component: () => import('../views/PurchaseOrder/PurchaseOrderEditView.vue'),
          meta: {
            title: "PurchaseOrder Edit",
          },
        },
      ]

    },


    //outboundOrder
    {
      path: '/outbound_order',
      name: 'OutboundOrder',
      component: Layout,
      meta: {
        title: "OutboundOrder",
      },
      children: [
        {
          path: '',
          name: 'OutboundOrder',
          component: () => import('../views/OutboundOrder/OutboundOrderView.vue'),
        },
        {
          path: 'create',
          name: 'OutboundOrder Create',
          component: () => import('../views/OutboundOrder/OutboundOrderCreateView.vue'),
          meta: {
            title: "OutboundOrder Create",
          },
        },
        {
          path: 'show/:id',
          name: 'OutboundOrder Show',
          component: () => import('../views/OutboundOrder/OutboundOrderShowView.vue'),
          meta: {
            title: "OutboundOrder Show",
          },
        },
        {
          path: 'edit/:id',
          name: 'OutboundOrder Edit',
          component: () => import('../views/OutboundOrder/OutboundOrderEditView.vue'),
          meta: {
            title: "OutboundOrder Edit",
          },
        },
      ]

    },


    //Transfer
    {
      path: '/transfer',
      name: 'Transfer',
      component: Layout,
      meta: {
        title: "Transfer",
      },
      children: [
        {
          path: '',
          name: 'Transfer',
          component: () => import('../views/Transfer/TransferView.vue'),
        },
        {
          path: 'create',
          name: 'Transfer Create',
          component: () => import('../views/Transfer/TransferCreateView.vue'),
          meta: {
            title: "Transfer Create",
          },
        },
        {
          path: 'show/:id',
          name: 'Transfer Show',
          component: () => import('../views/Transfer/TransferShowView.vue'),
          meta: {
            title: "Transfer Show",
          },
        },
        {
          path: 'edit/:id',
          name: 'Transfer Edit',
          component: () => import('../views/Transfer/TransferEditView.vue'),
          meta: {
            title: "Transfer Edit ",
          },
        },
      ]

    },



    //Spending
    {
      path: '/spending',
      name: 'Spending',
      component: Layout,
      meta: {
        title: "Spending",
      },
      children: [
        {
          path: '',
          name: 'Spending',
          component: () => import('../views/SpendingContract/SpendingView.vue'),
        },
        {
          path: 'show/:id',
          name: 'Spending Show',
          component: () => import('../views/SpendingContract/SpendingShowView.vue'),
          meta: {
            title: "Spending Show",
          },
        },
        {
          path: 'create',
          name: 'Spending Create',
          component: () => import('../views/SpendingContract/SpendingCreateView.vue'),
          meta: {
            title: "Spending Create",
          },
        },
        {
          path: 'edit/:id',
          name: 'Spending Edit',
          component: () => import('../views/SpendingContract/SpendingEditView.vue'),
          meta: {
            title: "Spending Edit",
          },
        },
      ]

    },

    //Project budget approver & cc
    {
      path: '/project_budget_app_cc',
      name: ' Project approver & cc',
      component: Layout,
      meta: {
        title: "Project approver & cc",
      },
      children: [
        {
          path: '',
          name: 'Project approver & cc',
          component: () => import('../views/ProjectBudgetApprover/BudgetApproverView.vue'),
        },
      ]
    },
    //ProjectApplyApprover Project budget approver & cc
    {
      path: '/project_apply_app_cc',
      name: 'approver & cc',
      component: Layout,
      meta: {
        title: "approver & cc",
      },
      children: [
        {
          path: '',
          name: 'approver & cc',
          component: () => import('../views/ProjectApplyApprover/ApproverView.vue'),
        },
      ]
    },
    //Revenue Contract Approver Project budget approver & cc
    {
      path: '/revenue_contract_app_cc',
      name: 'Revenue Contract approver & cc',
      component: Layout,
      meta: {
        title: "Revenue Contract approver & cc",
      },
      children: [
        {
          path: '',
          name: 'Revenue Contract approver & cc',
          component: () => import('../views/RevenueContractApprover/ApproverView.vue'),
        },
      ]
    },
    //Revenue Contract Visa Approver Project budget approver & cc
    {
      path: '/revenue_contract_visa_app_cc',
      name: 'Revenue Contract Visa approver & cc',
      component: Layout,
      meta: {
        title: "Revenue Contract Visa approver & cc",
      },
      children: [
        {
          path: '',
          name: 'Revenue Contract Visa approver & cc',
          component: () => import('../views/IncomeContractVisaApprover/ApproverView.vue'),
        },
      ]
    },

    //Revenue Contract Exe Approver Project budget approver & cc
    {
      path: '/revenue_contract_exe_app_cc',
      name: 'Revenue Contract Exection approver & cc',
      component: Layout,
      meta: {
        title: "Revenue Contract Exection Visa approver & cc",
      },
      children: [
        {
          path: '',
          name: 'Revenue Contract Exection Visa approver & cc',
          component: () => import('../views/RevenueContractExecutionApprover/ApproverView.vue'),
        },
      ]
    },

    //Revenue Contract Exe Approver Project budget approver & cc
    {
      path: '/revenue_contract_set_app_cc',
      name: 'Revenue Contract revenueSettlement approver & cc',
      component: Layout,
      meta: {
        title: "Revenue Contract revenueSettlement approver & cc",
      },
      children: [
        {
          path: '',
          name: 'Revenue Contract revenueSettlement pprover & cc',
          component: () => import('../views/RevenueContractSettlementApprover/ApproverView.vue'),
        },
      ]
    },
    //Revenue Contract Exe Approver Project budget approver & cc
    {
      path: '/spending_app_cc',
      name: 'SpendingContractApprover approver & cc',
      component: Layout,
      meta: {
        title: "SpendingContractApprover approver & cc",
      },
      children: [
        {
          path: '',
          name: 'SpendingContractApprover pprover & cc',
          component: () => import('../views/SpendingContractApprover/ApproverView.vue'),
        },
      ]
    },

    //Revenue Contract Exe Approver Project budget approver & cc
    {
      path: '/spending_visa_app_cc',
      name: 'Spending Visa Approver approver & cc',
      component: Layout,
      meta: {
        title: "Spending Visa approver & cc",
      },
      children: [
        {
          path: '',
          name: 'Spending Visa pprover & cc',
          component: () => import('../views/SpendingContractVisaApprover/ApproverView.vue'),
        },
      ]
    },

    //Execution Spending Approver Project budget approver & cc
    {
      path: '/executionSpending_app_cc',
      name: 'Execution Spending approver & cc',
      component: Layout,
      meta: {
        title: "Execution Spending approver & cc",
      },
      children: [
        {
          path: '',
          name: 'Execution Spending pprover & cc',
          component: () => import('../views/ExecutionSpendingApprover/ApproverView.vue'),
        },
      ]
    },
    //Expenditure Settlement  approver & cc
    {
      path: '/expenditureSettlement_app_cc',
      name: 'Expenditure Settlement approver & cc',
      component: Layout,
      meta: {
        title: "Expenditure Settlement approver & cc",
      },
      children: [
        {
          path: '',
          name: 'Expenditure Settlement pprover & cc',
          component: () => import('../views/ExpenditureSettlementApprover/ApproverView.vue'),
        },
      ]
    },
    //Material Plan  approver & cc
    {
      path: '/material_plan_app_cc',
      name: 'Material Plan approver & cc',
      component: Layout,
      meta: {
        title: "Material Plan approver & cc",
      },
      children: [
        {
          path: '',
          name: 'Material Plan pprover & cc',
          component: () => import('../views/MaterialPlanApprover/ApproverView.vue'),
        },
      ]
    },
    //PurchaseRequisition  approver & cc
    {
      path: '/purchase_requisition_app_cc',
      name: 'Purchase Requisition approver & cc',
      component: Layout,
      meta: {
        title: "Purchase Requisition approver & cc",
      },
      children: [
        {
          path: '',
          name: 'Purchase Requisition pprover & cc',
          component: () => import('../views/PurchaseRequisitionApprover/ApproverView.vue'),
        },
      ]
    },

    //Purchase Order  approver & cc
    {
      path: '/purchase_order_app_cc',
      name: 'Purchase Order approver & cc',
      component: Layout,
      meta: {
        title: "Purchase Order approver & cc",
      },
      children: [
        {
          path: '',
          name: 'Purchase Order pprover & cc',
          component: () => import('../views/PurchaseOrderApprover/ApproverView.vue'),
        },
      ]
    },
    //Purchase Order  approver & cc
    {
      path: '/inbound_order_app_cc',
      name: 'Inbound Order approver & cc',
      component: Layout,
      meta: {
        title: "Inbound Order approver & cc",
      },
      children: [
        {
          path: '',
          name: 'Inbound Order pprover & cc',
          component: () => import('../views/InboundOrderApprover/ApproverView.vue'),
        },
      ]
    },
    //Return Form  approver & cc
    {
      path: '/return_form_app_cc',
      name: 'Return Form approver & cc',
      component: Layout,
      meta: {
        title: "Return Form approver & cc",
      },
      children: [
        {
          path: '',
          name: 'Return Form pprover & cc',
          component: () => import('../views/ReturnFormApprover/ApproverView.vue'),
        },
      ]
    },
    //Outbound Order approver & cc
    {
      path: '/outbound_order_app_cc',
      name: 'Outbound Order approver & cc',
      component: Layout,
      meta: {
        title: "Outbound Order approver & cc",
      },
      children: [
        {
          path: '',
          name: 'Outbound Order pprover & cc',
          component: () => import('../views/OutboundOrderApprover/ApproverView.vue'),
        },
      ]
    },
    //Requisition approver & cc
    {
      path: '/requisition_app_cc',
      name: 'Requisition approver & cc',
      component: Layout,
      meta: {
        title: "Requisition approver & cc",
      },
      children: [
        {
          path: '',
          name: 'Requisition pprover & cc',
          component: () => import('../views/RequisitionApprover/ApproverView.vue'),
        },
      ]
    },

    //ReserveFund approver & cc
    {
      path: '/reserve_fund_app_cc',
      name: 'ReserveFund approver & cc',
      component: Layout,
      meta: {
        title: "ReserveFund approver & cc",
      },
      children: [
        {
          path: '',
          name: 'ReserveFund pprover & cc',
          component: () => import('../views/CostManagementReserveFundApprover/ApproverView.vue'),
        },
      ]
    },
    //DebitNote approver & cc
    {
      path: '/debit_note_app_cc',
      name: 'DebitNote approver & cc',
      component: Layout,
      meta: {
        title: "DebitNote approver & cc",
      },
      children: [
        {
          path: '',
          name: 'DebitNote pprover & cc',
          component: () => import('../views/CostManagementDebitNoteApprover/ApproverView.vue'),
        },
      ]
    },

    //RepaymentNote approver & cc
    {
      path: '/repayment_note_app_cc',
      name: 'RepaymentNote approver & cc',
      component: Layout,
      meta: {
        title: "RepaymentNote approver & cc",
      },
      children: [
        {
          path: '',
          name: 'RepaymentNote pprover & cc',
          component: () => import('../views/RepaymentNoteApprover/ApproverView.vue'),
        },
      ]
    },
    //Reimbursement approver & cc
    {
      path: '/reimbursement_app_cc',
      name: 'Reimbursement approver & cc',
      component: Layout,
      meta: {
        title: "Reimbursement approver & cc",
      },
      children: [
        {
          path: '',
          name: 'Reimbursement pprover & cc',
          component: () => import('../views/ReimbursementApprover/ApproverView.vue'),
        },
      ]
    },

    //Income Contract Visa
    {
      path: '/incomeVisa',
      name: 'IncomeVisa',
      component: Layout,
      meta: {
        title: "IncomeVisa",
      },
      children: [
        {
          path: '',
          name: 'IncomeVisa',
          component: () => import('../views/IncomeContractVisa/IncomeVisaView.vue'),
        },
        {
          path: 'create',
          name: 'IncomeVisa Create',
          component: () => import('../views/IncomeContractVisa/IncomeVisaCreateView.vue'),
          meta: {
            title: "IncomeVisa Create",
          },
        },
        {
          path: 'show/:id',
          name: 'IncomeVisa Show',
          component: () => import('../views/IncomeContractVisa/IncomeVisaShowView.vue'),
          meta: {
            title: "IncomeVisa Show",
          },
        },
        {
          path: 'edit/:id',
          name: 'IncomeVisa Edit',
          component: () => import('../views/IncomeContractVisa/IncomeVisaEditView.vue'),
          meta: {
            title: "IncomeVisa Edit",
          },
        },
      ]

    },

    //Spending Contract Visa
    {
      path: '/spendingVisa',
      name: 'SpendingVisa',
      component: Layout,
      meta: {
        title: "SpendingVisa",
      },
      children: [
        {
          path: '',
          name: 'SpendingVisa',
          component: () => import('../views/SpendingContractVisa/SpendingVisaView.vue'),
        },
        {
          path: 'create',
          name: 'SpendingVisa Create',
          component: () => import('../views/SpendingContractVisa/SpendingVisaCreateView.vue'),
          meta: {
            title: "SpendingVisa Create",
          },
        },
        {
          path: 'show/:id',
          name: 'SpendingVisa Show',
          component: () => import('../views/SpendingContractVisa/SpendingVisaShowView.vue'),
          meta: {
            title: "SpendingVisa Show",
          },
        },
        {
          path: 'edit/:id',
          name: 'SpendingVisa Edit',
          component: () => import('../views/SpendingContractVisa/SpendingVisaEditView.vue'),
          meta: {
            title: "SpendingVisa Edit",
          },
        },
      ]

    },

    //Revenue Contract Execution
    {
      path: '/revenueExecution',
      name: 'RevenueExecution',
      component: Layout,
      meta: {
        title: "revenueExecution",
      },
      children: [
        {
          path: '',
          name: 'RevenueExecution',
          component: () => import('../views/RevenueContractExecution/RevenueExecutionView.vue'),
        },
        {
          path: 'create',
          name: 'RevenueExecution Create',
          component: () => import('../views/RevenueContractExecution/RevenueExecutionCreateView.vue'),
          meta: {
            title: "RevenueExecution Create",
          },
        },
        {
          path: 'show/:id',
          name: 'RevenueExecution Show',
          component: () => import('../views/RevenueContractExecution/RevenueExecutionShowView.vue'),
          meta: {
            title: "RevenueExecution Show",
          },
        },
        {
          path: 'edit/:id',
          name: 'RevenueExecution Edit',
          component: () => import('../views/RevenueContractExecution/RevenueExecutionEditView.vue'),
          meta: {
            title: "RevenueExecution Edit",
          },
        },
      ]

    },

    //Spending Contract Execution
    {
      path: '/executionSpending',
      name: 'ExecutionSpending',
      component: Layout,
      meta: {
        title: "executionSpending",
      },
      children: [
        {
          path: '',
          name: 'ExecutionSpending',
          component: () => import('../views/ExecutionSpending/ExecutionSpendingView.vue'),
        },
        {
          path: 'create',
          name: 'ExecutionSpending Create',
          component: () => import('../views/ExecutionSpending/ExecutionSpendingCreateView.vue'),
          meta: {
            title: "ExecutionSpending Create",
          },
        },
        {
          path: 'show/:id',
          name: 'ExecutionSpending Show',
          component: () => import('../views/ExecutionSpending/ExecutionSpendingShowView.vue'),
          meta: {
            title: "ExecutionSpending Show",
          },
        },
        {
          path: 'edit/:id',
          name: 'ExecutionSpending Edit',
          component: () => import('../views/ExecutionSpending/ExecutionSpendingEditView.vue'),
          meta: {
            title: "ExecutionSpending Edit",
          },
        },
      ]

    },

    //Revenue Contract Settlement
    {
      path: '/revenueSettlement',
      name: 'RevenueSettlement',
      component: Layout,
      meta: {
        title: "revenueSettlement",
      },
      children: [
        {
          path: '',
          name: 'revenueSettlement',
          component: () => import('../views/RevenueContractSettlement/RevenueSettlementView.vue'),
        },
        {
          path: 'create',
          name: 'RevenueSettlement Create',
          component: () => import('../views/RevenueContractSettlement/RevenueSettlementCreateView.vue'),
          meta: {
            title: "RevenueSettlement Create",
          },
        },
        {
          path: 'show/:id',
          name: 'RevenueSettlement Show',
          component: () => import('../views/RevenueContractSettlement/RevenueSettlementShowView.vue'),
          meta: {
            title: "RevenueSettlement Show",
          },
        },
        {
          path: 'edit/:id',
          name: 'RevenueSettlement Edit',
          component: () => import('../views/RevenueContractSettlement/RevenueSettlementEditView.vue'),
          meta: {
            title: "RevenueSettlement Edit",
          },
        },
      ]

    },
    //spending Contract Settlement
    {
      path: '/expenditureSettlement',
      name: 'ExpenditureSettlement',
      component: Layout,
      meta: {
        title: "expenditureSettlement",
      },
      children: [
        {
          path: '',
          name: 'ExpenditureSettlement',
          component: () => import('../views/ExpenditureSettlement/ExpenditureSettlementView.vue'),
        },
        {
          path: 'create',
          name: 'ExpenditureSettlement Create',
          component: () => import('../views/ExpenditureSettlement/ExpenditureSettlementCreateView.vue'),
          meta: {
            title: "ExpenditureSettlement Create",
          },
        },
        {
          path: 'show/:id',
          name: 'ExpenditureSettlement Show',
          component: () => import('../views/ExpenditureSettlement/ExpenditureSettlementShowView.vue'),
          meta: {
            title: "ExpenditureSettlement Show",
          },
        },
        {
          path: 'edit/:id',
          name: 'ExpenditureSettlement Edit',
          component: () => import('../views/ExpenditureSettlement/ExpenditureSettlementEditView.vue'),
          meta: {
            title: "ExpenditureSettlement Edit",
          },
        },
      ]

    },
    {
      path: '/basic',
      name: 'Basic',
      component: Layout,
      meta: {
        title: "Basic Information",
      },
      children: [
        {
          path: '',
          name: 'Basic',
          component: () => import('../views/BasicInformation/BasicInformationView.vue'),
        },
        {
          path: 'worktype',
          name: 'Worktype',
          component: () => import('../views/BasicInformation/BasicWorkTypeView.vue'),
          meta: {
            title: "Worktype",
          },
        },
        {
          path: 'dynamiclabel',
          name: 'DynamicLabel',
          component: () => import('../views/BasicInformation/BasicDynamicLabelView.vue'),
          meta: {
            title: "DynamicLabel",
          },
        },
        {
          path: 'revenuecategory',
          name: 'RevenueCategory',
          component: () => import('../views/BasicInformation/BasicRevenueCategoryView.vue'),
          meta: {
            title: "RevenueCategory",
          },
        },
        {
          path: 'projectstatus',
          name: 'ProjectStatus',
          component: () => import('../views/BasicInformation/BasicProjectStatusView.vue'),
          meta: {
            title: "ProjectStatus",
          },
        },
        {
          path: 'sealtype',
          name: 'Sealtype',
          component: () => import('../views/BasicInformation/BasicSealTypeView.vue'),
          meta: {
            title: "Sealtype",
          },
        },
        {
          path: 'margintype',
          name: 'MarginType',
          component: () => import('../views/BasicInformation/BasicMarginTypeView.vue'),
          meta: {
            title: "MarginType",
          },
        },
        {
          path: 'tasklabel',
          name: 'TaskLabel',
          component: () => import('../views/BasicInformation/BasicTaskLabelView.vue'),
          meta: {
            title: "TaskLabel",
          },
        },
        {
          path: 'typeofsection',
          name: 'TypeOfSection',
          component: () => import('../views/BasicInformation/BasicTypeOfSectionView.vue'),
          meta: {
            title: "TypeOfSection",
          },
        },
        {
          path: 'typeofcontract',
          name: 'TypeOfContract',
          component: () => import('../views/BasicInformation/BasicTypeOfContractView.vue'),
          meta: {
            title: "TypeOfContract",
          },
        },
        {
          path: 'categoryofexpenditure',
          name: 'CategoryOfExpenditure',
          component: () => import('../views/BasicInformation/CategoryOfExpenditureView.vue'),
          meta: {
            title: "CategoryOfExpenditure",
          },
        },
        {
          path: 'salarytype',
          name: 'SalaryType',
          component: () => import('../views/BasicInformation/SalaryTypeView.vue'),
          meta: {
            title: "SalaryType",
          },
        },
        {
          path: 'paymentsource',
          name: 'PaymentSource',
          component: () => import('../views/BasicInformation/BasicPaymentSourceView.vue'),
          meta: {
            title: "PaymentSource",
          },
        },
        {
          path: 'budgettype',
          name: 'BudgetType',
          component: () => import('../views/BasicInformation/BasicBudgetTypeView.vue'),
          meta: {
            title: "BudgetType",
          },
        },
        {
          path: 'clientclassification',
          name: 'ClientClassification',
          component: () => import('../views/BasicInformation/ClientClassificationView.vue'),
          meta: {
            title: "ClientClassification",
          },
        },
        {
          path: 'supplierclassification',
          name: 'SupplierClassification',
          component: () => import('../views/BasicInformation/SupplierClassificationView.vue'),
          meta: {
            title: "SupplierClassification",
          },
        },
        {
          path: 'materialclassification',
          name: 'MaterialClassification',
          component: () => import('../views/BasicInformation/MaterialClassificationView.vue'),
          meta: {
            title: "MaterialClassification",
          },
        },
      ]
    },
    //Client
    {
      path: '/client',
      name: 'Client',
      component: Layout,
      meta: {
        title: "Client",
      },
      children: [
        {
          path: '',
          name: 'Client',
          component: () => import('../views/BasicInformationClient/ClientView.vue'),
        },
        {
          path: 'create',
          name: '',
          component: () => import('../views/BasicInformationClient/ClientCreateView.vue'),
          meta: {
            title: "new Customer",
          },

        },
        {
          path: 'edit/:id',
          name: '',
          component: () => import('../views/BasicInformationClient/ClientEditView.vue'),
          meta: {
            title: "edit Customer",
          },
          props: true
        }

      ]
    },
    //Supplier
    {
      path: '/supplier',
      name: 'Supplier',
      component: Layout,
      meta: {
        title: "Supplier",
      },
      children: [
        {
          path: '',
          name: 'Supplier',
          component: () => import('../views/BasicInformationSupplier/SupplierView.vue'),
        },
        {
          path: 'create',
          name: '',
          component: () => import('../views/BasicInformationSupplier/SupplierCreateView.vue'),
          meta: {
            title: "new Supplier",
          },

        },
        {
          path: 'edit/:id',
          name: '',
          component: () => import('../views/BasicInformationSupplier/SupplierEditView.vue'),
          meta: {
            title: "edit Supplier",
          },
          props: true
        }

      ]
    },
    //InternalUnit
    {
      path: '/internalunit',
      name: 'InternalUnit',
      component: Layout,
      meta: {
        title: "InternalUnit",
      },
      children: [
        {
          path: '',
          name: 'InternalUnit',
          component: () => import('../views/BasicInformationInternalUnit/InternalUnitView.vue'),
        },
        {
          path: 'create',
          name: '',
          component: () => import('../views/BasicInformationInternalUnit/InternalUnitCreateView.vue'),
          meta: {
            title: "new InternalUnit",
          },

        },
        {
          path: 'edit/:id',
          name: '',
          component: () => import('../views/BasicInformationInternalUnit/InternalUnitEditView.vue'),
          meta: {
            title: "edit InternalUnit",
          },
          props: true
        }

      ]
    },
    //MaterialInventory
    {
      path: '/materialinventory',
      name: 'MaterialInventory',
      component: Layout,
      meta: {
        title: "MaterialInventory",
      },
      children: [
        {
          path: '',
          name: 'MaterialInventory',
          component: () => import('../views/BasicInformationMaterialInventory/MaterialInventoryView.vue'),
        },
        {
          path: 'create',
          name: '',
          component: () => import('../views/BasicInformationMaterialInventory/MaterialInventoryCreateView.vue'),
          meta: {
            title: "New MaterialInventory",
          },

        },
        {
          path: 'edit/:id',
          name: '',
          component: () => import('../views/BasicInformationMaterialInventory/MaterialInventoryEditView.vue'),
          meta: {
            title: "Edit MaterialInventory",
          },
          props: true
        }

      ]
    },

    //Reserve Fund 
    {
      path: '/reserve_fund',
      name: 'ReserveFund',
      component: Layout,
      meta: {
        title: "ReserveFund",
      },
      children: [
        {
          path: '',
          name: 'ReserveFund',
          component: () => import('../views/CostManagementReserveFund/ReserveFundView.vue'),
        },
        {
          path: 'create',
          name: 'ReserveFund Create',
          component: () => import('../views/CostManagementReserveFund/ReserveFundCreateView.vue'),
          meta: {
            title: "ReserveFund Create",
          },
        },
        {
          path: 'show/:id',
          name: 'ReserveFund Show',
          component: () => import('../views/CostManagementReserveFund/ReserveFundShowView.vue'),
          meta: {
            title: "ReserveFund Show",
          },
        },
        {
          path: 'edit/:id',
          name: 'ReserveFund Edit',
          component: () => import('../views/CostManagementReserveFund/ReserveFundEditView.vue'),
          meta: {
            title: "ReserveFund Edit",
          },
        },
      ]

    },

    //Debit Note  
    {
      path: '/debit_note',
      name: 'DebitNote',
      component: Layout,
      meta: {
        title: "DebitNote",
      },
      children: [
        {
          path: '',
          name: 'DebitNote',
          component: () => import('../views/CostManagementDebitNote/DebitNoteView.vue'),
        },
        {
          path: 'create',
          name: 'DebitNote Create',
          component: () => import('../views/CostManagementDebitNote/DebitNoteCreateView.vue'),
          meta: {
            title: "Debit Create",
          },
        },
        {
          path: 'show/:id',
          name: 'DebitNote Show',
          component: () => import('../views/CostManagementDebitNote/DebitNoteShowView.vue'),
          meta: {
            title: "Debit Show",
          },
        },
        {
          path: 'edit/:id',
          name: 'DebitNote Edit',
          component: () => import('../views/CostManagementDebitNote/DebitNoteEditView.vue'),
          meta: {
            title: "DebitNote Edit",
          },
        },
      ]

    },

    //Repayment Note   
    {
      path: '/repayment_note',
      name: 'RepaymentNote',
      component: Layout,
      meta: {
        title: "RepaymentNote",
      },
      children: [
        {
          path: '',
          name: 'RepaymentNote',
          component: () => import('../views/RepaymentNote/RepaymentNoteView.vue'),
        },
        {
          path: 'create',
          name: 'RepaymentNote Create',
          component: () => import('../views/RepaymentNote/RepaymentNoteCreateView.vue'),
          meta: {
            title: "RepaymentNote Create",
          },
        },
        {
          path: 'show/:id',
          name: 'RepaymentNote Show',
          component: () => import('../views/RepaymentNote/RepaymentNoteShowView.vue'),
          meta: {
            title: "RepaymentNote Show",
          },
        },
        {
          path: 'edit/:id',
          name: 'RepaymentNote Edit',
          component: () => import('../views/RepaymentNote/RepaymentNoteEditView.vue'),
          meta: {
            title: "RepaymentNote Edit",
          },
        },
      ]

    },

    //Reimbursement    
    {
      path: '/reimbursement',
      name: 'Reimbursement',
      component: Layout,
      meta: {
        title: "Reimbursement",
      },
      children: [
        {
          path: '',
          name: 'Reimbursement',
          component: () => import('../views/Reimbursement/ReimbursementView.vue'),
        },
        {
          path: 'create',
          name: 'Reimbursement Create',
          component: () => import('../views/Reimbursement/ReimbursementCreateView.vue'),
          meta: {
            title: "Reimbursement Create",
          },
        },
        {
          path: 'show/:id',
          name: 'Reimbursement Show',
          component: () => import('../views/Reimbursement/ReimbursementShowView.vue'),
          meta: {
            title: "Reimbursement Show",
          },
        },
        {
          path: 'edit/:id',
          name: 'Reimbursement Edit',
          component: () => import('../views/Reimbursement/ReimbursementEditView.vue'),
          meta: {
            title: "Reimbursement Edit",
          },
        },
      ]

    },

    //Collection Registration     
    {
      path: '/registration_collection',
      name: 'CollectionRegistration',
      component: Layout,
      meta: {
        title: "CollectionRegistration",
      },
      children: [
        {
          path: '',
          name: 'CollectionRegistration',
          component: () => import('../views/CollectionRegistration/CollectionRegistrationView.vue'),
        },
        {
          path: 'create',
          name: 'CollectionRegistration Create',
          component: () => import('../views/CollectionRegistration/CollectionRegistrationCreateView.vue'),
          meta: {
            title: "CollectionRegistration Create",
          },
        },
        {
          path: 'edit/:id',
          name: 'CollectionRegistration Edit',
          component: () => import('../views/CollectionRegistration/CollectionRegistrationEditView.vue'),
          meta: {
            title: "CollectionRegistration Edit",
          },
        },
      ]

    },
    //Collection Registration approver & cc
    {
      path: '/registration_collection_app_cc',
      name: 'Collection Registration & cc',
      component: Layout,
      meta: {
        title: "Collection Registration approver & cc",
      },
      children: [
        {
          path: '',
          name: 'Collection Registration approver & cc',
          component: () => import('../views/CollectionRegistrationApprover/ApproverView.vue'),
        },
      ]
    },

    //Payment Request     
    {
      path: '/payment_request',
      name: 'PaymentRequest',
      component: Layout,
      meta: {
        title: "PaymentRequest",
      },
      children: [
        {
          path: '',
          name: 'PaymentRequest',
          component: () => import('../views/PaymentRequest/PaymentRequestView.vue'),
        },
        {
          path: 'show/:id',
          name: 'PaymentRequest Show',
          component: () => import('../views/PaymentRequest/PaymentRequestShowView.vue'),
          meta: {
            title: "PaymentRequest Show",
          },
        },
        {
          path: 'create',
          name: 'PaymentRequest Create',
          component: () => import('../views/PaymentRequest/PaymentRequestCreateView.vue'),
          meta: {
            title: "PaymentRequest Create",
          },
        },
        {
          path: 'edit/:id',
          name: 'PaymentRequest Edit',
          component: () => import('../views/PaymentRequest/PaymentRequestEditView.vue'),
          meta: {
            title: "PaymentRequest Edit",
          },
        },
      ]

    },
    //Payment Request  approver & cc
    {
      path: '/payment_request_app_cc',
      name: 'Payment Request approver & cc',
      component: Layout,
      meta: {
        title: "Payment Request approver & cc",
      },
      children: [
        {
          path: '',
          name: 'Payment Request approver & cc',
          component: () => import('../views/PaymentRequestApprover/ApproverView.vue'),
        },
      ]
    },
    //Income Registration
    {
      path: '/income_registration',
      name: 'IncomeRegistration',
      component: Layout,
      meta: {
        title: "IncomeRegistration",
      },
      children: [
        {
          path: '',
          name: 'IncomeRegistration',
          component: () => import('../views/IncomeRegistration/IncomeRegistrationView.vue'),
        },
        {
          path: 'create',
          name: 'IncomeRegistration Create',
          component: () => import('../views/IncomeRegistration/IncomeRegistrationCreateView.vue'),
          meta: {
            title: "IncomeRegistration Create",
          },
        },
        {
          path: 'show/:id',
          name: 'IncomeRegistration Show',
          component: () => import('../views/IncomeRegistration/IncomeRegistrationShowView.vue'),
          meta: {
            title: "IncomeRegistration Show",
          },
        },
        {
          path: 'edit/:id',
          name: 'IncomeRegistration Edit',
          component: () => import('../views/IncomeRegistration/IncomeRegistrationEditView.vue'),
          meta: {
            title: "IncomeRegistration Edit",
          },
        },
      ]
    },
    //Payment Registration      
    {
      path: '/payment_registration',
      name: 'PaymentRegistration',
      component: Layout,
      meta: {
        title: "PaymentRegistration",
      },
      children: [
        {
          path: '',
          name: 'PaymentRegistration',
          component: () => import('../views/PaymentRegistration/PaymentRegistrationView.vue'),
        },
        {
          path: 'create',
          name: 'PaymentRegistration Create',
          component: () => import('../views/PaymentRegistration/PaymentRegistrationCreateView.vue'),
          meta: {
            title: "PaymentRegistration Create",
          },
        },
        {
          path: 'show/:id',
          name: 'PaymentRegistration Show',
          component: () => import('../views/PaymentRegistration/PaymentRegistrationShowView.vue'),
          meta: {
            title: "PaymentRegistration Show",
          },
        },
        {
          path: 'edit/:id',
          name: 'PaymentRegistration Edit',
          component: () => import('../views/PaymentRegistration/PaymentRegistrationEditView.vue'),
          meta: {
            title: "PaymentRegistration Edit",
          },
        },
      ]

    },
    //Payment Registration   approver & cc
    {
      path: '/payment_registration_app_cc',
      name: 'Payment Registration  approver & cc',
      component: Layout,
      meta: {
        title: "Payment Registration  approver & cc",
      },
      children: [
        {
          path: '',
          name: 'Payment Registration  approver & cc',
          component: () => import('../views/PaymentRegistrationApprover/ApproverView.vue'),
        },
      ]
    },
    //Salary Payment       
    {
      path: '/salary_payment',
      name: 'SalaryPayment',
      component: Layout,
      meta: {
        title: "SalaryPayment",
      },
      children: [
        {
          path: '',
          name: 'SalaryPayment',
          component: () => import('../views/SalaryPayment/SalaryPaymentView.vue'),
        },
        {
          path: 'create',
          name: 'SalaryPayment Create',
          component: () => import('../views/SalaryPayment/SalaryPaymentCreateView.vue'),
          meta: {
            title: "SalaryPayment Create",
          },
        },
        {
          path: 'edit/:id',
          name: 'SalaryPayment Edit',
          component: () => import('../views/SalaryPayment/SalaryPaymentEditView.vue'),
          meta: {
            title: "SalaryPayment Edit",
          },
        },
      ]

    },
    //Salary Payment approver & cc
    {
      path: '/salary_payment_app_cc',
      name: 'Salary Payment approver & cc',
      component: Layout,
      meta: {
        title: "Salary Payment approver & cc",
      },
      children: [
        {
          path: '',
          name: 'Salary Payment approver & cc',
          component: () => import('../views/SalaryPaymentApprover/ApproverView.vue'),
        },
      ]
    },
    //Other Expenses      
    {
      path: '/other_expenses',
      name: 'OtherExpenses',
      component: Layout,
      meta: {
        title: "OtherExpenses",
      },
      children: [
        {
          path: '',
          name: 'OtherExpenses',
          component: () => import('../views/OtherExpenses/OtherExpensesView.vue'),
        },
        {
          path: 'create',
          name: 'OtherExpenses Create',
          component: () => import('../views/OtherExpenses/OtherExpensesCreateView.vue'),
          meta: {
            title: "OtherExpenses Create",
          },
        },
        {
          path: 'edit/:id',
          name: 'OtherExpenses Edit',
          component: () => import('../views/OtherExpenses/OtherExpensesEditView.vue'),
          meta: {
            title: "OtherExpenses Edit",
          },
        },
      ]

    },
    //Other Expenses approver & cc
    {
      path: '/other_expenses_app_cc',
      name: 'Other Expenses approver & cc',
      component: Layout,
      meta: {
        title: "Other Expenses approver & cc",
      },
      children: [
        {
          path: '',
          name: 'Other Expenses approver & cc',
          component: () => import('../views/OtherExpensesApprover/ApproverView.vue'),
        },
      ]
    },
    //Billing Application       
    {
      path: '/billing_application',
      name: 'BillingApplication',
      component: Layout,
      meta: {
        title: "BillingApplication",
      },
      children: [
        {
          path: '',
          name: 'BillingApplication',
          component: () => import('../views/BillingApplication/BillingApplicationView.vue'),
        },
        {
          path: 'create',
          name: 'BillingApplication Create',
          component: () => import('../views/BillingApplication/BillingApplicationCreateView.vue'),
          meta: {
            title: "BillingApplication Create",
          },
        },
        {
          path: 'edit/:id',
          name: 'BillingApplication Edit',
          component: () => import('../views/BillingApplication/BillingApplicationEditView.vue'),
          meta: {
            title: "BillingApplication Edit",
          },
        },
      ]

    },
    //Billing Application approver & cc
    {
      path: '/billing_application_app_cc',
      name: 'Billing Application approver & cc',
      component: Layout,
      meta: {
        title: "Billing Application approver & cc",
      },
      children: [
        {
          path: '',
          name: 'Billing Application approver & cc',
          component: () => import('../views/BillingApplicationApprover/ApproverView.vue'),
        },
      ]
    },

    //Sales Invoice        
    {
      path: '/sales_invoice',
      name: 'SalesInvoice',
      component: Layout,
      meta: {
        title: "SalesInvoice",
      },
      children: [
        {
          path: '',
          name: 'SalesInvoice',
          component: () => import('../views/SalesInvoice/SalesInvoiceView.vue'),
        },
        {
          path: 'create',
          name: 'SalesInvoice Create',
          component: () => import('../views/SalesInvoice/SalesInvoiceCreateView.vue'),
          meta: {
            title: "SalesInvoice Create",
          },
        },
        {
          path: 'show/:id',
          name: 'SalesInvoice Show',
          component: () => import('../views/SalesInvoice/SalesInvoiceShowView.vue'),
          meta: {
            title: "SalesInvoice Show",
          },
        },
        {
          path: 'edit/:id',
          name: 'SalesInvoice Edit',
          component: () => import('../views/SalesInvoice/SalesInvoiceEditView.vue'),
          meta: {
            title: "SalesInvoice Edit",
          },
        },
      ]

    },
    //Sales Invoice approver & cc
    {
      path: '/sales_invoice_app_cc',
      name: 'Sales Invoice approver & cc',
      component: Layout,
      meta: {
        title: "Sales Invoice approver & cc",
      },
      children: [
        {
          path: '',
          name: 'Sales Invoice approver & cc',
          component: () => import('../views/SalesInvoiceApprover/ApproverView.vue'),
        },
      ]
    },
    //Input Invoice        
    {
      path: '/input_invoice',
      name: 'InputInvoice',
      component: Layout,
      meta: {
        title: "InputInvoice",
      },
      children: [
        {
          path: '',
          name: 'InputInvoice',
          component: () => import('../views/InputInvoice/InputInvoiceView.vue'),
        },
        {
          path: 'create',
          name: 'InputInvoice Create',
          component: () => import('../views/InputInvoice/InputInvoiceCreateView.vue'),
          meta: {
            title: "InputInvoice Create",
          },
        },
        {
          path: 'edit/:id',
          name: 'InputInvoice Edit',
          component: () => import('../views/InputInvoice/InputInvoiceEditView.vue'),
          meta: {
            title: "InputInvoice Edit",
          },
        },
      ]

    },
    //Input Invoice approver & cc
    {
      path: '/input_invoice_app_cc',
      name: 'Input Invoice approver & cc',
      component: Layout,
      meta: {
        title: "Input Invoice approver & cc",
      },
      children: [
        {
          path: '',
          name: 'Input Invoice approver & cc',
          component: () => import('../views/InputInvoiceApprover/ApproverView.vue'),
        },
      ]
    },
    //Margin Registration         
    {
      path: '/margin_registration',
      name: 'MarginRegistration',
      component: Layout,
      meta: {
        title: "MarginRegistration",
      },
      children: [
        {
          path: '',
          name: 'MarginRegistration',
          component: () => import('../views/MarginRegistration/MarginRegistrationView.vue'),
        },
        {
          path: 'create',
          name: 'MarginRegistration Create',
          component: () => import('../views/MarginRegistration/MarginRegistrationCreateView.vue'),
          meta: {
            title: "MarginRegistration Create",
          },
        },
        {
          path: 'show/:name/:id',
          name: 'MarginRegistration Show',
          component: () => import('../views/MarginRegistration/MarginRegistrationShowView.vue'),
          meta: {
            title: "MarginRegistration Show",
          },
        },
        {
          path: 'edit/:name/:id',
          name: 'MarginRegistration Edit',
          component: () => import('../views/MarginRegistration/MarginRegistrationEditView.vue'),
          meta: {
            title: "MarginRegistration Edit",
          },
        },
      ]

    },
    //Margin Registration approver & cc
    {
      path: '/margin_registration_app_cc',
      name: 'Margin Registration approver & cc',
      component: Layout,
      meta: {
        title: "Margin Registration approver & cc",
      },
      children: [
        {
          path: '',
          name: 'Margin Registration approver & cc',
          component: () => import('../views/MarginRegistrationApprover/ApproverView.vue'),
        },
      ]
    },
    //Security Deposit Refund         
    {
      path: '/security_deposit_refund',
      name: 'SecurityDepositRefund',
      component: Layout,
      meta: {
        title: "SecurityDepositRefund",
      },
      children: [
        {
          path: '',
          name: 'SecurityDepositRefund',
          component: () => import('../views/SecurityDepositRefund/SecurityDepositRefundView.vue'),
        },
        {
          path: 'create',
          name: 'SecurityDepositRefund Create',
          component: () => import('../views/SecurityDepositRefund/SecurityDepositRefundCreateView.vue'),
          meta: {
            title: "SecurityDepositRefund Create",
          },
        },
        {
          path: 'edit/:id',
          name: 'SecurityDepositRefund Edit',
          component: () => import('../views/SecurityDepositRefund/SecurityDepositRefundEditView.vue'),
          meta: {
            title: "SecurityDepositRefund Edit",
          },
        },
        {
          path: 'show/customer/:id',
          name: 'SecurityDepositRefund Show',
          component: () => import('../views/SecurityDepositRefund/SecurityDepositRefundShowView.vue'),
          meta: {
            title: "SecurityDepositRefund Show",
          },
        },
      ]

    },

    //Security Deposit Refund approver & cc
    {
      path: '/security_deposit_refund_app_cc',
      name: 'Security Deposit Refund approver & cc',
      component: Layout,
      meta: {
        title: "Security Deposit Refund approver & cc",
      },
      children: [
        {
          path: '',
          name: 'Security Deposit Refund approver & cc',
          component: () => import('../views/SecurityDepositRefundApprover/ApproverView.vue'),
        },
      ]
    },

    //Schedule Management approver & cc
    // {
    //   path: '/schedule_management_app_cc',
    //   name: 'Schedule Management approver & cc',
    //   component: Layout,
    //   meta: {
    //     title: "Schedule Management approver & cc",
    //   },
    //   children: [
    //     {
    //       path: '',
    //       name: 'Schedule Management approver & cc',
    //       component: () => import('../views/ScheduleManagementApprover/ApproverView.vue'),
    //     },
    //   ]
    // },


    //Schedule management     
    {
      path: '/schedule',
      name: 'schedule mangement',
      component: Layout,
      meta: {
        title: "schedule mangement",
      },
      children: [
        {
          path: '',
          name: 'schedule mangement',
          component: () => import('../views/ScheduleManagement/ScheduleManagementView.vue'),
        },
        {
          path: 'project_detail/:id',
          name: 'Project Detail',
          component: Layout,
          meta: {
            title: "Project Detail",
          },
          children: [
            {
              path: '',
              name: 'Project Detail',
              component: () => import('../views/ScheduleManagement/ProjectDetailView.vue'),
              meta: {
                title: "Project Detail",
              },
            },
            {
              path: 'create',
              name: 'Schedule Create',
              component: () => import('../views/ScheduleManagement/ScheduleManagementCreateView.vue'),
              meta: {
                title: "Add schedule",
              },
            },
            {
              path: 'edit/:planid',
              name: 'Schedule Edit',
              component: () => import('../views/ScheduleManagement/ScheduleManagementEditView.vue'),
              meta: {
                title: "Edit schedule",
              },
            },

          ]
        },
        // {
        //   path: 'create/:id',
        //   name: 'Schedule Create',
        //   component: () => import('../views/ScheduleManagement/ScheduleManagementCreateView.vue'),
        //   meta: {
        //     title: "Schedule Create",
        //   },  
        // },
        // {
        //   path: 'edit/:id',
        //   name: 'Schedule Edit',
        //   component: () => import('../views/ScheduleManagement/ScheduleManagementEditView.vue'),
        //   meta: {
        //     title: "Schedule Edit",
        //   },  
        // },
      ]

    },
    //Profit
    {
      path: '/profit',
      name: 'profit',
      component: Layout,
      meta: {
        title: "profit",
      },
      children: [
        {
          path: '',
          name: 'profit',
          component: () => import('../views/Profit/ProfitView.vue'),
        },
        {
          path: 'project_detail/:id',
          name: 'Profit Detail',
          component: Layout,
          meta: {
            title: "Profit Detail",
          },
          children: [
            {
              path: '',
              name: 'Profit Detail',
              component: () => import('../views/Profit/ProjectDetailView.vue'),
              meta: {
                title: "Profit Detail",
              },
            },
            // {
            //   path: 'create',
            //   name: 'Schedule Create',
            //   component: () => import('../views/ScheduleManagement/ScheduleManagementCreateView.vue'),
            //   meta: {
            //     title: "Add schedule",
            //   },  
            // }, 
            // {
            //   path: 'edit/:planid',
            //   name: 'Schedule Edit',
            //   component: () => import('../views/ScheduleManagement/ScheduleManagementEditView.vue'),
            //   meta: {
            //     title: "Edit schedule",
            //   },  
            // },          

          ]
        },

      ]

    },
    //Income
    {
      path: '/income',
      name: 'income',
      component: Layout,
      meta: {
        title: "income",
      },
      children: [
        {
          path: '',
          name: 'income',
          component: () => import('../views/Income/IncomeView.vue'),
        },
        // {
        //   path: 'create',
        //   name: 'Task Create',
        //   component: () => import('../views/TaskManagement/TaskCreateView.vue'),
        //   meta: {
        //     title: "Task Create",
        //   },  
        // },
        // {
        //   path: 'edit/:id',
        //   name: 'Task Edit',
        //   component: () => import('../views/TaskManagement/TaskEditView.vue'),
        //   meta: {
        //     title: "Task Edit",
        //   },  
        // },
      ]

    },
    //Outcome
    {
      path: '/outcome',
      name: 'outcome',
      component: Layout,
      meta: {
        title: "outcome",
      },
      children: [
        {
          path: '',
          name: 'outcome',
          component: () => import('../views/Outcome/OutcomeView.vue'),
        },
      ]

    },
    //Task Management
    {
      path: '/task',
      name: 'task mangement',
      component: Layout,
      meta: {
        title: "task mangement",
      },
      children: [
        {
          path: '',
          name: 'task mangement',
          component: () => import('../views/TaskManagement/TaskView.vue'),
        },
        {
          path: 'create',
          name: 'Task Create',
          component: () => import('../views/TaskManagement/TaskCreateView.vue'),
          meta: {
            title: "Task Create",
          },
        },
        {
          path: 'edit/:id',
          name: 'Task Edit',
          component: () => import('../views/TaskManagement/TaskEditView.vue'),
          meta: {
            title: "Task Edit",
          },
        },
      ]

    },
    //Team    
    {
      path: '/team',
      name: 'Team',
      component: Layout,
      meta: {
        title: "Team",
      },
      children: [
        {
          path: '',
          name: 'Team',
          component: () => import('../views/Team/TeamView.vue'),
        },
        {
          path: 'create',
          name: 'Team Create',
          component: () => import('../views/Team/TeamCreateView.vue'),
          meta: {
            title: "Team Create",
          },
        },
        {
          path: 'edit/:id',
          name: 'Team Edit',
          component: () => import('../views/Team/TeamEditView.vue'),
          meta: {
            title: "Team Edit",
          },
        },
      ]

    },
    //Roster 
    {
      path: '/roster',
      name: 'Roster',
      component: Layout,
      meta: {
        title: "Roster",
      },
      children: [
        {
          path: '',
          name: 'Roster',
          component: () => import('../views/Roster/RosterView.vue'),
        },
        {
          path: 'create',
          name: 'Roster Create',
          component: () => import('../views/Roster/RosterCreateView.vue'),
          meta: {
            title: "Roster Create",
          },
        },
        {
          path: 'edit/:id',
          name: 'Roster Edit',
          component: () => import('../views/Roster/RosterEditView.vue'),
          meta: {
            title: "Roster Edit",
          },
        },
      ]

    },
    //Project Roster 
    {
      path: '/project_roster',
      name: 'Project Roster',
      component: Layout,
      meta: {
        title: "Project Roster",
      },
      children: [
        {
          path: '',
          name: 'Project Roster',
          component: () => import('../views/ProjectRoster/ProjectRosterView.vue'),
        },

      ]

    },
    //Order
    {
      path: '/order',
      name: 'Order',
      component: Layout,
      meta: {
        title: "Order",
      },
      children: [
        {
          path: '',
          name: 'Order',
          component: () => import('../views/Order/OrderView.vue'),
        },
        {
          path: 'create',
          name: 'Order Create',
          component: () => import('../views/Order/OrderCreateView.vue'),
          meta: {
            title: "Order Create",
          },
        },
        {
          path: 'edit/:id',
          name: 'Order Edit',
          component: () => import('../views/Order/OrderEditView.vue'),
          meta: {
            title: "Order Edit",
          },
        },
      ]
    },
    //QualityInspection
    {
      path: '/quality_inspection',
      name: 'QualityInspection',
      component: Layout,
      meta: {
        title: "QualityInspection",
      },
      children: [
        {
          path: '',
          name: 'QualityInspection',
          component: () => import('../views/QualityInspection/QualityInspectionView.vue'),
        },
        {
          path: 'create',
          name: 'QualityInspection Create',
          component: () => import('../views/QualityInspection/QualityInspectionCreateView.vue'),
          meta: {
            title: "QualityInspection Create",
          },
        },
        {
          path: 'edit/:id',
          name: 'QualityInspection Edit',
          component: () => import('../views/QualityInspection/QualityInspectionEditView.vue'),
          meta: {
            title: "QualityInspection Edit",
          },
        },
      ]
    },
    //QualityInspection
    {
      path: '/quality_rectification_list',
      name: 'QualityRectificationList',
      component: Layout,
      meta: {
        title: "QualityRectificationList",
      },
      children: [
        {
          path: '',
          name: 'QualityRectificationList',
          component: () => import('../views/QualityRectificationList/QualityRectificationListView.vue'),
        },
        {
          path: 'create',
          name: 'QualityRectificationList Create',
          component: () => import('../views/QualityRectificationList/QualityRectificationListCreateView.vue'),
          meta: {
            title: "QualityRectificationList Create",
          },
        },
        {
          path: 'edit/:id',
          name: 'QualityRectificationList Edit',
          component: () => import('../views/QualityRectificationList/QualityRectificationListEditView.vue'),
          meta: {
            title: "QualityRectificationList Edit",
          },
        },
      ]
    },

    //SecurityCheck
    {
      path: '/security_check',
      name: 'SecurityCheck',
      component: Layout,
      meta: {
        title: "SecurityCheck",
      },
      children: [
        {
          path: '',
          name: 'SecurityCheck',
          component: () => import('../views/SecurityCheck/SecurityCheckView.vue'),
        },
        {
          path: 'create',
          name: 'SecurityCheck Create',
          component: () => import('../views/SecurityCheck/SecurityCheckCreateView.vue'),
          meta: {
            title: "SecurityCheck Create",
          },
        },
        {
          path: 'edit/:id',
          name: 'SecurityCheck Edit',
          component: () => import('../views/SecurityCheck/SecurityCheckEditView.vue'),
          meta: {
            title: "SecurityCheck Edit",
          },
        },
      ]
    },
    //SafetyRectificationList
    {
      path: '/safety_rectification_list',
      name: 'SafetyRectificationList',
      component: Layout,
      meta: {
        title: "SafetyRectificationList",
      },
      children: [
        {
          path: '',
          name: 'SafetyRectificationList',
          component: () => import('../views/SafetyRectificationList/SafetyRectificationListView.vue'),
        },
        {
          path: 'create',
          name: 'SafetyRectificationList Create',
          component: () => import('../views/SafetyRectificationList/SafetyRectificationListCreateView.vue'),
          meta: {
            title: "SafetyRectificationList Create",
          },
        },
        {
          path: 'edit/:id',
          name: 'SafetyRectificationList Edit',
          component: () => import('../views/SafetyRectificationList/SafetyRectificationListEditView.vue'),
          meta: {
            title: "SafetyRectificationList Edit",
          },
        },
      ]
    },
    //ConstructionLog
    {
      path: '/construction_log',
      name: 'ConstructionLog',
      component: Layout,
      meta: {
        title: "ConstructionLog",
      },
      children: [
        {
          path: '',
          name: 'ConstructionLog',
          component: () => import('../views/ConstructionLog/ConstructionLogView.vue'),
        },
        {
          path: 'create',
          name: 'ConstructionLog Create',
          component: () => import('../views/ConstructionLog/ConstructionLogCreateView.vue'),
          meta: {
            title: "ConstructionLog Create",
          },
        },
        {
          path: 'edit/:id',
          name: 'ConstructionLog Edit',
          component: () => import('../views/ConstructionLog/ConstructionLogEditView.vue'),
          meta: {
            title: "ConstructionLog Edit",
          },
        },
      ]
    },
    //Weekly
    {
      path: '/weekly',
      name: 'Weekly',
      component: Layout,
      meta: {
        title: "Weekly",
      },
      children: [
        {
          path: '',
          name: 'Weekly',
          component: () => import('../views/Weekly/WeeklyView.vue'),
        },
        {
          path: 'create',
          name: 'Weekly Create',
          component: () => import('../views/Weekly/WeeklyCreateView.vue'),
          meta: {
            title: "Weekly Create",
          },
        },
        {
          path: 'edit/:id',
          name: 'Weekly Edit',
          component: () => import('../views/Weekly/WeeklyEditView.vue'),
          meta: {
            title: "Weekly Edit",
          },
        },
      ]
    },
    //Daily
    {
      path: '/daily',
      name: 'Daily',
      component: Layout,
      meta: {
        title: "Daily",
      },
      children: [
        {
          path: '',
          name: 'Daily',
          component: () => import('../views/Daily/DailyView.vue'),
        },
        {
          path: 'create',
          name: 'Daily Create',
          component: () => import('../views/Daily/DailyCreateView.vue'),
          meta: {
            title: "Daily Create",
          },
        },
        {
          path: 'edit/:id',
          name: 'Daily Edit',
          component: () => import('../views/Daily/DailyEditView.vue'),
          meta: {
            title: "Daily Edit",
          },
        },
      ]
    },
    //monthly_report
    {
      path: '/monthly_report',
      name: 'Monthly Report',
      component: Layout,
      meta: {
        title: "Monthly Report",
      },
      children: [
        {
          path: '',
          name: 'Monthly Report',
          component: () => import('../views/MonthlyReport/MonthlyReportView.vue'),
        },
        {
          path: 'create',
          name: 'Monthly Report Create',
          component: () => import('../views/MonthlyReport/MonthlyReportCreateView.vue'),
          meta: {
            title: "Monthly Report Create",
          },
        },
        {
          path: 'edit/:id',
          name: 'Monthly Report Edit',
          component: () => import('../views/MonthlyReport/MonthlyReportEditView.vue'),
          meta: {
            title: "Monthly Report Edit",
          },
        },
      ]
    },

    // { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },

  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  //ifAuthenticated
  next();
})

export default router
