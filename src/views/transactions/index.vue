<template>
  <main-view class-extra="setting">
    <template v-slot:header>
      <h3 class="text-2xl font-semibold">{{ $t('transaction.title') }}</h3>
    </template>
    <template v-slot:filter>
      <el-input
        v-model="listQuery.search"
        :placeholder="$t('transaction.search-placeholder')"
        style="width: 350px;"
        class="filter-item"
        maxlength="120"
        @keyup.enter.native="handleFilterTx"
        @blur="handleFilterTx"
      />
      <el-select
        v-model="listQuery['filters[1][data]']"
        :placeholder="$t('transaction.status')"
        class="filter-item"
        value=""
        style="width: 200px"
        @change="handleFilterStatus"
      >
        <el-option v-for="item in statusOption" :key="item.id" :label="item.name" :value="item.id"/>
      </el-select>
    </template>
    <template v-slot:content>
      <el-table
        :key="tableKey"
        ref="transactionTable"
        v-loading="listLoading"
        :data="transactions"
        bitem
        fit
        border
        highlight-current-row
        style="width: 100%;"
        :row-class-name="(row, rowIndex) => 'item-row-table'"
        @sort-change="sortChange"
      >
        <el-table-column
          type="index"
          width="50"
          class-name="text-center"
          :index="(index) => { return index + (listQuery.page - 1) * listQuery.per_page + 1 }"
        />
        <el-table-column :label="$t('transaction.created_at')" min-width="80">
          <template slot-scope="{row}">
            {{ row.created_at }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('transaction.email')" min-width="160">
          <template slot-scope="{row}">
            {{ row.email }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('transaction.tx_hash')" min-width="140">
          <template slot-scope="{row}">
            {{ row.tx_hash }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('transaction.value_text')" min-width="50">
          <template slot-scope="{row}">
            <div v-if="row.operator === '-'" class="color-red">{{ row.value_text }}</div>
            <div v-if="row.operator === '+'" class="color-success">{{ row.value_text }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('transaction.from_address')" min-width="150">
          <template slot-scope="{row}">
            {{ row.from_address }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('transaction.to_address')" min-width="150">
          <template slot-scope="{row}">
            {{ row.to_address }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('transaction.type_name')" min-width="100">
          <template slot-scope="{row}">
            {{ row.type_name }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('transaction.message')" min-width="150">
          <template slot-scope="{row}">
            {{ row.message }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('transaction.status_text')" min-width="80">
          <template slot-scope="{row}">
            {{ row.status_text }}
          </template>
        </el-table-column>
        <!--        <el-table-column-->
        <!--          align="center"-->
        <!--          width="100"-->
        <!--          class-name="small-padding fixed-width"-->
        <!--          prop="action"-->
        <!--          :label="$t('common.action')"-->
        <!--          fixed="right"-->
        <!--        >-->
        <!--          <template slot-scope="{row}">-->
        <!--            <el-button size="mini" icon="el-icon-view" type="primary" @click.stop="handleDetailTransaction(row)">-->
        <!--              {{ $t('common.detail') }}-->
        <!--            </el-button>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.per_page"
        @pagination="getList({...listQuery})"
        @change-size="changeSize({...listQuery})"
      />
    </template>
  </main-view>
</template>
<script>
import MainView from '@/components/MainView'
import Pagination from '@/components/Pagination'

import { getListTransaction } from '@/api/transaction'
import { getListUser } from '@/api/master'

export default {
  name: 'IndexVue',
  components: {
    MainView,
    Pagination
  },
  data() {
    return {
      searchName: '',
      tableKey: 0,
      transactions: [],
      total: 0,
      listLoading: true,
      listQuery: {
        search: '',
        page: 1,
        per_page: 10,
        'orders[0][key]': 'updated_at',
        'orders[0][dir]': 'desc',
        'filters[0][key]': 'tx_hash',
        'filters[0][data]': '',
        'filters[1][key]': 'status',
        'filters[1][data]': ''
      },
      statusOptions: [],
      disabledSwitchStatus: false,
      statusOption: [
        {
          'id': -1,
          'name': this.$t('status.all')
        },
        {
          'id': 1,
          'name': this.$t('status.pending')
        },
        {
          'id': 2,
          'name': this.$t('status.success')
        },
        {
          'id': 3,
          'name': this.$t('status.failed')
        }
      ]
    }
  },
  created() {
    this.getList(this.listQuery)
  },
  methods: {
    sortChange(v) {
      this.listQuery['orders[0][key]'] = v.prop
      this.listQuery['orders[0][dir]'] = v.order.replace('ending', '')
      this.getList({ ...this.listQuery })
    },
    getList(listQuery) {
      this.listLoading = true
      getListTransaction(listQuery).then(response => {
        this.transactions = response.data.data
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
    handleFilterTx() {
      if (this.searchName !== this.listQuery.search) {
        this.listQuery.page = 1
        if (Number(this.listQuery['filters[0][data]']) === -1) {
          this.listQuery['filters[0][data]'] = ''
        }
        this.searchName = this.listQuery.search
        this.getList({ ...this.listQuery })
      }
    },
    handleFilterStatus() {
      this.listQuery.page = 1
      if (Number(this.listQuery['filters[1][data]']) === -1) {
        this.listQuery['filters[1][data]'] = ''
      }
      this.getList({ ...this.listQuery })
    },
    handleDetailTransaction(data) {
      this.$router.push({ name: 'Detail User', params: { id: data.id }})
    }
  }
}
</script>

<style lang="scss">
</style>
