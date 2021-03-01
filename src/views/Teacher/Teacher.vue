<template>
  <div>
    <!-- 上方区域 -->
    <div>
      <el-row style="margin-bottom: 10px">
        <el-col :span="8">
          <div class="grid-content bg-purple-dark">
            <el-input placeholder="请输入教师姓名" clearable ref="input" v-model="searchName">
            </el-input></div
        ></el-col>

        <el-col :span="8">
          <el-button-group>
            <el-button type="primary" @click="search()"> 搜 索 </el-button>
            <el-button type="primary" @click="()=>{ searchName= ''; getPageData(page);}"> 全 部 </el-button>
          </el-button-group>
        </el-col>

        <el-col :span="8" style="text-align: right; padding-right: 20px"
          ><div class="grid-content bg-purple-dark">
            <el-button
              type="success"
              @click="
                () => {
                  dialogForm = true;
                  title = '新增教师';
                }
              "
              >新增教师</el-button
            >
          </div></el-col
        >
      </el-row>
    </div>
    <!-- 渲染列表 -->
    <div class="block">
      <el-table border :data="pageData" style="width: 100%">
        <el-table-column prop="teacherName" label="教师姓名" width="100">
        </el-table-column>
        <el-table-column label="在岗状态" width="100">
          <template slot-scope="scope">
            {{ status[scope.row.status] }}
          </template>
        </el-table-column>
        <el-table-column label="性别" width="180">
          <template slot-scope="scope">
            {{ sex[scope.row.sex] }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="phone" label="电话"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>

        <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <el-button size="mini" @click="chakan(scope.row.id)">查 看</el-button>
            <el-button
              size="mini"
              type="success"
              @click="
                () => {
                  dialogForm = true;
                  title = '编辑教师';
                  form =JSON.parse(JSON.stringify(scope.row)) ;
                }
              "
              >修 改</el-button
            >
            <el-button size="mini" type="danger" @click="del(scope.row.id)"
              >删 除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增的表单 -->
    <div class="dialog">
      <el-dialog :title="title" :visible.sync="dialogForm"  @close="closeDialog">
        <el-form :model="form" ref="formref">
          <el-form-item label="教员姓名" label-width="200px" prop='teacherName'>
            <el-input  v-model="form.teacherName" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" label-width="200px" prop="email">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="地址" label-width="200px" prop="address">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="电话" label-width="200px" prop="phone">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="性别" label-width="200px" prop="sex">
            <el-select v-model="form.sex" placeholder="请选择性别">
              <el-option
                v-for="(item, index) of sex"
                :label="item"
                :value="index"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="状态" label-width="200px" prop="status">
            <el-select v-model="form.status" placeholder="请选择性别">
              <el-option
                v-for="(item, index) of status"
                :label="item"
                :value="index"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogForm = false">取 消</el-button>
          <el-button type="primary" @click="submit()"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>

    <!-- 查看教师详细信息的表单 -->
         <div class="dialog">
      <el-dialog :title="title" :visible.sync="dialogFormt"  @close="closeDialog">
        <el-form :model="form" ref="formref">
          <el-form-item label="教员姓名" label-width="200px" prop='teacherName'>
            <el-input :disabled="true" v-model="form.teacherName" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" label-width="200px" prop="email">
            <el-input :disabled="true" v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="地址" label-width="200px" prop="address">
            <el-input :disabled="true" v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="电话" label-width="200px" prop="phone">
            <el-input :disabled="true"  v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="性别" label-width="200px" prop="sex">
            <el-input :disabled="true"  v-model="sex[form.sex]" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="状态" label-width="200px" prop="status">
             <el-input :disabled="true"  v-model="status[form.status]" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormt = false"> 确 定</el-button>
        
        </div>
      </el-dialog>

<!-- 分页器 -->
<el-pagination
  class="fenye"
  background
  layout="prev, pager, next"
  :current-page='page'
  :page-size='10'
  :total="total"
  @current-change='currentChange'>
  <!-- @current-change='(p)=>{getPageData(p)}'-->
</el-pagination>
  </div>
  </div>
</template>

<script>
import { getTeacher, addTeacher,updateTeacher,deleteTeacher,searchTeacher } from "../../request/api.js";
export default {
  name: "Teacher",
  data() {
    return {
      dialogFormt:false,
      searchName:'',
      page:1,
      total:0,
      pageData: [],
      sex: ["男", "女"],
      status: ["上班", "休息"],
      dialogForm: false,
      title:'新增教师',
      form: {
        address: "",
        email: "",
        phone: "",
        sex: "",
        status: "",
        teacherName: "",
      },
    };
  },
  created() {
    this.getPageData(this.page);
  
  },
  methods: {
    //点击分页渲染页面
    currentChange(p){
      this.getPageData(p)
      this.page=p
      console.log(this.page);
    },
    getPageData(pageIndex) {
      getTeacher({
        page:pageIndex,limit:10,teacherName:this.searchName
      }).then((res) => {
        console.log('查询教师请求到的res',res);
        this.pageData = res.data.list;
       this.page=res.data.curPage
       this.total=res.data.totalCount   //总条数
      });
    },
    //关闭新增表单清空内容
    closeDialog(){
      console.log('打印的dom表单' ,this.$refs.formref)
      this.$refs.formref.resetFields()

    },
    //新增教师
    add(){
      addTeacher(this.form).then(res=>{
        this.getPageData(this.page)
      })

    },
    //查看教师详细信息
     chakan(id){
       this.dialogFormt=true
       searchTeacher(id).then(res=>{
         console.log('根据id查看到的教师信息',res.data);
         this.form=res.data
     
       })


     },
    //编辑教师
    update(){
      updateTeacher(this.form).then(res=>{
        console.log('编辑教师的res',res);
        alert(res.msg);
        this.getPageData(this.page)
      })

    },
    //根据姓名查询教师
    search(){
              this.getPageData(this.page)
    },
    //删除教师
    del(id){

  
        this.$confirm('确定删除该教师吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         //
         deleteTeacher(id).then(res=>{
           this.$message({
             message:res.msg,
             type:'success'
           })
           //刷新页面
           this.getPageData(this.page)
         }).catch(err=>{
           alert('删除失败')
         })


        }).catch(() => {
       //    
         this.$message({
            type: 'info',
            message: '已取消删除'
          });  
        });
    },
    //提交表单的2个分支
    submit(){
      if(this.title=='新增教师'){
        this.add()
        this.dialogForm=false
      }else if(this.title=='编辑教师'){
         this.update()
         this.dialogForm=false
      }
    }
  },

};
</script>

<style scoped>
.fenye{
  position: fixed;
  z-index: 99;
  right: 100px;
  bottom: 5px;
  background-color: rgb(237, 237, 243);
}
.el-table{
  height: 450px;
  overflow: hidden;
  overflow-y: scroll;
}
   
</style>