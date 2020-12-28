import axios from 'axios'


export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  //2.axios的拦截器
  // instance.interceptors.request.use(config =>{
  //   console.log(config);
  //   // 1.比如config中的信息不符合服务器的要求
  //   // 2.比如每次发送网络请求的时候，都希望在界面中显示一个请求的图标
  //   // 3.某些网络请求（比如登录），必须携带一些特殊的信息
  //   return config
  // }, err =>{
  //   consloe.log(err)
  // })

  // instance.interceptors.response.use(res =>{
  //   console.log(res)
  //   return res.data
  // }, err =>{
  //   console.log(err)
  // })


  //发送真正的网络请求
  return instance(config)

}
