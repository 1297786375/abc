import {xiosget,xiospost} from '../../axios/index'
const state = {
    arr:[]
}
const mutations={
    mounlist(state,res){
        state.arr = res
    }
}
const actions={
    reqmounlist(context){
        xiosget({
            url:'/api/menulist',
            params:{
                istree:true
            }
        }).then(res=>{
            context.commit('mounlist',res.data.list);
        })
    }
}
const getters={
    arr(state){
        return state.arr
    }
}
export default{
    getters,
    actions,
    mutations,
    state,
    namespaced:true
}