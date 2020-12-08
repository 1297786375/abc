<template>
  <div class="box">
    <el-table
      :data="specarr"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="规格编号" width="130px">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="130px">
      </el-table-column>
      <el-table-column label="规格属性" width="500px">
        <template slot-scope="scope">
          <span class="spanon" v-for="item in scope.row.attrs" :key="item.id">{{
            item.replace("[", "").replace("]", "").replace('"','').replace('"','')
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="203px">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="contm*10" :current-page="1" class="flot" @current-change="changepage">
    </el-pagination>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      specarr: "speclist/specarr",
      contm:"speclist/contm"
    }),
  },
  methods: {
    changepage(e){
         this.reqspeeclist(e);
    },
    succ(file) {
      this.form.img = file.url;
    },
    ...mapActions({
      reqspeeclist: "speclist/reqspeclist",
      reqcont:"speclist/reqcont",
    }),
    handleEdit(e) {
      this.$emit("edit", e);
    },
    handleDelete(id) {
      this.xiospost({
        url: "/api/specsdelete",
        data: {
          id: id,
        },
      }).then((res) => {
        this.reqspeeclist(1);
      });
    },
  },
  data() {
    return {
      arr: [],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
    };
  },
  mounted() {
    this.reqspeeclist(1);
    this.reqcont();
  },
};
</script>
<style scoped>
.box {
  margin-top: 20px;
}
.spanon {
  display: inline-block;
  padding: 5px;
  background-color: #ecf5ff;
  border: 1px solid #d9ecff;
  color: #409eff;
  border-radius: 5px;
  text-align: center;
}
.flot{
    float: right;
}
</style>