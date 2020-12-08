<template>
  <div class="box">
    <el-table
      :data="classarr"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="pid" label="分类编号" width="180">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180">
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
      classarr: "classlist/classarr",
    }),
  },
  methods: {
    succ(file) {
      this.form.img = file.url;
    },
    ...mapActions({
      reqclassify: "classlist/reqclassify",
    }),
    handleEdit(e) {
      this.$emit("edit", e);
    },
    handleDelete(id) {
      this.xiospost({
        url: "/api/catedelete",
        data: {
          id: id,
        },
      }).then((res) => {
     this.reqclassify();
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
    this.reqclassify();
    console.log(this.classarr);
  },
};
</script>
<style scoped>
.box {
  margin-top: 20px;
}
</style>