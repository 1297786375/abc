import {xiosget,xiospost} from '../../axios/index'
const state = {
    classarr:[]
}
const mutations={
    classify(state,res){
        state.classarr = res;
    }
}
const actions={
    reqclassify(context){
        xiosget({
            url:'/api/catelist',
            params:{
                istree:true,
                // pid:"1",
            }
        }).then(res=>{
            context.commit('classify',res.data.list);
        })
    }
}
const getters={
    classarr(state){
        return state.classarr
    }
}
export default{
    getters,
    actions,
    mutations,
    state,
    namespaced:true
}