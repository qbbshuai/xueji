<template>
<div>
 <!-- 搜索 全部  新增校区 -->
   <el-row style='margin-bottom:10px'>

       <el-col :span="4">
   <el-button @click='piliang' type="success">批量删除</el-button>
  </el-col>

  <el-col :span="6">
  <el-input
  placeholder="请输入内容"
  clearable
  v-model="searchV"
  @clear="getPageData(page)"
  ref="input">
</el-input>
  </el-col>

  <el-col :span="6">
      <el-button-group>
          <el-button  type="primary" @click="search()">
            搜 索
          </el-button>
          <el-button type="primary" @click="()=>{ searchV = ''; getPageData(page);}">
            全 部
          </el-button> 
           </el-button-group>
   </el-col>

  <el-col :span="6" style='text-align:right;padding-right:20px'>
  <el-button type="success" @click="()=>{dialogShow=true;title='新增班级'}">新增班级</el-button>

  </el-col>
  
</el-row>

<!-- 渲染列表 -->
<div class="block">
   <el-table
      border  
      :data="pageData"
      style="width: 100%"
      @selection-change="handleSelectionChange">

       <el-table-column
      type="selection"
      width="55">
    </el-table-column>

        <el-table-column
        prop="name"
        label="班级名称"
        width="150">
    </el-table-column>
        <el-table-column
        prop="teacherIds"
        label="班主任"
        width="180">
    
    </el-table-column>
        <el-table-column
        prop="openDate"
        label="开班时间"
        width="180">
    </el-table-column>
    <el-table-column
        prop="status"
        label="班级状态"
        width="180">
         <template  slot-scope='scope'  >
         <span>{{scope.row.status===0?'正常':"结业"}}</span>
      </template>
    </el-table-column>
    
    <el-table-column
        label="操作"
          width="340">
      <template  slot-scope='scope'  >
        <el-button  size="mini">查 看</el-button>
        <el-button size="mini" type="success" @click="()=>{dialogShow=true;title='编辑班级';form=scope.row}">修 改</el-button>
        <el-button size="mini" type="danger" @click="del(scope.row.id)">删 除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>

<!--  新增校区表单 -->
<el-dialog   @close="close" :title='title' :visible.sync="dialogShow">
<el-form  ref='formref' :model="form"  :rules="rules"  label-width="80px">
  <el-form-item prop="name" label="班级名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>

  <el-form-item prop="teacherIds" label="班主任">
    <el-select @focus='handle' v-model="form.teacherIds" multiple placeholder="请选择">
    <el-option
      v-for="item in teacherList"
      :key="item.value"
      :label="item.teacherName"
      :value="item.teacherName">
    </el-option>
  </el-select>
  </el-form-item>

  <el-form-item prop="status" label="班级状态">
    <el-select  v-model="form.status" placeholder="请选择状态">
              <el-option
                v-for="(item, index) of status"
                :label="item"
                :value="index"
                :key="index"
              ></el-option>
            </el-select>
  </el-form-item>
  

   <el-form-item prop="remark" label="班级详情">
    <el-input  type="textarea" v-model="form.remark"></el-input>
  </el-form-item>

   <el-form-item prop="openDate" label="开班时间">
     <el-date-picker
      v-model="form.openDate"
      type="date"
      placeholder="选择日期"
     format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
    </el-date-picker>
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
import {getClass,addClass,getTeacher,delClass} from '../../request/api.js'
import eleRules from '../../utils/eleRules.js'

export default {
name: "Class",
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
      ids:[],
      id:'',
      dialogShow:false,
      pageData:[],
      title:'新增班级',
      page:1,
      total:0,
       searchV:'',
       status:['正常','结业'],
       teacherList:[],
       teachPage:1,
      form:{
        name:"",
        status:"",
        openDate:"",
        remark:"",
        teacherIds:"",    
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
      getClass({page:pageIndex,limit:10,name:this.searchV}).then(res=>{
    console.log('得到的班级列表',res.data.list)
    this.pageData=res.data.list
    this.page=res.data.curPage
    this.total=res.data.totalCount

    sessionStorage.ss= +new Date()
    sessionStorage.classData=JSON.stringify(res.data)
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
                   
         if(this.title==='新增班级'){
           console.log('------打印新增班级----');
        this.add()
      }
      else if(this.title==='编辑班级'){
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
      addClass(this.form).then(res=>{
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

    },

    //添加班级获取所有班主任
    handle(){
      console.log(1)
      var dropdown = document.getElementsByClassName('el-select-dropdown')[0].getElementsByClassName('el-scrollbar')[0].getElementsByClassName('el-select-dropdown__wrap')[0]
      console.log(dropdown)
      dropdown.onscroll=(e)=>{
        // console.log(dropdown.offsetHeight)
        console.log(dropdown.scrollHeight)
        // console.log(dropdown.scrollTop)
        console.log(dropdown.offsetHeight+dropdown.scrollTop)
        if ((dropdown.offsetHeight+dropdown.scrollTop)  >dropdown.scrollHeight){
          // this.page++;
          console.log('到底了')
          getTeacher({page:++this.teachPage, limit: 10,}).then(res => {
            this.teacherList = this.teacherList.concat(res.data.list)
            this.page = res.data.curPage
            this.total = res.data.totalCount
            console.log(res)
         
          })
        }
      } 
      //教师列表信息
        getTeacher({page: 1, limit: 10,}).then(res => {
          this.teacherList = res.data.list
          console.log(res)
         
        })

    },

    //获取选中的数组
    handleSelectionChange( selction ){
      console.log(selction);
      let ids=selction.map(item=>item.id)
    },
    piliang(){
     delClass({ids:"["+this.ids+"]"}).then(res=>{
       console.log(res)
     })

    }
  

    
  },
  created(){
    //节流 避免频繁刷新请求数据
    if(sessionStorage.ss){
      if((+new Date())-Number(sessionStorage.ss)>3000){
        this.getPageData(1)
      }
      else{
        this.pageData=JSON.parse(sessionStorage.classData).list
        // console.log(JSON.parse(sessionStorage.schoolData));
        this.total=JSON.parse(sessionStorage.classData).totalCount
        this.page= JSON.parse(sessionStorage.classData).curPage
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
