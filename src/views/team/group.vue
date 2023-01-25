<template>
  <main-view class-extra="setting">
    <template v-slot:header>
      <h3 class="text-2xl font-semibold">{{ $t('group.title') }}</h3>
    </template>
    <template v-slot:content>
      <el-table
        :key="tableKey"
        ref="teamsTable"
        v-loading="listLoading"
        :data="lstGroups"
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
          type="index"
          width="50"
        >
        </el-table-column>
        <el-table-column :label="$t('group.name')" min-width="200">
          <template slot-scope="{row}">
            {{ row.name }}
          </template>
        </el-table-column><el-table-column :label="$t('group.team')" min-width="200">
          <template slot-scope="{row}">
            {{ row.teams }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('group.percent')" min-width="200">
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
      <el-dialog
        :title="$t('group.update')"
        :close-on-click-modal="false"
        :visible.sync="dialogUpdate"
        width="500px"
        :destroy-on-close="true"
        top="5vh"
      >
        <update-group-modal :group="groupActive" @success="updateSuccess"></update-group-modal>
      </el-dialog>
    </template>
  </main-view>
</template>
<script>
import MainView from '@/components/MainView'
import { randomString } from '@/utils'
import { getListGroup } from '@/api/group'
import UpdateGroupModal from '@/components/modal/update-group'

export default {
  name: 'GroupComponent',
  components: {
    UpdateGroupModal,
    MainView
  },
  data() {
    return {
      tableKey: 0,
      searchName: '',
      keyForm: randomString(),
      dialogUpdate: false,
      groupActive: {},
      listLoading: false,
      lstGroups: []
    }
  },
  async created() {
    await this.init()
  },
  methods: {
    async getList() {
      this.listLoading = true
      await getListGroup().then(response => {
        this.lstGroups = response.data
        this.listLoading = false
      })
    },
    async init() {
      await this.getList()
    },
    handleUpdate(team) {
      this.groupActive = team
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
