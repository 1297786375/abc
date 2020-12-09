<template>
  <div class="box">
    <el-table
      :data="bannerarr"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="编号" width="180">
      </el-table-column>
      <el-table-column prop="title" label="轮播图标题" width="180">
      </el-table-column>
      <el-table-column label="图片" >
        <template slot-scope="scope">
          <img  :src="scope.row.pid==1?null:'/api'+scope.row.img" :style="scope.row.pid==1?null:'width:200px;height:100px'">
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
      <el-table-column label="操作">
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
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      bannerarr:"banner/bannerarr"
    }),
  },
  methods: {
    succ(file) {
      this.form.img = file.url;
    },
    ...mapActions({
      reqbannerlist:"banner/reqbannerlist"
    }),
    handleEdit(e) {
      this.$emit("edit", e);
    },
    handleDelete(id) {
      this.xiospost({
        url: "/api/bannerdelete",
        data: {
          id: id,
        },
      }).then((res) => {
        this.reqbannerlist();
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
    this.reqbannerlist();
  },
};
</script>
<style scoped>
.box {
  margin-top: 20px;
}
</style>