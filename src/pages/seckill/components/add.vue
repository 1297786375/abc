<template>
  <div>
    <el-dialog
      :title="title.flag ? '活动添加' : '活动修改'"
      :visible.sync="title.msg"
    >
      <el-form>
        <el-form-item label="活动名称:" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限:" :label-width="formLabelWidth">
          <el-date-picker
            v-model="dataarr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changedata"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker
        ></el-form-item>
        <el-form-item label="一级分类:" :label-width="formLabelWidth">
          <el-select v-model="form.first_cateid" placeholder="--请选择--" @change='changesele'>
            <el-option
              v-for="item in classarr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类:" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid" placeholder="--请选择--" @change="changegoods">
            <el-option
              v-for="item in arr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品:" :label-width="formLabelWidth">
          <el-select v-model="form.goodsid" placeholder="--请选择--">
            <el-option
              v-for="item in arrgoods"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            >
            </el-option>
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
import { xiosget, xiospost } from "../../../axios/index";
import { mapActions, mapGetters } from "vuex";
import qs from "qs";
export default {
  computed: {
    ...mapGetters({
      classarr: "classlist/classarr",
    }),
  },
  props: ["title"],
  data() {
    return {
      dataarr:[],
      form: {
          title:"",
          begintime:"",
          endtime:"",
          first_cateid:"",
          second_cateid:"",
          goodsid:"",
          status:1,
      },
      arr:[],
      arrgoods:[],
      formLabelWidth: "120px",
    };
  },
  methods: {
    ...mapActions({
      reqclassify: "classlist/reqclassify",
      reqseckillist:"seckill/reqseckillist"
    }),
    // 初始化
    empty() {
      this.form = {
          title:"",
          begintime:"",
          endtime:"",
          first_cateid:"",
          second_cateid:"",
          goodsid:"",
          status:1,
      };
      this.arr = [];
      this.dataarr=[];
      this.arrgoods = [];
    },
    //日期改变
    changedata(e){
      this.form.begintime = e[0];
      this.form.endtime = e[1];
      console.log(e);
    },
    //添加
    add() {
      xiospost({
        url: "/api/seckadd",
        data: this.form,
      }).then((res) => {
        this.title.msg = false;
        this.reqseckillist();
      });
    },
    edit(id) {
      this.dataarr = [];
      this.xiosget({
        url: "/api/seckinfo",
        params: {
          id: id,
        },
      }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.changesele(this.form.first_cateid);
        this.changegoods(this.form.second_cateid);
        this.dataarr.push(this.form.begintime)
        this.dataarr.push(this.form.endtime)
      });
    },
    //修改数据
    edits(){
      this.xiospost({
        url: "/api/seckedit",
        data: this.form,
      }).then((res) => {
        this.title.msg = false;
        this.reqseckillist();
      });
    },
    changeimg(e) {
      console.log(e);
      let file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    //获取二级分类
    changesele(id){
      this.arr = this.classarr.find(item=>{
        return item.id == id
      }).children
      console.log(this.arr);
    },
    //获取商品
    changegoods(id){
      console.log(id);
      this.xiosget({
        url:'/api/goodslist',
        params:{
          sid:id
        }
      }).then(res=>{
        this.arrgoods = [];
        let arr = res.data.list;
        arr.forEach(item=>{
          if(item.second_cateid == id){
              this.arrgoods.push(item);
          }
        })
      })
    }
  },
  mounted(){
    this.reqclassify();
  }
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