import {xiosget,xiospost} from '../../axios/index';

let state ={
    bannerarr:[],
}

let mutations={
    bannerlist(state,res){
        state.bannerarr = res
    }
}

let actions ={
    reqbannerlist(context){
        xiosget({
            url:'/api/bannerlist',
        }).then(res=>{
            context.commit('bannerlist',res.data.list);
        })
    }
}

let getters = {
    bannerarr(state){
        return state.bannerarr
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}