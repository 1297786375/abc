import {xiosget,xiospost} from '../../axios/index'
const state = {
    specarr:[],
    contm:'',
}
const mutations={
    speclist(state,res){
        state.specarr = res
    },
    conlist(state,res){
        state.contm = Math.ceil(res/3);
    }
}
const actions={
    reqspeclist(context,sum){
        xiosget({
            url:'/api/specslist',
            params:{
                size:3,
                page:sum
            }
        }).then(res=>{
            context.commit('speclist',res.data.list);
        })
    },
    reqcont(context){
        xiosget({
            url:'/api/specscount',
        }).then(res=>{  
            context.commit('conlist',res.data.list[0].total);
        })
    }
}
const getters={
    specarr(state){
        return state.specarr
    },
    contm(state){
        console.log(state.contm);
        return state.contm;
    }
}
export default{
    getters,
    actions,
    mutations,
    state,
    namespaced:true
}