<template>
  <main-view class-extra="product-list">

    <template v-slot:header>
      <h3 class="text-2xl font-semibold">{{ $t('user.title') }}
        <span v-if="totalProduct" class="list-count">({{ totalProduct }})
        </span>
      </h3>
    </template>
    <template v-slot:action>
      <el-button type="primary" icon="el-icon-plus" class="btn-primary" @click="handleCreate">
        {{ $t('user.add') }}
      </el-button>
    </template>
    <template v-slot:filter>
      <el-input
        v-model="listQuery.search"
        :placeholder="$t('user.search')"
        style="width: 400px;"
        class="filter-item"
        maxlength="255"
        @keyup.enter.native="handleFilter"
      />
    </template>
    <template v-slot:content>
      <div v-if="rowSelected.length" class="mb-3">
        <span class="content-item">{{ $t('user.check', { '_count_': rowSelected.length }) }}</span>
        <span class="content-item content-un-choice" @click="toggleSelection()">{{ $t('user.unchecked') }}</span>
        <el-button
          v-waves
          size="small"
          class="content-item"
          @click="updateStatus(rowSelected.map(item => item.id), 1)"
        >
          {{ $t('user.active') }}
        </el-button>
        <el-button
          v-waves
          size="small"
          class="content-item"
          @click="updateStatus(rowSelected.map(item => item.id), 2)"
        >
          {{ $t('user.inactive') }}
        </el-button>
      </div>
      <el-table
        :key="tableKey"
        ref="productTable"
        v-loading="listLoading"
        class="table-user"
        height="auto"
        :data="list"
        bitem
        fit
        border
        highlight-current-row
        style="width: 100%;"
        :row-class-name="(row, rowIndex) => 'item-row-table'"
        @sort-change="sortChange"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />

        <el-table-column prop="email" class-name="row-number pl-2" min-width="290" :label="$t('user.email')" />
        <el-table-column min-width="100" prop="role" sortable="custom" :label="$t('user.master')">
          <template slot-scope="{row}">
            <div v-if="row.is_master">◯</div>
          </template>
        </el-table-column>
        <el-table-column min-width="460" prop="referral_code" sortable="custom" :label="$t('user.referral_link')">
          <template slot-scope="{row}">
            <div class="flex items-center justify-between" style="color: #FFC85E">
              <a :href="row.referral_link" target="_blank">
                {{ row.referral_link }}
              </a>
              <div v-if="row.is_master" class="w-5 font-semibold cursor-pointer" @click="copyLink(row)">
                <i class="text-base el-icon-copy-document" />
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="usdt_balance" class-name="row-number pl-2" min-width="200" sortable="custom" :label="$t('user.wallet_USDT')" />
        <el-table-column prop="sb_balance" class-name="row-number pl-2" min-width="200" sortable="custom" :label="$t('user.wallet_SB')" />
        <el-table-column prop="staking_total" class-name="row-number pl-2" min-width="200" sortable="custom" :label="$t('user.staking')" />
        <el-table-column prop="profit_amount" class-name="row-number pl-2" min-width="230" sortable="custom" :label="$t('user.total_profit')" />
        <el-table-column prop="referral_amount" class-name="row-number pl-2" min-width="200" sortable="custom" :label="$t('user.introductory_rose')" />
        <el-table-column class-name="row-number pl-2" min-width="420" :label="$t('user.address')">
          <template slot-scope="{row}">
            <div class="flex items-center justify-between" style="color: #FFC85E">
              <div>{{ row.wallet_address }}</div>
              <div class="w-5 font-semibold cursor-pointer" @click="copyAddress(row)">
                <i class="text-base el-icon-copy-document" />
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="status" class-name="row-number pl-2" sortable="custom" min-width="150" :label="$t('user.status')">
          <template slot-scope="{row}">
            <p :class="row.status === 1 ? 'text-269977' : 'text-F12323'"> {{ row.status_name }}</p>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="130"
          prop="action"
          fixed="right"
          :label="$t('common.action')"
        >
          <template slot-scope="{row}">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-view"
              @click.stop="showDetailItem(row)"
            >
              {{ $t('common.detail') }}
            </el-button>
          </template>
        </el-table-column>
        <template slot="empty">
          <div class="flex items-center justify-items-start">
            {{ $t('common.no-data') }}
          </div>
        </template>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.per_page"
        @pagination="getList({...listQuery})"
        @change-size="changeSize({...listQuery})"
      />
      <el-dialog
        :modal-append-to-body="false"
        class="dialog-admin-form"
        :title="textMap[dialogStatus]"
        :visible.sync="dialogFormVisible"
        width="450px"
        :before-close="handleClose"
      >
        <form-user
          :temp-item-parent="tempItem"
          :dialog-status="dialogStatus"
          :clear-validate="clearValidate"
          @checkInput="checkInput"
          @cancelForm="handleClose"
          @createData="createData"
        />
      </el-dialog>
      <el-dialog
        class="dialog-master-detail"
        :title="$t('user.detail')"
        :visible.sync="dialogItemDetail"
        width="1050px"
        :modal-append-to-body="false"
      >
        <detail-user
          :user-detail="userDetail"
          :id-user="idUser"
          @closeDetail="closeDetail"
        />
      </el-dialog>
    </template>
  </main-view>
</template>

<script>
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import MainView from '@/components/MainView'
import { handleServerError } from '@/utils/validate'
import FormUser from '@/components/Users/formUser'
import { getList, fetchItem, createItem, updateStatus } from '@/api/investors'
import DetailUser from '@/components/Users/detail'
import { copyClipboard } from '@/utils/format'
import { getListUser } from '@/api/master'

export default {
  name: 'ListMaster',
  components: { DetailUser, FormUser, Pagination, MainView },
  directives: { waves },
  data() {
    return {
      dialogConfirm: false,
      rowSelected: [],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        per_page: 10,
        'orders[0][key]': 'id',
        'orders[0][dir]': 'desc'
      },
      fullscreenLoading: false,
      totalProduct: '',
      textMap: {
        create: this.$t('user.add')
      },
      dialogItemDetail: false,
      dialogStatus: '',
      dialogFormVisible: false,
      clearValidate: false,
      isConfirm: false,
      userDetail: {},
      pancakeUsers: [],
      idUser: '',
      tempItem: {
        email: '',
        errors: {
          email: ''
        }
      }
    }
  },
  computed: {
    checkEmailMe() {
      return this.$store.state.user.user
    }
  },
  created() {
    this.getList(this.listQuery)
  },
  methods: {
    copyLink(row) {
      copyClipboard(row.referral_link)
      this.$message({
        message: this.$t('common.copy_success'),
        type: 'success'
      })
    },
    copyAddress(row) {
      copyClipboard(row.wallet_address)
      this.$message({
        message: this.$t('common.copy_success'),
        type: 'success'
      })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.productTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.productTable.clearSelection()
      }
    },
    updateStatus(ids, status) {
      this.$confirm(this.$t('common.confirm-status'), this.$t('common.confirm'), {
        confirmButtonText: this.$t('common.ok'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        updateStatus({ user_ids: ids, status: status }).then((response) => {
          this.$message({ message: response.message, type: 'success' })
          this.getList({ ...this.listQuery })
        }).catch((response) => {
          this.getList({ ...this.listQuery })
        })
      }).catch(() => {
      })
    },
    handleSelectionChange(val) {
      this.rowSelected = val
    },
    showDetailItem(item) {
      this.idUser = item.id
      fetchItem(item.id).then(response => {
        this.userDetail = Object.assign({}, { ...response.data })
        this.dialogItemDetail = true
      }).catch(response => {
        this.$message({ message: response.message, type: 'danger' })
      })
    },
    sortChange(data) {
      const { prop, order } = data
      if (order) {
        this.listQuery['orders[0][key]'] = prop
        if (order === 'ascending') {
          this.listQuery['orders[0][dir]'] = 'asc'
        } else {
          this.listQuery['orders[0][dir]'] = 'desc'
        }
      } else {
        this.listQuery['orders[0][dir]'] = 'asc'
      }
      this.handleFilter()
    },
    checkInput(value) {
      this.isConfirm = value
    },
    handleClose() {
      if (this.isConfirm) {
        this.$confirm(this.$t('common.confirm-data'), this.$t('common.confirm'), {
          confirmButtonText: this.$t('common.ok'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          this.dialogFormVisible = false
          this.resetTemp()
        }).catch(() => {
        })
      } else {
        this.dialogFormVisible = false
      }
    },
    closeDetail(value) {
      this.dialogItemDetail = value
      this.getList()
    },
    // create item
    handleCreate() {
      this.isConfirm = false
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.triggerClearValidate()
    },
    createData({ data, tempItem }) {
      this.fullscreenLoading = true
      createItem(data).then((response) => {
        if (response.status_code === 200) {
          this.listQuery.page = 1
          this.getList(this.listQuery)
          this.dialogFormVisible = false
          this.$message({ message: response.message, type: 'success' })
        } else if (response.status_code === 422) {
          tempItem.errors = handleServerError(this.tempItem.errors, response.data)
          this.tempItem = Object.assign({}, tempItem)
        }
      }).catch((response) => {
        if (response.status_code === 422) {
          tempItem.errors = handleServerError(this.tempItem.errors, response.data)
        }
      })
      this.fullscreenLoading = false
    },
    // end create item
    // get List item
    getList(listQuery) {
      this.listLoading = true
      getList(listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    changeSize(listQuery) {
      this.listLoading = true
      listQuery.page = 1
      this.listQuery.page = 1
      getListUser(listQuery).then(response => {
        this.users = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    // end delete Item
    handleFilter() {
      this.listQuery.page = 1
      this.getList({ ...this.listQuery })
    },
    // clear validate
    triggerClearValidate() {
      this.clearValidate = !this.clearValidate
    },
    // reset form
    resetTemp() {
      this.tempItem = {
        email: '',
        errors: {
          email: ''
        }
      }
    }
    // end reset form
  }
}
</script>

<style lang="scss">

.dialog-admin-form {
  overflow: hidden;
}
</style>
