<template>
  <main-view class-extra="setting">
    <template v-slot:header>
      <h3 class="text-2xl font-semibold">{{ $t('user.title') }}</h3>
    </template>
    <template v-slot:filter>
      <el-input
        v-model="listQuery.search"
        :placeholder="$t('user.search-placeholder')"
        style="width: 350px;"
        class="filter-item"
        maxlength="120"
        @keyup.enter.native="handleFilterName"
        @blur="handleFilterName"
      />
      <el-select
        v-model="listQuery['filters[0][data]']"
        :placeholder="$t('product.status')"
        class="filter-item"
        value=""
        style="width: 200px"
        @change="handleFilter"
      >
        <el-option v-for="item in statusOption" :key="item.id" :label="item.name" :value="item.id"/>
      </el-select>
      <!-- <el-select
        v-model="listQuery['filters[1][data]']"
        :placeholder="$t('user.role_name')"
        class="filter-item"
        value=""
        style="width: 200px"
        @change="handleFilter"
      >
        <el-option v-for="item in roleOptions" :key="item.id" :label="item.name" :value="item.id" />
      </el-select> -->
    </template>
    <template v-slot:content>
      <el-table
        :key="tableKey"
        ref="productTable"
        v-loading="listLoading"
        :data="users"
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
        <el-table-column :label="$t('user.wallet_address')" min-width="200">
          <template slot-scope="{row}">
            {{ row.wallet_address }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('user.email')" min-width="200">
          <template slot-scope="{row}">
            {{ row.email }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('user.name')" min-width="150">
          <template slot-scope="{row}">
            {{ row.name }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('user.phone')" min-width="100">
          <template slot-scope="{row}">
            {{ row.phone }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('user.invite_code')" min-width="100">
          <template slot-scope="{row}">
            {{ row.memo }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('user.coin')" min-width="100">
          <template slot-scope="{row}">
            {{ row.coin_format }}
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('user.status')" width="100" prop="status">
          <template slot-scope="{row}">
            <div @click.stop="() => {}">
              <el-switch
                v-model="row.status"
                style="display: block; margin-bottom: 5px"
                active-color="#13ce66"
                :active-value="1"
                :inactive-value="0"
                :disabled="disabledSwitchStatus"
                @change="updateStatus(row.id)"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="150"
          class-name="small-padding fixed-width"
          prop="action"
          :label="$t('common.action')"
          fixed="right"
        >
          <template slot-scope="{row}">
            <el-button size="mini" icon="el-icon-view" type="primary" class="btn-danger" @click.stop="handleDetailUser(row)">
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
    </template>
  </main-view>
</template>
<script>
import MainView from '@/components/MainView'
import Pagination from '@/components/Pagination'

import { getListUser, updateStatusUser } from '@/api/master'

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
      users: [],
      total: 0,
      listLoading: true,
      listQuery: {
        search: '',
        page: 1,
        per_page: 10,
        'orders[0][key]': 'updated_at',
        'orders[0][dir]': 'desc',
        'filters[0][key]': 'status',
        'filters[0][data]': ''
        // 'filters[1][key]': 'type_wallet',
        // 'filters[1][data]': ''
      },
      statusOptions: [],
      disabledSwitchStatus: false,
      statusOption: [
        {
          'id': -1,
          'name': this.$t('status.all_confirm')
        },
        {
          'id': 0,
          'name': this.$t('status.not_confirmed')
        },
        {
          'id': 1,
          'name': this.$t('status.confirmed')
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
      getListUser(listQuery).then(response => {
        this.users = response.data.data
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
    updateStatus(id) {
      this.disabledSwitchStatus = true
      updateStatusUser(id).then((response) => {
        this.$message({ message: response.message, type: 'success' })
        this.disabledSwitchStatus = false
      }).catch((response) => {
        this.$message({ message: response.message, type: 'error' })
        this.disabledSwitchStatus = false
      })
    },
    handleFilterName() {
      if (this.searchName !== this.listQuery.search) {
        this.listQuery.page = 1
        if (Number(this.listQuery['filters[0][data]']) === -1) {
          this.listQuery['filters[0][data]'] = ''
        }
        // if (Number(this.listQuery['filters[1][data]']) === -1) {
        //   this.listQuery['filters[1][data]'] = ''
        // }
        this.searchName = this.listQuery.search
        this.getList({ ...this.listQuery })
      }
    },
    handleFilter() {
      this.listQuery.page = 1
      if (Number(this.listQuery['filters[0][data]']) === -1) {
        this.listQuery['filters[0][data]'] = ''
      }
      // if (Number(this.listQuery['filters[1][data]']) === -1) {
      //   this.listQuery['filters[1][data]'] = ''
      // }
      this.getList({ ...this.listQuery })
    },
    handleDetailUser(data) {
      this.$router.push({ name: 'Detail User', params: { id: data.id }})
    }
  }
}
</script>

<style lang="scss">
</style>
