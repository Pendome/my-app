export interface serviceParams {
  url: String
  method: 'get' | 'post' | 'delete'
  isJSON?: Boolean
  tip?: Boolean
  isAlertErr?: Boolean
  isUpload?: Boolean
  isExport?: Boolean
  params?: any
}
