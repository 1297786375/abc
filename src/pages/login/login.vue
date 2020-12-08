<template>
<div class="box">
    <div class="warp">
       
            <h3>登录</h3>
            <p><input type="text" placeholder="请输入用户名"></p>
            <p><input type="password" placeholder="请输入密码"></p>
            <p><button @click="change">登录</button></p>
    </div>
</div>
</template>
<script>
export default {
components:{
},
methods:{
    change(){
        this.$router.push('/index')
    }
}
}
</script>
<style scoped>
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