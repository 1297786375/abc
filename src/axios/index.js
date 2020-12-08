import axios from 'axios';


// 拦截
axios.interceptors.response.use(res=>{
    console.log(res);
    return res
})


const myhttps = '/api'
export const xiosget=({url,method='get',params={}})=>{
    return axios({
        url:myhttps+url,
        method,
        params,
    })
}

export const xiospost=({url,method='post',data={}})=>{
    return axios({
        url:myhttps+url,
        method,
        data,
    })
}

