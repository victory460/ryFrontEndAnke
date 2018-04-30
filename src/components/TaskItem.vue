<template>
<router-link :to="'/task-details/'+task.id" active-class="true">
  <div style="width: 100%; height: 64px; background: #ffffff; margin-top: 10px;padding: 2px 0px;">
    <div style="with: 96%; height:20px; margin: 0px 2%;">
      <div style="width: 70%; height:20px; float: left" class="divparentlarge">
        <img src="../assets/icon_equipment.png" class="imgiconlarge" />
        <p align="left" class="textchildlarge">{{task.productName}}</p>
      </div>
      <div style="width: 30%; height:20px;  float: right" class=" divparentlarge">
        <p align="right" v-if="task.reopen" class="textchildlarge">已重开</p>
      </div>
    </div>
    <div align="left" class="textchildlarge" style="margin: 5px 2%; height:20px; width:96%;">
      {{task.title}}
    </div>
    <div style="width:96%; height: 20px; margin: 0px 2%;">
      <div style="width: 46%; float: left;" class="divparentsmall">
        <img src="../assets/icon_type.png" class="imgiconsmall" />
        <p align="left" class="textchildsmall">{{task.type}}</p>
      </div>
      <div style="width: 25%; float: left" class="divparentsmall">
        <img src="../assets/icon_charger.png" class="imgiconsmall" />
        <div align="left" class="textchildsmall">{{task.operator}}</div>
      </div>
      <div style="width:25%; float: right" class="col-xs-3 divparentsmall">
        <img src="../assets/icon_time.png" class="imgiconsmall" />
        <div class="textchildsmall">{{task.date}}</div>
      </div>
    </div>
  </div>
</router-link>
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
  margin-right: 10px;
}

.textchildlarge {
  margin: 0;
  width: 100%;
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
  name: 'task-item',
  props: ['task'],
  components: {}
}
</script>
