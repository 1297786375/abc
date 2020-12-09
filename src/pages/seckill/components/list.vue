<template>
  <div class="box">
    <el-table
      :data="seckil"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="title" label="活动名称" width="180">
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
      seckil:"seckill/seckil"
    }),
  },
  methods: {
    succ(file) {
      this.form.img = file.url;
    },
    ...mapActions({
      reqseckillist:"seckill/reqseckillist"
    }),
    handleEdit(e) {
      this.$emit("edit", e);
    },
    handleDelete(id) {
      this.xiospost({
        url: "/api/seckdelete",
        data: {
          id: id,
        },
      }).then((res) => {
        this.reqseckillist()
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
    this.reqseckillist()
  },
};
</script>
<style scoped>
.box {
  margin-top: 20px;
}
</style>