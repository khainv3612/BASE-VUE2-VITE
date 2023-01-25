<template>
  <div :class="['app-container', classExtra]">
    <div class="header-container pb-3">
      <slot name="header" />
      <div class="action-container">
        <slot name="action" />
      </div>
    </div>
    <div class="filter-container">
      <slot name="filter" />
    </div>
    <div class="content-container">
      <slot name="content" />
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
