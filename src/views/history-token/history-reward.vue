<template>
  <main-view class-extra="setting">
    <template v-slot:header>
      <h3 class="text-2xl font-semibold">{{ $t('history_reward.title') }}</h3>
    </template>
    <template v-slot:content>
      <el-table
        :key="tableKey"
        ref="teamsTable"
        v-loading="listLoading"
        :data="lstHistories"
        bitem
        fit
        border
        highlight-current-row
        style="width: 100%;"
        class="table_team"
        :row-class-name="(row, rowIndex) => 'item-row-table'"
      >
        <el-table-column
          class-name="text-center"
          width="50"
        >
          <template slot-scope="scope">
            {{ listQuery.per_page * (listQuery.page - 1) + (scope.$index + 1) }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('history_reward.created_at')" min-width="100">
          <template slot-scope="{row}">{{ row.created_at }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('history_reward.email')" min-width="200">
          <template slot-scope="{row}">
            {{ row.email }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('history_reward.name')" min-width="150">
          <template slot-scope="{row}">
            {{ row.name }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('history_reward.coin_format')" min-width="100">
          <template slot-scope="{row}">
            {{ row.coin_format }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('history_reward.type')" min-width="100">
          <template slot-scope="{row}">
            {{ row.type }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('history_reward.tx_hash')" min-width="200">
          <template slot-scope="{row}">
            {{ row.tx_hash }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('history_reward.from_address')" min-width="200">
          <template slot-scope="{row}">
            {{ row.from_address }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('history_reward.to_address')" min-width="200">
          <template slot-scope="{row}">
            {{ row.to_address }}
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.per_page"
        @pagination="getHistories({...listQuery})"
        @change-size="changeSize({...listQuery})"
      />

      <el-dialog
        :title="$t('history_reward.update')"
        :close-on-click-modal="false"
        :visible.sync="dialogUpdate"
        width="500px"
        :destroy-on-close="true"
        top="5vh"
      >
        <update-team-modal :team="teamActive" @success="updateSuccess"></update-team-modal>
      </el-dialog>
    </template>
  </main-view>
</template>
<script>
import MainView from '@/components/MainView'
import { randomString } from '@/utils'
import { getHistoryBuyToken } from '@/api/token'
import Pagination from '@/components/Pagination'

export default {
  name: 'HistoryRewardComponent',
  components: {
    MainView,
    Pagination
  },
  data() {
    return {
      tableKey: 0,
      searchName: '',
      keyForm: randomString(),
      teamActive: {},
      listLoading: false,
      lstHistories: [],
      lstTypes: [],
      listQuery: {
        search: '',
        'orders[0][key]': 'created_at',
        'orders[0][dir]': 'desc',
        'filters[0][key]': 'type',
        'filters[0][data]': '2',
        page: 1,
        per_page: 10
      },
      total: 0
    }
  },
  async created() {
    await this.init()
  },
  methods: {
    async getHistories(listQuery) {
      this.listLoading = true
      await getHistoryBuyToken(listQuery).then(response => {
        this.lstHistories = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    async init() {
      await this.getHistories(this.listQuery)
      await this.getListType()
    },
    async changeSize(listQuery) {
      this.listLoading = true
      listQuery.page = 1
      this.listQuery.page = 1
      await this.getHistories(listQuery).then(response => {
        this.lstHistories = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss">
</style>
