import {xiosget,xiospost} from '../../axios/index'
const state = {
    rolearr:[]
}
const mutations={
    rolelisi(state,res){
        state.rolearr = res
    }
}
const actions={
    reqsolelist(context){
        xiosget({
            url:'/api/rolelist',
        }).then(res=>{
            context.commit('rolelisi',res.data.list);
        })
    }
}
const getters={
    rolearr(state){
        return state.rolearr
    }
}
export default{
    getters,
    actions,
    mutations,
    state,
    namespaced:true
}