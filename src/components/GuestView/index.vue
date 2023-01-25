<template>
  <div :class="[classExtra]">
    <div class="content-container">
      <slot name="content" />
    </div>

    <div class="footer-container">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    classExtra: {
      type: String,
      default: ''
    }
  }
}
</script>
