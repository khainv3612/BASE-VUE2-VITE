<template>
  <div v-if="showLoading" class="loading-custom">
    <div />
    <div />
    <div />
  </div>
</template>
<script>

export default {
  computed: {
    showLoading() {
      return this.$store.state.app.loading
    }
  }
}
</script>
