<template>
  <div>
    <el-dialog
      :title="title.flag ? '商品添加' : '商品修改'"
      :visible.sync="title.msg"
      @opened="changetran"
    >
      <el-form>
        <!-- 一级分类 -->
        <el-form-item label="一级分类:" :label-width="formLabelWidth">
          <el-select
            v-model="form.first_cateid"
            placeholder="--请选择--"
            @change="changesele"
          >
            <el-option
              v-for="item in classarr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 二级分类 -->
        <el-form-item label="二级分类:" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid" placeholder="--请选择--">
            <el-option
              v-for="item in arr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 商品名称 -->
        <el-form-item label="商品名称:" :label-width="formLabelWidth">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 价格 -->
        <el-form-item label="价格:" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 市场价格 -->
        <el-form-item label="市场价格:" :label-width="formLabelWidth">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 图片 -->
        <el-form-item label="图片:" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeimg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" id="box"></i>
          </el-upload>
        </el-form-item>
        <!-- 商品规格 -->
        <el-form-item label="商品规格编号:" :label-width="formLabelWidth">
          <el-select
            v-model="form.specsid"
            placeholder="--请选择--"
            @change="changespecSele"
          >
            <el-option
              v-for="item in specarr"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 规格属性 -->
        <el-form-item label="商品规格属性:" :label-width="formLabelWidth">
          <el-select v-model="form.specsattr" placeholder="--请选择--" multiple>
            <el-option
              v-for="(item, index) in arrspec"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 是否新品 -->
        <el-form-item label="是否新品:" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="form.isnew" :label="1">是</el-radio>
            <el-radio v-model="form.isnew" :label="2">否</el-radio>
          </template>
        </el-form-item>
        <!-- 是否热卖 -->
        <el-form-item label="是否热卖:" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="form.ishot" :label="1">是</el-radio>
            <el-radio v-model="form.ishot" :label="2">否</el-radio>
          </template>
        </el-form-item>
        <!-- 状态 -->
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
        <el-form-item label="活动形式" :label-width="formLabelWidth">
          <div id="div1"></div>
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
import E from 'wangeditor'
import qs from "qs";
export default {
  computed: {
    ...mapGetters({
      classarr: "classlist/classarr",
      specarr: "speclist/specarr",
    }),
  },
  props: ["title"],
  data() {
    return {
      isShow: true,
      arr: [],
      arrspec: [],
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: null,
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      imageUrl: "",
      formLabelWidth: "120px",
    };
  },
  methods: {
    ...mapActions({
    reqclassify: "classlist/reqclassify",
    reqspeclist: "speclist/reqspeclist",
    reqgoodslist: "goodslist/reqgoodslist",
    reqgoodslistcont: "goodslist/reqgoodslistcont",
    }),
    // 初始化
    empty() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: "1",
        status: 1,
      };
      this.imageUrl = "";
    },
    // 当弹窗弹出之后
    changetran(){
      console.log(111);
      this.editor = new E('#div1');
      this.editor.create()
      this.editor.txt.html(this.form.description);
    },
    //添加
    add() {
      this.form.description = this.editor.txt.html();
      var arr = new FormData();
      for (var i in this.form) {
        arr.append(i, this.form[i]);
      }
      xiospost({
        url: "/api/goodsadd",
        data: arr,
      }).then((res) => {
        this.title.msg = false;
        this.reqgoodslist(1);
        this.reqgoodslistcont();
      });
    },
    edit(id) {
      this.xiosget({
        url: "/api/goodsinfo",
        params: {
          id: id,
        },
      }).then((res) => {
        // console.log(res);
        this.form = res.data.list;
        this.imageUrl = `/api${this.form.img}`;
        this.form.id = id;
        this.form.specsattr = this.form.specsattr.split(',');
        this.changesele(this.form.first_cateid);
        this.changespecSele(this.form.specsid);
      });
    },
    //修改数据
    edits() {
      this.form.description = this.editor.txt.html();
      var arr = new FormData();
      for (var i in this.form) {
        arr.append(i, this.form[i]);
      }
      this.xiospost({
        url: "/api/goodsedit",
        data: arr,
      }).then((res) => {
        this.title.msg = false;
      });
    },
    // 图片上传时
    changeimg(e) {
      console.log(e);
      let file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    // 二级商品的选取
    changesele(id) {
      this.xiosget({
        url: "/api/catelist",
        params: {
          pid: id,
        },
      }).then((res) => {
        this.arr = res.data.list;
      });
    },
    // 获取商品规格属性
    changespecSele(e) {
      // this.form.specsattr = [];
      this.xiosget({
        url: "/api/specsinfo",
        params: {
          id: e,
        },
      }).then((res) => {
        this.arrspec = res.data.list[0].attrs;
        this.arrspec = this.arrspec.map((item) => {
          return item
            .replace('"', "")
            .replace('"', "")
            .replace("[", "")
            .replace("]", "");
        });
      });
    },
  },
  mounted() {
    this.reqspeclist();
    this.reqclassify();
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