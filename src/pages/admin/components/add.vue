<template>
  <div>
    <el-dialog
      :title="title.flag ? '用户添加' : '用户删除'"
      :visible.sync="title.msg"
    >
      <el-form>
        <el-form-item label="所属角色:" :label-width="formLabelWidth">
          <el-select v-model="form.roleid" placeholder="--请选择--">
            <el-option
              v-for="item in rolearr"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名:" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码:" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
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
export default {
  computed: {
    ...mapGetters({
      rolearr: "rolelist/rolearr",
    }),
  },
  props: ["title"],
  data() {
    return {
      isShow: true,
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    //关于角色的目录获取
    ...mapActions({
      reqsolelist: "rolelist/reqsolelist",
      reqadminlist:"adminlist/reqadminlist",
      reqaadminsum: "adminlist/reqaadminsum",
    }),
    // 初始化
    empty(){
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    //添加
    add() {
      this.xiospost({
        url: "/api/useradd",
        data: this.form,
      }).then((res) => {
        this.title.msg = false;
        this.reqadminlist(1);
        this.reqaadminsum();
      });
    },
    edit(e) {
      this.xiosget({
        url: "/api/userinfo",
        params: {
          uid: e,
        },
      }).then((res) => {
        console.log(res);
        this.form = res.data.list;
        this.uid = e;
      });
    },
    //修改数据
    edits() {
      this.xiospost({
        url: "/api/useredit",
        data: this.form,
      }).then((res) => {
        this.title.msg = false;
        this.reqadminlist(1);
        this.reqaadminsum();
      });
    },
  },
  mounted() {
    this.reqsolelist();
    console.log(this.rolearr);
  },
};
</script>
<style scoped>
</style>