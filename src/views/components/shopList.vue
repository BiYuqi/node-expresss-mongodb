<template>
  <div class="shop-list">
    <el-row :gutter="15">
      <el-col :span="4">
        <el-input v-model="searchList.name" placeholder="名称查询"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="default" @click="reset">重置</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData.list"
      style="width: 100%">
      <el-table-column
        label="商品图片"
        width="80">
        <template slot-scope="scope">
          <img width="45" height="30" :src="filterImgPath(scope.row)" alt="">
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
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :page-size="searchList.size"
      layout="prev, pager, next, jumper"
      :total="tableData.total"
      style="margin: 20px 0">
    </el-pagination>
  </div>
</template>
<script>
import { findGood, deleteGood } from '@/api/products'
export default {
  data () {
    return {
      tableData: [],
      searchList: {
        start: 1,
        size: 5,
        name: ''
      }
    }
  },
  methods: {
    init (search = {}) {
      findGood(search).then(res => {
        this.tableData = res.data.data
      })
    },
    handleCurrentChange (current) {
      this.searchList.start = current
      this.init(this.searchList)
    },
    handleClick (row) {
      deleteGood({id: row._id}).then(res => {
        this.$message.warning(`被删除的商品是:${row.name}----${row._id}`)
        this.init()
      })
    },
    filterImgPath (row) {
      const base = `http://localhost:7085/`
      if (row.fileList.length > 0) {
        return base + row.fileList[0].path
      } else {
        return ''
      }
    },
    search () {
      this.init(this.searchList)
    },
    reset () {
      this.searchList.name = ''
      this.init(this.searchList)
    }
  },
  created () {
    this.init(this.searchList)
  }
}
</script>

<style lang="scss">
  .dashboard{
    height: 100%;
  }
</style>
