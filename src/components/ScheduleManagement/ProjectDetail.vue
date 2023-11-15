<template>  
    <div v-loading="loading" class="loading__div" v-if="loading"></div>   
    <div class="container-fluid"  @click="$store.commit('setActive', false)" v-if="!loading" style="padding: 0px;">    
        <div class="bg-primary py-2">
            <div class="row bg-white p-4" style="border-radius: 5px; margin: 0px 1px;">
                 <div class="col-12">
                    <div class="row">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item :to="{ path: '/schedule' }"><span> {{ data.project_name }} </span></el-breadcrumb-item>            
                            <el-breadcrumb-item><span>{{ projectStatus }}</span></el-breadcrumb-item>           
                        </el-breadcrumb>
                    </div>
                    <div class="row my-4" >
                        <div class="col-sm-6 d-flex justify-content-between"> 
                            <sapn class="text-muted"><img src="../../assets/planner.png" class="mr-1" alt="planner_icon" width="26"> Plan to start: {{ data.start_date }} </sapn>                      
                            <sapn class="text-muted">Planned Completion: {{ data.completion_date }} </sapn>
                        </div>
                        <div class="col-sm-6 d-flex justify-content-end">
                            <span class="text-muted">Planned duration <span class="text-warning">{{ data.planned_duration }} day</span></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="demo-progress">
                            <el-progress :percentage="data.complete_task" />
                        </div>                  
                    </div>
                </div>  
            </div> 
        </div> 
        <div class="row"  style="border-radius: 5px; margin: 0px 1px;">
            <div class="col-md-12">                
                <el-tabs>
                    <el-tab-pane>
                        <template #label>
                            <span class="custom-tabs-label">
                              <el-icon><img src="../../assets/chart.png" alt="planner_icon" width="20"></el-icon>
                              <span class="ml-2">schedule</span>
                            </span>
                        </template>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group row">
                                        <label for="date_range" class="col-sm-3">                                          
                                            <small><b>Date range: </b></small>  
                                        </label>  
                                        <div class="col-sm-6">
                                            <el-date-picker style="width: 100%;"
                                            v-model="date"
                                            type="daterange"
                                            range-separator="-"
                                            :start-placeholder="$t('start_date')"
                                            :end-placeholder="$t('end_date')"                       
                                            size="default" />
                                        </div>  
                                        <div class="col-sm-3">
                                            <el-button type="primary" round>search</el-button>
                                        </div>                                    
                                    </div>
                                </div>
                                <div class="col-md-6 d-flex justify-content-end">
                                    <el-button round @click="getToNewPlan()">New plan</el-button>
                                </div>
                            </div> 

                            <div class="row" v-for="(items, i) in plans" :key="i">
                                <div class="col-sm-8">
                                    <div class="row">
                                        <span>{{ items.name }}</span>
                                    </div>
                                    <div class="row my-4" >
                                        <div class="col-sm-8 d-flex justify-content-between"> 
                                            <sapn class="text-muted"><img src="../../assets/planner.png" class="mr-1" alt="planner_icon" width="26"> Plan to start: {{ items.start_date }} </sapn>                      
                                            <sapn class="text-muted">Planned Completion: {{ items.end_date }} </sapn>
                                        </div>
                                        <div class="col-sm-4 d-flex justify-content-end">
                                            <font-awesome-icon icon="fa-solid fa-user" class="mr-2" /><span class="text-muted">{{ items.principal }}</span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="demo-progress">
                                            <el-progress percentage="0" />
                                        </div>                  
                                    </div>

                                </div>
                                <div class="col-sm-4 d-flex justify-content-end">
                                    <div class="team__right">                                      
                                        <span class="icon__ellipsis">
                                            <el-popover  popper-style="width: 100px !important;min-width: 100px !important;"
                                            placement="bottom">  
                                            <div class="container" >
                                                <div class="row" @click="editNewPlan(items.plan_id)">                                                  
                                                    <font-awesome-icon icon="fa-solid fa-pencil" style=" margin-right: 5px !important; padding: 2px !important;color: #7d7d7d;" /> edit 
                                                </div>
                                                <div class="row" @click="deleteAll(items.plan_id)" >
                                                    <font-awesome-icon icon="fa-solid fa-trash" style=" margin-right: 5px !important; padding: 2px !important;color: #7d7d7d;"  /> delete
                                                </div>
                                            </div> 
                                       
                                            <template #reference>
                                                <font-awesome-icon icon="fa-solid fa-ellipsis-v" class="ellipsis__icon"/>
                                            </template>
                                        </el-popover>
                                          
                                        </span>
                                    </div>
                                </div>
                            </div>    
                                    
                        </div>
                    </el-tab-pane>
                    <el-tab-pane>
                        <template #label>
                            <span class="custom-tabs-label">
                              <el-icon><img src="../../assets/chart.png" alt="planner_icon" width="20"></el-icon>
                              <span class="ml-2">progress dynamics</span>
                            </span>
                        </template>
                        progress dynamics
                    </el-tab-pane>                   
                </el-tabs>
            </div>
        </div>         
    </div>
   
</template>
<script>    
import {authApi} from '@/http/authApi'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    name: 'ProjectDetail',
    data() {
        return { 
            data: {}, 
            loading: false, 
            projectStatus: "",
            activeShedule: "schedule",
            plans: [],
            date: '',
            //permission
            showBtn: false,
            createBtn: false,
            updateBtn: false,
            deleteBtn: false
        }
    }, 
    created(){        
        this.getData();
        this.getPlan();        
    },
    methods:{              
        async getData(){           
            this.loading = true;  
            let response = await authApi({
                method: 'POST',
                api: '/projectmanagement/getproject',
                params: {
                       id: this.$route.params.id,
                       keyword: '',                     
                       page: "",
                       limit: "",
                },
                data: {
                    view: false,
                }   
            });
            if(response.message){            
                this.data = response.data.data;
                //console.log('project'+ JSON.stringify(this.data));               
                this.getProjectstatus(this.data.project_status);

                for(let i=0; i< response.data.method; i++){
                   
                   if(response.data.method[i] === 'get'){
                       this.showBtn = true;            
                   }
                   if(response.data.method[i] === 'post'){
                       this.createBtn = true;            
                   }
                   if(response.data.method[i] == 'put'){
                       this.updateBtn = true;            
                   }
                   if(response.data.method[i] == 'delete'){
                       this.deleteBtn = true;       
                   }                                       
               } 
                
            }          
        }, 

        async getPlan(){  
              let response = await authApi({
                  method: 'POST',
                  api: '/constructionmanagement/get_schedule_plan',
                  params: {
                         id: '',
                         keyword: '',             
                         page: "",
                         limit: "",
                  },  
                  data: {
                      project_id: this.$route.params.id,
                  } 
              });
              if(response.status == 200){  
                this.plans = response.data.data;     
                //console.log('plan'+ JSON.stringify(this.plans));                    
              }
            
          }, 
          
        //   start 
        async deleteAll(id = null){         
            
            let list=[];            
            if(id != null && id != ""){
                list.push(id);             
            } 
            else{
                for(let i=0; i< this.data.length; i++){
                    if(this.data[i].isSelected){
                        list.push(this.data[i].plan_id);                    
                    }
                }
            }          
          
            if(list.length > 0){
                let response = await authApi({
                method: 'DELETE',
                api: '/constructionmanagement/schedule_plan',
                params: {
                       id: '',
                       keyword: '',                
                       page: '',
                       limit: ''                  
                },
                data: {
                    "id_list": list
                }    
                });
                if(response.message){ 
                    // this.selectedCount=0;
                    // this.data=[];                   
                    this.getData();
                    toast.success("Schedule Management Delete successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    });
                }                         
            }
        }, 

        // end 

        async getProjectstatus(id){        
        let response = await authApi({
                method: 'GET',
                api: '/projectstatus',
                params: {                       
                      name: ""
                }   
        });
        this.projectStatus = response.data.data.find(x=> x.project_status_id == id);
        this.loading = false;   
       },     
       getToNewPlan(){
        this.$router.push({ path: "/schedule/project_detail/"+ this.$route.params.id+ "/create" });
       },
       editNewPlan(id){
        this.$router.push({ path: "/schedule/project_detail/"+ this.$route.params.id+ "/edit/"+ id });
       }
    }    
}
</script>

<style lang="scss">
.team__right {
    display: flex;
    h5 {
        font-size: 14px;
        margin-top: 10px;
        margin-left: 10px;
    } 
    .icon__ellipsis {
        margin-top: 14px;
        margin-left: 10px;
       
        .ellipsis__icon:focus {
            outline: none;
        }
    }
    
}
.demo-tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
  }
.demo-progress {
    width: 100%;
    .el-progress--line {
        margin-bottom: 15px;   
    }
}

  section#content {
    height: 82vh !important;
}
</style>