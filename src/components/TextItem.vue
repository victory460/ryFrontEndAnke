<template lang="html">

  <div class="" style="width:100%; min-height: 40px; display: flex; align-items: center; justify-content:center; border-bottom:1px solid #909090">
    <!-- <div style="width:100%;"> -->
      <div align="left" style="width:50%; float:left;">{{name}}</div>
      <div  align="right" style="width:50%; float: right;">{{value}}</div>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: 'text-item',
  props:['name', 'value'],
  created(){

  },
  data(){
    return {

    }
  },



}
</script>

<style lang="css">
</style>
