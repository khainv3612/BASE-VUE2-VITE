<template>
  <div>
    <main-view class-extra="setting">
      <template v-slot:header>
        <h3 class="text-2xl font-semibold">{{ $t('token.title1') }}</h3>
      </template>
      <template v-slot:content>
        <div style="margin-top: -10px">
          <div class="lst_token_div">
            <div v-for="token in lstTokens" :key="token.id" class="token_div">
              <div class="token_info token_name">
                <img :src="token.logo" alt="">
                <span>{{ token.name }}</span>
              </div>
              <div class="token_info token_value">{{ token.total_quantity }}</div>
            </div>
          </div>
        </div>
      </template>
    </main-view>
    <main-view class-extra="setting">
      <template v-slot:header>
        <h3 class="text-2xl font-semibold">{{ $t('token.title') }}</h3>
      </template>
      <template v-slot:filter>
        <el-select
          filterable
          v-model="listQuery['filters[0][data]']"
          :placeholder="$t('token.team')"
          class="filter-item"
          value=""
          style="width: 200px"
          @change="getListDetailToken"
        >
          <el-option v-for="item in lstTeams" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
      </template>
      <template v-slot:content>
        <el-table
          :key="tableKey"
          ref="teamsTable"
          v-loading="listLoading"
          :data="lstDetailTokens"
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
            :label="$t('token.stt')"
          >
            <template slot-scope="scope">
              {{ listQuery.per_page * (listQuery.page - 1) + (scope.$index + 1) }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('token.email')" min-width="200">
            <template slot-scope="{row}">
              <span> {{ row.email }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('token.nation')" min-width="200">
            <template slot-scope="{row}">
              {{ row.nation }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('token.wallet_address')" min-width="200">
            <template slot-scope="{row}">
              {{ row.wallet_address }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('token.quantity')" min-width="200">
            <template slot-scope="{row}">
              {{ row.quantity }}
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.per_page"
          :auto-scroll="false"
          @pagination="getListDetailToken()"
          @change-size="changeSize({...listQuery})"
        />

      </template>
    </main-view>
  </div>
</template>
<script>
import MainView from '@/components/MainView'
import { randomString } from '@/utils'
import Pagination from '@/components/Pagination'
import { getAllTeams, getDetailToken, getListToken } from '@/api/token'
import { ID_TEAM_ACTIVE } from '@/constaint'

export default {
  name: 'ListTeamComponent',
  components: {
    MainView,
    Pagination
  },
  data() {
    return {
      tableKey: 0,
      searchName: '',
      keyForm: randomString(),
      dialogUpdate: false,
      listLoading: false,
      lstTokens: [],
      lstTeams: [],
      lstDetailTokens: [],
      listQuery: {
        search: '',
        page: 1,
        per_page: 10,
        'filters[0][key]': 'team',
        'filters[0][data]': ID_TEAM_ACTIVE
      },
      searchTeam: '',
      total: 0
    }
  },
  async created() {
    await this.init()
  },
  methods: {
    async getListDetailToken() {
      this.listLoading = true
      if (this.listQuery['filters[0][data]'] === -1) {
        this.listQuery['filters[0][data]'] = ''
      }
      await getDetailToken(this.listQuery).then(response => {
        this.lstDetailTokens = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    async getListTeam() {
      await getAllTeams(this.searchTeam).then(response => {
        this.lstTeams = response.data
        this.lstTeams.unshift({
          id: -1,
          name: this.$t('token.all')
        })
        this.listLoading = false
      })
    },
    async getListToken() {
      await getListToken().then(response => {
        this.lstTokens = response.data
        this.listLoading = false
      })
    },
    async init() {
      await this.getListToken()
      await this.getListDetailToken()
      await this.getListTeam()
    },
    async changeSize(listQuery) {
      this.listLoading = true
      this.listQuery.page = 1
      await this.getListDetailToken().then(response => {
        this.lstDetailTokens = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilterName() {
      if (this.searchName !== this.listQuery.search) {
        this.listQuery.page = 1
        this.searchName = this.listQuery.search
        this.getHistories({ ...this.listQuery })
      }
    }
  }
}
</script>

<style lang="scss">
</style>
