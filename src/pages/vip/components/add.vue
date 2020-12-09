<template>
  <div>
    <el-dialog
      :title="title.flag ? '轮播图添加' : '轮播图删除'"
      :visible.sync="title.msg"
    >
      <el-form>
        <el-form-item label="手机号:" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称:" :label-width="formLabelWidth">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
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
import { xiosget, xiospost } from "../../../axios/index";
import { mapActions, mapGetters } from "vuex";
import qs from "qs";
export default {
  computed:{
  },
  props: ["title"],
  data() {
    return {
      isShow: true,
      form: {
        nickname:"",
        phone:"",
        password:"",
        status:1,
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
     ...mapActions({
      reqbannerlist:"banner/reqbannerlist"
    }),
    // 初始化
    empty() {
      this.form={
        nickname:"",
        phone:"",
        password:"",
        status:1,
      };
    },
    //添加
    add() {
      this.xiospost({
        url: "/api/memberadd",
        data: this.form,
      }).then((res) => {
        // this.title.msg = false;
        // this.reqbannerlist();
      });
    },
    edit(id) {
      this.xiosget({
        url: "/api/bannerinfo",
        params: {
          id: id,
        },
      }).then((res) => {
        console.log(res);
        this.form = res.data.list;
        this.imageUrl = `/api${this.form.img}`;
        this.form.id = id;
      });
    },
    //修改数据
    edits() {
       var arr = new FormData();
      for (var i in this.form) {
        arr.append(i, this.form[i]);
      }
      this.xiospost({
        url: "/api/banneredit",
        data: arr,
      }).then((res) => {
        this.title.msg = false;
        this.reqbannerlist();
      });
    },
    changeimg(e){
      console.log(e);
      let file = e.raw
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    }
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
#box {
  border: 1px dashed #d9d9d9;
}
</style>