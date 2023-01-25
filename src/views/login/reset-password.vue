<template>
  <guest-view>
    <template v-slot:content>
      <!--login-->
      <div class="login-container grid ">
        <!--change-password-->
        <div>
          <el-form
            ref="resetForm"
            :model="resetForm"
            :rules="resetFormRules"
            class="login-form"
            autocomplete="on"
            label-position="left"
          >
            <div class="login">
              <div class="login-logo">
                <img src="@/assets/logo.svg">
              </div>
              <div class="login-title">
                {{ $t('login.reset-title-password') }}
              </div>
              <div class="border-solid-login">
                <div class="label">
                  <label>{{ $t('login.new-password') }}</label> <span class="color-red"> *</span>
                </div>
                <el-tooltip v-model="capsToolNewPasswordTip" :content="$t('common.caps-lock-on')" placement="right" manual style="margin-bottom: 26px;">
                  <el-form-item prop="newPassword" :error="resetForm.errors.newPassword">
                    <el-input
                      ref="newPassword"
                      :key="passwordTypeNew"
                      v-model.trim="resetForm.newPassword"
                      :placeholder="$t('account.placeholder-new-password')"
                      name="newPassword"
                      tabindex="4"
                      maxlength="32"
                      autocomplete="off"
                      :type="passwordTypeNew"
                      @blur="capsToolNewPasswordTip = false"
                      @keyup.native="checkCapslock($event, 'capsToolNewPasswordTip')"
                      @focus="resetValidateReset('newPassword')"
                      @keyup.enter.native="handleReset"
                    />
                    <span class="show-pwd" @click="showPwd('passwordTypeNew')">
                      <img v-if="passwordTypeNew=== 'password'" src="@/assets/icon/eye.svg" alt="">
                      <img v-else src="@/assets/icon/eye-hidden.svg" alt="">
                    </span>
                  </el-form-item>
                </el-tooltip>

                <div class="label">
                  <label>{{ $t('login.re-new-password') }}</label> <span class="color-red"> *</span>
                </div>
                <el-tooltip v-model="capsToolReNewPasswordTip" :content="$t('common.caps-lock-on')" placement="right" manual style="margin-bottom: 26px;">
                  <el-form-item prop="reNewPassword" :error="resetForm.errors.reNewPassword">
                    <el-input
                      ref="reNewPassword"
                      :key="passwordTypeReNew"
                      v-model.trim="resetForm.reNewPassword"
                      :placeholder="$t('account.re-new-password')"
                      name="reNewPassword"
                      :type="passwordTypeReNew"
                      tabindex="5"
                      maxlength="32"
                      autocomplete="off"
                      @blur="capsToolReNewPasswordTip = false"
                      @keyup.native="checkCapslock($event, 'capsToolReNewPasswordTip')"
                      @focus="resetValidateReset('reNewPassword')"
                      @keyup.enter.native="handleReset"
                    />
                    <span class="show-pwd" @click="showPwd('passwordTypeReNew')">
                      <img v-if="passwordTypeReNew=== 'password'" src="@/assets/icon/eye.svg" alt="">
                      <img v-else src="@/assets/icon/eye-hidden.svg" alt="">
                    </span>
                  </el-form-item>
                </el-tooltip>
                <el-button
                  :loading="loading"
                  type="primary"
                  style="width:100%;margin-bottom:30px;margin-top:10px;"
                  @click.native.prevent="handleReset"
                >
                  {{ $t('login.reset-title') }}
                </el-button>
              </div>
            </div></el-form>
        </div>
      </div>
    </template>
  </guest-view>
</template>

<script>
import GuestView from '@/components/GuestView'
import { validPassword, handleServerError } from '@/utils/validate'
import { checkToken } from '@/api/user'
import { LOADING_PAGE } from '@/store/store.const'

export default {
  name: 'ResetPassword',
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
      capsTooltip: false,
      capsToolNewPasswordTip: false,
      capsToolReNewPasswordTip: false,
      passwordTypeReNew: 'password',
      passwordTypeNew: 'password'
    }
  },
  watch: {
    page() {
      this.resetForm = {
        newPassword: '',
        reNewPassword: '',
        errors: {
          newPassword: '',
          reNewPassword: ''
        }
      }
      this.$nextTick(() => {
        this.$refs.resetForm.clearValidate()
      })
    }
  },
  async created() {
    const token = this.$route.query.token
    if (token) {
      const isResetPassword = await this.checkToken(token)
      if (!isResetPassword) {
        this.$router.push('/404')
      }
    }
  },
  methods: {
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
    async checkToken(data) {
      const response = await checkToken({ token: data })
      return response.data
    },
    handleReset() {
      this.$refs.resetForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.commit(LOADING_PAGE, true)
          this.$store.dispatch('user/resetPassword', { ...this.resetForm, ...{ token: this.$route.query.token }})
            .then((response) => {
              this.$router.push('/login')
              this.loading = false
              this.$store.commit(LOADING_PAGE, false)
              this.$message({ message: response.message, type: 'success' })
            })
            .catch((data) => {
              if (data.status_code === 422) {
                this.resetForm.errors = handleServerError(this.resetForm.errors, data.data)
              }
              this.loading = false
              this.$store.commit(LOADING_PAGE, false)
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
