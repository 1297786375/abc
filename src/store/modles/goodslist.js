import {xiosget,xiospost} from '../../axios/index';

let state = {
    goodsarr:[],
}

let mutations = {
    gooslist(state,res){
        state.goodsarr = res
    }
}

let actions = {
    reqgoodslist(context){
        xiosget({
            url:'/api/goodslist',
            params:{
                size:5,
                page:1,
            }
        }).then(res=>{
            context.commit('gooslist',res.data.list);
        })
    }
}

let getters = {
    goodsarr(state){
        return state.goodsarr;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}