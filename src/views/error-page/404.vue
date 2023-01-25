<template>
  <div class="errPage-container pt-10">
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">
          SOS !
        </h1>
        <h2 class="color-green font-bold text-2xl">Ôi không! Không tìm thấy trang ...</h2>
        <h6 class="my-6 font-bold">Trang bạn đang tìm không được tìm thấy hoặc không có tại thời điểm này</h6>
        <ul class="list-unstyled">
          <li>Trong thời gian chờ đợi, bạn có thể thử:</li>
          <li class="link-type color-green font-medium">1. Đảm bảo rằng URL của bạn đã chính xác</li>
          <li class="link-type color-green font-medium">
            2. Hãy lấy cho mình một cốc nước và làm mới trang
          </li>
        </ul>
        <div class="mt-6">
          <el-button type="primary" icon="el-icon-arrow-left" class="btn-primary" @click="back">
            về trang chủ
          </el-button>
        </div>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" title="随便看">
      <img :src="ewizardClap" class="pan-img">
    </el-dialog>
  </div>
</template>

<script>
import errGif from '@/assets/401_images/401.gif'

export default {
  name: 'Page401',
  data() {
    return {
      errGif: errGif + '?' + +new Date(),
      ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
      dialogVisible: false
    }
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/' })
      } else {
        this.$router.push({ path: '/' })
        // this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.errPage-container {
  width: 850px;
  max-width: 100%;
  margin: 100px auto;
  height: 100vh;
  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none!important;
  }
  .pan-gif {
    margin: 0 auto;
    display: block;
  }
  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }
  .list-unstyled {
    font-size: 14px;
    li {
      padding-bottom: 5px;
    }
    a {
      color: #008489;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
