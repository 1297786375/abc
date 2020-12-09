<template>
<div class="box">
    <div class="warp">
            
            <h3>登录</h3>
            <p><input type="text" v-model="user.username" placeholder="请输入用户名"></p>
            <p><input type="password" v-model="user.password" placeholder="请输入密码"></p>
            <p><button @click="change">登录</button></p>
    </div>
    <div class="warp1">
        <p>登录员已经设置过的密码都为123</p>
        <p><span>超级管理员</span>账户:admin可观察所有系统，商城</p>
        <p><span>管理员</span>账户:迪丽热巴     可观察所有系统</p>
        <p><span>管理员</span>账户:杨颖     可观察所有商城</p>
    </div>
</div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex';
export default {
    computed:{
    },
    data() {
        return {
            user:{
                username:"",
                password:"",
            }
        }
    },
components:{
},
methods:{
    ...mapActions({
        reqlistarr:"user/reqlistarr"
    }),
    change(){
        this.xiospost({
            url:'/api/userlogin',
            data:this.user
        }).then(res=>{
            if(res.data.code==200){
                this.reqlistarr(res.data.list);
                this.$router.push('/index')
            }else{
                alert(res.data.msg)
            }
        })
    }
}
}
</script>
<style scoped>
.warp1{
    color: orangered;
}
.box{
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to right,#553443,#303d60);
}
.warp{
    padding: 30px 0px;
    box-sizing: border-box;
    text-align: center;
    width: 400px;
    height: 300px;
    position: relative;
    left: 50%;
    top: 50%;
    background-color: #fff;
    transform: translate(-50%,-50%);
}
input{
    width: 60%;
    height: 30px;
    outline: none;
    margin-top: 20px;
    padding: 0px 10px;
    /* box-sizing: border-box; */
}
button{
    width: 66%;
    height: 30px;
    background-color: #409eff;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    margin-top: 20px;
}
</style>