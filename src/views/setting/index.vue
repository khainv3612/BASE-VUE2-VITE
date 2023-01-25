<template>
  <main-view class-extra="setting">
    <template v-slot:header>
      <h3 class="text-2xl font-semibold">{{ $t('setting.title') }}</h3>
    </template>
    <template v-slot:content>
      <el-table
        :key="tableKey"
        ref="productTable"
        v-loading="listLoading"
        :data="listSetting"
        bitem
        fit
        border
        highlight-current-row
        style="width: 100%;"
        :row-class-name="(row, rowIndex) => 'item-row-table'"
      >
        <el-table-column
          type="index"
          class-name="text-center"
          width="50"
        />
        <el-table-column :label="$t('setting.name')" min-width="200">
          <template slot-scope="{row}">
            {{ row.key }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('setting.value')" min-width="200">
          <template slot-scope="{row}">
            {{ row.value }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="175"
          class-name="small-padding fixed-width"
          prop="action"
          :label="$t('common.action')"
          fixed="right"
        >
          <template slot-scope="{row}">
            <el-button size="mini" icon="el-icon-edit" @click.stop="handleUpdate(row)">
              {{ $t('common.edit') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :title="$t('setting.update')"
        :close-on-click-modal="false"
        :visible.sync="dialogUpdate"
        width="500px"
        :before-close="handleClose"
        top="5vh"
      >
        <div id="pancake-form" class="pancake">
          <el-form
            ref="tempItem"
            :key="keyForm"
            :rules="rulesItem"
            :model="dataUpdate"
          >
            <div class="block product-form-content">
              <el-form-item>
                <el-col :span="24">
                  <el-form-item prop="value" :error="dataUpdate.errors.value">
                    <template slot="label">
                      {{ $t('setting.value') }}
                    </template>
                    <el-input
                      id="value"
                      ref="value"
                      v-model="dataUpdate.value"
                      :type="dataUpdate.key === 'hot_line' ? 'number' : 'text'"
                      name="value"
                      maxlength="2000"
                      @focus="resetValidate('value')"
                      @input="checkInput('value')"
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
                v-loading.fullscreen.lock="listLoading"
                :disabled="!isConfirm"
                class="w-6/12"
                type="primary"
                @click="updateValue"
              >
                {{ $t('common.save') }}
              </el-button>
            </div>
          </el-form>
        </div>
      </el-dialog>
    </template>
  </main-view>
</template>
<script>
import MainView from '@/components/MainView'
import { getAllSetting, updateSetting } from '@/api/setting'
import { randomString } from '@/utils'

export default {
  name: 'IndexVue',
  components: {
    MainView
  },
  data() {
    return {
      keyForm: randomString(),
      dialogUpdate: false,
      isConfirm: false,
      dataUpdate: {
        id: 0,
        title: '',
        key: '',
        value: '',
        errors: {
          value: ''
        }
      },
      tableKey: 0,
      listLoading: false,
      listSetting: [],
      listQuery: {
        page: 1,
        per_page: 10
      },
      rulesItem: {
        value: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('setting.value') }),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getList(this.listQuery)
  },
  methods: {
    updateValue() {
      this.listLoading = true
      updateSetting(this.dataUpdate.id, { value: this.dataUpdate.value }).then(response => {
        if (response.status_code === 200) {
          this.getList(this.listQuery)
          this.$message({ message: response.message, type: 'success' })
          this.handleClose()
          this.listLoading = false
        } else {
          this.$message({ message: response.message, type: 'error' })
        }
      })
      this.listLoading = false
    },
    checkInput(attr) {
      if (this.dataUpdate[attr]) {
        this.isConfirm = true
      } else {
        this.isConfirm = false
      }
    },
    resetValidate(ref) {
      this.$refs.tempItem.fields.find((f) => f.prop === ref).clearValidate()
      this.dataUpdate.errors[ref] = ''
    },
    handleClose() {
      this.listLoading = true
      this.dataUpdate = {
        id: 0,
        title: '',
        key: '',
        value: '',
        errors: {
          value: ''
        }
      }
      this.$refs.tempItem.fields.find((f) => f.prop === 'value').clearValidate()
      this.dataUpdate.errors['value'] = ''
      this.listLoading = false
      this.dialogUpdate = false
    },
    handleUpdate(data) {
      this.dataUpdate.value = data.value
      this.dataUpdate.id = data.id
      this.dataUpdate.key = data.key
      this.dataUpdate.errors = {
        value: ''
      }
      this.dialogUpdate = true
    },
    getList(listQuery) {
      this.listLoading = true
      getAllSetting(listQuery).then(response => {
        this.listSetting = response.data
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss">
</style>
