<template>
  <div>
    <el-dialog
      :title="title.flag ? '菜单添加' : '菜单修改'"
      :visible.sync="title.msg"
    >
      <el-form :model="form">
        <el-form-item label="菜单名称:" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单:" :label-width="formLabelWidth">
          <el-select
            v-model="form.pid"
            placeholder="--请选择--"
            @change="mytype"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in arr" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型:" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>

        <el-form-item
          label="菜单图标:"
          :label-width="formLabelWidth"
          v-if="form.type == 1"
        >
          <el-select v-model="form.icon" placeholder="请选择活动区域">
            <el-option label="系统" value="el-icon-s-tools">
                 <i class="el-icon-s-tools"></i>
            </el-option>
            <el-option label="电话" value="el-icon-phone">
              <i class="el-icon-phone"></i>
            </el-option>
            <el-option label="购物" value="el-icon-s-goods">
              <i class="el-icon-s-goods"></i>
            </el-option>
            <el-option label="星星" value="el-icon-star-off">
              <i class="el-icon-star-off"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="图标地址:" :label-width="formLabelWidth" v-else>
          <el-select v-model="form.url" placeholder="请选择活动区域">
            <el-option
              v-for="item in indexRouter"
              :key="item.path"
              :label="item.name"
              :value="'/' + item.path"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态:" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="title.msg = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="title.flag"
          >确 定</el-button
        >
        <el-button type="primary" @click="edits" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { indexRouter } from "../../../router/index";
export default {
  computed: {
    ...mapGetters({
      arr: "menulist/arr",
    }),
  },
  props: ["title"],
  data() {
    return {
      isShow: true,
      form: {
        title: "",
        pid: "",
        type: 0,
        icon: "",
        url: "",
        status: 1,
      },
      indexRouter: indexRouter,
      formLabelWidth: "120px",
    };
  },
  methods: {
    //关于系统的目录获取
    ...mapActions({
      reqmounlist: "menulist/reqmounlist",
    }),
    // 初始化
    empty(){
      this.form = {
          title: "",
          pid: "",
          type: 0,
          icon: "",
          url: "",
          status: 1,
      }
    },
    //添加
    add() {
      this.xiospost({
        url: "/api/menuadd",
        data: this.form,
      }).then((res) => {
        this.title.msg = false;
        this.reqmounlist();
      });
    },
    mytype() {
      this.form.type = this.form.pid == 0 ? 1 : 2;
    },
    edit(e) {
      this.xiosget({
        url: "/api/menuinfo",
        params: {
          id: e,
        },
      }).then((res) => {
        this.form = res.config.params.id;
      });
    },
    //修改数据
    edits() {
      this.xiospost({
        url: "/api/menuedit",
        data: this.form,
      }).then((res) => {
        this.title.msg = false;
        this.reqmounlist();
      });
    },
  },
  mounted(){
    this.reqmounlist();
    console.log(this.arr);
  }
};
</script>
<style scoped>
</style>