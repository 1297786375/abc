<template>
  <div>
    <el-dialog
      :title="title.flag ? '角色添加' : '角色修改'"
      :visible.sync="title.msg"
    >
      <el-form :model="form">
        <el-form-item label="角色名称:" :label-width="formLabelWidth">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限:" :label-width="formLabelWidth">
          <el-tree
            :data="arr" 
            show-checkbox
            node-key="id"
            :props="defaultProps"
             ref="tree"
          >
          </el-tree>
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
        rolename:'',
        status:1,
        menus:[],
      },
      defaultProps: {
          children: 'children',
          label: 'title'
        },
      formLabelWidth: "120px",
    };
  },
  methods: {
    //关于系统的目录获取
    ...mapActions({
      reqmounlist: "menulist/reqmounlist",
      reqsolelist: "rolelist/reqsolelist",
    }),
    // 初始化
    eyate(){
        this.form.menus =   this.$refs.tree.setCheckedKeys([]);
       this.form={
        rolename:'',
        status:1,
        menus:[],
      }
    },
    //添加
    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      this.xiospost({
        url: "/api/roleadd",
        data: this.form,
      }).then((res) => {
        this.title.msg = false;
        this.reqsolelist();
      });
    },
    //修改
    edit(id){
      this.xiosget({
        url: "/api/roleinfo",
        params: {
          id: id,
        },
      }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.form.menus = this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus));
      });
    },
    //修改数据
    edits() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      this.xiospost({
        url: "/api/roleedit",
        data: this.form,
      }).then((res) => {
        this.title.msg = false;
        this.reqsolelist();
      });
    },
  },
  mounted(){
    this.reqmounlist();
  }
};
</script>
<style scoped>
</style>