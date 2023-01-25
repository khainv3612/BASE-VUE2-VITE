<template>
  <div id="app">
    <loading />
    <router-view />
  </div>
</template>

<script>
import Loading from '@/components/Common/loading'
export default {
  name: 'App',
  components: { Loading }

}
</script>
