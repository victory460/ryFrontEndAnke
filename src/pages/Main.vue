<template lang="html">

<div class="">
  <mt-tabbar v-model="selected">
  <mt-tab-item id="任务">
    <router-link to="/task">
      <!-- <img slot="icon" src="../assets/100x100.png"> -->
      任务
    </router-link>
  </mt-tab-item>
  <mt-tab-item id="订单">
    <!-- <img slot="icon" src="../assets/100x100.png"> -->
    订单
  </mt-tab-item>
  <mt-tab-item id="发现">
    <!-- <img slot="icon" src="../assets/100x100.png"> -->
    发现
  </mt-tab-item>
  <mt-tab-item id="我的">
    <!-- <img slot="icon" src="../assets/100x100.png"> -->
    我的
  </mt-tab-item>
</mt-tabbar>
</div>

</template>

<script>
export default {
  name: 'Main',
  data(){
    return{
      selected: 1
    }
  }
}
</script>

<style lang="css">
</style>
