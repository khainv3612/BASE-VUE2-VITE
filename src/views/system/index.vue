<template>
  <main-view class-extra="setting">
    <template v-slot:header>
      <h3 class="text-2xl font-semibold">{{ $t('system.title') }}</h3>
    </template>
    <template v-slot:content>
      <!--      <div v-for="item in listSetting" :key="item.key" class="">-->
      <!--        {{item}}-->
      <!--        <div class="info_title"> {{ $t('system.' + item.key) }}</div>-->
      <!--        <div class="statistics_div">-->
      <!--          <div v-for="val in item.value" :key="item.value" class=" info_div">-->
      <!--            <div class=""></div>-->
      <!--            <div class="value_title">{{ val }}</div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="block">
        <div class="info_title">{{ $t('system.filter')}}</div>
        <el-date-picker
          style="margin: 15px 0 30px 0;"
          v-model="date"
          type="daterange"
          range-separator="To"
          start-placeholder="Start date"
          @blur="handleFilterDate"
          end-placeholder="End date">
        </el-date-picker>
      </div>
      <div class="total">
        <div class="info_title"> {{ $t('system.total') }}</div>
        <div class="statistics_div">
          <div class=" info_div">
            <div class="">{{ $t('system.count') }}</div>
            <div class="value_title">{{ listSetting.total.count }}</div>
          </div>
          <div class=" info_div">
            <div class="">{{ $t('system.sum_transaction') }}</div>
            <div class="value_title">{{ listSetting.total.sum_transaction }}</div>
          </div>
        </div>
      </div>

      <div class="direct_commission">
        <div class="info_title"> {{ $t('system.direct_commission') }}</div>
        <div class="statistics_div">
          <div class=" info_div">
            <div class="">{{ $t('system.count') }}</div>
            <div class="value_title">{{ listSetting.direct_commission.count }}</div>
          </div>
          <div class=" info_div">
            <div class="">{{ $t('system.sum_transaction') }}</div>
            <div class="value_title">{{ listSetting.direct_commission.sum_transaction }}</div>
          </div><div class=" info_div">
          <div class="">{{ $t('system.sum_bnb_transaction') }}</div>
          <div class="value_title">{{ listSetting.direct_commission.sum_bnb_transaction }}</div>
        </div><div class=" info_div">
          <div class="">{{ $t('system.sum_fee_transaction') }}</div>
          <div class="value_title">{{ listSetting.direct_commission.sum_fee_transaction }}</div>
        </div>
        </div>
      </div>

      <div class="indirect_commission">
        <div class="info_title"> {{ $t('system.indirect_commission') }}</div>
        <div class="statistics_div">
          <div class=" info_div">
            <div class="">{{ $t('system.count') }}</div>
            <div class="value_title">{{ listSetting.indirect_commission.count }}</div>
          </div>
          <div class=" info_div">
            <div class="">{{ $t('system.sum_transaction') }}</div>
            <div class="value_title">{{ listSetting.indirect_commission.sum_transaction }}</div>
          </div><div class=" info_div">
          <div class="">{{ $t('system.sum_bnb_transaction') }}</div>
          <div class="value_title">{{ listSetting.indirect_commission.sum_bnb_transaction }}</div>
        </div><div class=" info_div">
          <div class="">{{ $t('system.sum_fee_transaction') }}</div>
          <div class="value_title">{{ listSetting.indirect_commission.sum_fee_transaction }}</div>
        </div>
        </div>
      </div>
    </template>
  </main-view>
</template>
<script>
import MainView from '@/components/MainView'
import {getAllSystemInfo} from '@/api/system'

export default {
  name: 'IndexVue',
  components: {
    MainView
  },
  data() {
    return {
      tableKey: 0,
      listLoading: false,
      listSetting: [],
      date: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(date) {
      this.listLoading = true
      getAllSystemInfo(date).then(response => {
        // this.convertData(response.data)
        this.listSetting = response.data
        this.date = [
          this.listSetting.filter.start_date,
          this.listSetting.filter.end_date,
        ]
        this.listLoading = false
      })
    },
    convertData(data) {
      for (const [key, value] of Object.entries(data)) {
        this.listSetting.push({
          key,
          value
        })
      }
    },
    handleFilterDate() {
      this.getList({
        start_date: this.date[0],
        end_date: this.date[1]
      })
    }
  }
}
</script>

<style lang="scss">
</style>
