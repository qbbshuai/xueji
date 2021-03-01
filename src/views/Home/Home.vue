<template>
<div>
  <el-table
      :data="pageData"
      border
      style="width: 100%">
    <el-table-column
        prop="sno"
        label="学好"
        width="80">
    </el-table-column>
    <el-table-column
        prop="name"
        label="姓名"
        width="100">
    </el-table-column>
    <el-table-column
        width="120"
        label="班级">
    <template slot-scope="scope">
      {{scope.row.classType===0?'全日制班级':'周日班'}}
    </template>
    </el-table-column>

    <el-table-column
        width="120"
        label="状态">
    <template slot-scope="scope">
      {{scope.row.status===0?'正常':'不正常'}}
    </template>
    </el-table-column>

    <el-table-column
        prop="email"
        label="邮箱">
    </el-table-column>
    <el-table-column
        prop="address"
        label="地址">
    </el-table-column>
    <el-table-column label="操作" width="250">
      <template >
        <el-button size="mini">查 看</el-button>
        <el-button size="mini" type="success">修 改</el-button>
        <el-button size="mini" type="danger">删 除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import  { getXueyuan } from "@/request/api"
export default {
  name: "Home",
  data(){
    return{
      pageData:[]
    }
  },
  created() {
    this.getPageData()
  },
  methods:{
    getPageData(){
      getXueyuan({pageNum :'1',pageSize :'1'}).then(res=>{
        console.log(res)
        this.pageData = res.data.list
      })
    }
  }
}
</script>

<style scoped>

</style>
