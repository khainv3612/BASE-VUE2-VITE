<template>
  <div id="pancake-form" class="pancake">
    <el-form
      ref="updateForm"
      :key="keyForm"
      :rules="rulesItem"
      :model="updateForm"
    >
      <div class="block product-form-content update_team_form">
        <el-form-item>
          <el-col :span="24">
            <el-form-item prop="name" :error="updateForm.errors.name" class="name_update">
              <template slot="label">
                {{ $t('group.name') }}
              </template>
              <el-input
                id="name"
                ref="name"
                v-model="updateForm.name"
                name="name"
                maxlength="2000"
                disabled
                readonly
                @focus="resetValidate('name')"
              />
            </el-form-item>
            <el-form-item prop="percent" :error="updateForm.errors.percent" class="name_update">
              <template slot="label">
                {{ $t('group.percent') }}
              </template>
              <el-input
                id="percent"
                ref="percent"
                v-model="updateForm.percent"
                oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                pattern="[0-9]*"
                inputmode="numeric"
                name="percent"
                maxlength="2000"
                @focus="resetValidate('percent')"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
      </div>
      <div class="flex items-center justify-between mt-8">
        <el-button class="w-6/12" @click="handleClose">
          {{ $t('common.cancel') }}
        </el-button>
        <el-button
          :disabled="disabledBtn"
          class="w-6/12"
          type="primary"
          @click="updateValue"
        >
          {{ $t('common.save') }}
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { randomString } from '@/utils'
import { LOADING_PAGE } from '@/store/store.const'
import { handleServerError } from '@/utils/validate'
import { updateGroup } from '@/api/group'

export default {
  name: 'UpdateGroupModal',
  props: ['group'],
  data() {
    return {
      keyForm: randomString(),
      tableKey: 0,
      lstStatus: [],
      lstGroups: [],
      updateForm: {
        name: '',
        percent: '',
        errors: {
          percent: ''
        }
      },
      rulesItem: {
        name: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('group.name') }),
            trigger: 'blur'
          }
        ],
        percent: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('group.percent') }),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    disabledBtn() {
      return this.updateForm.name === '' || this.updateForm.percent === ''
    }
  },
  watch: {
    async group() {
      await this.init()
    }
  },
  async created() {
    await this.init()
  },
  methods: {
    resetValidate(ref) {
      this.$refs.updateForm.fields.find((f) => f.prop === ref).clearValidate()
      this.updateForm.errors[ref] = ''
    },
    async init() {
      this.updateForm.name = this.group.name
      this.updateForm.percent = this.group.percent
    },
    handleClose() {
      // this.$refs.updateForm.fields.clearValidate()
      this.$emit('success')
    },
    async updateValue() {
      await this.$refs.updateForm.validate(async valid => {
        if (valid) {
          this.$store.commit(LOADING_PAGE, true)
          await updateGroup(this.group.id, {
            name: this.updateForm.name,
            percent: this.updateForm.percent
          })
            .then((response) => {
              const status = response.status_code
              if (status === 200) {
                this.$message({ message: response.message, type: response.status_code === 200 ? 'success' : 'error' })
                this.handleClose()
              } else {
                this.updateForm.errors = handleServerError(this.updateForm.errors, response.data)
              }
              this.$store.commit(LOADING_PAGE, false)
            })
            .catch((data) => {
              if (data.status_code === 422) {
                this.updateForm.errors = handleServerError(this.updateForm.errors, data.data)
              }
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
