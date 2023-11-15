import axios from 'axios';

export async function api ({ ...args }){
    try{
        const response = await axios({
            method: args.method,
            data: args.data,
            params: args.params,       
            // baseURL: 'http://192.168.1.18:8000'+ args.api  //dev  
            // baseURL: 'http://216.83.53.169:8081'+ args.api//pro
            // baseURL: 'https://py.magicbox.ltd'+ args.api//pro
            // baseURL: 'https://pms.secretcode.ltd'+args.api//pro 
            baseURL: 'https://py.asiaoracle.net'+args.api//pro 
        })
        return {message: true,status: response.status, data: response.data}
    }catch(error){
        return {status: error.response.status,message: error.response.data.message}
    }
}