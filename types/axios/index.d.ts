import * as axios from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    crossDomain: boolean
  }
}
export { axios }
