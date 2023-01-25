<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :class="[{ activeMenu : 'font-bold' }]"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <div v-for="route in permission_routes" :key="route.path" @click="selectMenu(route)">
          <sidebar-item :item="route" :base-path="route.path" :class="{'menu_sidebar':isClick(route)}" />
        </div>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/assets/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      selectedMenu: {}
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    selectMenu(menu) {
      this.selectedMenu = menu
    },
    isClick(menu) {
      let result = false
      const children = menu.children
      if (!children || children.length === 0 || children[0].path === '') {
        result = this.$route.path.startsWith(menu.path)
      } else {
        this.$route.path === menu.path
      }
      return result
    }
  }
}
</script>
