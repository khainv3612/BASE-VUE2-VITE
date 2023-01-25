<template>
  <guest-view class-extra="container-500">
    <template v-slot:header>
      <div />
    </template>
    <template v-slot:content>
      {{ error }}
    </template>
  </guest-view>
</template>

<script>
import GuestView from '@/components/GuestView'

export default {
  components: { GuestView },
  computed: {
    error() {
      return this.$store.state.error.error500
    }
  },
  created() {
    if (!this.error) {
      this.$router.push('/login')
    }
    return true
  }
}
</script>

<style lang="scss">
  $bg:rgb(15 23 42/1);;
  $text: #ffffff;

  .container-500 {
    padding: 0;
    .content-container {
      height: 90%;
      background-color: $bg;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      color: $text;
    }
    .footer-container {
      height: 10%;
      background-color: $bg;
    }
  }

</style>
