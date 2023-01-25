<template>
  <main-view class-extra="setting">
    <template v-slot:header>
      <h3 class="text-2xl font-semibold">{{ $t('team.title') }}</h3>
    </template>
    <template v-slot:filter>
      <el-input
        v-model="listQuery.search"
        :placeholder="$t('team.search-placeholder')"
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
        :data="lstTeams"
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
        <el-table-column :label="$t('team.name')" min-width="200">
          <template slot-scope="{row}">
            <div class="title_team">
              <img :src="row.logo" alt="">
              <span> {{ row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('team.status')" min-width="200">
          <template slot-scope="{row}">
            {{ row.status_text }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('team.group')" min-width="200">
          <template slot-scope="{row}">
            {{ row.level_name }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('team.nft_percent')" min-width="200">
          <template slot-scope="{row}">
            {{ row.percent }}
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
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.per_page"
        @pagination="getList({...listQuery})"
        @change-size="changeSize({...listQuery})"
      />

      <el-dialog
        :title="$t('team.update')"
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
import { getListTeam } from '@/api/team'
import Pagination from '@/components/Pagination'
import UpdateTeamModal from '@/components/modal/update-team'

export default {
  name: 'ListTeamComponent',
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
      lstTeams: [],
      listQuery: {
        search: '',
        page: 1,
        per_page: 35
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
      await getListTeam(listQuery).then(response => {
        this.lstTeams = response.data.data
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
        this.lstTeams = response.data.data
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
