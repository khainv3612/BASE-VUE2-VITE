<template>
  <main-view class-extra="setting">
    <template v-slot:header>
      <h3 class="text-2xl font-semibold">{{ $t('history_token.title') }}</h3>
    </template>
<!--    <template v-slot:filter>-->
<!--      <el-input-->
<!--        v-model="listQuery.search"-->
<!--        :placeholder="$t('history_token.search-placeholder')"-->
<!--        style="width: 350px;"-->
<!--        class="filter-item"-->
<!--        maxlength="120"-->
<!--        @keyup.enter.native="handleFilterName"-->
<!--        @blur="handleFilterName"-->
<!--      />-->
<!--      <el-select-->
<!--        filterable-->
<!--        v-model="listQuery['filters[0][data]']"-->
<!--        :placeholder="$t('history_token.type')"-->
<!--        class="filter-item"-->
<!--        value=""-->
<!--        style="width: 200px"-->
<!--        @change="getList({...listQuery})"-->
<!--      >-->
<!--        <el-option v-for="item in lstTypes" :key="item.id" :label="item.name" :value="item.id"/>-->
<!--      </el-select>-->
<!--    </template>-->
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
        <el-table-column :label="$t('history_token.created_at')" min-width="100">
          <template slot-scope="{row}">{{ row.created_at }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('history_token.email')" min-width="200">
          <template slot-scope="{row}">
            {{ row.email }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('history_token.name')" min-width="150">
          <template slot-scope="{row}">
            {{ row.name }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('history_token.coin_format')" min-width="100">
          <template slot-scope="{row}">
            {{ row.coin_format }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('history_token.type')" min-width="100">
          <template slot-scope="{row}">
            {{ row.type }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('history_token.tx_hash')" min-width="200">
          <template slot-scope="{row}">
            {{ row.tx_hash }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('history_token.from_address')" min-width="200">
          <template slot-scope="{row}">
            {{ row.from_address }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('history_token.to_address')" min-width="200">
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
        @pagination="getList({...listQuery})"
        @change-size="changeSize({...listQuery})"
      />

      <el-dialog
        :title="$t('history_token.update')"
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
import { getHistoryBuyToken, getTypeHistory } from '@/api/token'
import Pagination from '@/components/Pagination'
import UpdateTeamModal from '@/components/modal/update-team'

export default {
  name: 'HistoryBuyComponent',
  components: {
    UpdateTeamModal,
    MainView,
    Pagination
  },
  data() {
    return {
      tableKey: 0,
      searchName: '',
      keyForm: randomString(),
      dialogUpdate: false,
      teamActive: {},
      listLoading: false,
      lstHistories: [],
      lstTypes: [],
      listQuery: {
        search: '',
        'orders[0][key]': 'created_at',
        'orders[0][dir]': 'desc',
        'filters[0][key]': 'type',
        'filters[0][data]': '1',
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
    async getList(listQuery) {
      this.listLoading = true
      if (this.listQuery['filters[0][data]'] === -1) {
        this.listQuery['filters[0][data]'] = ''
      }
      await getHistoryBuyToken(listQuery).then(response => {
        this.lstHistories = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    async getListType() {
      await getTypeHistory().then(response => {
        this.lstTypes = response.data
        this.listLoading = false
      })
    },
    async init() {
      await this.getList(this.listQuery)
      await this.getListType()
    },
    async changeSize(listQuery) {
      this.listLoading = true
      listQuery.page = 1
      this.listQuery.page = 1
      await this.getList(listQuery).then(response => {
        this.lstHistories = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilterName() {
      if (this.searchName !== this.listQuery.search) {
        this.listQuery.page = 1
        this.searchName = this.listQuery.search
        this.getList({ ...this.listQuery })
      }
    },
    handleUpdate(team) {
      this.teamActive = team
      this.dialogUpdate = true
    },
    async updateSuccess() {
      await this.init()
      this.dialogUpdate = false
    }
  }
}
</script>

<style lang="scss">
</style>
