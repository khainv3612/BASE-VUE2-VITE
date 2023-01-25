<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <div class="d-flex items-center">
            <el-image class="avatar-user" :src="require('@/assets/images/logo2.png')">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline" />
              </div>
            </el-image>
            {{ user.user.email }}
            <i class="el-icon-caret-bottom" />
          </div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided>
            <div class="text-center">
              <p class="font-semibold"> {{ user.user.email }}</p>
            </div>
          </el-dropdown-item>
          <!--          <el-dropdown-item divided @click.native="changeSetting">-->
          <!--            <span style="display:block;">{{ $t('navbar.setting') }}</span>-->
          <!--          </el-dropdown-item>-->
          <!--          <el-dropdown-item divided @click.native="changePassword">-->
          <!--            <span style="display:block;">{{ $t('navbar.change-password') }}</span>-->
          <!--          </el-dropdown-item>-->
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'user'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    },
    changePassword() {
      this.$router.push('/change-password')
    },
    changeSetting() {
      this.$router.push({ name: 'setting' })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 14px;
      color: #11284D !important;
      vertical-align: text-bottom;
      .avatar-user {
        width: 35px;
        height: 35px;
        border-radius: 100rem;
        object-fit: cover;
        margin-right: 8px;
        border: 1px solid #97a8be;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &.hover-effect {
        cursor: pointer;
        transition: background .3s;
        &:hover {
          background: transparent;
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      display: flex;
      align-items: center;
      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 19px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
