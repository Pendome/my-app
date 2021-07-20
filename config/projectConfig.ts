// const projectName = require('./project');
import projectName from './project'

const config = {
  project: {
    outputDir: 'dist/my-app/',
    uploadUrl: 'dist\\my-app',
    development: 'http://112.94.22.17:20075/',
    dev: 'http://112.94.22.17:20075/',
    // dev: 'http://172.17.1.75:85',
    production: 'https://wf.ehang.com/',
    url: '',
    companyName: '亿航智能设备有限公司',
    baseStyle: {
      sideBar_backColor: 'linear-gradient(180deg, #1F416E 0%, #0D1F3C 100%)', // 侧边栏背景颜色
      sideBar_activeColor: 'linear-gradient(225deg, #1998F1 0%, #0D70E8 100%)', // 侧边栏一级选中背景颜色
      sideBar_activeSecendColor: 'rgba(0, 115, 255, 0.4)', // 侧边栏二级选中背景颜色
      header_color: 'linear-gradient(270deg, #6B97CF 0%, #456FB3 100%)', // 头部导航背景颜色
      colorStatus_hoverColor: '#2682FF', // 字体hover
      colorStatus_activeColor: '#0463D6', // 字体点击
      colorStatus_hoverBackColor: '#E6F1FF', // hover背景
      colorStatus_activeBackColor: '#D2E6FF', // hover点击背景
      button_color: 'linear-gradient(225deg, #2FA9FF 0%, #0D70E8 100%)', // 按钮背景颜色
      button_hoverColor: 'linear-gradient(225deg, #107CE7 0%, #0764D4 100%)', // 按钮hover
      button_activeColor: 'linear-gradient(225deg, #026ED8 0%, #0155BA 100%)' // 按钮点击
    }
  }
}

const configObj = config[projectName.name]
configObj.url = configObj[projectName.mode]

export default configObj
