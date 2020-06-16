<template>
  <div class="app">
    <p>{{ str }}</p>
  </div>
</template>

<script>
import { add } from '@/utils/func'

export default {
  data() {
    return {
      str: 'vue page',
    }
  },
  mounted() {
    this.str += add(1, 2)
  }
}
</script>

<style lang="less" scoped>
p {
  color: red;
}
</style>
