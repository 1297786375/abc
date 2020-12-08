<template>
  <div class="box">
    <el-table
      :data="arr"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="菜单编号" width="180">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标"> </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
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
          <el-button type="primary" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      arr: "menulist/arr",
    }),
  },
  methods: {
    ...mapActions({
      reqmounlist: "menulist/reqmounlist",
    }),
    handleEdit(e) {
      this.$emit("edit", e);
    },
    handleDelete(e) {
      this.xiospost({
        url: "/api/menudelete",
        data: {
          id: e,
        },
      }).then((res) => {
        this.$router.go(0);
      });
    },
  },
  components: {},
  data() {
    return {
    };
  },
  mounted() {
    this.reqmounlist();
    console.log(this.arr);
  },
};
</script>
<style scoped>
.box {
  margin-top: 20px;
}
</style>