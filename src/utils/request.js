// 基于axios封装的请求模块
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net' // 请求基础路径
})
// 请求拦截器
// 响应拦截器
// 导出请求方法
export default request

// 谁要使用谁就加载 request 模块
// import request from 'request.js'
