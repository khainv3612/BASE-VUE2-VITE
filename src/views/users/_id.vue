<template>
  <main-view class-extra="user">
    <template v-slot:header>
      <h3 class="text-xl font-semibold">{{ $t('user.detail') }}</h3>
    </template>
    <template v-slot:content>
      <div class="mb-4">
        <div class="flex">
          <div class="w-1/2">
            <div class="mt-2">{{ $t('user.wallet_address') }}: {{ user.wallet_address }}</div>
            <div class="mt-2">{{ $t('user.email') }}: {{ user.email }}</div>
            <div class="mt-2">{{ $t('user.name') }}: {{ user.name }}</div>
            <div class="mt-2">{{ $t('user.phone') }}: {{ user.phone }}</div>
          </div>
          <div class="w-1/2">
            <div class="mt-2">{{ $t('user.invite_code') }}: {{ user.memo }}</div>
            <div class="mt-2">{{ $t('user.coin') }}: {{ user.coin_format }}</div>
            <div class="mt-2">{{ $t('user.status') }}: {{ user.status_text }}</div>
          </div>
        </div>
      </div>
      <hr class="mb-4">
      <!--  -->
      <div class="mb-4">
        <h3 class="text-xl font-semibold mb-4">{{ $t('user.history_money') }}</h3>
        <el-table
          :key="tableKeyHistory"
          ref="productTable"
          v-loading="listLoadingTransaction"
          :data="transactions"
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
          <el-table-column :label="$t('transaction.created_at')" prop="created_at" min-width="100" />
          <el-table-column :label="$t('transaction.from_address')" prop="from_address" min-width="200" />
          <el-table-column :label="$t('transaction.to_address')" prop="to_address" min-width="200" />
          <el-table-column :label="$t('transaction.tx_hash')" prop="tx_hash" min-width="200" />
          <el-table-column :label="$t('transaction.type_name')" prop="type_name" min-width="150" />
          <el-table-column :label="$t('transaction.value_text')" prop="value_text" min-width="100">
            <template slot-scope="{row}">
              <div v-if="row.operator === '-'" class="color-red">{{ row.value_text }}{{ $t('user.point') }}</div>
              <div v-if="row.operator === '+'" class="color-success">{{ row.value_text }}{{ $t('user.point') }}</div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('user.content')" prop="message" min-width="200" />
          <el-table-column :label="$t('transaction.status_text')" prop="status_text" min-width="100" />
        </el-table>
        <pagination
          v-show="total_transactions > 0"
          :total="total_transactions"
          :page.sync="listQueryTransactions.page"
          :limit.sync="listQueryTransactions.per_page"
          @pagination="getListTransations({...listQueryTransactions})"
          @change-size="changeSize({...listQueryTransactions})"
        />
      </div>
    </template>
  </main-view>
</template>

<script>
import MainView from '@/components/MainView'
import { getDetailUser, getListTransations } from '@/api/master'
import Pagination from '@/components/Pagination'

export default {
  name: 'IndexVue',
  components: {
    MainView,
    Pagination
  },
  data() {
    return {
      tableKey: 0,
      tableKeyHistory: 0,
      id: this.$route.params.id,
      user: {},
      invites: [],
      transactions: [],
      total: 0,
      total_transactions: 0,
      listLoading: true,
      listLoadingTransaction: true,
      listQuery: {
        page: 1,
        per_page: 10
      },
      listQueryTransactions: {
        page: 1,
        per_page: 10,
        'orders[0][key]': 'updated_at',
        'orders[0][dir]': 'desc',
        'filters[0][key]': 'user_id',
        'filters[0][data]': this.$route.params.id
      }
    }
  },
  created() {
    this.getDetailUser()
    this.getListTransations(this.listQueryTransactions)
  },
  methods: {
    getDetailUser() {
      getDetailUser(this.id).then(response => {
        this.user = response.data
      })
    },
    getListTransations(listQuery) {
      this.listLoadingTransaction = true
      getListTransations(listQuery).then(response => {
        this.transactions = response.data.data
        this.total_transactions = response.data.total
        this.listLoadingTransaction = false
      })
    },
    changeSize(listQuery) {
      listQuery.page = 1
      this.listQueryTransactions.page = 1
      this.listLoadingTransaction = true
      getListTransations(listQuery).then(response => {
        this.transactions = response.data.data
        this.total_transactions = response.data.total
        this.listLoadingTransaction = false
      })
    }
  }
}
</script>

<style lang="scss"></style>
