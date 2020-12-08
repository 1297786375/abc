<template>
<div class="box">
     <el-button type="primary" @click ="change">添加</el-button>
     <v-add :title="arr" ref="one"></v-add>
     <v-list @edit = 'edit($event)' ></v-list>
</div>
</template>
<script>
import vAdd from './components/add.vue';
import vList from './components/list.vue';
export default {
components:{
    vAdd,
    vList
},
data(){
    return{
        arr:{
            msg:false,
            flag:true,
        }
    }
},
methods:{
    change(){
        this.arr.msg = true;
        this.arr.flag = true;
        this.$refs.one.eyate();
    },
    edit(e){
        this.$refs.one.edit(e);
        this.arr.msg = true;
        this.arr.flag = false;
    }
}
}
</script>
<style scoped>
.box{
    margin-top: 20px;
}
</style>