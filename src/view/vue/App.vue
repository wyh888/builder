<template>
  <div class="app">
    <p>{{ str }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      str: 'vue page',
    }
  }
}
</script>

<style lang="less" scoped>
p {
  color: red;
}
</style>
