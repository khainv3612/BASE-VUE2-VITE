<template>
  <guest-view>
    <template v-slot:content>
      <!--login-->
      <div class="login-container grid ">
        <div v-if="page === 'login'">
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form border-solid border-gray-100"
            autocomplete="on"
            label-position="left"
          >
            <!--            <h1 class="uppercase">Công ty cổ phần giải pháp công nghệ EZ</h1>-->
            <div class="login">
              <div class="login-logo">
                <img src="@/assets/images/logo2.png" width="40%">
              </div>
              <div class="login-title">
                {{ $t('login.logIn') }}
              </div>
              <div>
                <div class="label">
                  <label>{{ $t('login.email') }}</label>
                </div>
              </div>
              <el-form-item prop="email" :error="loginForm.errors.email">
                <el-input
                  ref="email"
                  v-model="loginForm.email"
                  :placeholder="$t('login.placeholder-email')"
                  name="email"
                  type="text"
                  autocomplete="off"
                  tabindex="1"
                  maxlength="64"

                  @focus="resetValidateLogin('email')"
                />
              </el-form-item>
              <div class="label">
                <label>{{ $t('login.password') }}</label>
              </div>
              <el-tooltip v-model="capsTooltip" :content="$t('common.caps-lock-on')" placement="right" manual>
                <el-form-item ref="passwordField" prop="password" :error="loginForm.errors.password">
                  <el-input
                    :key="passwordType"
                    ref="password"
                    v-model="loginForm.password"
                    :type="passwordType"
                    :placeholder="$t('login.placeholder-password')"
                    name="password"
                    tabindex="2"
                    maxlength="32"
                    autocomplete="off"
                    @keyup.native="checkCapslock($event, 'capsTooltip')"
                    @blur="capsTooltip = false"
                    @focus="resetValidateLogin('password')"
                    @keyup.enter.native="handleLogin"
                  />

                  <span class="show-pwd" @click="showPwd('passwordType')">
                    <img v-if="passwordType=== 'password'" src="@/assets/icon/eye.svg" alt="">
                    <img v-else src="@/assets/icon/eye-hidden.svg" alt="">
                  </span>
                </el-form-item>
              </el-tooltip>
              <el-button
                :loading="loading"
                type="primary"
                style="width:100%;margin-bottom:30px;margin-top:10px;"
                :disabled="disabledBtn"
                @click.native.prevent="handleLogin"
              >
                {{ $t('login.logIn') }}
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
    </template>
  </guest-view>
</template>

<script>
import GuestView from '@/components/GuestView'
import { handleServerError, validPassword } from '@/utils/validate'
import { LOADING_PAGE } from '@/store/store.const'

export default {
  name: 'Login',
  components: { GuestView },
  data() {
    const validReNewPassword = (rule, value, callback) => {
      if (value !== this.resetForm.newPassword) {
        callback(new Error(this.$t('validation.confirm-password')))
      } else {
        callback()
      }
    }

    const validFormatPassword = (rule, value, callback) => {
      if (!validPassword(value)) {
        callback(new Error(this.$t('validation.format-password')))
      } else {
        callback()
      }
    }

    return {
      page: 'login',
      isForgotPassword: true,
      loginForm: {
        email: '',
        password: '',
        remember: 0,
        errors: {
          email: '',
          password: ''
        }
      },
      loginRules: {
        email: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('login.email') }),
            trigger: 'blur'
          },
          { type: 'email', max: 64, message: this.$t('validation.email'), trigger: 'blur' }
        ],
        password: [
          {
            required: true,
            max: 32,
            message: this.$t('validation.required', { _field_: this.$t('login.password') }),
            trigger: 'blur'
          }
        ]
      },

      forgotForm: {
        email: '',
        errors: {
          email: ''
        }
      },
      forgotFormRules: {
        email: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('login.email') }),
            trigger: 'blur'
          },
          { type: 'email', max: 64, message: this.$t('validation.email'), trigger: 'blur' }
        ]
      },

      resetForm: {
        newPassword: '',
        reNewPassword: '',
        errors: {
          newPassword: '',
          reNewPassword: ''
        }
      },
      resetFormRules: {
        newPassword: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('login.new-password') }),
            trigger: 'blur'
          },
          {
            validator: validFormatPassword,
            trigger: 'blur'
          }
        ],
        reNewPassword: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('login.re-new-password') }),
            trigger: 'blur'
          },
          {
            validator: validReNewPassword,
            trigger: 'blur'
          }
        ]
      },

      passwordType: 'password',
      loading: false,
      redirect: undefined,
      otherQuery: {},
      capsTooltip: false,
      capsToolNewPasswordTip: false,
      capsToolReNewPasswordTip: false,
      passwordTypeReNew: 'password',
      passwordTypeNew: 'password'
    }
  },

  computed: {
    disabledBtn() {
      return this.loginForm.email === '' || this.loginForm.password === ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    },

    page() {
      switch (this.page) {
        case 'login':
          this.loginForm = {
            email: '',
            password: '',
            remember: 0,
            errors: {
              email: '',
              password: ''
            }
          }
          this.$nextTick(() => {
            this.$refs.loginForm.clearValidate()
          })
          break
      }
    }
  },
  mounted() {
    if (this.loginForm.email === '') {
      this.$refs.email.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },

  methods: {
    resetValidateLogin(ref) {
      this.$refs.loginForm.fields.find((f) => f.prop === ref).clearValidate()
    },
    resetValidateForgot(ref) {
      this.$refs.forgotForm.fields.find((f) => f.prop === ref).clearValidate()
    },
    resetValidateReset(ref) {
      this.$refs.resetForm.fields.find((f) => f.prop === ref).clearValidate()
    },
    checkCapslock(e, attr) {
      const { key } = e
      this[attr] = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd(attr) {
      if (this[attr] === 'password') {
        this[attr] = ''
      } else {
        this[attr] = 'password'
      }
    },

    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.commit(LOADING_PAGE, true)
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: '/', query: this.otherQuery })
              this.loading = false
              this.$store.commit(LOADING_PAGE, false)
            })
            .catch((data) => {
              if (data.status_code === 422) {
                this.loginForm.errors = handleServerError(this.loginForm.errors, data.data)
              }
              this.$store.commit(LOADING_PAGE, false)
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
