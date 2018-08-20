<template>
  <div class="shop-list">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="商品图片">
        <template slot-scope="scope">
          <img width="60" :src="filterImgPath(scope.row)" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品名称"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="price"
        label="商品价格"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="date"
        sortable
        label="入库时间">
      </el-table-column>
      <el-table-column
        prop="isShow"
        label="是否上架"
        width="180">
        <template slot-scope="scope">
          <span>{{scope.row.isShow ? '是':'否'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="handleClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { findGood, deleteGood } from '@/api/products'
export default {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    handleClick (row) {
      this.$message.warning(`即将被删除的商品是:${row.name}----${row._id}`)
    },
    filterImgPath (row) {
      const base = `http://localhost:7085/`
      if (row.fileList.length > 0) {
        return base + row.fileList[0].path
      } else {
        return ''
      }
    }
  },
  created () {
    findGood().then(res => {
      this.tableData = res.data.data
    })
  }
}
</script>

<style lang="scss">
  .dashboard{
    height: 100%;
  }
</style>
