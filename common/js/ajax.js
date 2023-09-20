import toast from "./toast"

export default ajax;
let errorInfo = [
    '请求未初始化时失败',
    '服务器连接已建立随后失败',
    '请求已接收后链接丢失',
    '请求处理中时失败',
    '请求已完成，且响应已就绪时失败'
]

function ajax(options) {
  return new Promise((resolve, reject) => {
    let baseURL
    if (options.baseURL) {
      baseURL = options.baseURL
    } else {
      baseURL = 'envConfig'
    }
    const url = baseURL + options.url
  
      options = options || {}; //调用函数时如果options没有指定，就给它赋值{},一个空的Object
      options.type = (options.type || "GET ").toUpperCase(); /// 请求格式GET、POST，默认为GET
      options.dataType = options.dataType || "json"; //响应数据格式，默认json
      var params = JSON.stringify(options.data); //options.data请求的数据
      var params = {}
      if(options.data) params = JSON.stringify(options.data); //options.data请求的数据
  
      var xhr;
  
      //考虑兼容性
      if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
      } else if (window.ActiveObject) { //兼容IE6以下版本
          xhr = new ActiveXobject('Microsoft.XMLHTTP');
      }
  
  
      //启动并发送一个请求
      if (options.type == "GET") {
          var urlTemp = "";
          var paramsObj
          if(options.data)paramsObj = JSON.parse(params)
          if (paramsObj) {
              urlTemp = "?";
              for (let key in paramsObj) {
                  urlTemp += key + '=' + paramsObj[key] + '&'
              }
          }
  
          xhr.open("GET", url + urlTemp, true);
          // xhr.withCredentials = true;
          // xhr.setRequestHeader('Cookie', "key=value");
          // xhr.setRequestHeader("release", versionConfig.version);
          xhr.send(null);
      } else if (options.type == "POST") {
          xhr.open("post", url, true);
          // xhr.withCredentials = true;
          // xhr.setRequestHeader('Cookie', "key=value");
          //设置表单提交时的内容类型
          //Content-type数据请求的格式
          xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
          // xhr.setRequestHeader("release", versionConfig.version);
  
          xhr.send(params);
      }
  
      //    设置有效时间
      setTimeout(function() {
          if (xhr.readySate != 4) {
              xhr.abort();
          }
      }, options.timeout || 10000)
  
      //    接收
      //     options.success成功之后的回调函数  options.error失败后的回调函数
      //xhr.responseText,xhr.responseXML  获得字符串形式的响应数据或者XML形式的响应数据
      xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
              var status = xhr.status;
              if (status >= 200 && status < 300 || status == 304) {
                
                let res = xhr.responseText
                if (options.dataType === 'json') {
                  try {
                    res = JSON.parse(res)
                  } catch(err){
                    console.log(err)
                    res = {
                      data: res
                    }
                  }
    
                  // 错误code
                  if (res && res.code == '503001') {
                    toast('系统繁忙，请稍后再试！')
                  }
                  options.success && options.success(res, xhr.responseXML);
                  resolve(res)
                } else {
                  options.success && options.success(res, xhr.responseXML);
                  resolve(res)
                }
              } else {
                  let len = localStorage.length;
                  let arr = new Array(); // 定义数据集
                  for (var i = 0; i < len; i++) {
                      // 获取key 索引从0开始
                      var getKey = localStorage.key(i);
                      // 获取key对应的值
                      var getVal = localStorage.getItem(getKey);
                      // 放进数组
                      arr[i] = {
                          'key': getKey,
                          'val': getVal,
                      }
                  }
                  // setError(`\n错误类型:AJAX建立链接错误\n页面地址:${location.href}\n错误类型:${errorInfo[status]}\n请求内容:${JSON.stringify(options)}\n用户本地存储信息:${JSON.stringify(arr)}`);
                  options.error && options.error(status);
                  reject(new Error(status))
              }
          }
      }
  })
}