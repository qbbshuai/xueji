export function query(data) {
    let value = '?'
    for (const dataKey in data) {
      value+=dataKey+'='+data[dataKey]+'&'
    }
    return value.substr(0,value.length-1)
  }
  