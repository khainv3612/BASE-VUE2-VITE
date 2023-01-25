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
                {{ $t('team.name') }}
              </template>
              <el-input
                id="name"
                ref="name"
                v-model="updateForm.name"
                :type="updateForm.key === 'name' ? 'number' : 'text'"
                name="name"
                maxlength="2000"
                @focus="resetValidate('name')"
              />
            </el-form-item>
            <div class="select_div">
              <el-form-item prop="status" :error="updateForm.errors.status">
                <template slot="label">
                  {{ $t('team.status') }}
                </template>
                <el-select
                  v-model="updateForm.status"
                  class="filter-item"
                  value=""
                  style="width: 200px"
                >
                  <el-option v-for="item in lstStatus" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
              </el-form-item>
              <el-form-item prop="group" :error="updateForm.errors.level">
                <template slot="label">
                  {{ $t('team.group') }}
                </template>
                <el-select
                  v-model="updateForm.level"
                  class="filter-item"
                  value=""
                  style="width: 200px"
                >
                  <el-option v-for="item in lstGroups" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
              </el-form-item>
            </div>
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
import { getAllGroups, getAllStatus, updateTeam } from '@/api/team'
import { LOADING_PAGE } from '@/store/store.const'
import { handleServerError } from '@/utils/validate'

export default {
  name: 'UpdateTeamModal',
  props: ['team'],
  data() {
    return {
      keyForm: randomString(),
      tableKey: 0,
      lstStatus: [],
      lstGroups: [],
      updateForm: {
        name: '',
        status: '',
        level: '',
        errors: {
          value: ''
        }
      },
      rulesItem: {
        name: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('team.name') }),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    disabledBtn() {
      return this.updateForm.name === ''
    }
  },
  watch: {
    async team() {
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
      this.updateForm.name = this.team.name
      this.updateForm.level = this.team.level
      this.updateForm.status = this.team.status
      await this.getAllStatus()
      await this.getAllGroups()
    },
    async getAllStatus() {
      await getAllStatus().then(response => {
        this.lstStatus = response.data
      })
    },
    async getAllGroups() {
      await getAllGroups().then(response => {
        this.lstGroups = response.data
      })
    },
    handleClose() {
      // this.$refs.updateForm.fields.clearValidate()
      this.$emit('success')
    },
    async updateValue() {
      await this.$refs.updateForm.validate(async valid => {
        if (valid) {
          this.$store.commit(LOADING_PAGE, true)
          await updateTeam(this.team.id, {
            name: this.updateForm.name,
            status: this.updateForm.status,
            level: this.updateForm.level
          })
            .then((response) => {
              this.$message({ message: response.message, type: 'success' })
              this.handleClose()
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
