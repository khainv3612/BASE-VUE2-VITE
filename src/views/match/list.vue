<template>
  <main-view class-extra="setting">
    <template v-slot:header>
      <h3 class="text-2xl font-semibold">{{ $t('match.title') }}</h3>
    </template>
    <template v-slot:filter>
      <el-input
        v-model="listQuery.search"
        :placeholder="$t('match.search-placeholder')"
        style="width: 350px;"
        class="filter-item"
        maxlength="120"
        @keyup.enter.native="handleFilterName"
        @blur="handleFilterName"
      />
    </template>
    <template v-slot:content>
      <el-table
        :key="tableKey"
        ref="teamsTable"
        v-loading="listLoading"
        :data="lstMatchs"
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
        <el-table-column :label="$t('match.name')" min-width="200">
          <template slot-scope="{row}">
            {{ row.name }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('match.time')" min-width="100">
          <template slot-scope="{row}">
            {{ row.match_time_utc }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('match.round')" min-width="100">
          <template slot-scope="{row}">
            {{ row.league_round_name }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('match.result')" min-width="200">
          <template slot-scope="{row}">
            <div class="result_div">
              <p class="team-name">{{ row.home_team.name }}</p>
              <img :src="row.home_team.logo" alt="">
              <span>{{ $t('match.result_number', { v1: row.home_score, v2: row.away_score }) }}</span>
              <img :src="row.away_team.logo" alt="">
              <p class="team-name">{{ row.away_team.name }}</p>
            </div>
            {{ row.status_text }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('match.total_predict')" min-width="">
          <template slot-scope="{row}">
            {{ row.total_predict }}
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
            <el-button size="mini" icon="el-icon-view" type="primary" class="btn-primary" @click.stop="handleDetail(row)">
              {{ $t('common.detail') }}
            </el-button>
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
        :title="$t('match.detail')"
        :close-on-click-modal="false"
        :visible.sync="dialogUpdate"
        :destroy-on-close="true"
        class="table_match"
        top="5vh"
      >
        <match-detail-modal :match="[matchActive]"/>
      </el-dialog>
    </template>
  </main-view>
</template>
<script>
import MainView from '@/components/MainView'
import { randomString } from '@/utils'
import Pagination from '@/components/Pagination'
import { getListMatch } from '@/api/match'
import MatchDetailModal from '@/components/modal/match-detail'

export default {
  name: 'ListTeamComponent',
  components: {
    MatchDetailModal,
    MainView,
    Pagination
  },
  data() {
    return {
      tableKey: 0,
      searchName: '',
      keyForm: randomString(),
      dialogUpdate: false,
      matchActive: {},
      listLoading: false,
      lstMatchs: [],
      listQuery: {
        search: '',
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
      await getListMatch(listQuery).then(response => {
        this.lstMatchs = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    async init() {
      await this.getList(this.listQuery)
    },
    async changeSize(listQuery) {
      this.listLoading = true
      listQuery.page = 1
      this.listQuery.page = 1
      await this.getList(listQuery).then(response => {
        this.lstMatchs = response.data.data
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
    handleDetail(team) {
      this.matchActive = team
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
.team-name {
  min-width: 80px;
}
</style>
