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
        <div class="row mx-1">
            <el-button type="primary" round @click="getData()">{{ $t('search') }}</el-button>    
        </div>
    </div>
    <div class="container-fluid" v-if="!loading">  
        <label for="total" class="d-flex justify-content-end"> 
             <span class="text-primary mr-1">Total:</span> <b> {{ total }} </b>  
        </label>  
        <div class="barchart" >
            <Bar :data="chartData" />
        </div>
      
    </div>
   
</template>
  
<script>
import {authApi} from '@/http/authApi'
import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'BarChart',
    components: { Bar },
    data() {
      return {
            chartData: {
            labels: [],
            datasets: [
                {
                label: 'Outcome',
                backgroundColor: '#4BB543',
                data: []
                },  
                          
            ]
            },
            total: "",
            loading: false,  
            FormData: {
                duration_type:0,
                date:"",
                month:"",
                year:""
            }, 
            duration_type: [
                {key: 0, label: "Day"},
                {key: 1, label: "Month"},
                {key: 2, label: "Year"}
            ]    
      }
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
                api: '/staticalanalysismanagement/outcome_chart',
                params: {
                       id: "",
                       keyword: '',                    
                },
                data: this.FormData,  
            });
            if(response.message){     
                let data= response.data.data;
                this.chartData.labels = data.keys;            
                this.chartData.datasets[0].data = data.values;
                this.total = response.data.total;
                console.log('income'+JSON.stringify(this.chartData));           
                this.loading = false;
            }
          
        },
      
    }
  }
  </script>
  <style lang="scss">
   .barchart {  
        justify-content: center;      
        display: flex;
        width: auto;
        height: 420px;
        overflow: scroll;  
        scrollbar-width: thin;       
    }
  .barchart::-webkit-scrollbar {   
  background: #eee;
  width: 6px; 
  }
  .barchart::-webkit-scrollbar-thumb {
  background: #999;
  height: 60px;
  border-radius: 10px;
  }
</style>