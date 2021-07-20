import Req from '../axios'

const serviceModule = {
  login(params: any) {
    return Req(
      {
        url: '/login', // 接口名
        method: 'post',
        isJSON: true
        // tip: '登录中...', // true 默认 请稍等...;  不传参数,无提示;  传 String , 则提示为为String
      },
      params
    )
  }
}
export default serviceModule
