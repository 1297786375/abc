import {xiosget,xiospost} from '../../axios/index'
const state = {
    adminarr:[],
    pagesum:0,
}
const mutations={
    adminlist(state,res){
        state.adminarr = res
    },
    adminpage(state,res){
        state.pagesum = Math.ceil(res/3)*10;
    }
}
const actions={
    reqadminlist(context,sum){
        xiosget({
            url:'/api/userlist',
            params:{
                size:3,page:sum
            }
        }).then(res=>{
            
            context.commit('adminlist',res.data.list);
        })
    },
    reqaadminsum(context){
        xiosget({
            url:'/api/usercount',
        }).then(res=>{
            console.log(res);
            context.commit('adminpage',res.data.list[0].total);
        })
    }
}
const getters={
    adminarr(state){
        return state.adminarr
    },
    pagesum(state){
        return state.pagesum
    }
}
export default{
    getters,
    actions,
    mutations,
    state,
    namespaced:true
}