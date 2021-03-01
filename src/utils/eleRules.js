const phoneReg = new RegExp('^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$')
const urlReg = new RegExp('https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()!@:%_\\+.~#?&\\/\\/=]*)')
const zipReg = new RegExp('^[0-9]{6}$')
export default {
  required:{required:true,message:'请输入完整信息！',trigger: 'blur'},
  text:(min,max)=> {
    return {min:4,max:10,message:`请输入${min}到${max}之间的字符数！`,trigger: 'blur'}
  },
  phone:() => {
    return {
      validator:(rules,value,callback)=>{
        if (phoneReg.test(value.trim())){
          callback()
        }else {
          callback('请输入正确格式的号码！')
        }
      },
      trigger: 'blur'
    }
  },
  url:() => {
    return {
      validator:(rules,value,callback)=>{
        if (urlReg.test(value.trim())){
          callback()
        }else {
          callback('请输入正确格式的网址！')
        }
      },
      trigger: 'blur'
    }
  },
  zipCode:() => {
    return {
      validator:(rules,value,callback)=>{
        if (zipReg.test(value.trim())){
          callback()
        }else {
          callback('请输入正确格式的邮编！')
        }
      },
      trigger: 'blur'
    }
  }
}
