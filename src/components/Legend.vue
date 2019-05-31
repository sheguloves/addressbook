<template>
  <div class="legend">
    <div v-for="item in legend" :key="item.color">{{ item.description }} <span class="color-block" :style="{'background-color': item.color}"></span></div>
  </div>
</template>
<script>
  export default {
    name: 'Legend',
    props: {
      legend: Array
    },
  }
</script>
<style lang="scss" scoped>
  .legend {
    & > div {
      margin-left: 20px;
    }
    .color-block {
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-left: 4px;
    }
  }
</style>
