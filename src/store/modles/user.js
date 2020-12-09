

let state = {
    list:sessionStorage.getItem('obj')?JSON.parse(sessionStorage.getItem('obj')):{},
}

let mutations = {
    listarr(state,res){
        state.list = res
    }
}

let actions = {
    reqlistarr(context,res){
        sessionStorage.setItem('obj',JSON.stringify(res));
        context.commit('listarr',res);
    }
}

let getters = {
    list(state){
        return state.list
    }
}


export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}