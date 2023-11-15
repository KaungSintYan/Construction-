<template>  
    <div v-loading="loading" class="loading__div" v-if="loading"></div>   
    <div class="container-fluid"  @click="$store.commit('setActive', false)" > 
        <div class="row">
                    <div class="col-3">
                        <div class="form-group">
                            <label for="duration_type">
                                <small><b>Duration Type</b></small>   
                            </label>
                            <div class="form-group">
                                <el-select class="" style="width: 100%;" v-model="FormData.duration_type">                                  
                                    <el-option v-for="(app, i) in duration_type" :key="i" :label="app.label" :value="app.key"> {{ app.label }}</el-option>                                      
                                </el-select>
                            </div>                        
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="form group mb-3">
                                    <label for="date"> 
                                        <span class="text-danger">*</span> <small><b> Date </b></small>    
                                    </label>
                                    <el-date-picker :placeholder="$t('pick_a_day')" type="date" class=""  format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                                    style="width: 100%;"  v-model="FormData.date" clearable/>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="form group mb-3">
                                    <label for="date"> 
                                        <span class="text-danger">*</span> <small><b> Month </b></small>    
                                    </label>
                                    <el-date-picker v-model="FormData.month" type="month" 
                                        format="MMMM" value-format="M"
                                        placeholder="Select a Month" size="default"  style="width: 100%;" editable clearable /> 
                        </div>
                        
                    </div>
                    <div class="col-3">
                        <div class="form group mb-3">
                                    <label for="date"> 
                                        <span class="text-danger">*</span> <small><b> Year </b></small>    
                                    </label>
                                    <el-date-picker v-model="FormData.year"  type="year" 
                                    format="YYYY" value-format="YYYY" placeholder="Select a Year" size="default"  style="width: 100%;" editable clearable  />
                        </div>
                        
                    </div>
        </div>
    </div>
    <div class="container-fluid" v-if="!loading">        
        <Bar :chart-data="chartData" />
    </div>
   
</template>
<script>    
import {authApi} from '@/http/authApi'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


export default {
    name: 'Income',
    data() {
        return { 
         
            chartData: {
              
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
                    }
                ]
            },
            data: [], 
            loading: false,  
            FormData: {
                duration_type:0,
                date:"2023-05-05",
                month:"",
                year:""
            }, 
            duration_type: [
                {key: 0, label: "for a single day"},
                {key: 1, label: "or a single month"},
                {key: 2, label: "for a single year"}
            ]        
                
        }
    }, 
    components: {
        Bar
    },
  
    created(){ 
        this.getData();      
    },
    methods:{   
              
        async getData(){            
            this.loading = true;
            this.data= [];
            let response = await authApi({
                method: 'POST',
                api: '/staticalanalysismanagement/income_chart',
                params: {
                       id: "",
                       keyword: '',                    
                },
                data: this.FormData,  
            });
            if(response.message){     
                const list= response.data.data;
                // for(let i=0; i< response.data.method.length; i++){
                //     if(response.data.method[i] === 'get'){
                //         this.showBtn = true;            
                //     }
                //     if(response.data.method[i] === 'post'){
                //         this.createBtn = true;            
                //     }
                //     if(response.data.method[i] == 'put'){
                //         this.updateBtn = true;            
                //     }
                //     if(response.data.method[i] == 'delete'){
                //         this.deleteBtn = true;       
                //     }                                       
                // }
                this.data= list; 
                console.log('income'+ JSON.stringify(this.data));           
                this.loading = false;
            }
          
        },
      
    }
    
}
</script>
