<template>
  <div id="pancake-form" class="pancake">
    <main-view class-extra="setting">
      <template v-slot:content>
        <el-table
          :data="lstHistories"
          bitem
          fit
          border
          highlight-current-row
          style="width: 100%;"
          :row-class-name="(row, rowIndex) => 'item-row-table'"
        >
          <el-table-column :label="$t('history_vote.created_at')" min-width="80">
            <template slot-scope="{row}">
              {{ convertTimestampToDate(row.created_at_ts) }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('history_vote.email')" min-width="200">
            <template slot-scope="{row}">
              {{ row.email }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('history_vote.name')" min-width="150">
            <template slot-scope="{row}">
              {{ row.name }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('history_vote.type')" min-width="150">
            <template slot-scope="{row}">
              {{ row.status_name }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('history_vote.team')" min-width="200">
            <template slot-scope="{row}">
              <div class="title_team">
                <img :src="row.team.logo" alt="">
                <span> {{ row.team.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('history_vote.coin_format')" min-width="100">
            <template slot-scope="{row}">
              {{ row.coin_format }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('history_vote.reward')" min-width="100">
            <template v-if="row.status===2" slot-scope="{row}">
              <span class="bonus">{{ '+' + row.reward.toString() }}</span>
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

      </template>
    </main-view>
  </div>
</template>

<script>
import MainView from '@/components/MainView'
import { LOADING_PAGE } from '@/store/store.const'
import { convertTimestampToDate, convertTimestampToTime } from '@/utils/format'
import { getHistoryPrediction } from '@/api/predict'
import Pagination from '@/components/Pagination'

export default {
  name: 'HistoryVote',
  components: {
    MainView,
    Pagination
  },
  props: ['match'],
  data() {
    return {
      lstHistories: [],
      lstTypes: [],
      listQuery: {
        search: '',
        'orders[0][key]': 'created_at',
        'orders[0][dir]': 'desc',
        'filters[0][key]': 'match_id',
        'filters[0][data]': this.match.id,
        page: 1,
        per_page: 10
      },
      total: 0
    }
  },
  watch: {
    async match() {
      await this.init()
    }
  },
  async mounted() {
    await this.init()
  },
  methods: {
    async init() {
      this.$store.commit(LOADING_PAGE, true)
      this.listQuery['filters[0][data]'] = this.match.id
      await this.getList(this.listQuery)
      this.$store.commit(LOADING_PAGE, false)
    },
    async getList(listQuery) {
      this.listLoading = true
      await getHistoryPrediction(listQuery).then(response => {
        this.lstHistories = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
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
    convertTimestampToTime(date) {
      return convertTimestampToTime(date)
    }, convertTimestampToDate(date) {
      return convertTimestampToDate(date)
    }
  }
}
</script>
