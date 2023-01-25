<template>
  <main-view class-extra="reset-password">
    <template v-slot:header>
      <h3 class="text-2xl font-semibold">{{ $t('navbar.change-password') }} </h3>
    </template>
    <template v-slot:content>
      <el-row>
        <el-col :span="10">
          <!--        <div class="col-start-4 col-span-5  p-7 rounded-md ">-->
          <el-form
            ref="accountForm"
            :model="accountForm"
            :rules="accountRules"
            autocomplete="off"
            label-width="180px"
            label-position="left"
          >
            <el-tooltip v-model="capsToolOldPasswordTip" :content="$t('common.caps-lock-on')" placement="right" manual>
              <el-form-item prop="current_password" :error="accountForm.errors.current_password" :label="$t('account.old-password')">
                <el-input
                  ref="current_password"
                  :key="passwordTypeOld"
                  v-model="accountForm.current_password"
                  :placeholder="$t('account.placeholder-old-password')"
                  name="current_password"
                  :type="passwordTypeOld"
                  tabindex="3"
                  maxlength="32"
                  autocomplete="off"
                  @blur="capsToolOldPasswordTip = false"
                  @keyup.native="checkCapslock($event, 'capsToolOldPasswordTip')"
                  @focus="resetValidate('current_password')"
                />
                <span class="show-pwd" @click="showPwd('passwordTypeOld')">
                  <img v-if="passwordTypeOld=== 'password'" src="@/assets/icon/eye.svg" alt="">
                  <img v-else src="@/assets/icon/eye-hidden.svg" alt="">
                </span>
              </el-form-item>
            </el-tooltip>
            <el-tooltip v-model="capsToolNewPasswordTip" :content="$t('common.caps-lock-on')" placement="right" manual>
              <el-form-item prop="password" :error="accountForm.errors.password" :label="$t('account.new-password')">
                <el-input
                  ref="password"
                  :key="passwordTypeNew"
                  v-model.trim="accountForm.password"
                  :placeholder="$t('account.placeholder-new-password')"
                  name="password"
                  tabindex="4"
                  maxlength="32"
                  autocomplete="off"
                  :type="passwordTypeNew"
                  @blur="capsToolNewPasswordTip = false"
                  @keyup.native="checkCapslock($event, 'capsToolNewPasswordTip')"
                  @focus="resetValidate('password')"
                />
                <span class="show-pwd" @click="showPwd('passwordTypeNew')">
                  <img v-if="passwordTypeNew=== 'password'" src="@/assets/icon/eye.svg" alt="">
                  <img v-else src="@/assets/icon/eye-hidden.svg" alt="">
                </span>
              </el-form-item>
            </el-tooltip>
            <el-tooltip
              v-model="capsToolReNewPasswordTip"
              :content="$t('common.caps-lock-on')"
              placement="right"
              manual
            >
              <el-form-item prop="password_confirmation" :error="accountForm.errors.password_confirmation" :label="$t('account.re-new-password')">
                <el-input
                  ref="password_confirmation"
                  :key="passwordTypeReNew"
                  v-model.trim="accountForm.password_confirmation"
                  :placeholder="$t('account.re-new-password')"
                  name="password_confirmation"
                  :type="passwordTypeReNew"
                  tabindex="5"
                  maxlength="32"
                  autocomplete="off"
                  @blur="capsToolReNewPasswordTip = false"
                  @keyup.native="checkCapslock($event, 'capsToolReNewPasswordTip')"
                  @focus="resetValidate('password_confirmation')"
                />
                <span class="show-pwd" @click="showPwd('passwordTypeReNew')">
                  <img v-if="passwordTypeReNew=== 'password'" src="@/assets/icon/eye.svg" alt="">
                  <img v-else src="@/assets/icon/eye-hidden.svg" alt="">
                </span>
              </el-form-item>
            </el-tooltip>

            <el-form-item class="pt-2">
              <el-button
                :loading="loading"
                type="primary"
                class="btn-primary"
                @click.native.prevent="handleUpdate"
              >
                {{ $t('account.save') }}
              </el-button>
            </el-form-item>
          </el-form>
        <!--        </div>-->
        </el-col>
      </el-row>
    </template>
  </main-view>
</template>

<script>
import { handleServerError, validPassword } from '@/utils/validate'
import MainView from '@/components/MainView'
import { LOADING_PAGE } from '@/store/store.const'

export default {
  name: 'Index',
  components: { MainView },
  data() {
    const validReNewPassword = (rule, value, callback) => {
      if (value !== this.accountForm.password) {
        callback(new Error(this.$t('validation.confirm-password')))
      } else {
        callback()
      }
    }

    const validNewPassword = (rule, value, callback) => {
      if (value === this.accountForm.current_password) {
        callback(new Error(this.$t('validation.confirm-new-password')))
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
      passwordTypeOld: 'password',
      passwordTypeReNew: 'password',
      passwordTypeNew: 'password',
      accountForm: {
        current_password: '',
        password: '',
        password_confirmation: '',
        errors: {
          current_password: '',
          password: '',
          password_confirmation: ''
        }
      },
      accountRules: {
        current_password: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('account.old-password') }),
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('account.new-password') }),
            trigger: 'blur'
          },
          {
            validator: validNewPassword,
            trigger: 'blur'
          },
          {
            validator: validFormatPassword,
            trigger: 'blur'
          }
        ],
        password_confirmation: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('account.re-new-password') }),
            trigger: 'blur'
          },
          {
            validator: validReNewPassword,
            trigger: 'blur'
          }
        ]
      },
      passwordType: 'password',
      capsToolOldPasswordTip: false,
      capsToolNewPasswordTip: false,
      capsToolReNewPasswordTip: false,
      loading: false,
    }
  },
  methods: {
    resetValidate(ref) {
      this.$refs.accountForm.fields.find((f) => f.prop === ref).clearValidate()
      this.accountForm.errors[ref] = ''
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

    handleUpdate() {
      this.$refs.accountForm.validate(valid => {
        if (valid) {
          this.accountForm.errors = {}
          this.loading = true
          this.$store.commit(LOADING_PAGE, true)
          this.$store.dispatch(`user/changePassword`, this.accountForm)
            .then((response) => {
              if (response.status_code === 422) {
                this.accountForm.errors = handleServerError(this.accountForm.errors, response.data)
              } else if (response.status_code === 200) {
                this.accountForm.current_password = ''
                this.accountForm.password = ''
                this.accountForm.password_confirmation = ''
                this.$message({ message: response.message, type: 'success' })
              }
              this.loading = false
              this.$store.commit(LOADING_PAGE, false)
            })
            .catch((data) => {
              this.loading = false
              this.$store.commit(LOADING_PAGE, false)
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$dark_gray: #889aa4;
.show-pwd {
  position: absolute;
  right: 10px;
  top: 9.5px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}
</style>

