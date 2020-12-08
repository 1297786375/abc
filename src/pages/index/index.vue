<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-menu-item index="/index" id="ele-box">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/menu">菜单管理</el-menu-item>
              <el-menu-item index="/index/role">角色管理</el-menu-item>
              <el-menu-item index="/index/admin">管理员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/classify" class="el-item"
                >商品分类</el-menu-item
              >
              <el-menu-item index="/index/spec" class="el-item"
                >商品规格</el-menu-item
              >
              <el-menu-item index="/index/goods" class="el-item"
                >商品管理</el-menu-item
              >
              <el-menu-item index="/index/vip" class="el-item"
                >会员管理</el-menu-item
              >
              <el-menu-item index="/index/banner" class="el-item"
                >轮播图管理</el-menu-item
              >
              <el-menu-item index="/index/seckill" class="el-item"
                >秒杀活动</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header> 
          
          <div class="fr">
            <span>{{msg}}</span>
            <el-button @click="quit">退出</el-button>
          </div>
          </el-header>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item >首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$router.history.current.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  components: {},
  data(){
    return {
      msg:JSON.parse(sessionStorage.getItem('obj')).username
    }
  },
  mounted(){
     
  },
  methods:{
    quit(){
      sessionStorage.setItem('obj',JSON.stringify({}));
      this.$router.push('/login');
    }
  }
};
</script>
<style>
.el-menu {
  border: none;
}
#ele-box {
  width: 200px;
}
.el-submenu__title {
  width: 200px;
}
.el-menu-item-group__title {
  width: 160px;
  background-color: #20222a;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100vh;
  background-color: #20222a;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>