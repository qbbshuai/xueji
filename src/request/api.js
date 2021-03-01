import request from "@/request/index";
import {query} from '../utils/utils.js'


//账号密码登录
export function Login(data){
  return request({
    method:'post',
    url:'api/users/login',
    data:data
  })
}
// 获取学员
export function getXueyuan(data) {
  return request({
    method:"post",
    url:'api/student/search'+query(data),
  })
}//获取学校
export function getSchool(data) {
  return request({
    method:"GET",
    url:'api/school/searchPage'+query(data),
  })
}
//新增学校
export function addSchool(data) {
  return request({
    method:"POST",
    url:'api/school/addSchool'+query(data),
  })
}
//删除学校
export function delSchool(id) {
  return request({
    method:"DELETE",
    url:`api/school/delSchool/${id}`  //模板字符串中动态使用id
  })
}

//更新学校
   export function updateSchool(data){
          return request({
            method:'put',
            url:"api/school/updateSchool"+query(data)
          })
   }
   //根据ID查询学校信息
   export function getSchoolById(id){
     return request({
       method:'get',
       url:`api/school/getSchoolById?id=${id}`
     })
   }

   //获取教员信息
   export function getTeacher(data){
     return request({
       method:'get',
       url:"api/teacher/search"+query(data)
     })
   }
   //新增教员
   export function addTeacher(data){
    return request({
      method:'post',
      url:"api/teacher/save",
      data
    })
   }
   //编辑教员
   export function updateTeacher(data){
     return request({
       method:'put',
       url:"api/teacher/update",
       data
     })
   }
   //删除教师
   export function deleteTeacher(id){
     return request({
      method:"DELETE",
      url:`api/teacher/delete/${id}`
     })

   }
//根据id查询教师
export function searchTeacher(id){
  return request({
    method:"get",
    url:`api/teacher/find/${id}`
   })

}
//获取班级列表
export function getClass(data) {
  return request({
    method:"GET",
    url:'api/class/search'+query(data),
  })
}
//新增班级信息
export function addClass(data){
  return request({
    method:'post',
    url:`api/class/save`+query(data),
    
  })
 }

 //批量删除
 export function delClass(data){
   return request({
     methods: "delete",
     url:`api/class/delBatch`+query(data)
   })
 }


