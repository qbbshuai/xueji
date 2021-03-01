<template>
<div>
 <!-- 搜索 全部  新增校区 -->
   <el-row style='margin-bottom:10px'>
  <el-col :span="8">
  <div class="grid-content bg-purple-dark">
  <el-input
  placeholder="请输入内容"
  clearable
  v-model="searchV"
  @clear="getPageData(page)"
  ref="input">
</el-input>
  </div></el-col>

  <el-col :span="8">
      <el-button-group>
          <el-button  type="primary" @click="search()">
            搜 索
          </el-button>
          <el-button type="primary" @click="()=>{ searchV = ''; getPageData(page);}">
            全 部
          </el-button> 
           </el-button-group>
   </el-col>

  <el-col :span="8" style='text-align:right;padding-right:20px'><div class="grid-content bg-purple-dark">
  <el-button type="success" @click="()=>{dialogShow=true;title='新增校区'}">新增校区</el-button>
  </div></el-col>
</el-row>

<!-- 渲染列表 -->
<div class="block">
   <el-table
      border  
      :data="pageData"
      style="width: 100%">
        <el-table-column
        prop="id"
        label="ID"
        width="50">
    </el-table-column>
    <el-table-column
        prop="schoolName"
        label="校区名称"
        width="180">
    </el-table-column>
    <el-table-column
        prop="principal"
        label="校区主任"
        width="180">
    </el-table-column>
    <el-table-column
        prop="address"
        label="校区地址">
    </el-table-column>
    <el-table-column
        prop="telephone"
        label="校区电话">
    </el-table-column>
       <el-table-column
        prop="url"
        label="校区网址">
    </el-table-column>
    <el-table-column
        label="操作"
          width="240">
      <template  slot-scope='scope'  >
        <el-button  size="mini">查 看</el-button>
        <el-button size="mini" type="success" @click="()=>{dialogShow=true;title='编辑校区';form=scope.row}">修 改</el-button>
        <el-button size="mini" type="danger" @click="del(scope.row.id)">删 除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>

<!--  新增校区表单 -->
<el-dialog   @close="close" title='新增校区' :visible.sync="dialogShow">
<el-form  ref='formref' :model="form"  :rules="rules"  label-width="80px">
  <el-form-item prop="schoolName" label="校区名称">
    <el-input v-model="form.schoolName"></el-input>
  </el-form-item>
   <el-form-item prop="address" label="校区地址">
    <el-input v-model="form.address"></el-input>
  </el-form-item>
   <el-form-item prop="principal" label="校区主任">
    <el-input v-model="form.principal"></el-input>
  </el-form-item>
   <el-form-item prop="telephone" label="校区电话">
    <el-input v-model="form.telephone"></el-input>
  </el-form-item>
   <el-form-item prop="fax" label="校区传真">
    <el-input v-model="form.fax"></el-input>
  </el-form-item>
   <el-form-item prop="url" label="校区网址">
    <el-input v-model="form.url"></el-input>
  </el-form-item>
   <el-form-item prop="zipCode" label="邮政编码">
    <el-input v-model="form.zipCode"></el-input>
  </el-form-item>
   <el-form-item prop="remark" label="校区详情">
    <el-input   type="textarea" v-model="form.remark"></el-input>
  </el-form-item>
 

   <el-form-item size="large">
    <el-button type="primary" @click="submit">确定</el-button>
    <el-button @click="dialogShow=false">取消</el-button>
  </el-form-item>
  </el-form>

  
</el-dialog>


 
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
</template>

<script>
import {getSchool,addSchool,delSchool, updateSchool} from '../../request/api.js'
import eleRules from '../../utils/eleRules.js'

export default {
name: "School",
  data(){
    // let urlReg=(r,value,callback)=>{
    //   console.log(r);
    //   console.log(value);
    //   let urlreg=new RegExp('https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)')
    //   if(urlreg.test(value.trim())){
    //     callback()
    //   }else{
    //     callback('请输入正确的网址')
    //   }
    // }
    return{
      id:'',
      dialogShow:false,
      pageData:[],
      title:'',
      page:1,
      total:0,
       searchV:'',
      form:{
        address:"",
        fax:"",
        principal:"",
        remark:"",
        schoolName:"",
        telephone:"",
        url:"",
        zipCode:"",
        
      },
      //校验正则
      rules:{
          schoolName:[ 
              eleRules.required,
             ],
          url:[ 
             eleRules.required,
             eleRules.url()
             ]  ,
             zipCode:[
               eleRules.required,
               eleRules.zipCode()
             ]
    }
    }
  },
  methods:{
    // 获取学校信息渲染页面
    getPageData(pageIndex){
      console.log(pageIndex);
      getSchool({page:pageIndex,limit:10,name:this.searchV}).then(res=>{
    console.log(res)
    this.pageData=res.data.list
    this.page=res.data.curPage
    this.total=res.data.totalCount

    sessionStorage.ss= +new Date()
    sessionStorage.schoolData=JSON.stringify(res.data)

      })
    },
    currentChange(p){
          this.getPageData(p)
    },


    //清空新增表单
    close(){
      console.log('关闭了');
      this.$refs.formref.resetFields()
     

    },
    //修改和新增校区分别调用2个接口
    submit(){
          this.$refs.formref.validate((valid) => {

             if (valid) {
                   
         if(this.title==='新增校区'){
        this.add()
      }
      else if(this.title==='编辑校区'){
        delete this.form.createTime
        updateSchool(this.form).then(res=>{
            this.dialogShow=false
          console.log(res);
          alert('修改成功！')
            this.getPageData(this.page)

        })

      }
               
             }
          })
  
          
          
    },
    //查询校区
 search(){
   this.getPageData(this.page)

 },
   //增加校区
    add(){
      addSchool(this.form).then(res=>{
        console.log("添加的对象是",this.form);  //查看添加的对象
        this.dialogShow=false
        this.$message({
          message:res.msg,
          type:'success'
        })
        console.log(res);
        this.getPageData(this.page)
      })
    },
    //删除
    del(id){
      console.log(id);
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         //
         delSchool(id).then(res=>{
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

    }
    
  },
  created(){
    //节流 避免频繁刷新请求数据
    if(sessionStorage.ss){
      if((+new Date())-Number(sessionStorage.ss)>3000){
        this.getPageData(1)
      }
      else{
        this.pageData=JSON.parse(sessionStorage.schoolData).list
        // console.log(JSON.parse(sessionStorage.schoolData));
        this.total=JSON.parse(sessionStorage.schoolData).totalCount
        this.page= JSON.parse(sessionStorage.schoolData).curPage
      }

    }
    else{
      this.getPageData(this.page)
    }
   
  }
}
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
