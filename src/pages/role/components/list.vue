<template>
  <div class="box">
    <el-table
      :data="rolearr"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="角色编号" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180">
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
import {mapActions,mapGetters} from 'vuex';
export default {
  computed: {
      ...mapGetters({
          rolearr:"rolelist/rolearr"
      })
  },
  methods: {
    // 角色编辑
    handleEdit(id) {
      this.$emit("edit", id);
    },
    // 角色删除
    handleDelete(id) {
      this.xiospost({
        url: "/api/roledelete",
        data: {
          id: id,
        },
      }).then((res) => {
        this.reqsolelist();
      });
    },
    ...mapActions({
        reqsolelist:"rolelist/reqsolelist"
    })
  },
  components: {},
  data() {
    return {
    };
  },
  mounted() {
   this.reqsolelist();
   console.log(this.rolearr);
  },
};
</script>
<style scoped>
.box {
  margin-top: 20px;
}
</style>