<template>
  <div class="box">
    <el-table
      :data="adminarr"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
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
          <el-button type="primary" @click="handleEdit(scope.row.uid)"
            >编辑</el-button
          >
          <el-button type="danger" @click="handleDelete(scope.row.uid)"
            >删除</el-button
          >
        </template>
        </el-table-column>
        </el-table>
        <div class="fr">
        <el-pagination background layout="prev, pager, next" :current-page="1" :total="pagesum" @current-change='change($event)'>
        </el-pagination>
      </div>

  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      adminarr: "adminlist/adminarr",
      pagesum: "adminlist/pagesum",
    }),
  },
  methods: {
    ...mapActions({
      reqadminlist: "adminlist/reqadminlist",
      reqaadminsum: "adminlist/reqaadminsum",
    }),
    handleEdit(e) {
      this.$emit("edit", e);
    },
    handleDelete(e) {
      this.xiospost({
        url: "/api/userdelete",
        data: {
          uid: e,
        },
      }).then((res) => {
          this.reqadminlist(1);
            this.reqaadminsum();
      });
    },
    change(e){
          this.reqadminlist(e);
    }
  },
  components: {},
  data() {
    return {
      arr: [
        {
          id: "1",
          title: "21312312",
          password: 123123,
          status: 1,
        },
      ],
      msg:1,
    };
  },
  mounted() {
    this.reqadminlist(1);
    this.reqaadminsum();
  },
};
</script>
<style scoped>
.box {
  margin-top: 20px;
}
</style>