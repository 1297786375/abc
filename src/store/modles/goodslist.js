import {xiosget,xiospost} from '../../axios/index';

let state = {
    goodsarr:[],
    goodscont:null,
}

let mutations = {
    gooslist(state,res){
        state.goodsarr = res
    },
    goodslistcont(state,res){
        state.goodscont = Math.ceil(res/3)*10
    }
}

let actions = {
    reqgoodslist(context,e){
        xiosget({
            url:'/api/goodslist',
            params:{
                size:3,
                page:e,
            }
        }).then(res=>{
            context.commit('gooslist',res.data.list);
        })
    },
    reqgoodslistcont(context){
        xiosget({
            url:'/api/goodscount',
        }).then(res=>{
            context.commit('goodslistcont',res.data.list[0].total)
        })
    }
}

let getters = {
    goodsarr(state){
        return state.goodsarr;
    },
    goodscont(state){
        return state.goodscont
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}