<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
        <!--        <tags-view v-if="needTagsView" />-->
      </div>
      <app-main />
      <right-panel v-if="rightComponent">
        <component :is="rightComponent" />
      </right-panel>
      <footer>
        {{ $t('common.license') }}
      </footer>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],

  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showRightSidebar: state => state.settings.showRightSidebar,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader,
      rightComponent: state => state.settings.rightComponent
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },

  mounted() {
    this.isDevice = window.innerWidth < 500
    window.addEventListener('resize', ev => {
      if (ev.isTrusted) this.isDevice = window.innerWidth < 500
    })
  },

  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/mixin.scss";
  @import "@/assets/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }

  footer {
    font-size: .875rem;
    padding-left: 20px;
    border-top: 1px solid $color-text-5;
    //position: fixed;
    //bottom: 0;
    background: $color-white;
    //width: calc(100% - 250px);
    display: flex;
    align-items: center;
    justify-content: center;
    justify-items: center;
    height: 40px;
  }
</style>
