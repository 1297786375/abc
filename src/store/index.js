import Vuex from 'vuex';
import vue from 'vue';
vue.use(Vuex);
import  menulist from './modles/menulist';
import rolelist from './modles/rolelist';
import adminlist from './modles/adminlist';
import classlist from './modles/classify';
import speclist from './modles/speclist';
import goodslist from './modles/goodslist';
export const store = new Vuex.Store({
    modules:{
        menulist,
        rolelist,
        adminlist,
        classlist,
        speclist,
        goodslist
    }
})