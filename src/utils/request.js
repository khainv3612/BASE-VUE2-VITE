import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Cookies from 'js-cookie'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API
})

service.interceptors.request.use(
  config => {
    config.headers['X-LANG'] = Cookies.get('language') ? Cookies.get('language') : 'vi'
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status_code !== 200) {
      if (res.status_code === 422) {
        return res
      } else {
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      if (res.status_code === 401) {
        store.dispatch('auth/logout')
        this.$route.push({ name: 'login' })
      }
      if (res.status_code === 404) {
        this.$router.push({ name: 'pageNotFound' })
      }
      if (res.status_code === 401 || res.status_code === 403 || res.status_code === 502) {
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: this.$t('button.cancel'),
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log(error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
