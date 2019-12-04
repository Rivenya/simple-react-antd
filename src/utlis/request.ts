import { extend } from 'umi-request'
import { message } from 'antd'

const codeMessage = {
  200: '服务器请求成功返回数据',
  201: '新建或修改数据成功',
  202: '一个数据已经进入后台排队',
  204: '数据删除成功',
  400: '发出的请求有错误，服务器没有新建或修改数据的权限',
  401: '用户没有权限，或者令牌，密码错误',
  403: '用户得到授权，但是访问是被禁止的',
  404: '发出的请求是不存在的，服务器没有记录',
  406: '请求的格式不可得',
  410: '请求的资源被永久删除',
  422: '当创建一个对象时，发生一个验证错误',
  500: '服务器发生错误，请检查',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
}

const errorHandler = (error: { response: Response }): Response => {
  const { response } = error
  const { status, url } = response
  if (response && response.status) {
    const errorText = codeMessage[status] || response.statusText
    message.error(
      errorText
    )
  } else if (!response) {
    message.error(
      "网络异常，无法连接到服务器"
    )
  }
  return response
}

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  prefix: '/api', //添加头
  errorHandler,  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  timeout: 5000,  //超时
});

// request拦截器, 改变url 或 options.
request.interceptors.request.use((url, options: any) => {
  const token = window.localStorage.getItem('wtoken') ? window.localStorage.getItem('wtoken') : ""
  return (
    {
      url: url,
      options: {
        ...options,
        headers: {
          'authority': token
        }
      }
    }
  )
})

// response拦截器, 处理response
request.interceptors.response.use((response, options) => {
  return response;
});

export default request