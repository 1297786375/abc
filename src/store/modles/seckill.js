import {xiosget,xiospost} from '../../axios/index'

let state = {
    seckil:[],
}

let mutations = {
    seckillist(state,res){
        state.seckil = res
    }
}

let actions = {
    reqseckillist(context){
        xiosget({
            url:'/api/secklist',
        }).then(res=>{
            context.commit('seckillist',res.data.list);
        })
    }
}

let getters = {
    seckil(state){
        return state.seckil
    }
}


export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}