<template>
  <main-view class-extra="products">
    <template v-slot:header>
      <h3 class="text-2xl font-semibold">{{ $t('tree.title') }}</h3>
    </template>
    <template v-slot:content>

      <!--      search node theo email-->
      <!--      <div class="email_div pb-14">-->
      <!--        <el-col>-->
      <!--          <el-autocomplete-->
      <!--            v-model="mailSearch"-->
      <!--            :fetch-suggestions="querySearchMail"-->
      <!--            clearable-->
      <!--            class="inline-input w-50"-->
      <!--            :placeholder="$t('noti.input_email')"-->
      <!--            @select="handleSelect"-->
      <!--          />-->
      <!--        </el-col>-->
      <!--        <el-col>-->
      <!--          <el-button @click="resetData" class="inline-input">{{ $t('common.all') }}</el-button>-->
      <!--        </el-col>-->
      <!--      </div>-->
      <div class="chart-container" style="z-index: 1">
        <div class="nav_div">
          <img src="@/assets/images/tree/zoomout.png" @click="controlScale('smaller')"/>
          <img src="@/assets/images/tree/zoomin.png" @click="controlScale('bigger')"/>
          <img src="@/assets/images/tree/reset.png" @click="controlScale('restore')"/>
        </div>
        <vue-tree
          :style="{opacity:isShow?'1':'0'}"
          ref="scaleTree"
          style="width: 100%; height: 1000px"
          :dataset="dataTreeRoot"
          :config="treeConfig"
          :collapse-enabled="true"
          link-style="straight"
        >
          <template #node>
            <tree-component :data-prop="dataTree" :is-show="isFetch" @show="isShow=true"/>
          </template>
        </vue-tree>
      </div>
    </template>
  </main-view>
</template>
<script>

import MainView from '@/components/MainView'
import { getTreeUser, getTreeUserById, searchMail } from '@/api/master'
import TreeComponent from '@/components/tree'
import { LOADING_PAGE } from '@/store/store.const'

export default {
  name: 'Index',
  components: {
    MainView,
    TreeComponent
  },
  data() {
    return {
      state: '',
      isShow: false,
      isFetch: false,
      dataTree: {},
      pan: true,
      zoom: true,
      dataTreeRoot: { id: 1 },
      treeConfig: { nodeWidth: 300, nodeHeight: 184, levelHeight: 300 },
      mailSearch: '',
      lstMailSearch: []
    }
  },
  async created() {
    await this.fetchData()
  },
  mounted() {
    // this.searchMail()
    setTimeout(() => {
      this.backToRoot()
    }, 0)
  },
  methods: {
    async fetchData() {
      await this.$store.commit(LOADING_PAGE, true)
      this.isFetch = false
      await getTreeUser().then(async response => {
        if (response.data) {
          this.dataTree = Object.assign({}, response.data[0])
          setTimeout(async() => {
            this.isFetch = true
            await this.$store.commit(LOADING_PAGE, false)
          }, 3000)
        }
      }).catch(response => {
        this.$message({
          message: response.message,
          type: 'danger'
        })
      })
    },
    async fetchDataById(id) {
      await this.$store.commit(LOADING_PAGE, true)
      this.isFetch = false
      await getTreeUserById(id).then(async response => {
        if (response.data) {
          this.dataTree = Object.assign({}, response.data)
          setTimeout(async() => {
            this.isFetch = true
            await this.$store.commit(LOADING_PAGE, false)
          }, 3000)
        }
      }).catch(response => {
        this.$message({
          message: response.message,
          type: 'danger'
        })
      })
    },
    controlScale(command) {
      switch (command) {
        case 'bigger':
          this.$refs.scaleTree.zoomIn()
          break
        case 'smaller':
          this.$refs.scaleTree.zoomOut()
          break
        case 'restore':
          this.$refs.scaleTree.restoreScale()
          this.backToRoot()
          break
      }
    },
    backToRoot() {
      const root = document.getElementsByClassName('org-tree-node-label')[0]
      // const root = document.getElementsByClassName('org-tree-container')[0]
      root.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
    },
    async searchMail() {
      await searchMail(this.mailSearch.toString()).then(async response => {
        if (response.data) {
          this.lstMailSearch = response.data
        }
      }).catch(response => {
        this.$message({
          message: response.message,
          type: 'danger'
        })
      })
    },
    async querySearchMail(queryString, cb) {
      // Neu muon query 1 lan

      // const temp = this.lstMailSearch
      // const results = queryString
      //   ? temp.filter(this.createFilter(queryString))
      //   : temp
      await this.searchMail()
      cb(this.lstMailSearch)
    },
    createFilter(queryString) {
      return (obj) => {
        return (
          obj.value.toLowerCase().includes(queryString.toLowerCase())
        )
      }
    },
    async handleSelect(item) {
      await this.fetchDataById(item.id)
      setTimeout(() => {
        this.backToRoot()
      }, 0)
    },
    async resetData() {
      await this.fetchData()
      setTimeout(() => {
        this.backToRoot()
      }, 0)
    }
  }
}
</script>

<style lang="scss">
@import "src/styles/variables";

.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .nav_div {
    position: fixed;
    top: 80px;
    right: 80px;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin: 20px 20px auto auto;
    z-index: 2222;

    img {
      cursor: pointer;
    }
  }

  .tree-container {
    width: 100%;
    min-height: 1000px;

    .link {
      stroke: $color-red-primary !important;
    }
  }
}

.node-slot {
  .rich-media-node {
    background-color: #042f47 !important;
    //height: 290px;
    padding-left: 14px;
    padding-top: 16px;
    padding-bottom: 16px;
    padding-right: 14px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: left;
    color: white;
    border: 1px solid $color-red-primary;
    border-radius: 4px;
    //font-family: 'Montserrat';
    width: 180px;
    min-width: 170px;
    word-break: break-word;
    display: grid;
    grid-template-columns: auto;
    gap: 9px;
    text-align: left;

    .row_info {
      display: grid;
      grid-template-columns: auto;
      gap: 6px;
      text-align: left;

      .title {
        font-weight: 400;
        font-size: 10px;
        line-height: 11px;
        color: $color-text-6;

      }

      .value {
        font-weight: 600;
        font-size: 11px;
        line-height: 12px;
        align-items: center;
      }
    }
  }
}
</style>
