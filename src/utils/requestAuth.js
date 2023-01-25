import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import Cookies from 'js-cookie'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API_AUTH || 'https://fesb-casino.amaisoft.vn/api/admin'
})

service.interceptors.request.use(
  config => {
    config.headers['X-LANG'] = Cookies.get('language') ? Cookies.get('language') : 'vi'
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
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
    if (res.status !== 200) {
      if (res.status === 422) {
        return res
      } else {
        Message({
          message: res.message || res.error.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      if (res.status === 401) {
        store.dispatch('auth/logout')
        this.$route.push({ name: 'login' })
      }
      if (res.status === 404) {
        this.$router.push({ name: 'pageNotFound' })
      }
      if (res.status === 401 || res.status === 403 || res.status === 502) {
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: this.$t('button.cancel'),
          type: 'warning'
        }).then(() => {
          store.dispatch('auth/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || res.error.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
