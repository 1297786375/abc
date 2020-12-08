<template>
  <div class="box">
    <el-table
      :data="goodsarr"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="商品编号"> </el-table-column>
      <el-table-column prop="goodsname" label="商品名称"> </el-table-column>
      <el-table-column prop="price" label="商品价格"> </el-table-column>
      <el-table-column prop="market_price" label="市场价格"> </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img
            :src="scope.row.pid == 1 ? null : '/api' + scope.row.img"
            :style="scope.row.pid == 1 ? null : 'width:100px;height:100px'"
          />
        </template>
      </el-table-column>
      <el-table-column prop="catename" label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew == 1">是</el-button>
          <el-button type="primary" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="catename" label="是否热卖">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot == 1">是</el-button>
          <el-button type="primary" v-else>否</el-button>
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
      <el-table-column label="操作" width="180">
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
    <div class="fr">
   <el-pagination background layout="prev, pager, next" :total="goodscont" :current-page="1" @current-change="changepage">
    </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      goodsarr: "goodslist/goodsarr",
      goodscont: "goodslist/goodscont",
    }),
  },
  methods: {
    succ(file) {
      this.form.img = file.url;
    },
    ...mapActions({
      reqgoodslist: "goodslist/reqgoodslist",
      reqgoodslistcont: "goodslist/reqgoodslistcont",
    }),
    handleEdit(e) {
      this.$emit("edit", e);
    },
    handleDelete(id) {
      this.xiospost({
        url: "/api/goodsdelete",
        data: {
          id: id,
        },
      }).then((res) => {
        this.reqgoodslist();
        this.reqgoodslistcont();
      });
    },
    changepage(e){
      this.reqgoodslist(e);
    }
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
    this.reqgoodslist(1);
    this.reqgoodslistcont();
  },
};
</script>
<style scoped>
.box {
  margin-top: 20px;
}
</style>