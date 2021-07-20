import axios from 'axios'
import qs from 'qs'
import Router from '@/router/index'
import { ElMessage } from 'element-plus'
import { Storage } from '@/utils/utils'
import { serviceParams } from 'types/global'
import baseUrl from './baseUrl'

const pending: any = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
// const CancelToken = axios.CancelToken;
axios.defaults.withCredentials = true
axios.defaults.crossDomain = true
const encodeSearchKey = (key: any) => {
  if (!key) {
    return key
  }
  const encodeArr: Array<Object> = [
    {
      code: '%',
      encode: '%25'
    },
    {
      code: '?',
      encode: '%3F'
    },
    {
      code: '#',
      encode: '%23'
    },
    {
      code: '&',
      encode: '%26'
    },
    {
      code: '=',
      encode: '%3D'
    }
  ]
  return key.replace(/[%?#&=]/g, ($: any): any => {
    interface code {
      code: String
      encode: String
    }
    for (const k of encodeArr) {
      if ((k as code).code === $) {
        return (k as code).encode
      }
    }
  })
}
// 请求拦截
axios.interceptors.request.use(
  (config) => {
    const obj = config
    obj.cancelToken = new axios.CancelToken((c) => {
      pending.push({
        u: config.url,
        f: c
      })
    })
    return config
  },
  (error) => Promise.reject(error)
)

// 返回拦截
axios.interceptors.response.use(
  (response) => {
    const res = response.data
    console.log('返回拦截', res)
    if (res && (res.code === 50012 || res.code === '50012' || res.code === 503 || res.code === '503')) {
      // Cookie.set('userMsg', '', -1)
      Storage.remove('userInfo')
      Storage.clearSession()
      Router.push({
        path: '/login'
      })
      Router.go(0)
      ElMessage.error(res.data.message)
    }
    return response
  },
  (error) => Promise.resolve(error.response)
)
const successState = <T extends serviceParams>(res: any, opts: T) => {
  // 统一判断后端返回的错误码
  // 默认弹出错误, isAlertErr: false 不弹出错误
  if (res.data.code === 50008) {
    // Cookie.set('userMsg', '', -1)
    Storage.remove('userInfo')
    Storage.clearSession()
    Router.push({
      path: '/login'
    })
    Router.go(0)
    ElMessage.error('身份已过期，请重新登录')
    return
  }
  if (!Object.prototype.hasOwnProperty.call(opts, 'isAlertErr') || (Object.prototype.hasOwnProperty.call(opts, 'isAlertErr') && opts.isAlertErr !== false)) {
    ElMessage.error(res.data.message || '网络异常')
  }
}
function errorState(response: any) {
  // 如果http状态码正常，则直接返回数据
  console.log('异常返回', response)
  if (response && (response.status !== 200 || response.status !== 304 || response.status !== 400)) {
    ElMessage.error('网络异常')
  }
  return response
}

const httpServer = <T extends serviceParams>(opts: T, params: Array<any>) => {
  const data = !opts.isUpload ? JSON.parse(JSON.stringify(params || {})) : params
  // 这里做data数据过滤,如果是空数组需要把对应项设置为null
  Object.keys(data).forEach((key) => {
    if (typeof data[key] === 'string') {
      data[key] = data[key].trim()
    }
    if (Array.isArray(data[key]) && data[key].length === 0) {
      data[key] = ''
    }
  })
  const Public = {}
  const httpDefaultOpts: any = {
    baseURL: baseUrl.baseUrl,
    method: opts.method,
    cache: false,
    url: `api${opts.method === 'get' ? `${opts.url}?v=${Math.random()}` : opts.url}`,
    timeout: 30000,
    params: Object.assign(Public, data),
    data: opts.isUpload ? data : qs.stringify(Object.assign(Public, data), { strictNullHandling: true }),
    headers: opts.method === 'get' ? { 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json', 'Content-Type': 'application/json; charset=UTF-8' } : {}
  }
  if (import.meta.env.MODE === 'development') {
    delete httpDefaultOpts.baseURL
  }
  if (opts.method === 'get') {
    delete httpDefaultOpts.data
  } else {
    delete httpDefaultOpts.params
  }
  if (Object.prototype.hasOwnProperty.call(opts, 'isJSON') && opts.isJSON === true) {
    httpDefaultOpts.headers = {
      'Content-Type': 'application/json; charset=utf-8'
    }
    httpDefaultOpts.data = decodeURIComponent(encodeSearchKey(JSON.stringify(data)))
  }
  if (Object.prototype.hasOwnProperty.call(opts, 'isUpload') && opts.isUpload === true) {
    httpDefaultOpts.headers = {
      'Content-Type': 'multipart/form-data'
    }
  }
  if (Object.prototype.hasOwnProperty.call(opts, 'isExport') && opts.isExport === true) {
    httpDefaultOpts.responseType = 'blob'
  }
  if (Storage.get('userInfo')) {
    httpDefaultOpts.headers['X-TOKEN'] = Storage.get('userInfo').token
  }
  return new Promise((resolve, reject) => {
    axios(httpDefaultOpts)
      .then((res) => {
        if (res && res.data && res.status === 200 && res.data.status > 0) {
          resolve(res.data.data || res.data.result)
        } else if (res) {
          reject(res.data)
          successState(res, opts)
        }
      })
      .catch((err) => {
        reject(err)
        errorState(err)
      })
  })
}
export default httpServer
