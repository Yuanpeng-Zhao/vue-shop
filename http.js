import axios from 'axios'
// 引入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

const http = axios.create({
  baseURL:'http://127.0.0.1:8888/api/private/v1/'
})

// 添加请求拦截器
http.interceptors.request.use(config => {
  NProgress.start()
  // console.log(config)
  // 为请求头对象，添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
});

// 添加响应拦截器
http.interceptors.response.use(config => {
  NProgress.done()
  return config
});
export default http