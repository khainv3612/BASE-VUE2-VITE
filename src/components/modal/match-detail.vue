<template>
  <div id="pancake-form" class="pancake">
    <main-view class-extra="setting">
      <template v-slot:content>
        <el-table
          :data="match"
          bitem
          fit
          border
          highlight-current-row
          style="width: 100%;"
          :row-class-name="(row, rowIndex) => 'item-row-table'"
        >
          <el-table-column :label="$t('match.round')" min-width="80">
            <template slot-scope="{row}">
              {{ row.round }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('match.round_name')" min-width="200">
            <template slot-scope="{row}">
              {{ row.league_round_name }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('match.time')" min-width="150">
            <template slot-scope="{row}">
              {{ row.match_time_utc }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('match.home_team')" min-width="200">
            <template slot-scope="{row}">
              <div class="title_team">
                <img :src="row.home_team.logo" alt="">
                <span> {{ row.home_team.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('match.away_team')" min-width="200">
            <template slot-scope="{row}">
              <div class="title_team">
                <img :src="row.away_team.logo" alt="">
                <span> {{ row.away_team.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('match.stadium')" min-width="200">
            <template slot-scope="{row}">
              {{ row.stadium }}
            </template>
          </el-table-column>
<!--          <el-table-column :label="$t('match.referee')" min-width="200">-->
<!--            <template slot-scope="{row}">-->
<!--              {{ row.referee }}-->
<!--            </template>-->
<!--          </el-table-column>-->
          <el-table-column :label="$t('match.result')" min-width="160">
            <template slot-scope="{row}">
              <div class="result_div">
                <img :src="row.home_team.logo" alt="">
                <span>{{ $t('match.result_number', { v1: row.home_score, v2: row.away_score }) }}</span>
                <img :src="row.away_team.logo" alt="">
              </div>
              {{ row.status_text }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('match.total_predict')" min-width="">
            <template slot-scope="{row}">
              {{ row.total_predict }}
            </template>
          </el-table-column>

        </el-table>

        <history-vote :match="match[0]"/>

      </template>
    </main-view>
  </div>
</template>

<script>
import MainView from '@/components/MainView'
import HistoryVote from '@/views/match/history-vote'

export default {
  name: 'MatchDetailModal',
  components: {
    HistoryVote,
    MainView
  },
  props: ['match'],
  data() {
    return {}
  }
}
</script>
