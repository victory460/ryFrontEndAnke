<template>
  <div style="width:100%; height:50px">
    <div class="" style="font-size: 12px; color: #4A4A4A; width: 15%; height: 100%; display: flex; align-items: center; justify-content: center; float: left">
      {{device.name}}
    </div>

    <div class="" style="width: 60%; height: 100%; float: left;">
      <div class="" style="width: 100%; height:50%; position: relative">
        <img src="../assets/icon_equipment.png" class="imgiconlarge" style="position: absolute; left:0px;"/>
        <div align="left" class="textchildlarge" style="float: left; margin-left:20px; max-width:90%;">{{device.serialId}}</div>
      </div>
      <div class="" style="width: 100%; height:50%; position: relative">
        <img src="../assets/icon_position.png" class="imgiconlarge" style="position: absolute; left:0px;"/>
        <div align="left" class="textchildlarge" style="float: left; margin-left:20px; max-width:90%;">{{device.client!=null?device.client.name:""}}</div>
      </div>
    </div>

    <div class="" style="width: 25%; height: 100%; float: left;">
      <div class="textchildlarge" style="width: 100%; height:50%; float: left; text-align:center;">
        <div v-if="device.trained" class="">
          已培训
        </div>
      </div>
      <div class="textchildlarge" style="width: 100%; height:50%; float: left; text-align:center;">
        <!-- <img src="../assets/icon_status.png" class="imgiconlarge" style=""/> -->
        <div class="">
          {{device.productState!=null?device.productState.displayName:""}}
        </div>
      </div>
    </div>
  </div>
</template>

<style media="screen">
.divparentlarge {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
}

.imgiconlarge {
  height: 20px;
  width: 20px;
}

.textchildlarge {
  margin: 0;
  font-size: 15px;
  color: #4A4A4A;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  white-space: nowrap;
}

.divparentsmall {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10px;
}

.imgiconsmall {
  height: 10px;
  width: 10px;
  margin-right: 5px;
}

.textchildsmall {
  margin: 0;
  width: 100%;
  font-size: 10px;
  color: #4A4A4A;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  white-space: nowrap;
}

a{
  text-decoration: none;
}
.router-link-active{
  text-decoration: none;
}
</style>

<script>
export default {
  name: 'device-item',
  props: ['device'],
  components: {}
}
</script>
