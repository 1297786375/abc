<template>
  <div>
    <el-dialog
      :title="title.flag ? '规格添加' : '规格修改'"
      :visible.sync="title.msg"
    >
      <el-form>
        <el-form-item label="规格名称:" :label-width="width">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格属性:" :label-width="width">
          <el-input v-model="prop" autocomplete="off" style="width: 381px" ></el-input>
          <el-button type="primary" @click="addprop">新增规格属性</el-button>
        </el-form-item>
        <el-form-item
          label="规格属性:"
          :label-width="width"
          v-if="form.pid != 1"
        >
          <el-input v-model="str" autocomplete="off" style="width: 437px" disabled></el-input>
          <el-button type="danger" @click="delprop">删除</el-button>
        </el-form-item>
        <!-- 图片 -->
        <el-form-item label="状态:" :label-width="width">
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
  computed: {
    ...mapGetters({
       specarr: "speclist/specarr",
    }),
  },
  props: ["title"],
  data() {
    return {
      isShow: true,
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      str:"",
      prop:'',
      imageUrl: "",
      width: "120px",
      innerwidth: "90px",

    };
  },
  methods: {
    ...mapActions({
      reqspeeclist: "speclist/reqspeclist",
      reqcont:"speclist/reqcont",
    }),
    // 初始化
    empty() {
      this.form = {
        specsname: "",
        attrs: "[]",
        status: 1,
      };
      this.str="";
      this.prop='';
    },
    //添加
    add() {
      xiospost({
        url: "/api/specsadd",
        data: this.form,
      }).then((res) => {
        this.title.msg = false;
        this.reqspeeclist(1);
        this.reqcont();
      });
    },
    edit(id) {
      this.xiosget({
        url: "/api/specsinfo",
        params: {
          id: id,
        },
      }).then((res) => {
        this.form = res.data.list[0];
        this.form.attrs = JSON.parse(this.form.attrs);
        this.form.attrs = JSON.stringify(this.form.attrs);
        this.str = this.form.attrs.slice(1,this.form.attrs.length-1);
        this.form.id = id;
      });
    },
    //修改数据
    edits() {
      this.xiospost({
        url: "/api/specsedit",
        data: this.form,
      }).then((res) => {
        this.title.msg = false;
        this.reqspeeclist(1);
        this.reqcont();
      });
    },
    changeimg(e) {
      console.log(e);
      let file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    //添加属性
    addprop() { 
    this.form.attrs = JSON.parse(this.form.attrs);
    this.form.attrs.push(this.prop)
    this.form.attrs = JSON.stringify(this.form.attrs);
    this.str = this.form.attrs.slice(1,this.form.attrs.length-1);
    this.prop = '';
    console.log(this.form.attrs);
    },
    // 删除属性
    delprop(){
    this.form.attrs = JSON.parse(this.form.attrs);
    this.form.attrs.pop(this.prop)
    this.form.attrs = JSON.stringify(this.form.attrs);
    this.str = this.form.attrs.slice(1,this.form.attrs.length-1);
    this.prop = '';
    }
  },
};
</script>
<style scoped>
</style>