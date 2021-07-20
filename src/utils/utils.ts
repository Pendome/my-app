import CryptoJS from 'crypto-js'

export const Storage = {
  set: (key: any, data: any) => {
    window.localStorage.setItem(key, JSON.stringify(data))
  },
  get: (key: any) => {
    const data = window.localStorage.getItem(key) || ''
    const value = JSON.parse(data)
    return value
  },
  remove: (key: any) => {
    window.localStorage.removeItem(key)
  },
  setSession: (key: any, data: any) => {
    window.sessionStorage.setItem(key, JSON.stringify(data))
  },
  getSession: (key: any) => {
    const data = window.sessionStorage.getItem(key) || ''
    const value = JSON.parse(data)
    return value
  },
  removeSession: (key: any) => {
    window.sessionStorage.removeItem(key)
  },
  clearSession: () => {
    sessionStorage.clear()
  },
  clear: () => {
    sessionStorage.clear()
    localStorage.clear()
  }
}
export const Cookie = {
  set: (key: any, value: any, day: any) => {
    const nowDate = new Date()
    nowDate.setDate(nowDate.getDate() + day)
    document.cookie = `${key}=${value};expires=${nowDate}`
  },
  get: (key: any) => {
    // 读取cookie值
    const str = document.cookie
    const arr = str.split('; ')
    let arr2 = []
    const arrjson = {}
    for (let i = 0; i < arr.length; i += 1) {
      arr2 = arr[i].split('=')
      const [keyarr, value] = arr2
      arrjson[keyarr] = value
    }
    return arrjson[key]
  },
  remove: (key: any) => {
    if (Cookie.get(key)) {
      Cookie.set(key, '', -1) // -1 值得是前一天的cookie值
    }
  }
}

export function parseTime(time: any, cFormat: any) {
  // 时间格式化
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    let newTime
    if (`${time}`.length === 10) {
      newTime = parseInt(time, 10) * 1000
      date = new Date(newTime)
    }
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result: any, key: any) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = `0${value}`
    }
    return value || 0
  })
  return timeStr
}

export const VConsole = () => {
  const VConsoleUrl = 'https://wxcity.xx-motor.com/common/vConsole/3.2.0/vconsole.min.js'
  const createScript = (url: any) => {
    const oScript = document.createElement('script')
    oScript.type = 'text/javascript'
    oScript.async = true
    oScript.src = url
    document.body.appendChild(oScript)
  }
  if (import.meta.env.MODE !== 'production') {
    createScript(VConsoleUrl)
  }
}

// 递归菜单
export const findParent = (menu: any, id: any) => {
  for (let i = 0; i < menu.length; i += 1) {
    if (menu[i].children && menu[i].children.length !== 0) {
      for (let j = 0; j < menu[i].children.length; j += 1) {
        if (menu[i].children[j].id * 1 === id * 1) {
          return menu[i]
        }
        if (
          menu[i].children[j] &&
          menu[i].children[j].children &&
          menu[i].children[j].children.length !== 0
        ) {
          findParent(menu[i].children[j].children, id)
        }
      }
    }
  }
  return ''
}

export const findParentID = (menu: Array<any>, id: Number): Object => {
  if (menu && menu.length > 0) {
    for (let i = 0; i < menu.length; i += 1) {
      if (menu[i].id === id) {
        return menu[i]
      }
      if (menu[i].children) {
        return findParentID(menu[i].children, id)
      }
    }
  }
  return {}
}

/**
 * 判断路由是否相等
 */
export const diff = (obj1: object, obj2: object) => {
  const obj = obj1
  const o1 = obj instanceof Object
  const o2 = obj2 instanceof Object
  if (!o1 || !o2) {
    /*  判断不是对象  */
    return obj === obj2
  }

  if (Object.keys(obj).length !== Object.keys(obj2).length) {
    return false
    // Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
  }

  Object.keys(obj).forEach((attr) => {
    const t1 = obj[attr] instanceof Object
    const t2 = obj2[attr] instanceof Object
    if (t1 && t2) {
      return diff(obj[attr], obj2[attr])
    }
    if (obj[attr] !== obj2[attr]) {
      return false
    }
    return true
  })
  // for (const attr in obj) {
  //   if (attr.hasOwnProperty(item)) {
  //     const t1 = obj[attr] instanceof Object
  //     const t2 = obj2[attr] instanceof Object
  //     if (t1 && t2) {
  //       return diff(obj[attr], obj2[attr])
  //     }
  //     if (obj[attr] !== obj2[attr]) {
  //       return false
  //     }
  //   }
  // }
  return true
}
/**
 * esc监听全屏
 */
export const listenfullscreen = (callback: Function) => {
  function listen() {
    callback()
  }
  document.addEventListener('fullscreenchange', () => {
    listen()
  })
  document.addEventListener('mozfullscreenchange', () => {
    listen()
  })
  document.addEventListener('webkitfullscreenchange', () => {
    listen()
  })
  document.addEventListener('msfullscreenchange', () => {
    listen()
  })
}
/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
  const isFullscreen =
    document.fullscreenEnabled ||
    (<any>window).fullScreen ||
    (<any>document).mozFullscreenEnabled ||
    (<any>document).webkitIsFullScreen
  return isFullscreen
}

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
  if (window.document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen()
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen()
  }
}
/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.exitFullScreen()
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.webkitCancelFullScreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.mozCancelFullScreen()
  }
}
/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
    exitFullScreen()
  } else {
    reqFullScreen()
  }
}

export const Encrypt3Des = (str, aStrKey, ivstr) => {
  // 加密
  const KeyHex = CryptoJS.enc.Utf8.parse(aStrKey)
  const encrypted = CryptoJS.TripleDES.encrypt(str, KeyHex, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: CryptoJS.enc.Utf8.parse(ivstr)
  })
  const hexstr = encrypted.ciphertext.toString().toUpperCase()
  return hexstr
}
export const Decrypt3Des = (str, aStrKey, ivstr) => {
  // 解密
  const KeyHex = CryptoJS.enc.Utf8.parse(aStrKey)
  // 因为我们加密的时候用到的16进制字符串，需要进行转换
  // 第一步把16进制字符串转为WordArray格式
  const WordArray = CryptoJS.enc.Hex.parse(str)
  // 第二步把WordArray再转为base64的字符串
  const base64str = CryptoJS.enc.Base64.stringify(WordArray)
  // 第三步再进行解密
  const decrypted = CryptoJS.TripleDES.decrypt(base64str, KeyHex, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: CryptoJS.enc.Utf8.parse(ivstr)
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}
export const codeMosaic = (phone) => {
  const re = /(\d{3})\d{4}(\d{4})/
  return phone.replace(re, '$1****$2')
}
export const dateDiff = (star, end) => {
  const date1 = new Date(star)
  const date2 = new Date(end)

  const s1 = date1.getTime()
  const s2 = date2.getTime()
  const total = (s2 - s1) / 1000

  const day = parseInt(total / (24 * 60 * 60), 10) // 计算整数天数
  //	var afterDay = total - day*24*60*60;//取得算出天数后剩余的秒数
  //	var hour = parseInt(afterDay/(60*60));//计算整数小时数
  //	console.info(hour);
  //	var afterHour = total - day*24*60*60 - hour*60*60;//取得算出小时数后剩余的秒数
  //	var min = parseInt(afterHour/60);//计算整数分
  //	var afterMin = total - day*24*60*60 - hour*60*60 - min*60;//取得算出分后剩余的秒数
  return day
}

export const myBrowser = () => {
  const { userAgent } = navigator // 取得浏览器的userAgent字符串
  const isOpera = userAgent.indexOf('Opera') > -1
  if (isOpera) {
    return 'Opera'
  } // 判断是否Opera浏览器
  if (userAgent.indexOf('Firefox') > -1) {
    return 'FF'
  } // 判断是否Firefox浏览器
  if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome'
  }
  if (userAgent.indexOf('Safari') > -1) {
    return 'Safari'
  } // 判断是否Safari浏览器
  if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
    return 'IE'
  } // 判断是否IE浏览器
  return true
}
